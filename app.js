// SOLUCION DE LABORATORIO 1
// INVENTARIO 1

let productos = [
    { nombre: "Mouse", precio: 40, stock: 25 },
    { nombre: "Teclado", precio: 70, stock: 0 },
    { nombre: "Monitor", precio: 450, stock: 8 },
    { nombre: "Laptop Lenovo", precio: 2000, stock: 5 },
    { nombre: "USB", precio: 30, stock: 50 },
    { nombre: "Audifonos", precio: 120, stock: 12 }
];

const listaProductos = document.getElementById("lista-productos");
const totalInventario = document.getElementById("total-inventario");
const campoNombreProducto = document.getElementById("nombre-producto");
const btnAumentar = document.getElementById("btn-aumentar");
const mensajeInventario = document.getElementById("mensaje-inventario");

// Funcion para mostrar inventario
function mostrarInventario() {

    // FILTER: filtrar productos disponibles con precio menor a 500
    const disponibles = productos.filter(function(p) {
        return p.stock > 0 && p.precio < 500;
    });

    // MAP: convertir productos en elementos HTML
    const filas = disponibles.map(function(p) {
        return "<li><span>" + p.nombre +
        " (S/ " + p.precio + ")</span>" +
        "<span>Stock: " + p.stock + "</span></li>";
    });

    // JOIN: unir todos los elementos
    listaProductos.innerHTML = filas.join("");

    // REDUCE: calcular el valor total del inventario
    const total = disponibles.reduce(function(acumulado, p) {
        return acumulado + p.precio * p.stock;
    }, 0);

    totalInventario.textContent = "S/ " + total;
}

// Funcion para aumentar el stock
function aumentarStock(nombre) {

    // Validar campo vacio
    if (nombre === "") {
        mensajeInventario.textContent = "Ingresa un nombre de producto";
        mensajeInventario.className = "mensaje error";
        return;
    }

    // FIND: buscar producto por nombre
    const producto = productos.find(function(p) {
        return p.nombre.toLowerCase() === nombre.toLowerCase();
    });

    // Verificar si existe
    if (producto === undefined) {
        mensajeInventario.textContent = "No existe el producto " + nombre;
        mensajeInventario.className = "mensaje error";
        return;
    }

    // Aumentar stock en 10
    producto.stock = producto.stock + 10;

    mensajeInventario.textContent =
        producto.nombre + " ahora tiene stock: " + producto.stock;

    mensajeInventario.className = "mensaje exito";

    // Actualizar inventario
    mostrarInventario();
}

// Evento del boton
btnAumentar.addEventListener("click", function() {

    aumentarStock(campoNombreProducto.value.trim());

    campoNombreProducto.value = "";
});

// Mostrar inventario al iniciar
mostrarInventario();


// SOLUCION DE LABORATORIO 2
// EDITOR DE PERFILES

const campoNombre = document.getElementById("nombre");
const campoCorreo = document.getElementById("correo");
const campoEdad = document.getElementById("edad");
const btnGuardar = document.getElementById("btn-guardar");
const mensajePerfil = document.getElementById("mensaje-perfil");
const contenedorPerfiles = document.getElementById("contenedor-perfiles");

// Crear una tarjeta visual con los datos del perfil
function crearTarjetaPerfil(nombre, correo, edad) {

    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    const titulo = document.createElement("h3");
    titulo.textContent = nombre;

    const parrafoCorreo = document.createElement("p");
    parrafoCorreo.textContent = "Correo: " + correo;

    const parrafoEdad = document.createElement("p");
    parrafoEdad.textContent = "Edad: " + edad + " años";

    // Agregar elementos a la tarjeta
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(parrafoCorreo);
    tarjeta.appendChild(parrafoEdad);

    contenedorPerfiles.appendChild(tarjeta);
}

// Mostrar mensaje de error
function mostrarError(texto) {

    mensajePerfil.textContent = texto;

    mensajePerfil.classList.remove("exito");
    mensajePerfil.classList.add("error");

    btnGuardar.setAttribute("data-estado", "normal");
    btnGuardar.textContent = "Guardar";
}

// Evento del boton guardar
btnGuardar.addEventListener("click", function() {

    // Leer datos y quitar espacios sobrantes
    const nombre = campoNombre.value.trim();
    const correo = campoCorreo.value.trim();
    const edad = campoEdad.value.trim();

    // Validacion 1: ningun campo debe estar vacio
    if (nombre === "" || correo === "" || edad === "") {
        mostrarError("Completa todos los campos antes de guardar...");
        return;
    }

    // Validacion 2: comprobar que la edad sea un numero mayor a 0
    if (isNaN(Number(edad)) || Number(edad) <= 0) {
        mostrarError("Ingresa una edad valida mayor a 0");
        return;
    }

    // Crear tarjeta del perfil
    crearTarjetaPerfil(nombre, correo, edad);

    mensajePerfil.textContent = "Perfil guardado correctamente";

    mensajePerfil.classList.remove("error");
    mensajePerfil.classList.add("exito");

    btnGuardar.setAttribute("data-estado", "guardado");
    btnGuardar.textContent = "Guardado";

    // Limpiar campos
    campoNombre.value = "";
    campoCorreo.value = "";
    campoEdad.value = "";

});

// Funcion para reiniciar el boton
function reiniciarBoton() {

    // Consultar el estado actual del boton
    if (btnGuardar.getAttribute("data-estado") === "guardado") {

        btnGuardar.setAttribute("data-estado", "normal");
        btnGuardar.textContent = "Guardar";
    }

    mensajePerfil.classList.remove("error");
    mensajePerfil.textContent = "";
}

// Detectar cuando el usuario escribe
campoNombre.addEventListener("input", reiniciarBoton);
campoCorreo.addEventListener("input", reiniciarBoton);
campoEdad.addEventListener("input", reiniciarBoton);
