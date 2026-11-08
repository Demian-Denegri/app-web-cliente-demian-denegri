const SUPABASE_URL = "https://fptafmcghatrkypanrdp.supabase.co";
const API_KEY = "sb_publishable_qqmzggG7YHk7SgnyAV9p7w_B8NGNRjH";
document
  .getElementById("reg-boton")
  .addEventListener("click", function (event) {//tomo los valores al hacer click en el boton de registro
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    const usrName = document.getElementById("reg-nombre").value;
    const mail = document.getElementById("reg-email").value;
    const password = document.getElementById("reg-clave").value;
    const password2 = document.getElementById("reg-clave2").value;
    if (validarFormulario(password, password2)) {
      // Si el formulario es válido
      registrar(usrName, mail, password); // Llamar a la función de registro
    }
  });

function validarFormulario(password, password2) {//validacion que verifica que ambas contraseñas sean iguales
  if (password !== password2) {
    alert("Las contraseñas no coinciden");
    return false;
  }
  return true;
}

function registrar(userName, mail, password) {
  const url = `${SUPABASE_URL}/auth/v1/signup`;
  const options = {
    method: "POST",
    headers: {
      apikey: API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({//datos que le paso a la BD
      email: mail,
      password: password,
      data: { display_name: userName },
    }),
  };

  fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.json();
    })
    .then((data) => {
      alert("Cuenta creada.");
       window.location.href = "index.html"; // 
    })
    .catch((error) => {
      alert("No se pudo crear la cuenta.");
    });
}
