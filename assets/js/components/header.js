class header extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
               <
        `;
    }
}

customElements.define('widget-header', header);