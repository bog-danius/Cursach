class favorite extends HTMLElement {
    constructor() {
        super();
        const img = this.getAttribute('img');
        const info = this.getAttribute('info');

        this.innerHTML = `
            <div class="favorites__text-block-component flex upend gap-22 center-horizontal center-vertical">
                <img src="${img}" alt="ico-favorite" class="favorites__text-block-component-img">
                <p class="favorites__text-block-component-text text-sm text-style-normal text-normal">${info}</p>
            </div>
        `;
    }
}

customElements.define('widget-favorite', favorite);