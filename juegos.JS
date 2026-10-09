const productos = [ //array con los productos

    {
        id: "ciberun",
        nombre: "Cyber Run",
        genero: "Acción · Shooter",
        precio: 12999,
        precioAnterior: 18999,
        imagen: "https://imgproxy.eneba.games/5Qy3D5WUFI4zk7rubIbuQI--Raklu07X3Bvab47vEYA/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9y/VXdNOXFyUUFMalQ5/U0EwVDl4cWxvZFhm/dDVJSU0yYUtpR0Q3/VHFNemhZLmpwZWc",
        link: "product.html"
    },
    {
        id: "verdantkingdom",
        nombre: "Verdant Kingdom",
        genero: "Aventura · RPG",
        precio: 15499,
        imagen: "https://imgproxy.eneba.games/m-PE1_SW28Jiy-AanJrZcxExxoR3l1GWmfkCclamtIE/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9L/RVhUeG84cll3LWl4/V2JZU1pvV2ltVjdp/S3JyVjZxUERsT0VF/T09sM3lrLmpwZw",
        link: "product.html"
    },
    {
        id: "spacelegion",
        nombre: "Space Legion",
        genero: "Estrategia · Sci-fi",
        precio: 9999,
        precioAnterior: 13499,
        imagen: "https://imgproxy.eneba.games/O-fcee_zwF9-snXxHf3kn7mY6UiIHuVVoY8dJGQ4-8U/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9l/eGx4aXJlbHd6cG9x/ZnRqOHBoZi5qcGc",
        link: "product.html"
    },
    {
        id: "hauntedmanor",
        nombre: "Haunted Manor",
        genero: "Terror · Survival",
        precio: 11299,
        imagen: "https://imgproxy.eneba.games/eobNNLmiDhHiKYsyhP1GV54d0ufYOFQwxe3EkfkqNoA/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9L/ZVl1VWdnLmpwZw",
        link: "product.html"
    },
    {
        id: "verdantkingdom",
        nombre: "Verdant Kingdom",
        genero: "Aventura · RPG",
        precio: 15499,
        imagen: "https://imgproxy.eneba.games/m-PE1_SW28Jiy-AanJrZcxExxoR3l1GWmfkCclamtIE/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9L/RVhUeG84cll3LWl4/V2JZU1pvV2ltVjdp/S3JyVjZxUERsT0VF/T09sM3lrLmpwZw",
        link: "product.html"
    },
    {
        id: "spacelegion",
        nombre: "Space Legion",
        genero: "Estrategia · Sci-fi",
        precio: 9999,
        precioAnterior: 13499,
        imagen: "https://imgproxy.eneba.games/O-fcee_zwF9-snXxHf3kn7mY6UiIHuVVoY8dJGQ4-8U/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9l/eGx4aXJlbHd6cG9x/ZnRqOHBoZi5qcGc",
        link: "product.html"
    },
    {
        id: "hauntedmanor",
        nombre: "Haunted Manor",
        genero: "Terror · Survival",
        precio: 11299,
        imagen: "https://imgproxy.eneba.games/eobNNLmiDhHiKYsyhP1GV54d0ufYOFQwxe3EkfkqNoA/rs:fit:300/ar:1/czM6Ly9wcm9kdWN0/cy5lbmViYS5nYW1l/cy9wcm9kdWN0cy9L/ZVl1VWdnLmpwZw",
        link: "product.html"
    },
    {
        id: "ironstrike",
        nombre: "Iron Strike",
        genero: "Acción · Shooter",
        precio: 13999,
        precioAnterior: 17999,
        imagen: "https://placehold.co/300x300?text=Iron+Strike",
        link: "product.html"
    },
    {
        id: "mysticvale",
        nombre: "Mystic Vale",
        genero: "Aventura · Fantasía",
        precio: 15999,
        precioAnterior: 19999,
        imagen: "https://placehold.co/300x300?text=Mystic+Vale",
        link: "product.html"
    },
    {
        id: "galaxyfrontier",
        nombre: "Galaxy Frontier",
        genero: "Sci-Fi · Exploración",
        precio: 12499,
        imagen: "https://placehold.co/300x300?text=Galaxy+Frontier",
    link: "product.html"
    },
    {
        id: "shadowprotocol",
        nombre: "Shadow Protocol",
        genero: "Sigilo · Acción",
        precio: 16999,
        precioAnterior: 21999,
        imagen: "https://placehold.co/300x300?text=Shadow+Protocol",
        link: "product.html"
    },
    {
        id: "dragonslegacy",
        nombre: "Dragon's Legacy",
        genero: "RPG · Fantasía",
        precio: 18499,
        precioAnterior: 24999,
        imagen: "https://placehold.co/300x300?text=Dragons+Legacy",
        link: "product.html"
    },
    {
        id: "neonracer",
        nombre: "Neon Racer",
        genero: "Carreras · Arcade",
        precio: 8999,
        imagen: "https://placehold.co/300x300?text=Neon+Racer",
        link: "product.html"
    },
    {
        id: "frostlands",
        nombre: "Frostlands",
        genero: "Supervivencia · Aventura",
        precio: 14999,
        precioAnterior: 18999,
        imagen: "https://placehold.co/300x300?text=Frostlands",
        link: "product.html"
    },
    {
        id: "battleforge",
        nombre: "Battle Forge",
        genero: "Estrategia · Guerra",
        precio: 10999,
        imagen: "https://placehold.co/300x300?text=Battle+Forge",
        link: "product.html"
        
    },
    {
        id: "abysswalker",
        nombre: "Abyss Walker",
        genero: "Terror · Acción",
        precio: 13499,
        precioAnterior: 16999,
        imagen: "https://placehold.co/300x300?text=Abyss+Walker",
        link: "product.html"
    },
    {
        id: "skyrealms",
        nombre: "Sky Realms",
        genero: "MMORPG · Fantasía",
        precio: 19999,
        precioAnterior: 25999,
        imagen: "https://placehold.co/300x300?text=Sky+Realms",
        link: "product.html"
    },
    {
        id: "mecharena",
        nombre: "Mech Arena",
        genero: "Acción · Robots",
        precio: 11999,
        imagen: "https://placehold.co/300x300?text=Mech+Arena",
        link: "product.html"
    },
    {
        id: "quantumbreach",
        nombre: "Quantum Breach",
        genero: "Shooter · Sci-Fi",
        precio: 14999,
        precioAnterior: 18999,
        imagen: "https://placehold.co/300x300?text=Quantum+Breach",
        link: "product.html"
    }


]


