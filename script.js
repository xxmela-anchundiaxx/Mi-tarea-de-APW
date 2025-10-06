const formulario = document.getElementById('formulario');
const mensaje = document.getElementById('mensaje');
const clientesList = document.getElementById('clientesList');
const totalClientes = document.getElementById('totalClientes');
const clientesHoy = document.getElementById('clientesHoy');

let clientes = [];

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const cedula = document.getElementById('cedula').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    if (!nombre || !apellido || !cedula || !email || !telefono) {
        mensaje.textContent = 'Por favor, complete todos los campos';
        mensaje.style.color = 'red';
        return;
    }

    const cliente = {
        nombre,
        apellido,
        cedula,
        email,
        telefono,
        fecha: new Date().toLocaleDateString()
    };

    clientes.push(cliente);
    actualizarClientes();
    mensaje.textContent = 'Cliente registrado correctamente';
    mensaje.style.color = 'green';
    formulario.reset();
});

function actualizarClientes() {
    // Actualizar lista
    if (clientes.length === 0) {
        clientesList.innerHTML = '<p>🎯 ¡Comienza a registrar!</p>';
    } else {
        clientesList.innerHTML = '';
        clientes.forEach((c, index) => {
            const div = document.createElement('div');
            div.classList.add('client-item');
            div.innerHTML = `
                <strong>${c.nombre} ${c.apellido}</strong> <br>
                Cédula: ${c.cedula} <br>
                Email: ${c.email} <br>
                Tel: ${c.telefono}
            `;
            clientesList.appendChild(div);
        });
    }

    // Actualizar estadísticas
    totalClientes.textContent = clientes.length;

    const hoy = new Date().toLocaleDateString();
    const clientesDeHoy = clientes.filter(c => c.fecha === hoy).length;
    clientesHoy.textContent = clientesDeHoy;
}
