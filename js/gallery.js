// gallery.js
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxNext = document.querySelector('.lightbox-next');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    
    let currentIndex = 0;
    
    if (!galleryItems.length || !lightbox) return;
    
    // Lightbox megnyitása a képre kattintva
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            openLightbox(index);
        });
    });
    
    // Lightbox bezárása
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Lightbox bezárása ESC gombbal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
        
        // Léptetés nyilakkal
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowRight') {
                showNextImage();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            }
        }
    });
    
    // Kattintás a háttérre bezárja a lightboxot
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Következő kép
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNextImage);
    }
    
    // Előző kép
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrevImage);
    }
    
    // Lightbox megnyitása
    function openLightbox(index) {
        currentIndex = index;
        const currentItem = galleryItems[currentIndex];
        const imgSrc = currentItem.querySelector('img').getAttribute('data-full') || 
                       currentItem.querySelector('img').src;
        const caption = currentItem.querySelector('img').alt;
        
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Lightbox bezárása
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Következő kép mutatása
    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightboxContent();
    }
    
    // Előző kép mutatása
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxContent();
    }
    
    // Lightbox tartalom frissítése
    function updateLightboxContent() {
        const currentItem = galleryItems[currentIndex];
        const imgSrc = currentItem.querySelector('img').getAttribute('data-full') || 
                       currentItem.querySelector('img').src;
        const caption = currentItem.querySelector('img').alt;
        
        // Átmeneti animáció
        lightboxImg.style.opacity = 0;
        
        setTimeout(() => {
            lightboxImg.src = imgSrc;
            lightboxCaption.textContent = caption;
            lightboxImg.style.opacity = 1;
        }, 300);
    }
    
    // Galéria kategóriák
    const categoryButtons = document.querySelectorAll('.gallery-filter button');
    
    if (categoryButtons.length) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Aktív gomb beállítása
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Elemek szűrése
                galleryItems.forEach(item => {
                    if (category === 'all' || item.classList.contains(category)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});