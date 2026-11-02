document.addEventListener("DOMContentLoaded", async () => {
  const productos = JSON.parse(localStorage.getItem("id_productos")) || [];

  const promesas = productos.map((id) => traerProductoSupabasePorId(id));
  const productosTraidos = await Promise.all(promesas);

  console.log("Productos traídos de Supabase:", productosTraidos);
  rendereizarCarrito(productosTraidos);
  return productosTraidos;
});
function totalCarrito(productos) {
  let total = 0;
  productos.forEach((producto) => {
    if (producto.precio_descuento === null) {
      total += producto.precio_actual;
    } else {
      total += producto.precio_descuento;
    }
  });
  console.log("Total del carrito:", total);
  return total;
}
const traerProductoSupabasePorId = (id) => {
  // select=* trae las columnas de producto, y producto_genero(genero(nombre)) trae los géneros
  const url = `https://fptafmcghatrkypanrdp.supabase.co/rest/v1/producto?producto_id=eq.${id}&select=*`;

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
    .then((data) => data[0]) // devuelve el primer producto encontrado
    .catch((error) => {
      console.error("Error:", error);
      return null;
    });
};

function construirCarrito(producto) {
  const contenedor = document.createElement("div");
  contenedor.className = "juego-card";
  contenedor.dataset.id = producto.producto_id; // para saber que producto es para el boton de eliminar

  const imagen = document.createElement("img");
  imagen.src = producto.imagen_url;
  imagen.alt = `Portada de ${producto.titulo}`;

  const info = document.createElement("div");
  info.className = "juego-info";

  const nombre = document.createElement("h3");
  nombre.textContent = producto.titulo;

  const precio = document.createElement("p");
  precio.className = "precio";
  // si hay descuento, se paga precio_descuento y precio_actual va tachado
  const hayDescuento = producto.precio_descuento !== null; // si es null, no hay descuento
  let precioFinal;
  if (hayDescuento) {
    precioFinal = producto.precio_descuento;
  } else {
    precioFinal = producto.precio_actual;
  }
  precio.innerHTML = `<strong>$${precioFinal}</strong> ${hayDescuento ? `<s>$${producto.precio_actual}</s>` : ""}`;

  const iconoEliminar = document.createElement("span");
  iconoEliminar.className = "material-symbols-outlined btn-delete";
  iconoEliminar.setAttribute("aria-label", "Eliminar juego");
  iconoEliminar.textContent = "delete";
  iconoEliminar.addEventListener("click", function () {
    eliminarProductoDelCarrito(producto.producto_id);
  });

  contenedor.appendChild(imagen);
  contenedor.appendChild(info);
  info.appendChild(nombre);
  info.appendChild(precio);
  info.appendChild(iconoEliminar);
  contenedor.appendChild(iconoEliminar);
  return contenedor;
}

function rendereizarCarrito(productos) {
  const total = totalCarrito(productos); // llamo a la funcion totalCarrito con el array de productos traidos de supabase
  const contenedorCarrito = document.getElementById("resumen-juegos"); // contenedor donde se van a renderizar los productos del carrito
  contenedorCarrito.innerHTML = ""; // Limpio el contenedor antes de renderizar los productos
  productos.forEach((producto) => {
    const articulo = construirCarrito(producto);
    contenedorCarrito.appendChild(articulo);
  });
  document.getElementById("total-pagar").textContent = `$${total}`;
}

document.getElementById("comprar").addEventListener("click", function () {
  compra(); // llamo a la funcion compra para eliminar los productos del carrito y del local storage porque ya se realizo la compra
  totalCarrito();
});

function compra() {
  // elimino los productos del carrito y del local storage porque ya se realizo la compra;
  const productos = JSON.parse(localStorage.getItem("id_productos")) || [];
  localStorage.setItem("id_productos", JSON.stringify([])); // elimino los productos del local storage
  alert("Gracias por su compra!!!");
  console.log("Productos comprados:", productos);
  location.reload();
}

function eliminarProductoDelCarrito(id) {
  console.log("Producto eliminado del carrito");
  let id_productos = JSON.parse(localStorage.getItem("id_productos")) || [];
  id_productos = id_productos.filter((productoId) => Number(productoId) !== id); // elimino el producto del array,transafortmo el id a number porque el id del producto es number y el id del array es string
  localStorage.setItem("id_productos", JSON.stringify(id_productos));
  location.reload(); // recargo la pagina para que se actualice el carrito
}
