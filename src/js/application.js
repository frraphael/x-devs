document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('#cards .card');
    let currentIndex = 0;

    function updateSelectedCard(newIndex) {
        cards[currentIndex].classList.remove('selected');
        currentIndex = newIndex;
        cards[currentIndex].classList.add('selected');
    }

    document.getElementById('btn-next').addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % cards.length;
        updateSelectedCard(newIndex);
    });

    document.getElementById('btn-previous').addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateSelectedCard(newIndex);
    });
});

