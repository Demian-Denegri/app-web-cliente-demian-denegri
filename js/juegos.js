const traerProductoSupabase = () => {
  // select=* trae las columnas de producto, y producto_genero(genero(nombre)) trae los géneros
  const url =
    "https://fptafmcghatrkypanrdp.supabase.co/rest/v1/producto?select=*,producto_genero(genero(nombre))";
  const options = {
    method: "GET",
    headers: {
      apikey: "sb_publishable_qqmzggG7YHk7SgnyAV9p7w_B8NGNRjH",
      Authorization: "Bearer sb_publishable_qqmzggG7YHk7SgnyAV9p7w_B8NGNRjH",
      "Content-Type": "application/json",
    },
  };
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los productos de Supabase");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error al obtener los productos de Supabase:", error);
      return []; // si falla, devuelvo un array vacío
    });
};

let productos = []; // acá se guardan los productos cuando llegan de Supabase
// uso clase name en lugar de id porque id es único y no quiero que se repita, y si se repite, el html no es válido. En cambio, class name puede repetirse y es más flexible para css y js

function obtenerPrecioFinal(producto) {
  // si hay descuento se paga precio_descuento, si no, precio_actual
  return producto.precio_descuento !== null
    ? producto.precio_descuento
    : producto.precio_actual;
}

function obtenerGeneros(producto) {
  // producto_genero es un array de { genero: { nombre } }
  return (producto.producto_genero || [])
    .filter((pg) => pg.genero && pg.genero.nombre) // por si algún género viene vacío
    .map((pg) => pg.genero.nombre);
}

function crearTarjeta(producto) {
  //funcion para crear la tarjeta de cada producto
  const articulo = document.createElement("article");
  articulo.className = "fila-juego";
  articulo.id = producto.producto_id;

  const enlace = document.createElement("a");
  enlace.href = `html/product.html?id=${producto.producto_id}`; // página de detalle (a donde me va a llaver cuando se haga click en la tarjeta)
  enlace.ariaLabel = `Ver detalles de ${producto.titulo}`;

  const imagen = document.createElement("img");
  imagen.src = producto.imagen_url;
  imagen.alt = `Portada de ${producto.titulo}`;
  const div = document.createElement("div");
  div.className = "info-juego";

  const nombre = document.createElement("h3");
  nombre.className = "titulo";
  nombre.textContent = producto.titulo;

  // producto_genero es un array de { genero: { nombre } }
  const genero = document.createElement("p");
  genero.className = "genero";
  genero.textContent = obtenerGeneros(producto).join(", "); // uno los géneros con coma y espacio, si no hay géneros, genero.textContent queda vacío

  // si hay descuento, se paga precio_descuento y precio_actual va tachado
  const hayDescuento = producto.precio_descuento !== null;
  const precioFinal = obtenerPrecioFinal(producto);

  const precio = document.createElement("p");
  precio.className = "precio";
  precio.innerHTML = `<strong>$${precioFinal}</strong> ${hayDescuento ? `<s>$${producto.precio_actual}</s>` : ""}`;

  articulo.appendChild(enlace);
  enlace.appendChild(imagen);
  enlace.appendChild(div);
  div.appendChild(nombre);
  div.appendChild(genero);
  div.appendChild(precio);
  return articulo;
}

function filtrarJuegos() {
  // filtra por título (buscador del navbar) y por el género elegido en el select
  const busqueda = document.getElementById("busqueda").value;
  const generoInput = document.getElementById("filtrar-genero");
  const generoSeleccionado = generoInput ? generoInput.value : "";

  const listaFiltrada = productos.filter((producto) => {
    const coincideBusqueda = producto.titulo
      .toLowerCase()
      .includes(busqueda.toLowerCase());

    const coincideGenero =
      generoSeleccionado === "" ||
      obtenerGeneros(producto).includes(generoSeleccionado);

    return coincideBusqueda && coincideGenero;
  });
  return listaFiltrada;
}

function cargarFiltroGeneros() {
  // llena el select de géneros con los nombres únicos que llegan de Supabase
  const select = document.getElementById("filtrar-genero");
  if (!select) return;

  const generos = [...new Set(productos.flatMap(obtenerGeneros))].sort((a, b) =>
    a.localeCompare(b, "es"),
  );

  const valorActual = select.value;
  select.replaceChildren();

  const opcionTodos = document.createElement("option");
  opcionTodos.value = "";
  opcionTodos.textContent = "Todos los géneros";
  select.appendChild(opcionTodos);

  generos.forEach((nombre) => {
    const opcion = document.createElement("option");
    opcion.value = nombre;
    opcion.textContent = nombre;
    select.appendChild(opcion);
  });

  // mantengo la selección previa si ese género sigue existiendo
  select.value = generos.includes(valorActual) ? valorActual : "";
}

function sinProductos() {
  //funcion para mostrar un mensaje cuando no hay productos
  const contenedor = document.getElementById("catalogo-lista");
  contenedor.replaceChildren();
  const mensaje = document.createElement("p");
  mensaje.textContent = "No se encontraron productos.";
  mensaje.className = "mensaje-no-productos";
  contenedor.appendChild(mensaje);
}

function renderizar(lista) {
  //funcion para renderizar los juegos en el contenedor

  if (lista.length === 0) {
    // si no hya productos disparo la funcion
    sinProductos();
    return;
  }
  const contenedor = document.getElementById("catalogo-lista");
  contenedor.replaceChildren(); //vacio el contenedor para que no se dupliquen los juegos
  lista.forEach(function (producto) {
    contenedor.appendChild(crearTarjeta(producto));
  });
}

/* 
==========================================
 -------------ORDENAMIENTO----------------
========================================== 
*/
//filtros de la izquierda
function ordenar(lista) {
  const orden = document.getElementById("ordenar").value;
  const copia = [...lista]; // copio para no modificar el array original
  console.log("valor del select:", orden);
  if (orden === "precio-asc") {
    copia.sort((a, b) => obtenerPrecioFinal(a) - obtenerPrecioFinal(b));
  } else if (orden === "precio-desc") {
    copia.sort((a, b) => obtenerPrecioFinal(b) - obtenerPrecioFinal(a));
  }
  return copia;
}

function actualizarCatalogo() {
  renderizar(ordenar(filtrarJuegos()));
}

// Cuando llegan los datos de Supabase, los guardo y dibujo el catálogo
traerProductoSupabase().then((datos) => {
  productos = datos;
  cargarFiltroGeneros();
  actualizarCatalogo();
});

// Select de géneros: filtra el catálogo por el nombre de la etiqueta de género
document
  .getElementById("filtrar-genero")
  .addEventListener("change", actualizarCatalogo);

document
  .getElementById("ordenar")
  .addEventListener("change", actualizarCatalogo);

// La barra de búsqueda del navbar filtra el catálogo por título
document
  .getElementById("busqueda")
  .addEventListener("input", actualizarCatalogo);

// El filtrado es en vivo, así que evito que Enter recargue la página
document.querySelector(".filtros").addEventListener("submit", (evento) => {
  evento.preventDefault();
});

// El botón "Limpiar filtros" hace un reset nativo: espero a que se aplique y redibujo
document.querySelector(".filtros").addEventListener("reset", () => {
  setTimeout(actualizarCatalogo, 0);
});
