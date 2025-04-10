class ComponentFooter extends HTMLElement {
    constructor() {
        super();
        console.log('Footer created, initial render');
        this.render();
    }

    static get observedAttributes() {
        return ['data-lang'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`Footer attribute changed: ${name} from ${oldValue} to ${newValue}`);
        if (name === 'data-lang' && oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        const currentLang = this.getAttribute('data-lang') || 'en';
        console.log(`Rendering footer in ${currentLang} language`);

        const translations = {
            en: {
                copyright: "©Copyright – ROCC Naturals 2021.",
                privacy: "Privacy Policy",
                shipping: "Shipping + Returns",
                returns: "Returns",
                terms: "Terms & Conditions",
                newsletter: "Newsletter Subscribe"
            },
            ru: {
                copyright: "©Авторские права – ROCC Naturals 2021.",
                privacy: "Политика конфиденциальности",
                shipping: "Доставка и возврат",
                returns: "Возвраты",
                terms: "Условия использования",
                newsletter: "Подписка на рассылку"
            }
        };

        this.innerHTML = `
            <div class="footer__block flex center-horizontal gap-70">
                <p class="footer__block-copyright">${translations[currentLang].copyright}</p>
                <nav class="footer__block-nav flex gap-24 center-vertical">
                    <a href="#" class="footer__block-nav-link">${translations[currentLang].privacy}</a>
                    <a href="#" class="footer__block-nav-link">${translations[currentLang].shipping}</a>
                    <a href="#" class="footer__block-nav-link">${translations[currentLang].returns}</a>
                    <a href="#" class="footer__block-nav-link">${translations[currentLang].terms}</a>
                </nav>
                <div class="footer__block-social flex gap-24">
                    <a href="#" class="footer__block-social-img">
                        <img src="./assets/img/instagram.svg" alt="Instagram">
                    </a>
                    <a href="#" class="footer__block-social-img">
                        <img src="./assets/img/facebook.svg" alt="Facebook">
                    </a>
                </div>
                <div class="footer__block-subscribe flex center-vertical">
                    <input type="text" placeholder="${translations[currentLang].newsletter}" 
                           class="footer__block-subscribe-input">
                    <button class="footer__block-subscribe-btn"></button>
                </div>
            </div>
        `;
    }
}

customElements.define('widget-footer', ComponentFooter);