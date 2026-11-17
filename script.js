document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. MENU MOBILE
    // =====================================

    const menuToggle = document.querySelector(".menu-toggle");
    const menu = document.querySelector(".menu");

    function fecharMenu() {

        if (!menuToggle || !menu) return;

        menu.classList.remove("menu-aberto");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");

        menuToggle.innerHTML =
            '<i class="fa-solid fa-bars"></i>';

    }

    if (menuToggle && menu) {

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {

            const aberto = menu.classList.toggle("menu-aberto");

            menuToggle.setAttribute("aria-expanded", aberto);

            menuToggle.setAttribute(
                "aria-label",
                aberto ? "Fechar menu" : "Abrir menu"
            );

            menuToggle.innerHTML = aberto
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

        });

        // Fecha o menu ao clicar em um link
        menu.querySelectorAll("a").forEach((link) => {

            link.addEventListener("click", fecharMenu);

        });

        // Fecha o menu ao clicar fora dele
        document.addEventListener("click", (evento) => {

            const clicouNoMenu = menu.contains(evento.target);
            const clicouNoBotao = menuToggle.contains(evento.target);

            if (!clicouNoMenu && !clicouNoBotao) {
                fecharMenu();
            }

        });

        // Fecha o menu ao pressionar ESC
        document.addEventListener("keydown", (evento) => {

            if (evento.key === "Escape") {
                fecharMenu();
            }

        });

    }


    // =====================================
    // 2. TEMA CLARO E ESCURO
    // =====================================

    const temaToggle = document.querySelector(".tema-toggle");

    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "claro") {
        document.body.classList.add("tema-claro");
    }

    function atualizarBotaoTema() {

        if (!temaToggle) return;

        const temaClaro =
            document.body.classList.contains("tema-claro");

        temaToggle.innerHTML = temaClaro
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

        temaToggle.setAttribute(
            "aria-label",
            temaClaro ? "Ativar tema escuro" : "Ativar tema claro"
        );

    }

    atualizarBotaoTema();

    if (temaToggle) {

        temaToggle.addEventListener("click", () => {

            document.body.classList.toggle("tema-claro");

            const temaClaro =
                document.body.classList.contains("tema-claro");

            localStorage.setItem(
                "tema",
                temaClaro ? "claro" : "escuro"
            );

            atualizarBotaoTema();

        });

    }


    // =====================================
    // 3. FILTROS DOS PROJETOS
    // =====================================

    const botoesFiltro =
        document.querySelectorAll(".filtro");

    const projetos =
        document.querySelectorAll(".card-projeto");

    botoesFiltro.forEach((botao) => {

        botao.addEventListener("click", () => {

            const categoriaSelecionada =
                botao.dataset.filtro;

            botoesFiltro.forEach((item) => {

                item.classList.remove("ativo");

                item.setAttribute("aria-pressed", "false");

            });

            botao.classList.add("ativo");

            botao.setAttribute("aria-pressed", "true");

            projetos.forEach((projeto) => {

                const categoriaProjeto =
                    projeto.dataset.categoria;

                const deveMostrar =
                    categoriaSelecionada === "todos" ||
                    categoriaProjeto === categoriaSelecionada;

                projeto.hidden = !deveMostrar;

            });

        });

    });


    // =====================================
    // 4. ANO AUTOMÁTICO NO RODAPÉ
    // =====================================

    const anoAtual = new Date().getFullYear();

    const textoRodape = document.querySelector(".rodape p");

    if (textoRodape) {

        textoRodape.textContent =
            `© ${anoAtual} Gabriel José dos Santos. Todos os direitos reservados.`;

    }


    // =====================================
    // 5. ANIMAÇÕES AO ROLAR A PÁGINA
    // =====================================

    const elementosAnimados = document.querySelectorAll(
        ".titulo-secao, .sobre-conteudo, .habilidade, .card-projeto, .item-tempo, .cta, .cabecalho-pagina, .artigo, .video-container"
    );

    elementosAnimados.forEach((elemento) => {

        elemento.classList.add("reveal");

    });

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver((entradas, observer) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visivel");

                    observer.unobserve(entrada.target);

                }

            });

        }, {
            threshold: 0.15
        });

        elementosAnimados.forEach((elemento) => {

            observador.observe(elemento);

        });

    } else {

        elementosAnimados.forEach((elemento) => {

            elemento.classList.add("visivel");

        });

    }

});