document.addEventListener('DOMContentLoaded', () => {
    // --- Modo Escuro / Claro ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        }
        localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemPrefersDark) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            if (body.classList.contains('dark-mode')) {
                applyTheme('light');
            } else {
                applyTheme('dark');
            }
        });
    }

    // --- Menu Responsivo ---
    const logoMenuButton = document.querySelector('.logo');
    const mainNav = document.querySelector('.main-nav');

    if (logoMenuButton && mainNav) {
        logoMenuButton.addEventListener('click', (event) => {
            if (window.innerWidth <= 992) {
                event.preventDefault(); 
                mainNav.classList.toggle('active');
            }
        });
    }


    // --- Mock de Assistir Agora ---
    const formAssistir = document.getElementById('form-assistir');

    if (formAssistir) {
        formAssistir.addEventListener('submit', function(event) {
            event.preventDefault(); 
            alert('Você será direcionado a outra página e poderá soltar o play.');
            window.location.href = formAssistir.action; 
        });
    }

    // --- Mock de Compartilhar ---
    const shareBtnIcon = document.querySelector('.details-actions .btn-secondary i.fa-share-alt');
    if (shareBtnIcon) {
        shareBtnIcon.parentElement.addEventListener('click', () => {
            alert('Funcionalidade de compartilhamento mockada! Imagine que você compartilhou este conteúdo.');
        });
    }

    // --- Script de Adicionar a Lista --- //
    const container = document.querySelector(".minha-lista-container");

    function atualizarMinhaLista() {
        const lista = JSON.parse(localStorage.getItem("minhaLista")) || [];

        if (!container) return;

        if (lista.length === 0) {
            container.classList.add("vazia");
            container.innerHTML = `<p class="empty-state">Você ainda não adicionou nenhum item à sua lista. <a href="index.html">Explore agora!</a></p>`;
            return;
        } else {
            container.classList.remove("vazia");
        }

        let html = '';
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn) {
            alert('Você precisa estar logado para ver o item na sua lista.');
            window.location.href = 'login.html';
            return;
        }
        lista.forEach(item => {
            html += `
                <div class="content-card">
                  <a href="${item.detalhesUrl || '#'}">
                    <img src="${item.poster || 'default-poster.jpg'}" alt="Poster do Filme ${item.titulo || 'Título Indefinido'}">
                    <div class="card-info">
                      <h3>${item.titulo || 'Título Indefinido'}</h3>
                      <p>${item.ano || 'Ano Desconhecido'} • ${item.genero || 'Gênero Desconhecido'}</p>
                    </div>
                  </a>
                  <button class="btn-remover" data-id="${item.id}">Remover da Lista</button>
                </div>
            `;
        });

        container.innerHTML = html;

        container.querySelectorAll(".btn-remover").forEach(button => {
            button.addEventListener("click", (e) => {
                e.preventDefault();
                const id = button.getAttribute("data-id");
                removerDaLista(id);
            });
        });
    }

    function removerDaLista(id) {
        const lista = JSON.parse(localStorage.getItem("minhaLista")) || [];
        const novaLista = lista.filter(item => item.id !== id);
        localStorage.setItem("minhaLista", JSON.stringify(novaLista));
        atualizarMinhaLista();
    }

    // Só executa a lógica da lista se o container existir
    if (container) {
        atualizarMinhaLista();
    }
    
    // --- Lógica do Formulário de Login ---
    // MODIFICADO: Verifica a existência dos campos de email e senha para aplicar a lógica de login
    // Isso impede que o script interfira em outros formulários, como o de solicitação.
    const loginForm = document.querySelector("form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    if (loginForm && emailInput && passwordInput) {
        loginForm.addEventListener("submit", function(e) {
            e.preventDefault(); // Impede o envio padrão APENAS no formulário de login

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            const user = JSON.parse(localStorage.getItem("user"));

            if (!user || user.email !== email || user.password !== password) {
                alert("Usuário não encontrado ou senha incorreta.");
                return;
            }

            // Login bem-sucedido: redirecionar
            localStorage.setItem("loggedIn", "true");
            window.location.href = "index.html";
        });
    }
});