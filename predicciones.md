1. (primer prediccion).

PREDICCIONES

INSTRUCCIONES PARA LA CUNSTRUCCION (prompt):

Actua como un desarollador Senior especializado en el dessarollo Front-end, por el momento solo tenes permitido utilizar erstructuras semanticas de HTML, no podes utilizar nada fuera de lo indicado. vas a estar trabajando en el desarrollo del Front-end de una pagina tipo e-commers dedicada a la venta de videojuegos digitales principalmente, buscas que la pagina sea amigable con el usuario y facil de utilizar para usuarios nuevos, la pagina tiene que ser escalable a largo plazo.



Se va a armar el esqueleto semantico del index.html que ontendra lo siguiente por el momento:

A. Navbar de navegación

Botón para acceder al carrito.

Botón dentro de la nav que lleve a la sección de la biblioteca del usuario.

Barra de busqueda(punto 3).

boton que lleve a la seccion para crear una cuneta/loggear

B. Carusel inicial

Primer elemento al ingresar a la pagina.

Muestra algunos juegos relevantes que estén a la venta en ese momento.

C. Barra de búsqueda

Facilita encontrar los títulos.

Junto a la barra habrá una opción para ordenar/filtrar los juegos por:

-Precio

-Relevancia

-Genero

D. Catalogo de productos

Presets genéricos de productos a la venta para ejemplificación visual.

Cada juego contará con opción para dejar una reseña visible para todas las personas.

E. Sistema de reseñas y cuentas

Al ingresar habrá la opción de crear una cuenta como primer paso.

Solo con cuenta se podrá realizar reseñas o compras dentro de la página.

-------------------------------------------------------------------------------------
2 (Segunda prediccion).

Separacion en secciones correspondientes de los HTML.
- Se crearon algunos de los archivos HTML faltantes.

Se va a realizar el traslado correspondiente de los elemetos dentro del index.html a su respectiva seccion

INSTRUCCIONES PARA LA CUNSTRUCCION (prompt):

Actua como un desarollador Senior especializado en el dessarollo Front-end, por el momento solo tenes permitido utilizar erstructuras semanticas de HTML, no podes utilizar nada fuera de lo indicado. vas a estar trabajando en el desarrollo del Front-end de una pagina tipo e-commers dedicada a la venta de videojuegos digitales principalmente, buscas que la pagina sea amigable con el usuario y facil de utilizar para usuarios nuevos, la pagina tiene que ser escalable a largo plazo.

Tus tareas actuales son las siguientes:

A. Eliminar los botones de agregar al carrito de los productos en el index.html, estos se van a reemplazar por cads que contengan una imagen/portada del juego, debajo el titulo/nombre de dicho juego y el precio del mismo, ademas vas a mover todas las especificaciones y reseñas del juego a el archivo product.html, en este archivo se va a encontrar la pagina principal donde se podra realizar la compra del juego seleccionado y se podran ver mas detalles del juego como las reseñas, las especificacione y el genero.

B.en el index.html se encuentra un login/register, taslada solo el register a el archivo register.html, el login queda en el index.html y junto a este se va a enconrar un button para registrar una cuenta en caso de no tenerla, este button llevara al register.html para posteriormente realizar el registro.

--------------------------------------------------------------------------------------
3 (Terceca prediccion).
se va a crear el style.css para aplicarle estilos a todas las secciones de la web, la palata de colores se va a centrar en:

Fondo principal	#0A0A0A (sujeto a cambios)
Texto #FFFFFF(sujeto a cambios)
Acento principal (botones, links)	Azul eléctrico	#00A0D7(sujeto a cambios)
Éxito / Confirmación #92D709(sujeto a cambios)
Error / Alerta	Rojo intenso #E55F5F(sujeto a cambios)

los estilos van a tener estetica minimalista y moderna.

INSTRUCCIONES PARA LA CUNSTRUCCION (prompt):

