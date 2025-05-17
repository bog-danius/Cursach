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

        const navLinks = this.querySelectorAll(".header__nav-list-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                this._closeMobileMenu();
            });
        });
    }

    _closeMobileMenu() {
        const burgerToggle = this.querySelector("#burger-toggle");
        if (burgerToggle) {
            burgerToggle.checked = false;
            this._toggleMobileMenu(false);
        }
    }

    _toggleMobileMenu(show) {
        const navbar = this.querySelector(".header__nav");
        const overlay = this.querySelector(".overlay");
        const body = document.body;

        if (show) {
            navbar.style.display = "flex";
            overlay.style.display = "block";
            body.style.overflow = "hidden";
            setTimeout(() => {
                navbar.style.opacity = "1";
                navbar.style.transform = "translateY(0)";
                overlay.style.opacity = "1";
            }, 10);
        } else {
            navbar.style.opacity = "0";
            navbar.style.transform = "translateY(-20px)";
            overlay.style.opacity = "0";
            setTimeout(() => {
                navbar.style.display = "none";
                overlay.style.display = "none";
                body.style.overflow = "";
            }, 300);
        }
    }

    render() {
        const currentLang = this.getAttribute('data-lang') || 'en';

        const translations = {
            en: {
                rocc: "ROCC",
                shop: "Shop",
                registration: "Registration",
                contact: "Contact",
                reviews: "Reviews",
                admin: "Admin-panel"
            },
            ru: {
                rocc: "Главная",
                shop: "Магазин",
                registration: "Регистрация",
                contact: "Контакты",
                reviews: "Отзывы",
                admin: "Админ-панель"
            }
        };

        const userData = JSON.parse(localStorage.getItem("loggedInUser"));
        const userInfoHtml = userData
            ? `<div class="user-info">
                    <span class="header__nav-list-link">Welcome, ${userData.firstName} (${userData.nickname})</span>
                    <button id="logoutBtn" class="get-tickets1">Logout</button>
               </div>`
            : `<a href="/reg/index.html" class="header__nav-list-link">Login</a>`;

        const adminLink = userData && userData.role === "admin"
            ? `<li><a href="../../../admin/index.html" class="header__nav-list-link">${translations[currentLang].admin}</a></li>`
            : '';

        this.innerHTML = `
            <div class="header">
                <input type="checkbox" id="burger-toggle" class="burger-checkbox">
                <label for="burger-toggle" class="burger-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
                <div class="overlay"></div>

                <nav class="header__nav">
                    <ul class="header__nav-list">
                        <li><a href="/index.html" class="header__nav-list-link">${translations[currentLang].rocc}</a></li>
                        <li><a href="../../../catalog/index.html" class="header__nav-list-link">${translations[currentLang].shop}</a></li>
                        <li><a href="../../../reg/index.html" class="header__nav-list-link">${translations[currentLang].registration}</a></li>
                        <li><a href="#" class="header__nav-list-link">${translations[currentLang].contact}</a></li>
                        <li><a href="/feedback/index.html" class="header__nav-list-link">${translations[currentLang].reviews}</a></li>
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

        const burgerToggle = this.querySelector("#burger-toggle");
        if (burgerToggle) {
            burgerToggle.addEventListener("change", (e) => {
                this._toggleMobileMenu(e.target.checked);
            });
        }

        const overlay = this.querySelector(".overlay");
        if (overlay) {
            overlay.addEventListener("click", () => {
                this._closeMobileMenu();
            });
        }
    }
}

customElements.define('widget-header', Header);