class block extends HTMLElement {
    constructor() {
        super();
        const logo = this.getAttribute('logo');
        const img1 = this.getAttribute('img1');
        const img2 = this.getAttribute('img2');
        const info1 = this.getAttribute('info1');
        const info2 = this.getAttribute('info2');
        const info3 = this.getAttribute('info3');
        const upend = this.getAttribute('upend');
        this.innerHTML = `
            <div class="info__block flex" style="flex-direction: ${upend}">
                <img src="${img1}" alt="Cursach" class="info__block-img">
                <div class="info__block-text flex upend center-horizontal center-vertical">
                    <div class="flex upend gap-31">
                        <div class=" flex upend gap-41">
                            <img src="${img2}" alt="Cursach Logo" class="info__block-text-logo-img">
                            <p class="info__block-text-even-logo text-bold text-2xl text-style-normal">${logo}</p>
                        </div>
                        <div class="flex upend gap-23">
                            <p class="info__block-text-even-info text-lg text-normal text-style-normal">${info1}</p>
                            <p class="info__block-text-even-info text-lg text-normal text-style-normal" >${info2}</p>
                            <p class="info__block-text-even-info text-lg text-normal text-style-normal">${info3}</p>
                        </div>
                    </div>    
                </div>
            </div>
        `;
    }
}

customElements.define('widget-block', block);