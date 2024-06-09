// mobile.js

document.addEventListener("DOMContentLoaded", () => {
    const slideContainer = document.querySelector(".character-list");
    const cards = document.querySelectorAll(".card");

    let startX = 0;
    let currentIndex = 0;
    let isDragging = false;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    // Eventos de toque
    slideContainer.addEventListener("touchstart", touchStart);
    slideContainer.addEventListener("touchmove", touchMove);
    slideContainer.addEventListener("touchend", touchEnd);


    function touchStart(event) {
        startX = event.touches[0].clientX;
        isDragging = true;
        animationID = requestAnimationFrame(animation);
        slideContainer.style.transition = 'none'; // Remove a transição para o movimento ser imediato
    }

    function touchMove(event) {
        if (isDragging) {
            const currentX = event.touches[0].clientX;
            const diffX = currentX - startX;
            currentTranslate = prevTranslate + diffX;
        }
    }

    function touchEnd() {
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
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        slideContainer.style.transform = `translateX(${currentTranslate}px)`;
    }

    function setPositionByIndex() {
        currentTranslate = currentIndex * -slideContainer.offsetWidth;
        prevTranslate = currentTranslate;
        setSliderPosition();
    }
});
