# Editor de Manchetes de Jornal - Trabalho de Design de Interação

![Demonstração do editor de Manchetes](./assets/screencapture-127-0-0-1-5500-index-html-2025-09-14-19_05_54-1.png)

## 📝 Sobre o Projeto

Este projeto é uma aplicação web interativa desenvolvida para a disciplina de **Design de Interação**. O objetivo é fornecer uma ferramenta WYSIWYG ("What You See Is What You Get") que permite a um usuário, como um editor de conteúdo ou designer, criar e personalizar uma seção de notícias de forma visual e em tempo real, sem a necessidade de escrever código.

A interface é dividida em duas colunas principais:
*   **Painel do Editor (Esquerda):** Contém todos os controles e formulários para modificar os elementos visuais.
*   **Painel de Visualização (Direita):** Exibe instantaneamente o resultado das alterações feitas, simulando como a seção de notícias apareceria em um site real.

---

## ✨ Funcionalidades Principais

A ferramenta oferece um alto grau de personalização, permitindo controlar diversos aspectos do layout:

### Estilos Gerais
- **Cor de Fundo da Seção:** Altere a cor de fundo de toda a área de notícias.
- **Arredondamento de Borda:** Ajuste o arredondamento dos cantos da seção principal.

### Imagem de Destaque
- **URL da Imagem:** Insira a URL de qualquer imagem da web para ser a imagem principal.
- **Texto Alternativo (Alt Text):** Defina o texto alternativo para acessibilidade.
- **Arredondamento da Imagem:** Personalize os cantos da imagem.

### Cards de Manchete
- **Adicionar e Remover Cards:** Crie dinamicamente novos cards de notícia ou remova os existentes com um clique.
- **Edição de Conteúdo:** Altere o título e o subtítulo de cada card individualmente.
- **Estilo de Fonte:** Aplique **negrito** e *itálico* ao título e subtítulo de forma independente.
- **Personalização de Cores:** Controle total sobre as cores de fundo, texto do título, texto do subtítulo e borda de cada card.
- **Estilos de Borda:** Ajuste a largura e o arredondamento das bordas de cada card.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído com tecnologias web front-end padrão, focando na simplicidade e na interatividade.

*   **HTML5:** Para a estrutura semântica da página.
*   **CSS3:** Para estilizações personalizadas e refinamentos visuais.
*   **Tailwind CSS:** Um framework CSS "utility-first" usado para construir rapidamente o layout e a maior parte dos estilos, garantindo consistência e responsividade.
*   **JavaScript (Vanilla):** Para toda a lógica de interatividade, manipulação do DOM e gerenciamento de estado da aplicação. Nenhuma biblioteca ou framework JS foi utilizado, demonstrando o controle direto sobre os elementos da página.
*   **Google Fonts:** Para importar fontes personalizadas (`Roboto` e `Playfair Display`) que conferem uma identidade visual de "jornal" ao projeto.

---

## 🏛️ Arquitetura do Código (JavaScript)

O código JavaScript (`script.js`) foi estruturado de forma modular e reativa, seguindo boas práticas de desenvolvimento:

1.  **Estado Centralizado (State):** Um único objeto `state` atua como a "fonte da verdade", armazenando todos os dados da aplicação (cores, textos, configurações dos cards, etc.).
2.  **Fluxo de Dados Unidirecional:** A interação do usuário nos formulários atualiza o objeto `state`.
3.  **Funções de Renderização:** Após qualquer alteração no `state`, funções de renderização (`renderPreview`, `renderCardEditors`) são chamadas para redesenhar a interface do usuário com base nos novos dados. Isso garante que a UI seja sempre um reflexo do estado atual.
4.  **Delegação de Eventos:** Para otimizar a performance, os "ouvintes" de eventos são aplicados aos containers pais, em vez de a cada elemento individual, especialmente para os cards que são criados dinamicamente.

---

## 🏃 Como Executar o Projeto

Como este projeto utiliza apenas tecnologias front-end e não requer um processo de build, você pode executá-lo facilmente:

1.  Clone este repositório:
    ```bash
    git clone https://github.com/FranGnMoraes/Editor-de-Manchetes-de-Jornal.git
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd Editor-de-Manchetes-de-Jornal
    ```
3.  Abra o arquivo `index.html` diretamente no seu navegador de preferência (Google Chrome, Firefox, etc.).

E pronto! A aplicação estará funcionando.

---

## 👨‍💻 Francine G.N Moraes

*   Francine Gonçalves Nunes Moraes - francinegnmoraes@gmail.com

---

*Projeto desenvolvido como parte da avaliação da disciplina de Design de Interação.*