let currentIndex = 0;
const images = document.querySelectorAll('.gallery img');
const modal = document.getElementById('myModal');
const modalImg = document.getElementById('modalImg');
const body = document.body;

// Funktion zum Öffnen des Modals
function openModal(index) {
    currentIndex = index;
    modal.style.display = "flex";
    setTimeout(() => { modal.classList.add("show"); }, 10);
    modalImg.src = images[currentIndex].src;
    body.style.overflow = "hidden"; // Scrollen unterbinden
}

// Funktion zum Schließen des Modals
function closeModal() {
    modal.classList.remove("show");
    setTimeout(() => { modal.style.display = "none"; }, 300);
    body.style.overflow = "auto"; // Scrollen wieder aktivieren
}

// Funktion zum Schließen des Modals, wenn außerhalb des Bildes geklickt wird
function closeModalOnClick(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// Funktion zum Wechseln der Bilder im Modal
function changeImage(n) {
    currentIndex += n;
    if (currentIndex >= images.length) currentIndex = 0;
    else if (currentIndex < 0) currentIndex = images.length - 1;
    modalImg.src = images[currentIndex].src;
}

// Event-Listener für das Scrollen im Modal
modal.addEventListener('wheel', function(event) {
    event.preventDefault(); // Verhindere das Standard-Scrollverhalten

    if (event.deltaY < 0) {
        // Nach oben scrollen -> vorheriges Bild
        changeImage(-1);
    } else if (event.deltaY > 0) {
        // Nach unten scrollen -> nächstes Bild
        changeImage(1);
    }
});

// Event-Listener für Tastatursteuerung
document.addEventListener("keydown", function(event) {
    if (modal.style.display === "flex") { 
        if (event.key === "ArrowRight") {
            changeImage(1); 
        } else if (event.key === "ArrowLeft") {
            changeImage(-1); 
        } else if (event.key === "Escape") {
            closeModal(); 
        }
    }
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');

if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('dark-mode', body.classList.contains('dark-mode'));
});

// Kopieren in die Zwischenablage
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Kopiert: ' + text);
    }).catch(() => {
        alert('Kopieren fehlgeschlagen. Bitte manuell kopieren: ' + text);
    });
}

// Smooth Scroll für interne Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});