function crearTarjeta(producto){//funcion para crear la tarjeta de cada producto
    
    const articulo = document.createElement("article");
    articulo.className = "fila-juego";
    articulo.id = producto.id;

    const enlace = document.createElement("a");
    enlace.href = producto.link;
    enlace.ariaLabel = `Ver detalles de ${producto.nombre}`;

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = `Portada de ${producto.nombre}`;
    
    const div = document.createElement("div");
    div.className = "info-juego";

    const nombre = document.createElement("h3");
    nombre.className = "titulo";
    nombre.textContent = producto.nombre;

    const genero = document.createElement("p");
    genero.className = "genero";
    genero.textContent = producto.genero;

    const precio = document.createElement("p");
    precio.className = "precio";
    precio.innerHTML = `<strong>${producto.precio}</strong> ${producto.precioAnterior ? `<s>${producto.precioAnterior}</s>` : ""}`;

    articulo.appendChild(enlace);
    enlace.appendChild(imagen);
    enlace.appendChild(div);
    div.appendChild(nombre);
    div.appendChild(genero);
    div.appendChild(precio);    
    
    return articulo;
}
   


function renderizar(listaFiltrada){//funcion para renderizar los juegos en el contenedor

    const contenedor = document.getElementById("catalogo-lista");//agarro el contenedor donde van a ir los juegos y lo vacio
    contenedor.replaceChildren();//vacio el contenedor para que no se dupliquen los juegos al renderizar de nuevo
    listaFiltrada.forEach(function(producto)//recorro la lista filtrada y creo la tarjeta de cada producto
    {
    contenedor.appendChild(crearTarjeta(producto));//agrego la tarjeta al contenedor
    })
}
document.addEventListener("DOMContentLoaded", () => renderizar(productos)); //para que cuando se cargue la pagina se rendericen los juegos