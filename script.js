// Página 1: Comparar dos números con estructura if
const btnComparar = document.getElementById('btnComparar'); // Buscamos el botón de comparar
if (btnComparar) { // Verificamos que el botón exista
    btnComparar.addEventListener('click', () => { // Cuando hacemos clic, se ejecuta esta función
        const num1 = parseFloat(document.getElementById('num1').value); // Tomamos el primer número ingresado
        const num2 = parseFloat(document.getElementById('num2').value); // Tomamos el segundo número ingresado
        const resultado = document.getElementById('resultadoIf'); // Buscamos dónde mostrar el resultado

        if (num1 > num2) { // Si el primer número es mayor
            resultado.textContent = `El número mayor es ${num1}`; // Mostramos el primer número
        } else if (num1 < num2) { // Si el segundo número es mayor
            resultado.textContent = `El número mayor es ${num2}`; // Mostramos el segundo número
        } else { // Si son iguales
            resultado.textContent = 'Ambos números son iguales.'; // Mostramos que son iguales
        }
    });
}

// Página 2: Mostrar el mes correspondiente con estructura switch
const btnMostrarMes = document.getElementById('btnMostrarMes'); // Buscamos el botón para mostrar el mes
if (btnMostrarMes) { // Verificamos que el botón exista
    btnMostrarMes.addEventListener('click', () => { // Cuando hacemos clic, se ejecuta esta función
        const mes = parseInt(document.getElementById('mesInput').value); // Tomamos el número ingresado para el mes
        let nombreMes; // Aquí guardaremos el nombre del mes

        // Usamos un switch para determinar el mes correspondiente
        switch (mes) {
            case 1: nombreMes = 'Enero'; break;
            case 2: nombreMes = 'Febrero'; break;
            case 3: nombreMes = 'Marzo'; break;
            case 4: nombreMes = 'Abril'; break;
            case 5: nombreMes = 'Mayo'; break;
            case 6: nombreMes = 'Junio'; break;
            case 7: nombreMes = 'Julio'; break;
            case 8: nombreMes = 'Agosto'; break;
            case 9: nombreMes = 'Septiembre'; break;
            case 10: nombreMes = 'Octubre'; break;
            case 11: nombreMes = 'Noviembre'; break;
            case 12: nombreMes = 'Diciembre'; break;
            default: nombreMes = 'Número inválido'; break; // Si el número no está entre 1 y 12
        }

        alert(nombreMes); // Mostramos el mes o el mensaje de error
    });
}

// Página 2: Gestión de un array de nombres
const btnAgregarNombre = document.getElementById('btnAgregarNombre'); // Buscamos el botón para agregar nombres
if (btnAgregarNombre) { // Verificamos que el botón exista
    const nombres = []; // Creamos un array para guardar los nombres
    const listaNombres = document.getElementById('listaNombres'); // Buscamos dónde mostrar los nombres

    btnAgregarNombre.addEventListener('click', () => { // Cuando hacemos clic, se ejecuta esta función
        const nombre = document.getElementById('nombreInput').value.trim(); // Tomamos el nombre ingresado
        if (nombre) { // Si el nombre no está vacío
            nombres.push(nombre); // Lo agregamos al array
            actualizarListaNombres(); // Actualizamos la lista visual
            document.getElementById('nombreInput').value = ''; // Limpiamos el campo de entrada
        } else {
            alert('Por favor, ingresa un nombre válido.'); // Si está vacío, mostramos un mensaje
        }
    });

    const actualizarListaNombres = () => {
        listaNombres.innerHTML = ''; // Limpiamos la lista
        nombres.forEach((nombre, index) => { // Recorremos el array de nombres
            const item = document.createElement('li'); // Creamos un nuevo elemento de lista
            item.textContent = `${index + 1}. ${nombre}`; // Mostramos el nombre con su número
            listaNombres.appendChild(item); // Lo agregamos a la lista
        });
    };
}

// Página 3: Manejo del formulario de registro
const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || []; // Obtenemos los usuarios guardados o un array vacío
let usuarios = [...usuariosGuardados]; // Creamos una copia de los usuarios guardados

