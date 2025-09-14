// 1. ESTRUTURA PRINCIPAL: O evento 'DOMContentLoaded'
// Todo o código está dentro deste evento para garantir que o JavaScript só seja executado
// depois que todo o HTML da página foi completamente carregado e analisado pelo navegador.
// Isso evita erros de "elemento não encontrado" (null), pois garante que todos os
// elementos (como botões e inputs) já existem quando o script tenta acessá-los.
document.addEventListener('DOMContentLoaded', () => {

    // 2. ESTADO DA APLICAÇÃO (STATE - A "Fonte da Verdade")
    // O objeto 'state' funciona como o cérebro da nossa aplicação. Ele armazena todos os dados
    // que podem mudar ao longo do tempo, como cores, textos e configurações dos cards.
    // Manter todos os dados em um único lugar (Single Source of Truth) torna o código mais
    // organizado e fácil de gerenciar. Quando algo precisa mudar na interface, nós primeiro
    // atualizamos o 'state' e depois "redesenhamos" a tela com base nesses novos dados.
    const state = {
        // Configurações da seção principal que envolve a imagem e os cards.
        section: {
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
        },
        // Configurações da imagem de destaque.
        image: {
            src: 'https://placehold.co/800x300/E2E8F0/4A5568?text=Imagem+Principal',
            alt: 'Imagem de destaque da notícia',
            borderRadius: 8,
        },
        // Um array de objetos, onde cada objeto representa um card de notícia.
        // Adicionar ou remover um objeto deste array irá adicionar ou remover um card da tela.
        cards: [
            {
                id: `card-${Date.now()}-1`,
                title: 'Solidariedade em Ação: Voluntários se Unem na Reconstrução do RS',
                subtitle: 'Milhares de pessoas de todo o país chegam para ajudar na limpeza e recuperação das cidades afetadas pelas enchentes.',
                backgroundColor: '#F9FAFB',
                titleColor: '#111827',
                subtitleColor: '#4B5563',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                borderRadius: 8,
                isTitleBold: true,
                isTitleItalic: false,
                isSubtitleBold: false,
                isSubtitleItalic: false,
            },
            {
                id: `card-${Date.now()}-2`,
                title: 'Produtores Gaúchos Inovam para Superar Desafios Climáticos',
                subtitle: 'Após perdas na safra, agricultores investem em tecnologia e novas práticas para garantir a produção futura.',
                backgroundColor: '#F9FAFB',
                titleColor: '#111827',
                subtitleColor: '#4B5563',
                borderColor: '#E5E7EB',
                borderWidth: 1,
                borderRadius: 8,
                isTitleBold: true,
                isTitleItalic: false,
                isSubtitleBold: false,
                isSubtitleItalic: false,
            }
        ]
    };

    // 3. REFERÊNCIAS AOS ELEMENTOS DO DOM (CACHE DE ELEMENTOS)
    // Para não ter que buscar os mesmos elementos no HTML repetidamente (o que é lento),
    // nós os encontramos uma única vez e guardamos as referências neste objeto 'elements'.
    // Isso melhora a performance e deixa o código mais limpo.
    const elements = {
        sectionBgColor: document.getElementById('section-bg-color'),
        sectionBgColorText: document.getElementById('section-bg-color-text'),
        sectionBorderRadius: document.getElementById('section-border-radius'),
        imageUrl: document.getElementById('image-url'),
        imageAlt: document.getElementById('image-alt'),
        imageBorderRadius: document.getElementById('image-border-radius'),
        addCardBtn: document.getElementById('add-card-btn'),
        cardEditorsContainer: document.getElementById('card-editors-container'),
        headlinesSection: document.getElementById('headlines-section'),
        previewImage: document.getElementById('preview-image'),
        previewCardsContainer: document.getElementById('preview-cards'),
    };

    // 4. FUNÇÕES DE RENDERIZAÇÃO (ATUALIZAÇÃO DA INTERFACE)
    // Funções de renderização são responsáveis por "desenhar" a interface do usuário (UI)
    // com base nos dados atuais do objeto 'state'.

    /**
     * renderPreview: Atualiza a coluna de visualização (à direita).
     * Ela lê os dados do 'state' e aplica os estilos e conteúdos correspondentes
     * aos elementos da pré-visualização.
     */
    function renderPreview() {
        // Atualiza os estilos da seção principal.
        elements.headlinesSection.style.backgroundColor = state.section.backgroundColor;
        elements.headlinesSection.style.borderRadius = `${state.section.borderRadius}px`;

        // Atualiza a imagem principal, com uma URL reserva caso a fornecida seja inválida.
        elements.previewImage.src = state.image.src || 'https://placehold.co/800x300/cccccc/333333?text=URL+inv%C3%A1lida';
        elements.previewImage.alt = state.image.alt;
        elements.previewImage.style.borderRadius = `${state.image.borderRadius}px`;
        // Define uma imagem de erro caso a URL falhe ao carregar.
        elements.previewImage.onerror = () => {
            elements.previewImage.src = 'https://placehold.co/800x300/f87171/ffffff?text=Erro+ao+carregar';
        };

        // Limpa os cards antigos e cria os novos com base no array 'state.cards'.
        elements.previewCardsContainer.innerHTML = '';
        state.cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'p-4 rounded-lg shadow-md transition-all duration-300';

            cardElement.style.backgroundColor = card.backgroundColor;
            cardElement.style.borderColor = card.borderColor;
            cardElement.style.borderWidth = `${card.borderWidth}px`;
            cardElement.style.borderStyle = 'solid';
            cardElement.style.borderRadius = `${card.borderRadius}px`;

            // Lógica para construir as classes de estilo do título dinamicamente com base no 'state'.
            let titleClasses = 'text-lg headline-font';
            if (card.isTitleBold) titleClasses += ' font-bold';
            if (card.isTitleItalic) titleClasses += ' italic';

            // Lógica para construir as classes de estilo do subtítulo dinamicamente com base no 'state'.
            let subtitleClasses = 'text-sm mt-1';
            if (card.isSubtitleBold) subtitleClasses += ' font-bold';
            if (card.isSubtitleItalic) subtitleClasses += ' italic';

            // O HTML interno do card é criado usando os dados do objeto 'card'.
            cardElement.innerHTML = `
                <h4 class="${titleClasses}" style="color: ${card.titleColor};">${card.title}</h4>
                <p class="${subtitleClasses}" style="color: ${card.subtitleColor};">${card.subtitle}</p>
            `;
            elements.previewCardsContainer.appendChild(cardElement);
        });
    }

    /**
     * renderCardEditors: Atualiza a coluna do editor (à esquerda).
     * Para cada card no 'state', esta função cria um bloco de formulário
     * que permite ao usuário editar título, subtítulo, cores, etc.
     */
    function renderCardEditors() {
        // Limpa os editores antigos para não duplicar conteúdo.
        elements.cardEditorsContainer.innerHTML = '';
        state.cards.forEach((card, index) => {
            const editorEl = document.createElement('div');
            editorEl.className = 'border border-gray-200 rounded-lg p-4 bg-gray-50';
            editorEl.dataset.cardId = card.id;


            // O HTML de cada editor é gerado dinamicamente, preenchendo os campos do formulário
            // com os valores atuais do 'state' para aquele card específico.
            editorEl.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <h4 class="font-bold text-lg text-gray-700">Card ${index + 1}</h4>
                    <button class="remove-card-btn text-red-500 hover:text-red-700 font-semibold" data-card-id="${card.id}">Remover</button>
                </div>
                <div class="mb-2"><label class="text-sm font-medium">Título</label><input type="text" class="card-title w-full p-2 border border-gray-300 rounded-md mt-1" value="${card.title}"></div>
                <div class="mb-2"><label class="text-sm font-medium">Subtítulo</label><textarea class="card-subtitle w-full p-2 border border-gray-300 rounded-md mt-1" rows="3">${card.subtitle}</textarea></div>
                
                <!-- Controles de checkbox para negrito e itálico -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-2 mt-4 mb-4">
                    <label class="flex items-center space-x-2 text-sm cursor-pointer"><input type="checkbox" class="card-title-bold" ${card.isTitleBold ? 'checked' : ''}><span>Título Negrito</span></label>
                    <label class="flex items-center space-x-2 text-sm cursor-pointer"><input type="checkbox" class="card-title-italic" ${card.isTitleItalic ? 'checked' : ''}><span>Título Itálico</span></label>
                    <label class="flex items-center space-x-2 text-sm cursor-pointer"><input type="checkbox" class="card-subtitle-bold" ${card.isSubtitleBold ? 'checked' : ''}><span>Subtítulo Negrito</span></label>
                    <label class="flex items-center space-x-2 text-sm cursor-pointer"><input type="checkbox" class="card-subtitle-italic" ${card.isSubtitleItalic ? 'checked' : ''}><span>Subtítulo Itálico</span></label>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 border-t pt-4">
                    <div><label class="text-sm font-medium">Cor de Fundo</label><div class="color-input-wrapper mt-1"><input type="color" class="card-bg-color" value="${card.backgroundColor}"><input type="text" class="card-bg-color-text w-full p-2 border rounded-md" value="${card.backgroundColor}"></div></div>
                    <div><label class="text-sm font-medium">Cor do Título</label><div class="color-input-wrapper mt-1"><input type="color" class="card-title-color" value="${card.titleColor}"><input type="text" class="card-title-color-text w-full p-2 border rounded-md" value="${card.titleColor}"></div></div>
                    <div><label class="text-sm font-medium">Cor do Subtítulo</label><div class="color-input-wrapper mt-1"><input type="color" class="card-subtitle-color" value="${card.subtitleColor}"><input type="text" class="card-subtitle-color-text w-full p-2 border rounded-md" value="${card.subtitleColor}"></div></div>
                    <div><label class="text-sm font-medium">Cor da Borda</label><div class="color-input-wrapper mt-1"><input type="color" class="card-border-color" value="${card.borderColor}"><input type="text" class="card-border-color-text w-full p-2 border rounded-md" value="${card.borderColor}"></div></div>
                    <div><label class="text-sm font-medium">Largura da Borda (px)</label><input type="number" min="0" max="20" class="card-border-width w-full p-2 border rounded-md mt-1" value="${card.borderWidth}"></div>
                    <div><label class="text-sm font-medium">Arredondamento (px)</label><input type="number" min="0" max="30" class="card-border-radius w-full p-2 border rounded-md mt-1" value="${card.borderRadius}"></div>
                </div>
            `;
            elements.cardEditorsContainer.appendChild(editorEl);
        });
    }

    // 5. MANIPULADORES DE EVENTOS (EVENT HANDLERS)
    // Esta seção é responsável por "ouvir" as interações do usuário (cliques, digitação, etc.)
    // e disparar as ações correspondentes. A lógica principal é:
    // 1. O usuário interage com um elemento (ex: muda uma cor).
    // 2. O "ouvinte" de evento captura essa interação.
    // 3. O 'state' da aplicação é atualizado com o novo valor.
    // 4. As funções de renderização são chamadas para redesenhar a tela.

    /**
     * setupEventListeners: Configura todos os "ouvintes" de eventos da aplicação.
     * É chamada apenas uma vez, na inicialização.
     */
    function setupEventListeners() {
        // Eventos para os controles de estilo da seção geral.
        elements.sectionBgColor.addEventListener('input', (e) => { state.section.backgroundColor = e.target.value; elements.sectionBgColorText.value = e.target.value; renderPreview(); });
        elements.sectionBgColorText.addEventListener('change', (e) => { state.section.backgroundColor = e.target.value; elements.sectionBgColor.value = e.target.value; renderPreview(); });
        elements.sectionBorderRadius.addEventListener('input', (e) => { state.section.borderRadius = e.target.value; renderPreview(); });
        elements.imageUrl.addEventListener('input', (e) => { state.image.src = e.target.value; renderPreview(); });
        elements.imageAlt.addEventListener('input', (e) => { state.image.alt = e.target.value; renderPreview(); });
        elements.imageBorderRadius.addEventListener('input', (e) => { state.image.borderRadius = e.target.value; renderPreview(); });

        // Evento para o botão "Adicionar Card".
        elements.addCardBtn.addEventListener('click', () => {
            state.cards.push({
                id: `card-${Date.now()}`,
                title: 'Nova Manchete',
                subtitle: 'Clique para editar o conteúdo desta notícia.',
                backgroundColor: '#FFFFFF', titleColor: '#1F2937', subtitleColor: '#6B7280',
                borderColor: '#D1D5DB', borderWidth: 1, borderRadius: 8,
                isTitleBold: true, isTitleItalic: false,
                isSubtitleBold: false, isSubtitleItalic: false,
            });
            // Após adicionar o card ao 'state', renderiza tudo de novo.
            renderAll();
        });

        // Delegação de eventos para os botões de remover card.
        // Em vez de adicionar um evento a cada botão, adicionamos um único evento ao container pai.
        // Isso é mais eficiente, especialmente para elementos criados dinamicamente.
        elements.cardEditorsContainer.addEventListener('click', (e) => {
            // Verifica se o elemento clicado foi um botão de remover.
            if (e.target.classList.contains('remove-card-btn')) {
                const cardIdToRemove = e.target.dataset.cardId;
                // Atualiza o 'state' filtrando o array de cards para remover o card com o ID correspondente.
                state.cards = state.cards.filter(card => card.id !== cardIdToRemove);
                renderAll();
            }
        });

        // Delegação de eventos para todos os inputs dentro dos editores de card.
        // Captura qualquer mudança (digitação, seleção de cor, etc.).
        elements.cardEditorsContainer.addEventListener('input', (e) => {
            // Encontra o container do editor do card que foi modificado.
            const cardEditor = e.target.closest('[data-card-id]');
            if (!cardEditor) return;

            // Encontra o objeto do card correspondente no 'state'.
            const card = state.cards.find(c => c.id === cardEditor.dataset.cardId);
            if (!card) return;

            const targetClass = e.target.classList;
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

            if (targetClass.contains('card-title')) card.title = value;
            if (targetClass.contains('card-subtitle')) card.subtitle = value;
            // Para seletores de cor, atualiza tanto o 'state' quanto o campo de texto ao lado.
            if (targetClass.contains('card-bg-color')) { card.backgroundColor = value; cardEditor.querySelector('.card-bg-color-text').value = value; }
            if (targetClass.contains('card-title-color')) { card.titleColor = value; cardEditor.querySelector('.card-title-color-text').value = value; }
            if (targetClass.contains('card-subtitle-color')) { card.subtitleColor = value; cardEditor.querySelector('.card-subtitle-color-text').value = value; }
            if (targetClass.contains('card-border-color')) { card.borderColor = value; cardEditor.querySelector('.card-border-color-text').value = value; }
            if (targetClass.contains('card-border-width')) card.borderWidth = value;
            if (targetClass.contains('card-border-radius')) card.borderRadius = value;

            // Lógica para atualizar o 'state' com base nos checkboxes de estilo de fonte.
            if (targetClass.contains('card-title-bold')) card.isTitleBold = value;
            if (targetClass.contains('card-title-italic')) card.isTitleItalic = value;
            if (targetClass.contains('card-subtitle-bold')) card.isSubtitleBold = value;
            if (targetClass.contains('card-subtitle-italic')) card.isSubtitleItalic = value;

            // Após atualizar o 'state', apenas a pré-visualização precisa ser redesenhada.
            renderPreview();
        });

        // Evento 'change' para os campos de texto de cor.
        // O 'change' dispara quando o usuário termina de editar (ex: pressiona Enter ou clica fora).
        elements.cardEditorsContainer.addEventListener('change', (e) => {
            const cardEditor = e.target.closest('[data-card-id]');
            if (!cardEditor) return;
            const card = state.cards.find(c => c.id === cardEditor.dataset.cardId);
            if (!card) return;

            const value = e.target.value;
            const targetClass = e.target.classList;

            // Atualiza o 'state' e também o seletor de cor visual.
            if (targetClass.contains('card-bg-color-text')) { card.backgroundColor = value; cardEditor.querySelector('.card-bg-color').value = value; }
            if (targetClass.contains('card-title-color-text')) { card.titleColor = value; cardEditor.querySelector('.card-title-color').value = value; }
            if (targetClass.contains('card-subtitle-color-text')) { card.subtitleColor = value; cardEditor.querySelector('.card-subtitle-color').value = value; }
            if (targetClass.contains('card-border-color-text')) { card.borderColor = value; cardEditor.querySelector('.card-border-color').value = value; }

            renderPreview();
        });
    }

    // 6. INICIALIZAÇÃO DA APLICAÇÃO

    /**
     * setInitialFormValues: Preenche os campos do formulário com os valores iniciais
     * definidos no objeto 'state'. Isso garante que o editor já comece
     * sincronizado com a visualização.
     */
    function setInitialFormValues() {
        elements.sectionBgColor.value = state.section.backgroundColor;
        elements.sectionBgColorText.value = state.section.backgroundColor;
        elements.sectionBorderRadius.value = state.section.borderRadius;
        elements.imageUrl.value = state.image.src;
        elements.imageAlt.value = state.image.alt;
        elements.imageBorderRadius.value = state.image.borderRadius;
    }

    /**
     * renderAll: Uma função de conveniência para chamar ambas as funções de renderização.
     * Usada quando uma mudança afeta tanto o painel do editor quanto a visualização (ex: adicionar/remover card).
     */
    function renderAll() {
        renderCardEditors();
        renderPreview();
    }

    /**
     * init: A função de inicialização principal.
     * Ela orquestra o início da aplicação, chamando as funções na ordem correta.
     */
    function init() {
        setInitialFormValues();
        setupEventListeners();
        renderAll();
    }

    init();
    // A partir daqui, a aplicação está pronta e aguardando as interações do usuário.
});
