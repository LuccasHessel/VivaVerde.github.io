document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("uForm");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const lista = document.getElementById("lista");
    const entradaPesquisa = document.getElementById("pesquisa");
    const excluirTodos = document.getElementById("eTodos");

    // Carregar usuários do localStorage ao carregar a página
    function carregarUsuarios() {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        lista.innerHTML = ""; // Limpa a lista antes de renderizar

        usuarios.forEach(usuario => adicionarUsuarioNaLista(usuario));
    }

    // Adicionar usuário na lista e no localStorage
    function adicionarUsuarioNaLista(usuario) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${usuario.nome}</strong> - ${usuario.email} 
                        <button class="excluir">X</button>`;

        // Botão de exclusão individual
        li.querySelector(".excluir").addEventListener("click", function () {
            removerUsuario(usuario.email);
        });

        lista.appendChild(li);
    }

    // Salvar usuário no localStorage
    function salvarUsuario(nome, email) {
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push({ nome, email });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    // Remover usuário individualmente
    function removerUsuario(email) {
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios = usuarios.filter(user => user.email !== email);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        carregarUsuarios();
    }

    // Evento de envio do formulário
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();

        if (nome === "" || email === "") {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        salvarUsuario(nome, email);
        adicionarUsuarioNaLista({ nome, email });

        form.reset(); // Limpar campos após o envio
    });

    // Excluir todos os usuários
    excluirTodos.addEventListener("click", function () {
        if (confirm("Tem certeza que deseja excluir todos os usuários?")) {
            localStorage.removeItem("usuarios");
            carregarUsuarios();
        }
    });

    // Pesquisar usuários na lista
    entradaPesquisa.addEventListener("input", function () {
        const termo = entradaPesquisa.value.toLowerCase();
        const itens = lista.getElementsByTagName("li");

        for (let item of itens) {
            const texto = item.textContent.toLowerCase();
            item.style.display = texto.includes(termo) ? "" : "none";
        }
    });

    // Carregar usuários ao abrir a página
    carregarUsuarios();
});
