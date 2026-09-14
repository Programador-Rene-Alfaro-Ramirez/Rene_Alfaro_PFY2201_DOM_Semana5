/**
 * Lógica para la Semana 5: Manipulación del DOM, Eventos y Fetch API
 */

// 1. OBTENCIÓN DE DATOS CON FETCH API
async function cargarServicios() {
    try {
        const respuesta = await fetch('servicios.json');
        
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        
        const servicios = await respuesta.json();
        renderizarTarjetas(servicios);
    } catch (error) {
        console.error("Hubo un error cargando los datos:", error);
        document.getElementById('contenedor-servicios').innerHTML = "<p class='text-center text-danger'>No se pudieron cargar los servicios.</p>";
    }
}

// 2. MANIPULACIÓN DEL DOM (createElement y appendChild)
function renderizarTarjetas(servicios) {
    const contenedor = document.getElementById('contenedor-servicios');
    contenedor.innerHTML = ""; // Limpia el contenedor antes de agregar

    servicios.forEach(servicio => {
        // Crear columna
        const col = document.createElement('div');
        col.className = 'col-md-4';

        // Crear la tarjeta
        const card = document.createElement('div');
        card.className = 'card h-100 shadow-sm border-0 card-dinamica';

        // Crear imagen
        const img = document.createElement('img');
        img.src = servicio.imagen;
        img.className = 'card-img-top';
        img.alt = servicio.titulo;
        img.style.height = '200px';
        img.style.objectFit = 'cover';

        // Crear cuerpo de la tarjeta
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body text-center d-flex flex-column';

        // Crear título
        const titulo = document.createElement('h5');
        titulo.className = 'card-title text-custom-teal fw-bold';
        titulo.textContent = servicio.titulo;

        // Crear texto
        const texto = document.createElement('p');
        texto.className = 'card-text text-muted flex-grow-1';
        texto.textContent = servicio.descripcion;

        // Crear botón
        const boton = document.createElement('a');
        boton.href = '#contacto';
        boton.className = 'btn btn-custom-teal mt-3';
        boton.textContent = 'Saber más';

        // --- EVENTO 1: MOUSEOVER / MOUSEOUT ---
        // Genera interactividad al pasar el cursor sobre la tarjeta
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.05)';
            card.classList.add('shadow-lg');
        });
        
        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
            card.classList.remove('shadow-lg');
        });

        // Unir todos los elementos creados con appendChild
        cardBody.appendChild(titulo);
        cardBody.appendChild(texto);
        cardBody.appendChild(boton);

        card.appendChild(img);
        card.appendChild(cardBody);
        
        col.appendChild(card);
        contenedor.appendChild(col);
    });
}

// --- EVENTO 2: CLICK ---
// Evento para el botón de información adicional
function configurarEventoClick() {
    const btnInfo = document.getElementById('btn-info');
    if (btnInfo) {
        btnInfo.addEventListener('click', () => {
            alert("Recuerda que todas las evaluaciones y terapias están sujetas a evaluación inicial gratuita.");
        });
    }
}

// --- EVENTO 3: SUBMIT ---
// Evento para procesar el formulario sin recargar la página
function configurarEventoSubmit() {
    const formulario = document.getElementById('formulario-contacto');
    const alerta = document.getElementById('alerta-form');

    if (formulario) {
        formulario.addEventListener('submit', (evento) => {
            evento.preventDefault(); // Evita que la página recargue

            const nombre = document.getElementById('nombre').value;
            
            // Mostrar mensaje de éxito manipulando el DOM
            alerta.textContent = `¡Gracias ${nombre}! Tu solicitud ha sido enviada exitosamente.`;
            alerta.className = 'alert alert-success mt-3';
            alerta.classList.remove('d-none');

            // Limpiar formulario
            formulario.reset();

            // Ocultar la alerta después de 4 segundos
            setTimeout(() => {
                alerta.classList.add('d-none');
            }, 4000);
        });
    }
}

// 3. INICIALIZAR EL CÓDIGO
// Garantizamos que todo se ejecute solo cuando el HTML esté cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    cargarServicios();
    configurarEventoClick();
    configurarEventoSubmit();
});