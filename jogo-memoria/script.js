document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];

    // Lista de nomes dos arquivos de imagem (certifique-se dos caminhos corretos)
    const cardImages = [
        'bolso.chan.jpg',
        'gatito.jpg',
        'igorS.jpg',
        'jake.jpg',
        'negoney.jpg',
        'theodor.jpg',
    ];

    /**
     * Embaralha um array usando o algoritmo de Fisher-Yates.
     * @param {Array} array O array a ser embaralhado.
     * @returns {Array} O array embaralhado.
     */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Cria as cartas do jogo e as adiciona ao grid.
     */
    function createCards() {
        const shuffledImages = shuffleArray(cardImages);

        shuffledImages.forEach(image => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = image; // Usado para verificar pares

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.textContent = '?'; // Conteúdo da frente da carta (pode ser um ícone)

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            const img = document.createElement('img');
            img.src = image;
            img.alt = 'Carta do jogo da memória';
            cardBack.appendChild(img);

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            gridContainer.appendChild(card);

            card.addEventListener('click', handleCardClick);
            cards.push(card);
        });
    }

    /**
     * Lida com o clique em uma carta.
     * @param {Event} event O evento de clique.
     */
    function handleCardClick(event) {
        const clickedCard = event.currentTarget;

        if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped') && !matchedCards.includes(clickedCard)) {
            flipCard(clickedCard);
            flippedCards.push(clickedCard);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    /**
     * Vira uma carta, mostrando o verso.
     * @param {HTMLElement} card A carta a ser virada.
     */
    function flipCard(card) {
        card.classList.add('flipped');
    }

    /**
     * Desvira duas cartas.
     * @param {HTMLElement} card1 A primeira carta a ser desvirada.
     * @param {HTMLElement} card2 A segunda carta a ser desvirada.
     */
    function unflipCards(card1, card2) {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }

    /**
     * Verifica se as duas cartas viradas formam um par.
     */
    function checkMatch() {
        const [card1, card2] = flippedCards;
        const value1 = card1.dataset.value;
        const value2 = card2.dataset.value;

        if (value1 === value2) {
            handleMatch(card1, card2);
        } else {
            handleMismatch(card1, card2);
        }

        // Reseta o array de cartas viradas
        flippedCards = [];
    }

    /**
     * Lida com o caso em que um par é encontrado.
     * @param {HTMLElement} card1 A primeira carta do par.
     * @param {HTMLElement} card2 A segunda carta do par.
     */
    function handleMatch(card1, card2) {
        matchedCards.push(card1, card2);
        if (matchedCards.length === cards.length) {
            setTimeout(() => alert('Parabéns! Você venceu!'), 500);
        }
    }

    /**
     * Lida com o caso em que as cartas não formam um par.
     * @param {HTMLElement} card1 A primeira carta não correspondente.
     * @param {HTMLElement} card2 A segunda carta não correspondente.
     */
    function handleMismatch(card1, card2) {
        setTimeout(() => unflipCards(card1, card2), 1000);
    }

    // Inicializa o jogo
    createCards();
});