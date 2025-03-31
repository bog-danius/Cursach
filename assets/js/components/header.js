class header extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
        <input type="checkbox" id="burger-toggle" class="burger-checkbox">
        <label for="burger-toggle" class="burger-menu">
            <span></span>
            <span></span>
            <span></span>
        </label>
        <nav class="header__nav">
            <ul class="header__nav-list flex gap-34 center-vertical ">
                <li><a href="#" class="header__nav-list-link text-sm text-normal text-style-normal">Better</a></li>
                <li><a href="#" class="header__nav-list-link text-sm text-normal text-style-normal">Shop</a></li>
                <li><a href="#" class="header__nav-list-link text-sm text-normal text-style-normal">Subscription</a></li>
                <li><a href="#" class="header__nav-list-link text-sm text-normal text-style-normal">Contact</a></li>
            </ul>
        </nav>
        `;
    }
}

customElements.define('widget-header', header);