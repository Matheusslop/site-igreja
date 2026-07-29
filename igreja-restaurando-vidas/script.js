/* ==========================
   MENU MOBILE
========================== */

const linksMenu = document.getElementById("linksMenu");
const botaoMenu = document.getElementById("botaoMenu");

function abrirMenu() {
    const aberto = linksMenu.classList.toggle("ativo");
    botaoMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
    botaoMenu.textContent = aberto ? "✕" : "☰";
}

// Fecha o menu automaticamente ao clicar em um link (essencial no celular)
document.querySelectorAll(".links-menu a").forEach((link) => {
    link.addEventListener("click", () => {
        linksMenu.classList.remove("ativo");
        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.textContent = "☰";
    });
});


/* ==========================
   HEADER AO ROLAR + LINK ATIVO
========================== */

const header = document.getElementById("header");
const secoes = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    // Marca o link do menu correspondente à seção visível
    let atual = "";
    secoes.forEach((secao) => {
        const topo = secao.offsetTop - 120;
        if (window.scrollY >= topo) {
            atual = secao.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("ativo-link");
        if (link.getAttribute("href") === "#" + atual) {
            link.classList.add("ativo-link");
        }
    });

    // Mostra/esconde o botão "voltar ao topo"
    const voltarTopo = document.getElementById("voltarTopo");
    if (window.scrollY > 500) {
        voltarTopo.classList.add("visivel");
    } else {
        voltarTopo.classList.remove("visivel");
    }

});


/* ==========================
   MODAL DE EVENTOS
========================== */

const detalhesEventos = {
    louvor: {
        titulo: "Culto de Louvor e Adoração",
        data: "SEXTA-FEIRA · 20h00",
        texto: "Uma noite especial dedicada à adoração, com louvor, ministração da Palavra e um tempo de oração em comunhão com toda a igreja. Traga sua família e venha viver um momento de renovação espiritual.",
        imagem: "img/eventos/louvor.jpeg"
    },
    casais: {
        titulo: "Culto da Família",
        data: "DOMINGO · 18h30",
        texto: "Um encontro pensado para fortalecer o relacionamento entre marido e mulher, com dinâmicas, ensino bíblico sobre família e um momento de confraternização entre os casais da igreja.",
        imagem: "img/eventos/casais.jpeg"
    },
    ebd: {
        titulo: "Escola Bíblica Adolescentes",
        data: "DOMINGO · 08h30",
        texto: "Uma edição especial da Escola Bíblica Dominical, com estudo aprofundado da Palavra de Deus, dinâmicas voltadas aos adolescentes e um momento de comunhão ao final.",
        imagem: "img/eventos/ebd.jpeg"
    }
};

const modalOverlay = document.getElementById("modalOverlay");
const modalCorpo = document.getElementById("modalCorpo");
const modalFechar = document.getElementById("modalFechar");

document.querySelectorAll(".link-evento").forEach((botao) => {
    botao.addEventListener("click", () => {
        const chave = botao.getAttribute("data-evento");
        const evento = detalhesEventos[chave];

        if (!evento) return;

        modalCorpo.innerHTML = `
            <img src="${evento.imagem}" alt="Cartaz do evento ${evento.titulo}" class="modal-poster-evento">
            <h3>${evento.titulo}</h3>
            <p class="modal-data">${evento.data}</p>
            <p>${evento.texto}</p>
            <a href="#contato" class="botao-pastor modal-link-contato">Quero participar</a>
        `;

        modalOverlay.classList.add("aberto");
        document.body.style.overflow = "hidden";

        // fecha o modal ao clicar em "Quero participar" e rola até o contato
        modalCorpo.querySelector(".modal-link-contato").addEventListener("click", fecharModal);
    });
});

function fecharModal() {
    modalOverlay.classList.remove("aberto");
    document.body.style.overflow = "";
}

modalFechar.addEventListener("click", fecharModal);

modalOverlay.addEventListener("click", (evento) => {
    if (evento.target === modalOverlay) fecharModal();
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharModal();
});


/* ==========================
   LIGHTBOX DA GALERIA
========================== */

const lightboxOverlay = document.getElementById("lightboxOverlay");
const lightboxImagem = document.getElementById("lightboxImagem");
const lightboxFechar = document.getElementById("lightboxFechar");

document.querySelectorAll(".foto-galeria img").forEach((foto) => {
    foto.addEventListener("click", () => {
        lightboxImagem.src = foto.src;
        lightboxImagem.alt = foto.alt;
        lightboxOverlay.classList.add("aberto");
        document.body.style.overflow = "hidden";
    });
});

function fecharLightbox() {
    lightboxOverlay.classList.remove("aberto");
    lightboxImagem.src = "";
    document.body.style.overflow = "";
}

lightboxFechar.addEventListener("click", fecharLightbox);

lightboxOverlay.addEventListener("click", (evento) => {
    if (evento.target === lightboxOverlay) fecharLightbox();
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharLightbox();
});


/* ==========================
   FORMULÁRIO DE CONTATO
========================== */

const formularioContato = document.getElementById("formularioContato");
const mensagemStatus = document.getElementById("mensagemStatus");

// E-mail que receberá as mensagens do formulário (ajuste para o e-mail real da igreja)
const EMAIL_DESTINO = "sousalopes350@gmail.com";

formularioContato.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();

    if (!nome || !email || !mensagem) {
        mensagemStatus.textContent = "Por favor, preencha nome, e-mail e mensagem.";
        mensagemStatus.classList.remove("sucesso");
        mensagemStatus.classList.add("erro", "mostrar");
        return;
    }

    // Monta o e-mail com os dados preenchidos e abre o programa de e-mail do visitante
    const assunto = encodeURIComponent(`Contato pelo site - ${nome}`);
    const corpo = encodeURIComponent(
        `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone || "não informado"}\n\nMensagem:\n${mensagem}`
    );

    window.location.href = `mailto:${EMAIL_DESTINO}?subject=${assunto}&body=${corpo}`;

    mensagemStatus.textContent = "Obrigado! Seu aplicativo de e-mail foi aberto para concluir o envio.";
    mensagemStatus.classList.remove("erro");
    mensagemStatus.classList.add("sucesso", "mostrar");

    formularioContato.reset();
});