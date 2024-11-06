document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Previene la recarga de la página

    // Captura los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;

    // Enviar los datos a la API
    fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, correo, telefono })
    })
    .then(response => response.json())
    .then(data => {
        // Mostrar mensaje al usuario
        document.getElementById('message').textContent = data.message;

        // Limpiar el formulario
        document.getElementById('clienteForm').reset();

        // Actualizar la lista de clientes
        obtenerClientes();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Función para obtener la lista de clientes
function obtenerClientes() {
    fetch('http://localhost:3000/clientes')
    .then(response => response.json())
    .then(data => {
        const clientesList = document.getElementById('clientesList');
        clientesList.innerHTML = ''; // Limpiar la lista actual

        data.forEach(cliente => {
            const clienteItem = document.createElement('div');
            clienteItem.className = 'cliente';
            clienteItem.textContent = `${cliente.nombre} ${cliente.apellido} - ${cliente.correo} - ${cliente.telefono}`;
            clientesList.appendChild(clienteItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Llamar a obtenerClientes al cargar la página para mostrar clientes existentes
obtenerClientes();
