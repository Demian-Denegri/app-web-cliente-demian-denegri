const URL_BASE = "https://fptafmcghatrkypanrdp.supabase.co/rest/v1/";
const API_KEY = "sb_publishable_qqmzggG7YHk7SgnyAV9p7w_B8NGNRjH";

let productos = []; // acá se guardan los productos cuando llegan de Supabase
// uso clase name en lugar de id porque id es único y no quiero que se repita, y si se repite, el html no es válido. En cambio, class name puede repetirse y es más flexible para css y js
let idProductoSeleccionado = null; // variable global para almacenar el ID del producto seleccionado para editar
let todosLosGeneros = []; // todos los que existen en la base
let generosSeleccionados = []; // los del producto que se esta editando

const crearNuevoProducto = (productoData) => {
  const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  // Mando el producto
  return fetch(URL_BASE + "producto", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(productoData.producto),
  })
    .then((response) => response.json())
    .then((filas) => {
      // Supabase devuelve un array, me quedo con el id de la primera fila
      const productoId = filas[0].producto_id;

      // 2. Mando las especificaciones
      return fetch(URL_BASE + "especificacion_producto", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          producto_id: productoId,
          ...productoData.especificacion,
        }),
      }).then(() => {
        // 3. Mando los géneros (una fila por cada género)
        const filasGeneros = productoData.generos.map((generoId) => ({
          producto_id: productoId,
          genero_id: generoId,
        }));

        return fetch(URL_BASE + "producto_genero", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(filasGeneros),
        });
      });
    });
};
const traerProductoSupabase = () => {
  // select=* trae las columnas de producto, y producto_genero(genero(nombre)) trae los géneros
  const url = URL_BASE + "producto?select=*,producto_genero(genero(nombre))";
  const options = {
    method: "GET",
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
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

const traerProductoPorId = (id) => {
  // trae un solo producto con sus especificaciones (left join) y sus géneros
  const url =
    URL_BASE +
    "producto?select=*,especificacion_producto(*),producto_genero(genero_id,genero(nombre))&producto_id=eq." +
    id;
  const options = {
    method: "GET",
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.pgrst.object+json", // devuelve un objeto en vez de un array de un elemento
    },
  };
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener el producto de Supabase");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error al obtener el producto de Supabase:", error);
      return null; // si falla, devuelvo null
    });
};

async function eliminarProducto(id, fila) {
  //elimina ewl producto por id, y si se borra correctamente, elimina la fila de la tabla
  const url = URL_BASE + "producto?producto_id=eq." + id;
  const options = {
    method: "DELETE",
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
      Prefer: "return=representation",
      "Content-Type": "application/json",
    },
  };
  return fetch(url, options)
    .then(async (response) => {
      if (!response.ok) {
        const detalle = await response.text(); // Supabase explica el motivo en el body
        throw new Error(`Error ${response.status}: ${detalle}`);
      }
      return response.json();
    })
    .then((borrados) => {
      if (borrados.length === 0) throw new Error("No se borró nada");
      fila.remove();
    })
    .catch((error) => {
      console.error("Error al borrar el producto de Supabase:", error);
    });
}

