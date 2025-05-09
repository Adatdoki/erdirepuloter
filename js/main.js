document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Aktív menüelem beállítása
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-menu a');
    
    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            item.classList.add('active');
        }
    });
    
    // Gördülés animáció
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Mobilmenü bezárása görgetés után
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    document.body.classList.remove('menu-open');
                }
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const backgroundImageDiv = document.getElementById('background-image');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    // Alapértelmezett háttérkép beállítása
    backgroundImageDiv.style.backgroundImage = `url(${galleryItems[0].getAttribute('data-full')})`;

    // Háttérkép frissítése kattintásra
    galleryItems.forEach(img => {
        img.addEventListener('click', function() {
            const fullImgSrc = this.getAttribute('data-full');
            backgroundImageDiv.style.backgroundImage = `url(${fullImgSrc})`;
        });
    });
});
