document.addEventListener('DOMContentLoaded', () => {
    // --- Modo Escuro / Claro ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Função para aplicar o tema
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone de sol para indicar que está no modo escuro e pode ir para o claro
            }
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone de lua para indicar que está no modo claro e pode ir para o escuro
            }
        }
        localStorage.setItem('theme', theme); // Salva a preferência no localStorage
    }

    // Verifica a preferência do usuário ou o último estado salvo
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme); // Aplica o tema salvo se existir
    } else if (systemPrefersDark) {
        applyTheme('dark'); // Se o sistema preferir escuro, aplica escuro
    } else {
        applyTheme('light'); // Caso contrário, aplica claro por padrão
    }

    // Adiciona o event listener ao botão de toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                applyTheme('light'); // Se está no modo escuro, muda para claro
            } else {
                applyTheme('dark'); // Se está no modo claro, muda para escuro
            }
        });
    }

    // --- Menu Responsivo ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // --- Funcionalidade de Mock de Login/Cadastro (Apenas para demonstração visual) ---
    const loginForm = document.querySelector('form[action="#"]'); // Seleciona o formulário que aponta para '#'
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio real do formulário

            const formType = loginForm.closest('.auth-box').querySelector('h2').textContent;

            if (formType.includes('Entrar')) { // Verifica se é a página de "Entrar"
                alert('Login mockado! As credenciais não são verificadas. Redirecionando para a página inicial.');
                window.location.href = 'index.html'; // Redireciona para a home
            } else if (formType.includes('Cadastrar')) { // Verifica se é a página de "Cadastrar"
                alert('Cadastro mockado! Seus dados não são armazenados. Redirecionando para a página de login.');
                window.location.href = 'login.html'; // Redireciona para login após cadastro
            }
        });
    }

    // --- Mock de Adicionar à Minha Lista (apenas visual) ---
    // Verifica se o elemento existe antes de adicionar o listener
    const addToListBtnIcon = document.querySelector('.details-actions .btn-secondary i.fa-plus');
    if (addToListBtnIcon) {
        addToListBtnIcon.parentElement.addEventListener('click', () => {
            alert('Item adicionado à sua lista (funcionalidade mockada)!');
        });
    }

    // --- Mock de Assistir Agora (apenas visual) ---
    const watchNowBtn = document.querySelector('.btn-play'); // Seleciona o botão de play em qualquer lugar
    if (watchNowBtn) {
        watchNowBtn.addEventListener('click', () => {
            alert('Reprodução do vídeo (funcionalidade mockada)! Não há vídeo real para reproduzir.');
        });
    }

    // --- Mock de Compartilhar (apenas visual) ---
    const shareBtnIcon = document.querySelector('.details-actions .btn-secondary i.fa-share-alt');
    if (shareBtnIcon) {
        shareBtnIcon.parentElement.addEventListener('click', () => {
            alert('Funcionalidade de compartilhamento mockada! Imagine que você compartilhou este conteúdo.');
        });
    }
});