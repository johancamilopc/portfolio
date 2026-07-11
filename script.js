window.addEventListener('load', () => {
    
    let msnry = null;

    // Detectar si el usuario está en un dispositivo móvil o tablet
    const isMobileOrTablet = window.innerWidth <= 768 || 
                             /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Solo activamos Masonry en pantallas grandes para evitar descuadres
    if (window.innerWidth > 768) {
        msnry = new Masonry('.grid', {
            itemSelector: '.grid-item',
            columnWidth: '.grid-item',
            percentPosition: true,
            gutter: 24
        });
    }

    // ELEMENTOS DEL MODAL
    const modal = document.getElementById('video-modal');
    const modalIframe = document.getElementById('modal-iframe');
    const closeModal = document.querySelector('.close-modal');
    const gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.getAttribute('data-video');
            
            // COMPORTAMIENTO HÍBRIDO SEGÚN EL DISPOSITIVO
            if (isMobileOrTablet) {
                // Si es celular o iPad, abrimos el link directo en pestaña nueva para saltar el bloqueo de Google
                window.open(videoSrc, '_blank');
            } else {
                // Si es computadora, abrimos el Modal elegante dentro de la página
                if (item.classList.contains('grid-item--vertical')) {
                    modal.classList.add('modal--vertical');
                } else {
                    modal.classList.remove('modal--vertical');
                }

                modal.style.display = 'flex';

                setTimeout(() => {
                    modalIframe.setAttribute('src', videoSrc);
                }, 100);
            }
        });
    });

    // Cerrar el modal (Solo aplica en PC)
    const closeAndStop = () => {
        modalIframe.setAttribute('src', '');
        modal.style.display = 'none';
    };

    closeModal.addEventListener('click', closeAndStop);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeAndStop();
    });
});