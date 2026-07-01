
/*book a gift */
const openGiftForm = document.getElementById('openGiftForm');
const closeGiftForm = document.getElementById('closeGiftForm');
const giftOverlay = document.getElementById('giftOverlay');
const giftForm = document.getElementById('giftForm');
const giftStatus = document.getElementById('giftMessageStatus');

if (openGiftForm && closeGiftForm && giftOverlay) {
    openGiftForm.addEventListener('click', () => {
        giftOverlay.classList.add('is-open');
    });

    closeGiftForm.addEventListener('click', () => {
        giftOverlay.classList.remove('is-open');
    });

    giftOverlay.addEventListener('click', (event) => {
        if (event.target === giftOverlay) {
            giftOverlay.classList.remove('is-open');
        }
    });
}
