class ComponentFooter extends HTMLElement {
    constructor() {
        super();

        this.innerHTML = `
            <div class="footer__block flex center-vertical center-horizontal gap-70">
                    <p class="footer__block-copyright text-xs text-style-normal text-normal text-nowrap">©Copyright – ROCC Naturals 2021.</p>
                    <nav class="footer__block-nav flex gap-24 center-vertical">
                        <a href="#" class="footer__block-nav-link text-xs text-style-normal text-normal text-nowrap">Privacy Policy</a>
                        <a href="#" class="footer__block-nav-link text-xs text-style-normal text-normal text-nowrap">Shipping + Returns</a>
                        <a href="#" class="footer__block-nav-link text-xs text-style-normal text-normal text-nowrap">Returns</a>
                        <a href="#" class="footer__block-nav-link text-xs text-style-normal text-normal text-nowrap">Terms & Conditions</a>
                    </nav>
                    <div class="footer__block-social flex gap-24">
                        <a href="#"><img src="../assets/img/instagram.svg" alt="Instagram"></a>
                        <a href="#"><img src="../assets/img/facebook.svg" alt="Facebook"></a>
                    </div>
                    <div class="footer__block-subscribe flex center-vertical">
                        <input type="text" placeholder="Newsletter Subscribe" class="footer__block-subscribe-input">
                        <button class="footer__block-subscribe-btn"></button>
                    </div>
            </div>
        `;
    }
}

customElements.define('widget-footer', ComponentFooter);