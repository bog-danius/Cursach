class header extends HTMLElement {
    constructor() {
        super();

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
                <li><a href="#" class="header__nav-list-link">Better</a></li>
                <li><a href="#" class="header__nav-list-link">Shop</a></li>
                <li><a href="#" class="header__nav-list-link">Subscription</a></li>
                <li><a href="#" class="header__nav-list-link">Contact</a></li>
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
    }

    connectedCallback() {
        const toggleButton = this.querySelector("#theme-switch");

        // Применяем сохранённую тему
        if (localStorage.getItem("theme") === "dark") {
            document.documentElement.classList.add("dark-theme");
            toggleButton.checked = true;
        }

        toggleButton?.addEventListener("change", () => {
            const isDark = document.documentElement.classList.toggle("dark-theme");
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }
}

customElements.define('widget-header', header);