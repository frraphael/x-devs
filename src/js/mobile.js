// mobile.js

document.addEventListener("DOMContentLoaded", () => {
    const slideContainer = document.querySelector(".character-list");
    const cards = document.querySelectorAll(".card");
    // const prevButton = document.getElementById("btn-previous");
    // const nextButton = document.getElementById("btn-next");
    const scrollableElements = document.querySelectorAll(".description-text"); // Adicione aqui todos os elementos que podem rolar verticalmente

    let startX = 0;
    let startY = 0;
    let currentIndex = 0;
    let isDragging = false;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    let isVerticalScroll = false; // Nova variável para rastrear a rolagem vertical

    // Eventos de toque
    slideContainer.addEventListener("touchstart", touchStart);
    slideContainer.addEventListener("touchmove", touchMove);
    slideContainer.addEventListener("touchend", touchEnd);

    // Eventos de clique
    // prevButton.addEventListener("click", () => moveToIndex(currentIndex - 1));
    // nextButton.addEventListener("click", () => moveToIndex(currentIndex + 1));

    function touchStart(event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
        isDragging = true;
        isVerticalScroll = false; // Reinicia o rastreamento de rolagem vertical
        animationID = requestAnimationFrame(animation);
        slideContainer.style.transition = 'none'; // Remove a transição para o movimento ser imediato
    }

    function touchMove(event) {
        const currentX = event.touches[0].clientX;
        const currentY = event.touches[0].clientY;

        // Verifica se o movimento é mais vertical do que horizontal
        if (!isVerticalScroll && Math.abs(currentY - startY) > Math.abs(currentX - startX)) {
            // Desabilita a rolagem horizontal se for um movimento vertical
            isVerticalScroll = true;
            return;
        }

        if (isDragging && !isVerticalScroll) {
            const diffX = currentX - startX;
            currentTranslate = prevTranslate + diffX;
        }
    }

    function touchEnd() {
        if (isVerticalScroll) {
            // Se foi uma rolagem vertical, não faz nada para o slider
            isDragging = false;
            return;
        }

        cancelAnimationFrame(animationID);
        isDragging = false;

        const movedBy = currentTranslate - prevTranslate;

        // Decide se deve mudar de card
        if (movedBy < -50 && currentIndex < cards.length - 1) {
            currentIndex += 1; // Deslizou para a esquerda
        }

        if (movedBy > 50 && currentIndex > 0) {
            currentIndex -= 1; // Deslizou para a direita
        }

        setPositionByIndex();
        slideContainer.style.transition = 'transform 0.3s ease'; // Adiciona a transição de volta
    }

    function animation() {
        setSliderPosition();
        if (isDragging && !isVerticalScroll) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        slideContainer.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        const cardWidth = window.innerWidth <= 768 ? slideContainer.offsetWidth : 330;
        currentTranslate = currentIndex * -cardWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }

    // function moveToIndex(index) {
    //     if (index < 0 || index >= cards.length) return;
    //     currentIndex = index;
    //     setPositionByIndex();
    // }

    // Recalcular posição ao redimensionar a janela
    window.addEventListener('resize', () => {
        setPositionByIndex();
    });
});
