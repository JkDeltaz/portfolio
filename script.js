// 1. MENSAGEM DE SAUDAÇÃO DINÂMICA
const hora = new Date().getHours();
let mensagem;

if (hora >= 6 && hora < 12) {
    mensagem = "Bom dia";
} else if (hora >= 12 && hora < 18) {
    mensagem = "Boa tarde";
} else {
    mensagem = "Boa noite";
}

const descricaoSaudacao = document.querySelector("#mensagem-saudacao");
if (descricaoSaudacao) {
    descricaoSaudacao.innerHTML = `${mensagem}, meu nome é Caio César, tenho 19 anos e estou cursando o terceiro semestre de 
    <strong>Análise e Desenvolvimento de Sistemas na Fatec São José dos Campos</strong>`;
}

// 2. CONSTRUTORES DE OBJETOS
function Projeto(nome, tags, descricao, img) {
    this.nome = nome;
    this.tags = tags;
    this.descricao = descricao;
    this.img = img;
}

function Certificado(titulo, tags, img) {
    this.titulo = titulo;
    this.tags = tags;
    this.img = img;
}

// 3. BANCO DE DADOS (ARRAY DE OBJETOS)
const lista_projetos = [
    new Projeto(
        "Chronoruptura", 
        ["GDScript", "Godot Engine", "Jogo Indie"], 
        "Jogo completo desenvolvido em equipe em prazo de duas semanas para uma GameJam. Focado em mecânicas de manipulação do tempo e ambientação de terror psicológico.", 
        "img/chronoruptura.png"
    ),
    new Projeto(
        "Apollo11 - Gestão Ágil", 
        ["Python", "Flask", "HTML & CSS", "Javascript", "Web"], 
        "Aplicação web robusta para gerenciamento de atestados e avaliações de desempenho em equipes que utilizam metodologias ágeis.", 
        "img/Apolo11.png"
    ),
    new Projeto(
    "Youtan PDI - Gestão Estratégica", 
    ["Java", "JavaFX", "MySQL", "Maven", "Desktop"], 
    "Sistema desktop para centralização de Planos de Desenvolvimento Individual. Substitui processos manuais por uma gestão automatizada de competências, histórico de evolução e geração de métricas de desempenho para RH.", 
    "img/youtan_pdi.png"
    )
];

const lista_certificados = [
    new Certificado("Certificado NUPA", ["Python", "Lógica"], "img/certificado_nupa.jpg"),
    new Certificado("Certificado Bradesco", ["Modelagem de Dados"], "img/certificado bradesco.png"),
    new Certificado("Certificado Inglês", ["Inglês C1 Avançado"], "img/certificado ingles.jpg"),
    new Certificado("Certificado CURSA", ["Git", "Github", "Versionamento"], "img/certificado git.png")
];

function renderizar_projetos() {
    const wrapper_projetos = document.querySelector("#projetos .swiper-wrapper");

    if (wrapper_projetos) {
        wrapper_projetos.innerHTML = '';
        lista_projetos.forEach(projeto => {
            const tagsHTML = projeto.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
            
            const cardHTML = `
                <li class="projeto-item swiper-slide">
                    <div class="projeto-content-left">
                        <img src="${projeto.img}" class="projeto-image" alt="${projeto.nome}">
                        <div class="tags-container">${tagsHTML}</div>
                    </div>
                    <div class="projeto-content-right">
                        <h2 class="projeto-title">${projeto.nome}</h2>
                        <p class="projeto-descrição">${projeto.descricao}</p>
                    </div>
                </li>`;
            wrapper_projetos.insertAdjacentHTML('beforeend', cardHTML);
        });
    }
}

renderizar_projetos()

// 5. RENDERIZAÇÃO DE CERTIFICADOS (HORIZONTAL)
const wrapper_certificados = document.querySelector("#certificados .swiper-wrapper");

if (wrapper_certificados) {
    wrapper_certificados.innerHTML = '';
    lista_certificados.forEach(cert => {
        const tagsHTML = cert.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
        
        const cardHTML = `
            <li class="certificado-item swiper-slide">
                <div class="card-link">
                    <img src="${cert.img}" class="card-image" alt="${cert.titulo}">
                    <div class="tags-container">${tagsHTML}</div>
                    <h2 class="certificado-title card-title">${cert.titulo}</h2>
                </div>
            </li>`;
        wrapper_certificados.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// 6. INICIALIZAÇÃO DOS SWIPERS
// Certificados: Carrossel Horizontal padrão
const certificado_swiper = new Swiper('#certificados .card-wrapper', {
    loop: true,
    spaceBetween: 30,
    pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});

const projeto_swiper = new Swiper('#projetos .projetos-wrapper', {
    // Configurações padrão (Desktop)
    direction: "vertical",
    loop: true,
    spaceBetween: 40,
    slidesPerView: 1,
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },

    // Mudança dinâmica para Celular
    breakpoints: {
        0: {
            direction: "horizontal", // Muda para horizontal no celular
            autoHeight: true,      // Ajusta a altura conforme o conteúdo
        },
        1025: {
            direction: "vertical",   // Volta para vertical no desktop
        }
    }
});