async function actualizarProducto(id) {
  const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };
  const aTexto = (valor) => {
    const v = valor.trim();
    if (v === "") {
      return null; // vacío → null
    }
    return v;
  };

  const aNumero = (valor) => {
    const v = valor.trim();
    if (v === "") {
      return null; // vacío → null, no 0
    }
    return Number(v);
  };

  const datosProducto = {
    titulo: document.getElementById("prod-titulo").value,
    descripcion: document.getElementById("prod-descripcion").value,
    imagen_url: document.getElementById("prod-imagen").value,
    precio_actual: aNumero(document.getElementById("prod-precio").value),
    precio_descuento: aNumero(document.getElementById("prod-descuento").value),
  };
  const datosSpec = {
    producto_id: id, // PK y FK, necesario para el upsert
    sistema_operativo_min: aTexto(document.getElementById("spec-so-min").value),
    sistema_operativo_rec: aTexto(document.getElementById("spec-so-rec").value),
    procesador_min: aTexto(document.getElementById("spec-cpu-min").value),
    procesador_rec: aTexto(document.getElementById("spec-cpu-rec").value),
    memoria_ram_gb_min: aNumero(document.getElementById("spec-ram-min").value),
    memoria_ram_gb_rec: aNumero(document.getElementById("spec-ram-rec").value),
    graficos_min: aTexto(document.getElementById("spec-gpu-min").value),
    graficos_rec: aTexto(document.getElementById("spec-gpu-rec").value),
    almacenamiento_gb_min: aNumero(
      document.getElementById("spec-disco-min").value,
    ),
    almacenamiento_gb_rec: aNumero(
      document.getElementById("spec-disco-rec").value,
    ),
  };

  if (datosProducto.titulo === "" || datosProducto.precio_actual === null) {
    alert("Faltan el título o el precio.");
    return false;
  }
  try {
    // UPDATE de producto
    const resProducto = await fetch(
      URL_BASE + "producto?producto_id=eq." + id,
      {
        method: "PATCH",
        headers: { ...headers, Prefer: "return=representation" },
        body: JSON.stringify(datosProducto),
      },
    );
    if (!resProducto.ok) {
      throw new Error(
        `producto ${resProducto.status}: ${await resProducto.text()}`,
      );
    }
    const actualizados = await resProducto.json();
    if (actualizados.length === 0) {
      throw new Error("No se actualizó nada en product");
    }

    // 2) UPSERT de especificacion_producto
    const resSpec = await fetch(URL_BASE + "especificacion_producto", {
      method: "POST",
      headers: {
        ...headers,
        Prefer: "resolution=merge-duplicates,return=representation",
      },
      body: JSON.stringify(datosSpec),
    });
    if (!resSpec.ok) {
      throw new Error(
        `especificacion_producto ${resSpec.status}: ${await resSpec.text()}`,
      );
    }
    // GENEROS: borro los actuales y inserto los elegidos
    const resBorrar = await fetch(
      URL_BASE + "producto_genero?producto_id=eq." + id,
      {
        method: "DELETE",
        headers,
      },
    );
    if (!resBorrar.ok) {
      throw new Error(
        `producto_genero (borrar) ${resBorrar.status}: ${await resBorrar.text()}`,
      );
    }

    if (generosSeleccionados.length > 0) {
      const filas = generosSeleccionados.map((g) => ({
        producto_id: id,
        genero_id: g.genero_id,
      }));
      const resGeneros = await fetch(URL_BASE + "producto_genero", {
        method: "POST",
        headers,
        body: JSON.stringify(filas),
      });
      if (!resGeneros.ok) {
        throw new Error(
          `producto_genero (insertar) ${resGeneros.status}: ${await resGeneros.text()}`,
        );
      }
    }

    return true;
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return false;
  }
}

