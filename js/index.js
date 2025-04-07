document.addEventListener("DOMContentLoaded", (event) => {
    buscarInscritos();
    construirModal();

    const temaLocal = localStorage.getItem("tema");
    document.body.setAttribute("data-theme", temaLocal);
});

function carregarIdioma(idioma) {
    fetch(`json/${idioma}.json`).then(data => data.json()).then(data => { traduzirPagina(data) });
}
let idiomaAtual = "pt";

function alterarIdioma() {
    idiomaAtual = idiomaAtual == "pt" ? "en" : "pt";
    carregarIdioma(idiomaAtual);
}

function traduzirPagina(linguagem) {
    document.querySelectorAll("[data-i18n]").forEach(elemento => {
        console.log(elemento);
        const chave = elemento.getAttribute("data-i18n");
        console.log(chave)
        if (linguagem[chave]) {
            elemento.textContent = linguagem[chave];
        }
    })

    //para imagens
    document.querySelectorAll("[data-i18n-alt]").forEach(elemento => {
        console.log(elemento);
        const chave = elemento.getAttribute("data-i18n-alt");
        console.log(chave)
        if (linguagem[chave]) {
            elemento.setAttribute("alt", linguagem[chave]);
        }
    })
}

function construirModal() {
    const botaoSaibaMais = document.getElementById("saiba mais");
    const modal = document.getElementById("modal");
    const botaofecharModal = document.getElementById("fecharModal");

    botaoSaibaMais.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    window.addEventListener("click", (e) => {
        console.log(e.target);
        if (e.target == modal) {
            modal.classList.add("hidden");
        }
    })

    botaofecharModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
}

function alterarTema() {
    //DOM -> document object model
    const tema = document.body.getAttribute("data-theme");
    const novoTema = tema == "dark" ? "light" : "dark"; // seria como if e else
    document.body.setAttribute("data-theme", novoTema);
    const btAlterarTema = document.getElementById("btAlterarTema");
    btAlterarTema.textContent = novoTema == "dark" ? "Modo Claro" : "Modo Escuro";
    localStorage.setItem("tema", novoTema);
    document.body.setAttribute("data-theme", novoTema);

}

function buscarInscritos() {
    //fetch("https://jsonplaceholder.typicode.com/users") // requisição assincrona
    fetch("json/inscritos.json")
        .then(res => res.json()) // res é requisição
        .then(res => {
            const divInscritos = document.getElementById("inscritos");
            res.forEach(user => {
                const novoParagrafo = document.createElement("p");
                novoParagrafo.textContent = `Nome: ${user.nome}`;
                divInscritos.appendChild(novoParagrafo);
            });
        }).catch(e => console.log(e));
}