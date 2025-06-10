document.addEventListener('DOMContentLoaded', () => {
    // --- Modo Escuro / Claro ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            if (themeToggle) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
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
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // --- Mock de Login/Cadastro ---
    const loginForm = document.querySelector('form[action="#"]');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const formType = loginForm.closest('.auth-box').querySelector('h2').textContent;

            if (formType.includes('Entrar')) {
                alert('Login mockado! As credenciais não são verificadas. Redirecionando para a página inicial.');
                window.location.href = 'index.html';
            } else if (formType.includes('Cadastrar')) {
                alert('Cadastro mockado! Seus dados não são armazenados. Redirecionando para a página de login.');
                window.location.href = 'login.html';
            }
        });
    }

    // --- Mock de Assistir Agora ---
    const watchNowBtn = document.querySelector('.btn-play');
    if (watchNowBtn) {
        watchNowBtn.addEventListener('click', () => {
            alert('Reprodução do vídeo (funcionalidade mockada)! Não há vídeo real para reproduzir.');
        });
    }

    // --- Mock de Compartilhar ---
    const shareBtnIcon = document.querySelector('.details-actions .btn-secondary i.fa-share-alt');
    if (shareBtnIcon) {
        shareBtnIcon.parentElement.addEventListener('click', () => {
            alert('Funcionalidade de compartilhamento mockada! Imagine que você compartilhou este conteúdo.');
        });
    }
  // Pega container da lista
  const container = document.querySelector(".minha-lista-container");

  // Atualiza visual da lista na página "Minha Lista"
  function atualizarMinhaLista() {
    const lista = JSON.parse(localStorage.getItem("minhaLista")) || [];
    console.log("Minha Lista no localStorage:", lista);

    if (!container) return;

    if (lista.length === 0) {
      container.innerHTML = `<p class="empty-state">Você ainda não adicionou nenhum item à sua lista. <a href="index.html">Explore agora!</a></p>`;
      return;
    }

    let html = '';
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

    // Botão remover (fora do link para evitar problemas)
    container.querySelectorAll(".btn-remover").forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const id = button.getAttribute("data-id");
        removerDaLista(id);
      });
    });
  }

  // Remove item da lista e atualiza localStorage + visual
  function removerDaLista(id) {
    const lista = JSON.parse(localStorage.getItem("minhaLista")) || [];
    const novaLista = lista.filter(item => item.id !== id);
    localStorage.setItem("minhaLista", JSON.stringify(novaLista));
    atualizarMinhaLista();
  }

  // Atualiza lista ao carregar a página
  atualizarMinhaLista();

  // Botão para adicionar item na página de filme (se existir)
  const btnAdicionar = document.querySelector(".btn-adicionar-lista");
  if (btnAdicionar) {
    btnAdicionar.addEventListener("click", () => {
      const item = {
  id: "homem-formiga-quantumania",
  titulo: "Homem-Formiga e a Vespa: Quantumania",
  poster: "homem-formiga-quantumania.jpg",
  ano: "2023",
  genero: "Ficção Científica",
  detalhesUrl: "detalhes-homem-formiga-quantumania.html"
};

const lista = JSON.parse(localStorage.getItem("minhaLista")) || [];
const jaExiste = lista.some(i => i.id === item.id);

if (!jaExiste) {
  lista.push(item);
  localStorage.setItem("minhaLista", JSON.stringify(lista));
  alert("Adicionado à sua lista!");
  atualizarMinhaLista();
} else {
  alert("Este item já está na sua lista.");
}
    });
  }
});