Actua como un desarollador y diseñador UX/UI Senior especializado en el dessarollo Front-end, por el momento solo tenes permitido utilizar CSS baico, no podes utilizar nada fuera de lo indicado. vas a estar trabajando en el desarrollo del Front-end de una pagina tipo e-commers dedicada a la venta de videojuegos digitales principalmente, buscas que la pagina sea amigable con el usuario y facil de utilizar para usuarios nuevos, la pagina tiene que ser escalable a largo plazo.
La estetica de la pagina es minimalista y moderna.

Por el momento se van a utilizar los siguientes colores:

Fondo principal	#0A0A0A (sujeto a cambios)
Texto #FFFFFF(sujeto a cambios)
Acento principal (botones, links)	Azul eléctrico	#00A0D7(sujeto a cambios)
Éxito / Confirmación #92D709(sujeto a cambios)
Error / Alerta	Rojo intenso #E55F5F(sujeto a cambios)

Tipografias (importadas desde fonts.google.com)

Navbar / Títulos: Orbitron
Botones de acción: Audiowide
Textos secundarios: Press Start 2P 
Descripciones de producto: Rajdhani

Aplica el atributo scroll-behavior al html.

la navbar va a ser visible todo el tiempo dentro de esta se va a encontar el menu de hamburgresa de cuenta tambien se podra ver el logo de la pagina, reemplaza la ul que contiene carrito y mi bliblioteca y colocales los iconos correspondientes(en el caso del carrito un carrito de compras y en el de mi biblioteca un libro), tanbien se va a encontar la barra de busquedas(podes eliminar el boton de buscar de dicha barra), va a contar con un efecto de difuminado que deje ver levemente el contenido detras de la misma,
debajo de esta se va a encontrar el carrusel exponiendo algunos de los articulos.

Respecto al catalogo:
Cada producto debe mostrarse en una fila horizontal que ocupe todo el ancho disponible, con la siguiente estructura: 
- Imagen del juego a la izquierda. 
- Al lado derecho, título del juego.
- Debajo del titulo, una breve descripción o etiquetas de género.

Footer:
por el momento dejalo como esta.
-------------------------------------------------------------------------------------
4 (prediccion). se va a realizara una organizacion y separacion del css para mayor organizacion a futuro.

PROMPT:

Se debe realizar la separación de los archivos CSS actuales.
Crear un archivo base.css que contenga la configuración predeterminada de la página, incluyendo:

Variables, Reset, Tipografías, Botones, Navbar completo,Estilos de precio (reutilizables) y Footer.
Este archivo se cargará en todas las páginas.

El archivo index.css contendrá únicamente las clases específicas de la estructura del index.html, es decir, aquellas que no forman parte de la configuración general.
--------------------------------
RESUMEN DE LO REALIZADO:

product.css: Cree una hoja de estilos para product.html con solo lo que esa pagina usa (variables, navbar, botones, precio, footer), dejando de lado carrusel y catálogo.

- Se separo en capas el css:

base.css: lo compartido (variables, reset, navbar, botones, precio, footer)(ACA VA LO QUE SE REUTILIZA TODO EL TIEMPO, 
EL ESQUELETO DE LA PAGINA)

index.css: los añadidos necesarios para el index

product.css:los añadidos necesarios para product.css(actualmente vacio)

Cada pagina de ahora en adelante va a cargar base.css y un css especifico suyo si es necesario,
esta organizacion se me ocurrio conversando con la IA sobre como se podria hacer para que todo lo relacionado
con los estilos este mas organizado, de esta manera no se va a armar un choclo de montones de lineas de codigo en un unico css.
y creando un css solo con lo necesario especificamente para cada seccion de la web(base.css + css de la web especifica)

- Eliminacion de style.css, se dejo de usar y se elimino

