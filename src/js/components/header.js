class Header extends HTMLElement {
    constructor() {
        super();
        this._themeSwitchHandler = this._themeSwitchHandler.bind(this);
        this._logoutHandler = this._logoutHandler.bind(this);
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

    connectedCallback() {
        this._setupEventListeners();
        const logoutBtn = this.querySelector("#logoutBtn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", this._logoutHandler);
        }
    }

    disconnectedCallback() {
        const logoutBtn = this.querySelector("#logoutBtn");
        if (logoutBtn) {
            logoutBtn.removeEventListener("click", this._logoutHandler);
        }
    }

    _logoutHandler() {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (user) {
            localStorage.removeItem(`favorites_${user.id}`);
            localStorage.removeItem(`cart_${user.id}`);
        }
        localStorage.removeItem("loggedInUser");
        window.location.href = "../reg/index.html";
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

        const userData = JSON.parse(localStorage.getItem("loggedInUser"));
        console.log(userData);
        const userInfoHtml = userData
            ? `<div class="user-info">
                    <span class="header__nav-list-link">Welcome, ${userData.firstName} (${userData.nickname})</span>
                    <button id="logoutBtn" class="get-tickets1">Logout</button>
               </div>`
            : `<a href="/reg/index.html" class="header__nav-list-link">Login</a>`;

        const adminLink = userData && userData.role === "admin"
            ? `<li><a href="../../../admin/index.html" class="header__nav-list-link">Админ-панель</a></li>`
            : '';

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
                        <li><a href="/index.html" class="header__nav-list-link">${translations[currentLang].rocc}</a></li>
                        <li><a href="../../../catalog/index.html" class="header__nav-list-link">${translations[currentLang].shop}</a></li>
                        <li><a href="../../../reg/index.html" class="header__nav-list-link">${translations[currentLang].registration}</a></li>
                        <li><a href="#" class="header__nav-list-link">${translations[currentLang].contact}</a></li>
                        <li><a href="/feedback/index.html" class="header__nav-list-link">Отзывы</a></li>
                        ${adminLink}
                    </ul>
                    <div class="toggle-container">
                        <ul>
                           <li class="header__nav-list-link">${userInfoHtml}</li>
                        </ul>
                        <input type="checkbox" id="theme-switch" class="toggle-checkbox" />
                        <label for="theme-switch" class="toggle-label">
                            <span class="icon sun">☀️</span>
                            <span class="icon moon">🌙</span>
                        </label>
                    </div>
                </nav>
            </div>
        `;
    }
}

customElements.define('widget-header', Header);