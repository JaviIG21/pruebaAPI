document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault();


    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;

    fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, correo, telefono })
    })
    .then(response => response.json())
    .then(data => {

        document.getElementById('message').textContent = data.message;

        document.getElementById('clienteForm').reset();

        obtenerClientes();
    })
    .catch(error => {
        console.error('Error:', error);
    });
});


function obtenerClientes() {
    fetch('http://localhost:3000/clientes')
    .then(response => response.json())
    .then(data => {
        const clientesList = document.getElementById('clientesList');
        clientesList.innerHTML = '';

        data.forEach(cliente => {
            const clienteItem = document.createElement('div');
            clienteItem.className = 'cliente';
            clienteItem.textContent = `${cliente.nombre} ${cliente.apellido} - ${cliente.correo} - ${cliente.telefono}`;
            clientesList.appendChild(clienteItem);
        });
    })
    .catch(error => console.error('Error:', error));
}

obtenerClientes();
