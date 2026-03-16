import Swal from 'sweetalert2';
/**
 * Alerta general configurable
 * @param {string} title - El título de la alerta
 * @param {string} text - El mensaje detallado
 * @param {string} icon - 'success', 'error', 'warning', 'info'
 */

export const showAlert = (title, text, icon = 'info') => {
    Swal.fire({
        title : title,
        text : text,
        icon : icon,
        confirmButtonColor : '#3085d6',
        confirmButtonText : 'Aceptar',
        timer : icon === 'success' ? 2000 : null,
    });
}

