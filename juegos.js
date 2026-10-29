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

function crearTarjeta(producto) {
  //funcion para crear la tarjeta de cada producto
  const articulo = document.createElement("article");
  articulo.className = "fila-juego";
  articulo.id = producto.producto_id;

  const enlace = document.createElement("a");
  enlace.href = `product.html?id=${producto.producto_id}`; // página de detalle (a donde me va a llaver cuando se haga click en la tarjeta)
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
  genero.textContent = (producto.producto_genero || [])
    .map((pg) => pg.genero.nombre) // extraigo el nombre de cada género (el nombre de los generos esta dentro de producto_genero, que es un array de objetos que tienen un objeto genero con la propiedad nombre)
    .join(", "); // uno los géneros con coma y espacio, si no hay géneros, genero.textContent queda vacío

  // si hay descuento, se paga precio_descuento y precio_actual va tachado
  const hayDescuento = producto.precio_descuento !== null; // si es null, no hay descuento
  let precioFinal;
  if (hayDescuento) {
    precioFinal = producto.precio_descuento;
  } else {
    precioFinal = producto.precio_actual;
  }

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
  //funcion para filtrar los juegos por nombre
  const busqueda = document.getElementById("busqueda").value;
  const listaFiltrada = productos.filter((producto) =>
    producto.titulo.toLowerCase().includes(busqueda.toLowerCase()),
  );
  return listaFiltrada;
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

// Cuando llegan los datos de Supabase, los guardo y dibujo el catálogo
traerProductoSupabase().then((datos) => {
  productos = datos;
  renderizar(productos);
});

// Cuando se escribe en el input, se filtran los juegos
document.getElementById("busqueda");
document.addEventListener("input", () => renderizar(filtrarJuegos()));
