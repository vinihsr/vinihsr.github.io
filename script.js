const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}


const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

if (themeToggle) {
    const currentTheme = htmlElement.getAttribute('data-theme');
    updateToggleButton(currentTheme);

    themeToggle.addEventListener('click', () => {
        const activeTheme = htmlElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateToggleButton(newTheme);
    });
}

function updateToggleButton(theme) {
    if (!themeToggle) return;
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        alert(`Obrigado pelo contato, ${name}! Mensagem enviada com sucesso.`);
        contactForm.reset();
    });
}


const contactLinks = document.querySelectorAll('.contact-item[href]');

contactLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault(); 
            
            const url = link.getAttribute('href');
            const isBlank = link.getAttribute('target') === '_blank';
            
            const userConfirmed = confirm("Você está saindo do portfólio e será redirecionado para um app ou site externo. Deseja continuar?");
            
            if (userConfirmed) {
                if (isBlank) {
                    window.open(url, '_blank'); 
                } else {
                    window.location.href = url; 
                }
            }
        }
    });
}); 

document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', async () => {
        const codeBlock = button.nextElementSibling.querySelector('code');
        const textToCopy = codeBlock.innerText;

        try {
            await navigator.clipboard.writeText(textToCopy);
            
            const originalText = button.innerText;
            button.innerText = 'Copiado!';
            
            setTimeout(() => {
                button.innerText = originalText;
            }, 2000); 
        } catch (err) {
            console.error('Falha ao copiar o texto: ', err);
            button.innerText = 'Erro';
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("zoomed-image");
    const closeBtn = document.querySelector(".close-modal");

    const images = document.querySelectorAll(".zoomable");

    if (images.length > 0 && modal) {
        
        images.forEach(function(img) {
            img.onclick = function() {
                modal.style.display = "flex"; 
                modalImg.src = this.src;
            }
        });

        closeBtn.onclick = function() { 
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
        
        document.addEventListener('keydown', function(event) {
            if (event.key === "Escape" && modal.style.display === "flex") {
                modal.style.display = "none";
            }
        });
    }
});