- Carpeta css, creee una carpeta llamada CSS y coloque en ella todos los css para una mayor organizacion.
-------------------------------------------------------------------------------------
5 (prediccion) se va a configurar los estilos y el contenido de la pagina de productos(product.css , product.html),
se espera conseguir un resultado similar al planteado en el siguente boceto:
(https://www.figma.com/design/KV4xRltOhYx1fjkxcsrw6W/Dise%C3%B1o-web-E-commerce?node-id=0-1&t=4vz7EEDJKPyjxHme-1)

PROMPT:
Rol: Actuá como desarrollador/diseñador UX/UI Senior especializado en Front-end, utilizando css basico.


Tarea: Aplicar el siguiente layout a product.html, creando las clases necesarias en 
product.css.

- Header del producto

   Imagen de portada: arriba a la izquierda, con margin respecto al nav y al borde 
   de la pantalla (usá el espaciado estándar que ya se usa en el resto del proyecto).

   A la derecha de la imagen: título del juego (clase existente para texto/títulos).

   Debajo del título: precio, con la clase `.precio`.

   Debajo del precio, con margin de separación: descripción del juego.

   Debajo de la descripción: etiquetas del juego (ej. Acción, Carreras, Multijugador)

- Botones de acción

   Debajo de la imagen de portada, alineados con su ancho: dos botones en la misma 
   fila. Izquierda: "Agregar al carrito". Derecha: "Comprar ahora".

- Especificaciones

    Centrado, debajo de todo el bloque anterior: título "Especificaciones".
    Debajo, dos columnas:

    Izquierda: título "Requisitos mínimos" + un recuadro con el color de acento 
    auxiliar, texto en color de fondo, contenido en formato lista.

    Derecha: mismo formato, título "Recomendados".

- Juegos relacionados

    Debajo de especificaciones: 4 cards iguales a las del carrusel de index.html.

- Reseñas

    Sección "Publicar reseña" tal como está actualmente (no modificar).

    Debajo, listado de reseñas de usuario, cada una con:

    Nombre de usuario

    Debajo, puntaje

    Debajo, un recuadro con color de acento auxiliar, con el texto de la reseña 
    en color de fondo como color de letra.

- Footer: dejar como está actualmente, sin modificaciones.

-------------------------------------------------------------------------------------
6 (prediccion) se van a configurar los estilos de register.css

PROMPT:

Vas a trabajar sobre la pagina de register (register.html), utilizando las clases ya creadas de base.css y creando las clases 
necesarias en el register.css. Antes de escribir codigo, revisa base.css 
y los archivos ya existentes para reusar variables de espaciado y color.

utilisa como criterio CSS basico como en el resto del proyecto.

- Contenedor
   En el centro de la pagina: un rectangulo vertical con el color de acento-auxiliar.

-Título
   Dentro del rectangulo, en la parte superior, centrado: título "Crear cuenta".

- Formulario
    Debajo del título, alineado a la izquierda dentro del rectangulo:

    Subtítulo "Nombre de usuario" + su input debajo.
    Debajo: subtítulo "Correo electronico" + su input debajo.
    Debajo: subtítulo "Contraseña" + su input debajo.
    Debajo: subtítulo "Confirmar contraseña" + su input debajo.

Los inputs deben ocupar el mismo ancho (todo el ancho disponible 
del rectángulo, con el padding/margin lateral que ya use en el proyecto).

- Botones
    Debajo de todo el formulario, centrado: botón de color acento con texto 
    "Crear cuenta".
    Debajo de este: botón con fondo transparente y borde de color acento, con 
    texto "Iniciar sesión".

-------------------------------------------------------------------------------------

7 (prediccion)

- Se van a realizar correcciones en la nabvar para que esta sea responsive
- Se van a reemplazas los iconos tipo svg por iconos importados desde"https://fonts.google.com/icons".
- se van a editar los botones.

-------------------------------------------------------------------------------------
8 (prediccion)

se va a modificar el layout de index.html.

PROMPT:
tu tarea es cambiar el layout de la seccion catalogo a un grid de dos columnas: la navbar  y el carrusel quedan como estan, arriba, ocupando todo el ancho. debajo, usa CSS Grid con grid-template-columns para dividir en sidebar (250px fija) + contenido. En la sidebar va el .filtros (buscador del catalogo + el select de orden). En la columna derecha va .catalogo-lista, que a su vez tiene que ser un grid interno con varias columnas (auto-fill, minmax de aprox 220px) para que las .fila-juego se acomoden solas segun el ancho. En mobile quiero que la sidebar se apile arriba del contenido, ocupando el 100% del ancho.