async function cargarGeneros() {
  const url = URL_BASE + "genero?select=*";
  const res = await fetch(url, {
    headers: {
      apikey: API_KEY,
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  todosLosGeneros = await res.json();

  const datalist = document.getElementById("gen-lista");
  todosLosGeneros.forEach((g) => {
    const option = document.createElement("option");
    option.value = g.nombre;
    datalist.appendChild(option);
  });
}
//renderizo los chips de genero

function renderizarChips() {
  const contenedor = document.getElementById("gen-chips");
  contenedor.replaceChildren();

  generosSeleccionados.forEach((genero) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = genero.nombre;

    const quitar = document.createElement("button");
    quitar.type = "button";
    quitar.textContent = "×";
    quitar.setAttribute("aria-label", `Quitar ${genero.nombre}`);
    quitar.addEventListener("click", () => {
      generosSeleccionados = generosSeleccionados.filter(
        (x) => x.genero_id !== genero.genero_id,
      );
      renderizarChips();
    });

    chip.appendChild(quitar);
    contenedor.appendChild(chip);
  });
}

function obtenerPrecioFinal(producto) {
  // si hay descuento se paga precio_descuento, si no, precio_actual
  return producto.precio_descuento !== null
    ? producto.precio_descuento
    : producto.precio_actual;
}

function renderizar(lista) {
  // función para renderizar los juegos en el tbody de la tabla
  const tbody = document.getElementById("catalogo-lista");
  tbody.replaceChildren(); // vacío el tbody para que no se dupliquen las filas

  if (lista.length === 0) {
    console.warn("No hay productos para mostrar.");
    return;
  }

  lista.forEach(function (producto) {
    tbody.appendChild(crearFila(producto));
  });
}

function crearFila(producto) {
  // función para crear la fila (tr) de cada producto en la tabla
  const fila = document.createElement("tr");
  fila.id = producto.producto_id;

  // ---- Celda 1: imagen + título ----
  const tdProd = document.createElement("td");
  const divProd = document.createElement("div");
  divProd.className = "prod";

  const imagen = document.createElement("img");
  imagen.src = producto.imagen_url;
  imagen.alt = `Portada de ${producto.titulo}`;

  const spanTitulo = document.createElement("span");
  spanTitulo.textContent = producto.titulo;

  divProd.appendChild(imagen);
  divProd.appendChild(spanTitulo);
  tdProd.appendChild(divProd);

  // ---- Celda 2: generos (un span por género) ----
  const tdGeneros = document.createElement("td");
  const divGeneros = document.createElement("div");
  divGeneros.className = "generos";

  // producto_genero es un array de { genero: { nombre } }
  (producto.producto_genero || []).forEach((pg) => {
    const spanGenero = document.createElement("span");
    spanGenero.textContent = pg.genero.nombre;
    divGeneros.appendChild(spanGenero);
  });
  tdGeneros.appendChild(divGeneros);

  // ---- Celda 3: precio ----
  const tdPrecio = document.createElement("td");
  const precio = document.createElement("p");
  precio.className = "precio";

  const hayDescuento = producto.precio_descuento !== null;
  const strong = document.createElement("strong");
  strong.textContent = `$${obtenerPrecioFinal(producto)}`;
  precio.appendChild(strong);

  if (hayDescuento) {
    precio.append(" "); // espacio entre ambos precios
    const tachado = document.createElement("s");
    tachado.textContent = `$${producto.precio_actual}`;
    precio.appendChild(tachado);
  }
  tdPrecio.appendChild(precio);

  // ---- Celda 4: acciones ----
  const tdAcciones = document.createElement("td");
  const divAcciones = document.createElement("div");
  divAcciones.className = "acciones";

  const enlaceEditar = document.createElement("a");
  enlaceEditar.href = "#editor";
  enlaceEditar.setAttribute("aria-label", `Editar ${producto.titulo}`);
  enlaceEditar.textContent = "Editar";

  enlaceEditar.addEventListener("click", async function () {
    idProductoSeleccionado = producto.producto_id;
    const datos = await traerProductoPorId(producto.producto_id);
    actualizarBotones();
    if (!datos) {
      alert("No se pudo obtener el producto con ID:", producto.producto_id);
      return;
    }
    const spec = datos.especificacion_producto ?? {};
    document.getElementById("prod-titulo").value = datos.titulo;
    document.getElementById("prod-descripcion").value = datos.descripcion;
    document.getElementById("prod-precio").value = datos.precio_actual;
    document.getElementById("prod-descuento").value =
      datos.precio_descuento ?? "";
    document.getElementById("prod-imagen").value = datos.imagen_url;

    const portada = document.getElementById("prod-portadaEditor");
    if (!datos.imagen_url) {
      portada.src = "https://placehold.co/600x400?text=Portada";
    } else {
      portada.src = datos.imagen_url;
    }
    portada.alt = `Portada actual de ${datos.titulo}`;

    document.getElementById("spec-so-min").value =
      spec.sistema_operativo_min ?? "";
    document.getElementById("spec-so-rec").value =
      spec.sistema_operativo_rec ?? "";
    document.getElementById("spec-cpu-min").value = spec.procesador_min ?? "";
    document.getElementById("spec-cpu-rec").value = spec.procesador_rec ?? "";
    document.getElementById("spec-ram-min").value =
      spec.memoria_ram_gb_min ?? "";
    document.getElementById("spec-ram-rec").value =
      spec.memoria_ram_gb_rec ?? "";
    document.getElementById("spec-gpu-min").value = spec.graficos_min ?? "";
    document.getElementById("spec-gpu-rec").value = spec.graficos_rec ?? "";
    document.getElementById("spec-disco-rec").value =
      spec.almacenamiento_gb_rec ?? "";
    document.getElementById("spec-disco-min").value =
      spec.almacenamiento_gb_min ?? "";

    //logiva de los generos seleccionados, para que se muestren los chips de los generos del producto que se esta editando
    generosSeleccionados = (datos.producto_genero ?? []).map((pg) => ({
      genero_id: pg.genero_id,
      nombre: pg.genero.nombre,
    }));
    renderizarChips();
  });

  const enlaceEliminar = document.createElement("a");
  enlaceEliminar.href = "#";
  enlaceEliminar.className = "eliminar";
  enlaceEliminar.setAttribute("aria-label", `Eliminar ${producto.titulo}`);
  enlaceEliminar.textContent = "Eliminar";
  enlaceEliminar.addEventListener("click", function (evento) {
    evento.preventDefault();
    if (!confirm("¿Eliminar este producto?")) return;
    eliminarProducto(producto.producto_id, fila);
  });

  divAcciones.appendChild(enlaceEditar);
  divAcciones.appendChild(enlaceEliminar);
  tdAcciones.appendChild(divAcciones);

  // ---- Armado final de la fila ----
  fila.append(tdProd, tdGeneros, tdPrecio, tdAcciones);
  return fila;
}
function actualizarBotones() {
  const btnCrearProducto = document.getElementById("crearProducto");
  const btnGuardarCambios = document.getElementById("guardarCambios");

  if (idProductoSeleccionado === null) {
    // Modo Creación: Oculta y deshabilita "Guardar Cambios", muestra "Crear Producto"
    btnGuardarCambios.disabled = true;
    btnGuardarCambios.style.display = "none";

    btnCrearProducto.disabled = false;
    btnCrearProducto.style.display = "";
  } else {
    // Modo Edición: Muestra "Guardar Cambios", oculta "Crear Producto"
    btnGuardarCambios.disabled = false;
    btnGuardarCambios.style.display = "";

    btnCrearProducto.disabled = true;
    btnCrearProducto.style.display = "none";
  }
}
function obtenerDatosProducto() {
  const productoData = {
    producto: {
      titulo: document.getElementById("prod-titulo").value,
      descripcion: document.getElementById("prod-descripcion").value,
      imagen_url: document.getElementById("prod-imagen").value,
      precio_actual: parseFloat(document.getElementById("prod-precio").value),
      precio_descuento: document.getElementById("prod-descuento").value
        ? parseFloat(document.getElementById("prod-descuento").value)
        : null,
    },
    especificacion: {
      sistema_operativo_min: document.getElementById("spec-so-min").value,
      procesador_min: document.getElementById("spec-cpu-min").value,
      memoria_ram_gb_min: parseInt(
        document.getElementById("spec-ram-min").value,
      ),
      almacenamiento_gb_min: parseInt(
        document.getElementById("spec-disco-min").value,
      ),
      graficos_min: document.getElementById("spec-gpu-min").value,
      sistema_operativo_rec: document.getElementById("spec-so-rec").value,
      procesador_rec: document.getElementById("spec-cpu-rec").value,
      memoria_ram_gb_rec: parseInt(
        document.getElementById("spec-ram-rec").value,
      ),
      almacenamiento_gb_rec: parseInt(
        document.getElementById("spec-disco-rec").value,
      ),
      graficos_rec: document.getElementById("spec-gpu-rec").value,
    },
    generos: generosSeleccionados.map((g) => g.genero_id),
  };
  return productoData;
}

document
  .getElementById("guardarCambios")
  .addEventListener("click", async () => {
    const botonGuardar = document.getElementById("guardarCambios");
    botonGuardar.disabled = true; // lo desactivo mientras espera la respuesta
    botonGuardar.style.backgroundColor = "#9ca3af"; // opcional: cambio de color para indicar que está deshabilitado
    botonGuardar.textContent = "Guardando..."; // opcional: feedback visual
    try {
      const ok = await actualizarProducto(idProductoSeleccionado); // si se actualizó correctamente, vuelvo a traer los productos y renderizo la tabla
      if (ok) {
        productos = await traerProductoSupabase();
        renderizar(productos);
        alert("Los cambios se guardaron correctamente.");
      } else {
        alert("No se pudieron guardar los cambios.");
      }
    } finally {
      botonGuardar.disabled = false;
      botonGuardar.style.backgroundColor = ""; // string vacío = vuelve al color del CSS
      botonGuardar.textContent = "Guardar cambios";
    }
  });

document.getElementById("gen-input").addEventListener("change", (evento) => {
  const texto = evento.target.value.trim().toLowerCase();
  const encontrado = todosLosGeneros.find(
    (g) => g.nombre.toLowerCase() === texto,
  );
  const yaEsta = generosSeleccionados.some(
    (g) => g.genero_id === encontrado?.genero_id,
  );

  if (encontrado && !yaEsta) {
    generosSeleccionados.push(encontrado);
    renderizarChips();
  }
  evento.target.value = ""; // limpio el input
});

document.getElementById("btnDescartar").addEventListener("click", () => {
  idProductoSeleccionado = null;
  generosSeleccionados = [];
  renderizarChips(); // limpio los chips de géneros
  const portada = document.getElementById("prod-portadaEditor");
  portada.src = "https://placehold.co/600x400?text=Portada"; //Elimino la imagen de portada
  portada.alt = "Sin portada";
  actualizarBotones(); // actualizo el estado del botón al descartar
});

document.getElementById("crearProducto").addEventListener("click", async () => {
  if (!confirm("¿Crear un nuevo producto?")) return;
  const btnCrear = document.getElementById("crearProducto"); // deshabilito el botón mientras se procesa la creación
  btnCrear.disabled = true;
  const productoData = obtenerDatosProducto();
  btnCrear.style.backgroundColor = "#9ca3af"; // opcional: cambio de color para indicar que está deshabilitado
  btnCrear.textContent = "Guardando..."; // opcional: feedback visual

  try {
    //validadcion para que el precio con descuento sea menor al precio actual
    const { producto } = productoData;
    if (
      producto.precio_descuento !== null &&
      producto.precio_descuento >= producto.precio_actual
    ) {
      alert("El precio con descuento tiene que ser menor al precio actual.");
      return;
    }
    await crearNuevoProducto(productoData);
    alert("Producto creado correctamente.");
  } finally {
    btnCrear.disabled = false;
    btnCrear.style.backgroundColor = "";
    btnCrear.textContent = "Crear producto";
  }
});

document.getElementById("btn-nuevo").addEventListener("click", () => {
  document.getElementById("btnDescartar").click();
});


document.addEventListener("DOMContentLoaded", async () => {
  productos = await traerProductoSupabase();
  renderizar(productos);
  cargarGeneros();
  actualizarBotones(); // actualizo el estado del botón al cargar la página
});
