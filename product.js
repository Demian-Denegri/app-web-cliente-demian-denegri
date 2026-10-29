const id = new URLSearchParams(window.location.search).get("id"); // obtengo el id del producto de la url, que viene en product.html?id=1, por ejemplo

console.log("ID del producto:", id);
const traerDetalleProductoSupabase = () => {
  // select=* trae las columnas de producto, y producto_genero(genero(nombre)) trae los géneros
  const url = `https://fptafmcghatrkypanrdp.supabase.co/rest/v1/producto?select=*,especificacion_producto(*),producto_genero(genero(nombre))&producto_id=eq.${id}`;
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

traerDetalleProductoSupabase().then((productos) => {
  const producto = productos[0]; // como el id es único, debería traer un solo producto, así que tomo el primero del array
  if (!producto) {
    document.getElementById("detalle").innerHTML =
      "<p>Producto no encontrado. Por favor, verifica el ID en la URL.</p>";
    return;
  }
  console.log(producto);
  renderizarDetalleProducto(producto);
});

function renderizarDetalleProducto(producto) {
  const specs = producto.especificacion_producto; // para bajar dentro del array y poder encontrar los requisitos mínimos y recomendados
  const generos = producto.producto_genero; // mapeo los géneros y los uno en un string separado por comas

  const listaGeneros = document.getElementById("lista-generos");
  listaGeneros.replaceChildren(); // borra los <li> que haya
  producto.producto_genero.forEach((pg) => {
    // recorro el array de géneros
    const item = document.createElement("li"); // creo un <li> por cada género
    item.textContent = pg.genero.nombre; // le asigno el nombre del género al <li>
    listaGeneros.appendChild(item); // agrego el <li> al <ul>
  });

  document.title = `${producto.titulo} — Detalle del juego | NullPod`; // cambio el título de la página al nombre del producto
  document.getElementById("titulo-juego").textContent = producto.titulo;
  document.getElementById("imagen-portada").src = producto.imagen_url;
  document.getElementById("imagen-portada").alt = producto.titulo;
  document.getElementById("descripcion").textContent = producto.descripcion;
  let a = producto.precio_actual; // guardo el precio actual en una variable para poder usarlo en el cálculo del descuento
  if (producto.precio_descuento !== null) {
    // si hay un precio de descuento, muestro el precio anterior y el porcentaje de descuento, sino solo muestro el precio

    //utilizo el metodo burbuja para reordenar los precios y que el precio actual sea el menor de los dos
    producto.precio_actual = a; // si hay descuento, el precio actual es el precio de descuento
    producto.precio_actual = producto.precio_descuento; // si hay descuento, el precio actual es el precio de descuento
    producto.precio_descuento = a; // si hay descuento, el precio de descuento es el precio de descuento
    producto.descuento =
      Math.round(
        ((producto.precio_descuento - producto.precio_actual) /
          producto.precio_descuento) *
          100,
      ) * -1; // calculo el porcentaje de descuento y lo guardo en el objeto producto
    document.getElementById("precio-actual").innerHTML =
      `<strong>$${producto.precio_actual}</strong> <s id="precio-anterior">$${producto.precio_descuento}</s> <span>— ${producto.descuento}% de descuento</span>`;
  } else {
    document.getElementById("precio-actual").innerHTML =
      `<strong>$${producto.precio_actual}</strong>`;
  }

  //Requisitos mínimos
  document.getElementById("so-min").textContent =
    `SO: ${specs.sistema_operativo_min}`;
  document.getElementById("procesador-min").textContent =
    `Procesador: ${specs.procesador_min}`;
  document.getElementById("memoria-ram-min").textContent =
    `Memoria: ${specs.memoria_ram_min}`;
  document.getElementById("graficos-min").textContent =
    `Gráficos: ${specs.graficos_min}`;
  document.getElementById("almacenamiento-min").textContent =
    `Almacenamiento: ${specs.almacenamiento_min}`;

  //Requisitos recomendados
  document.getElementById("so-rec").textContent =
    `SO: ${specs.sistema_operativo_rec}`;
  document.getElementById("procesador-rec").textContent =
    `Procesador: ${specs.procesador_rec}`;
  document.getElementById("memoria-ram-rec").textContent =
    `Memoria: ${specs.memoria_ram_rec}`;
  document.getElementById("graficos-rec").textContent =
    `Gráficos: ${specs.graficos_rec}`;
  document.getElementById("almacenamiento-rec").textContent =
    `Almacenamiento: ${specs.almacenamiento_rec}`;
}