const formRegistro = document.getElementById('formRegistro'); // Buscamos el formulario
const tablaUsuarios = document.querySelector('#tablaUsuarios tbody'); // Seleccionamos el cuerpo de la tabla

// Guardar datos en LocalStorage
const guardarEnLocalStorage = () => {
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Guardamos el array de usuarios en LocalStorage
};

// Agregar usuario al registrar
if (formRegistro) { // Verificamos que el formulario exista
    formRegistro.addEventListener('submit', (e) => { // Cuando se envíe el formulario
        e.preventDefault(); // Evitamos que la página se recargue

        // Tomamos los valores de los campos del formulario
        const id = document.getElementById('id').value.trim();
        const cedula = document.getElementById('cedula').value.trim();
        const nombres = document.getElementById('nombres').value.trim();
        const fechaNacimiento = document.getElementById('fechaNacimiento').value.trim();
        const ciudad = document.getElementById('ciudad').value.trim();

        // Validamos que no haya campos vacíos
        if (!id || !cedula || !nombres || !fechaNacimiento || !ciudad) {
            alert("Todos los campos son obligatorios."); // Mostramos un mensaje si falta algo
            return;
        }

        const usuario = { id, cedula, nombres, fechaNacimiento, ciudad }; // Creamos un objeto usuario
        usuarios.push(usuario); // Lo agregamos al array
        guardarEnLocalStorage(); // Guardamos en LocalStorage
        actualizarTabla(); // Actualizamos la tabla
        formRegistro.reset(); // Limpiamos el formulario
    });
}

// Actualizar tabla con registros
const actualizarTabla = () => {
    tablaUsuarios.innerHTML = ''; // Limpiamos el contenido actual de la tabla

    usuarios.forEach((usuario, index) => { // Recorremos el array de usuarios
        const fila = document.createElement('tr'); // Creamos una nueva fila

        fila.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.cedula}</td>
            <td>${usuario.nombres}</td>
            <td>${usuario.fechaNacimiento}</td>
            <td>${usuario.ciudad}</td>
            <td>
                <button onclick="editarUsuario(${index})">Editar</button>
                <button onclick="eliminarUsuario(${index})">Eliminar</button>
            </td>
        `; // Agregamos las columnas con los datos del usuario

        tablaUsuarios.appendChild(fila); // Añadimos la fila a la tabla
    });
};

// Editar usuario
const editarUsuario = (index) => {
    const usuario = usuarios[index]; // Obtenemos el usuario seleccionado

    // Cargamos los datos del usuario en el formulario
    document.getElementById('id').value = usuario.id;
    document.getElementById('cedula').value = usuario.cedula;
    document.getElementById('nombres').value = usuario.nombres;
    document.getElementById('fechaNacimiento').value = usuario.fechaNacimiento;
    document.getElementById('ciudad').value = usuario.ciudad;

    usuarios.splice(index, 1); // Eliminamos temporalmente el usuario del array
    guardarEnLocalStorage(); // Actualizamos LocalStorage
    actualizarTabla(); // Actualizamos la tabla
};

// Eliminar usuario
const eliminarUsuario = (index) => {
    usuarios.splice(index, 1); // Quitamos el usuario del array
    guardarEnLocalStorage(); // Actualizamos LocalStorage
    actualizarTabla(); // Actualizamos la tabla
};

// Filtrar resultados por nombre
const filtrarResultados = () => {
    const filtro = document.getElementById('buscar').value.toLowerCase(); // Tomamos el texto de búsqueda
    const filas = tablaUsuarios.getElementsByTagName('tr'); // Obtenemos todas las filas de la tabla

    Array.from(filas).forEach((fila) => { // Recorremos las filas
        const nombre = fila.getElementsByTagName('td')[2]?.textContent.toLowerCase(); // Tomamos el nombre de cada fila
        fila.style.display = nombre.includes(filtro) ? '' : 'none'; // Mostramos u ocultamos según el filtro
    });
};

// Inicializar tabla al cargar la página
if (tablaUsuarios) {
    actualizarTabla(); // Cargamos los datos en la tabla al inicio
}



