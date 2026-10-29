const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}


const themeSwitch = document.getElementById('theme-switch');

if (themeSwitch) {
    const root = document.documentElement;
    const trigger = document.getElementById('theme-trigger');
    const menu = document.getElementById('theme-menu');
    const options = menu.querySelectorAll('[data-theme-value]');
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const getPref = () => root.getAttribute('data-theme-pref') || 'dark';

    function applyTheme(pref) {
        const dark = pref === 'dark' || (pref === 'system' && media.matches);
        root.setAttribute('data-theme', dark ? 'dark' : 'light');
        root.setAttribute('data-theme-pref', pref);
        options.forEach(o => o.setAttribute('aria-checked', String(o.dataset.themeValue === pref)));
    }

    function openMenu() {
        menu.hidden = false;
        trigger.setAttribute('aria-expanded', 'true');
    }

    function closeMenu(returnFocus = false) {
        menu.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        if (returnFocus) trigger.focus();
    }

    trigger.addEventListener('click', () => (menu.hidden ? openMenu() : closeMenu()));

    options.forEach(option => {
        option.addEventListener('click', () => {
            const pref = option.dataset.themeValue;
            try { localStorage.setItem('theme', pref); } catch (e) {}
            applyTheme(pref);
            closeMenu(true);
        });
    });

    document.addEventListener('click', e => {
        if (!themeSwitch.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && !menu.hidden) closeMenu(true);
    });

    // No modo "sistema", acompanha a mudança do SO em tempo real
    media.addEventListener('change', () => {
        if (getPref() === 'system') applyTheme('system');
    });

    applyTheme(getPref());
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

// --- 3. Alternador de Idioma (PT / EN) ---
const langToggle = document.getElementById('lang-toggle');
if (langToggle) {
    langToggle.addEventListener('click', () => {
        const currentPath = window.location.pathname;

        // 1. Limpa qualquer prefixo de idioma existente para isolar apenas o "slug/caminho puro"
        let purePath = currentPath
            .replace(/^\/en/, '')
            .replace(/^\/pt-br/, '');

        // Garante que o caminho comece com barra
        if (!purePath.startsWith('/')) {
            purePath = '/' + purePath;
        }

        // 2. Verifica se estamos indo para o Inglês ou para o Português
        const isCurrentlyEnglish = currentPath.startsWith('/en');

        if (isCurrentlyEnglish) {
            // --- Mudar de INGLÊS -> PORTUGUÊS ---
            let newPath = purePath;

            // Mapeia listagens e home
            if (newPath === '/projects.html') newPath = '/projects.html';
            if (newPath === '/articles.html') newPath = '/articles.html';
            if (newPath === '/' || newPath === '/index.html') newPath = '/index.html';

            // Mapeia artigos em inglês (/articles/...) para português com o prefixo exato (/pt-br/artigos/...)
            if (newPath.startsWith('/articles/')) {
                newPath = newPath.replace('/articles/', '/pt-br/articles/');
            }
            // Mapeia projetos para português (/projects/... -> /projetos/...)
            if (newPath.startsWith('/projects/')) {
                newPath = newPath.replace('/projects/', '/pt-br/projects/');
            }

            window.location.pathname = newPath;
        } else {
            // --- Mudar de PORTUGUÊS -> INGLÊS ---
            let newPath = purePath;

            // Mapeia listagens e home
            if (newPath === '/projetos.html') newPath = '/projects.html';
            if (newPath === '/artigos.html') newPath = '/articles.html';
            if (newPath === '/' || newPath === '/index.html') newPath = '/index.html';

            // Mapeia artigos em português com /pt-br/ para o inglês limpo (/articles/...)
            if (newPath.startsWith('/pt-br/artigos/')) {
                newPath = newPath.replace('/pt-br/artigos/', '/articles/');
            }
            // Caso tenha ficado algum /artigos/ sem o pt-br
            if (newPath.startsWith('/artigos/')) {
                newPath = newPath.replace('/artigos/', '/articles/');
            }
            // Mapeia projetos para inglês (/projetos/... -> /projects/...)
            if (newPath.startsWith('/projetos/')) {
                newPath = newPath.replace('/projetos/', '/projects/');
            }

            // Se for a home ou página padrão, direciona para /en/index.html
            if (newPath === '/' || newPath === '/index.html') {
                newPath = '/en/index.html';
            } else {
                // Adiciona o /en/ na frente de qualquer outra rota em inglês
                newPath = '/en' + newPath;
            }

            window.location.pathname = newPath;
        }
    });
}