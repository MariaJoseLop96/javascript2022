class Producto {
    // Constructor de la clase Producto, recibe como parámetros un identificador del juego, el nombre, el precio y la ruta de la imagen en el repositorio "./assets/imagenes"
	constructor(id, nombre, precio, imagen) {
		this.id = parseInt(id);
		this.nombre = nombre;
		this.precio = parseFloat(precio);
		this.imagen = imagen;
	}

    // Declaración del método estático para la conversión de Objeto a Producto posterior a la recuperación del LocalStorage
    static crearProducto(objeto) {
        return new Producto(objeto.id, objeto.nombre, objeto.precio, objeto.imagen);
    }
}

// Creación de los arreglos para la operación de la página
const productosCatalogo = [];
const productosCarrito = [];

// Adición de los juegos del catálogo al arreglo de productosCatálogo
productosCatalogo.push(
	new Producto(
		1,
		"God of war 1",
		"3500",
		"./assets/imagenes/godofwar1n.jpg"
	)
);
productosCatalogo.push(
	new Producto(
		2,
		"God of war 2",
		"3700",
		"./assets/imagenes/godofwar2n.jpg"
	)
);
productosCatalogo.push(
	new Producto(
		3,
		"God of war 3",
		"4000",
		"./assets/imagenes/godofwar3n.jpg"
	)
);
productosCatalogo.push(
	new Producto(
		4,
		"God of war 4",
		"8000",
		"./assets/imagenes/godofwar4n.jpg"
	)
);

// Carga en el LocalStorage del catálogo de productos
localStorage.setItem("catalogo", JSON.stringify(productosCatalogo));

/*
let catalogo = "";
let deseaContinuar = true; 
let totalCarrito = 0;

function solicitarEntrada() {
    let producto = prompt(catalogo + "ingrese el numero del producto 1- 2 -3 -4")
    // El -1 corresponde a un tema con la posición del Array:
    let productoAPushear = productosCatalogo[producto - 1];
    productosCarrito.push(productoAPushear);
}

for (let i = 0; i < productosCatalogo.length; i++) {
    let producto = productosCatalogo[i];
    catalogo = catalogo + producto.id + ") " + producto.nombre + " " + producto.precio + " ARS\n";
}

catalogo += "\n";

while(deseaContinuar) {
    solicitarEntrada();
    deseaContinuar = confirm("Desea agregar más productos al carrito?");
}
*/

// Asociación del objeto del DOM correspondiente a la sección de cards en el HTML
let card_productos = document.querySelector("#card_productos");

// Función que suma productos al carrito por medio del ID

function agregarCarrito(productoID) {
	Swal.fire({
		title: '¿Deseas agregar este producto al carrito?',
		showCancelButton: true,
		confirmButtonText: 'Agregar',
	  }).then((result) => {
		/* Read more about isConfirmed, isDenied below */
		if (result.isConfirmed) {
		  Swal.fire('Guardado!', '', 'success')
		  Toastify({
			text: "Producto agregado al carrito",
			duration: 3000,
			gravity: "top", // `top` or `bottom`
			position: "left", // `left`, `center` or `right`
			stopOnFocus: true, // Prevents dismissing of toast on hover
			style: {
			  background: "linear-gradient(to right, #00b09b, #96c93d)",
			}
		  }).showToast();
			
			// Búsqueda del producto seleccionado por medio del ID
			let productoBuscado = productosCatalogo.find(
				(producto) => producto.id == productoID
			);
			// Suma del producto al carrito
			productosCarrito.push(productoBuscado);
			// Actualización del arreglo del carrito en el LocalStorage
			localStorage.setItem("carrito", JSON.stringify(productosCarrito));
			// Suma de los productos en el carrito
			totalCarrito = totalCarrito + productoBuscado.precio;
		}
	})
}

// Función generadora de cards individuales para el catálogo y para el carrito
function carga_productos(producto) {
	let card = document.createElement("div");
	card.className = "card";
	card.innerHTML = `   
        <img src=${producto.imagen} alt="">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        <button onclick="agregarCarrito(${producto.id})">Comprar</button>`;

	//  <button onclick="agregarCarrito(${producto})">Comprar</button>

	card_productos.appendChild(card);
}

// Función que carga los elementos del catálogo en el index.html
function cargarCatalogo() {
    card_productos.innerHTML = ``;
    for (const producto of productosCatalogo) {
        carga_productos(producto);
    }
}

// Función que carga los elementos del carrito en el index.html
function cargarCarrito() {
    card_productos.innerHTML = ``;
    for (const producto of productosCarrito) {
        carga_productos(producto);
    }
}

// MAIN CODE:

// Asignación de la información de carrito almacenada en el LocalStorage
let previoCarrito = localStorage.getItem("carrito");

// Verificación de productos en el carrito de sesiones previas
if (previoCarrito) {
    // Conversión de la cadena almacenada en el LocalStorage de string a Objeto
    previoCarrito = JSON.parse(previoCarrito);
    for (const producto of previoCarrito) {
        // Conversión del Objeto a la clase producto y adición al arreglo de Carrito
        productosCarrito.push(Producto.crearProducto(producto));
    }
}

// console.log(previoCarrito);

// Configuración del evento para acceder al catálogo
let botonCatalogo = document.querySelector("#catalogo");
botonCatalogo.addEventListener("click", cargarCatalogo);

// Configuración del evento para acceder al carrito
let botonCarrito = document.querySelector("#carrito");
botonCarrito.addEventListener("click", cargarCarrito);


// alert("El total de su carrito es de: ARS $" + totalCarrito);

// if (producto == 1){
//     alert("eligio el god of war 1")
// }
// else if (producto == 2){
//     alert("eligio el god of war 2")
// }
// else if (producto == 3){
//     alert("eligio el god of war 3")
// }
// else if (producto == 4){
//     alert("eligio el god of war ")
// }
// else{
//     alert("ERROR, INGRESE PRODUCTO 1-2-3-4")
