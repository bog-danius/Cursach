class Header extends HTMLElement {
    constructor() {
        super();
        this._themeSwitchHandler = this._themeSwitchHandler.bind(this);
        this.render();
    }

    static get observedAttributes() {
        return ['data-lang'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-lang' && oldValue !== newValue) {
            this.render();
        }
    }

    _themeSwitchHandler() {
        const isDark = document.documentElement.classList.toggle("dark-theme");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }

    _setupEventListeners() {
        const toggleButton = this.querySelector("#theme-switch");

        if (toggleButton) {
            toggleButton.removeEventListener("change", this._themeSwitchHandler);
            toggleButton.addEventListener("change", this._themeSwitchHandler);

            if (localStorage.getItem("theme") === "dark") {
                document.documentElement.classList.add("dark-theme");
                toggleButton.checked = true;
            }
        }
    }

    render() {
        const currentLang = this.getAttribute('data-lang') || 'en';

        const translations = {
            en: {
                rocc: "ROCC",
                shop: "Shop",
                registration: "Registration",
                contact: "Contact"
            },
            ru: {
                rocc: "Главная",
                shop: "Магазин",
                registration: "Регистрация",
                contact: "Контакты"
            }
        };

        this.innerHTML = `
            <div class="header">
                <input type="checkbox" id="burger-toggle" class="burger-checkbox">
                <label for="burger-toggle" class="burger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>

                <nav class="header__nav">
                    <ul class="header__nav-list">
                        <li><a href="index.html" class="header__nav-list-link">${translations[currentLang].rocc}</a></li>
                        <li><a href="#" class="header__nav-list-link">${translations[currentLang].shop}</a></li>
                        <li><a href="index_registration.html" class="header__nav-list-link">${translations[currentLang].registration}</a></li>
                        <li><a href="#" class="header__nav-list-link">${translations[currentLang].contact}</a></li>
                    </ul>
                    <div class="toggle-container">
                        <input type="checkbox" id="theme-switch" class="toggle-checkbox" />
                        <label for="theme-switch" class="toggle-label">
                            <span class="icon sun">☀️</span>
                            <span class="icon moon">🌙</span>
                        </label>
                    </div>
                </nav>
            </div>
        `;

        this._setupEventListeners();
    }
}

customElements.define('widget-header', Header);