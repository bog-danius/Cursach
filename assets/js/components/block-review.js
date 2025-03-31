class BlockReview extends HTMLElement {
    constructor() {
        super();
        const starsCount = parseInt(this.getAttribute('stars'));
        const info = this.getAttribute('info');
        const text = this.getAttribute('text');
        const starSrc = this.getAttribute('star-img');

        const stars = Array.from({ length: starsCount }, () =>
            `<img src="${starSrc}" alt="star">`
        ).join('');

        this.innerHTML = `
            <div class="review__block flex center-horizontal center-vertical upend gap-19">
                <div class="stars flex gap-19">${stars}</div>
                <p class="review__block-text text-xs text-style-normal text-normal">${info}</p>
                <p class="review__block-text text-sm text-style-normal text-normal">${text}</p>
            </div>
        `;
    }
}

customElements.define('widget-review', BlockReview);