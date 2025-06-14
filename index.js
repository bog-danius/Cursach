import "./src/css/basic-style.css"
import "./src/css/style.css"
import "./src/css/tablet-style.css"
import "./src/css/phone-style.css"
import "./src/css/footer-style.css"
import "./src/css/header-style.css"

import "./src/js/api/api.js"
import "./src/js/translations/translations.js"
import "./src/js/components/block-review.js"
import "./src/js/components/block-favorite.js"
import "./src/js/components/block-info.js"
import "./src/js/components/footer.js"
import "./src/js/components/header.js"

fetch('http://localhost:3000/services')
    .then(response => response.json())
    .then(data => {
        const previewContainer = document.querySelector('.catalog-preview');
        const itemsToShow = data.slice(0, 4);

        itemsToShow.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'catalog-item';
            itemElement.style.fontSize = 'calc(1em * var(--text-scale, 1))';
            itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="catalog-item-img">
          <div class="catalog-item-block" style="font-size: inherit">
              <p class="catalog-item-inf" style="font-size: inherit">${item.name}</p>
              <p class="catalog-item-inf" style="font-size: inherit">- ${item.price}$</p>
          </div>
          <div class="catalog-item-line"></div>
        `;
            previewContainer.appendChild(itemElement);
        });

        const currentScale = localStorage.getItem('textScale') || 1;
        setTextScale(currentScale);
    })
    .catch(error => console.error('Error loading catalog:', error));

function setTextScale(scale) {
    document.documentElement.style.setProperty('--text-scale', scale);
    localStorage.setItem('textScale', scale);

    const header = document.querySelector('.header');
    if (header) {
        header.style.fontSize = `${scale}em`;
    }

    document.querySelectorAll('.catalog-item, .catalog-item *').forEach(el => {
        el.style.fontSize = `${scale}em`;
    });
}

document.querySelectorAll('[data-scale]').forEach(btn => {
    btn.addEventListener('click', function() {
        const scale = parseFloat(this.dataset.scale);
        setTextScale(scale);

        document.querySelectorAll('[data-scale]').forEach(b =>
            b.classList.remove('active'));
        this.classList.add('active');
    });
});

document.querySelectorAll('[data-theme]').forEach(btn => {
    btn.addEventListener('click', function() {
        const theme = this.dataset.theme;
        const isActive = this.classList.contains('active');

        if (isActive) {
            document.documentElement.classList.remove(`${theme}-theme`);
            this.classList.remove('active');
            localStorage.removeItem('colorTheme');
        }
        else {
            document.documentElement.classList.remove(
                'dark-theme', 'beige-theme', 'blue-theme'
            );
            document.documentElement.classList.add(`${theme}-theme`);

            document.querySelectorAll('[data-theme]').forEach(b =>
                b.classList.remove('active'));
            this.classList.add('active');

            localStorage.setItem('colorTheme', theme);
        }
    });
});

document.querySelectorAll('[data-theme]').forEach(btn => {
    btn.addEventListener('click', function() {
        const theme = this.dataset.theme;
        setTheme(theme);

        document.querySelectorAll('[data-theme]').forEach(b =>
            b.classList.remove('active'));
        this.classList.add('active');
    });
});

document.querySelector('.toggle-images-btn').addEventListener('click', function() {
    const imagesDisabled = !this.classList.toggle('active');

    if (imagesDisabled) {
        document.body.classList.add('no-images');
    } else {
        document.body.classList.remove('no-images');
    }

    document.querySelectorAll('img, svg, .icon').forEach(el => {
        if (imagesDisabled) {
            el.dataset.originalDisplay = el.style.display || '';
            el.style.display = 'none';

            if (el.alt) {
                const desc = document.createElement('div');
                desc.className = 'image-alt-text';
                desc.textContent = el.alt;
                el.parentNode.insertBefore(desc, el.nextSibling);
            }
        } else {
            el.style.display = el.dataset.originalDisplay || '';
            document.querySelectorAll('.image-alt-text').forEach(d => d.remove());
        }
    });

    localStorage.setItem('imagesDisabled', imagesDisabled);
});

document.addEventListener('DOMContentLoaded', () => {
    const savedScale = localStorage.getItem('textScale') || '1';
    setTextScale(savedScale);
    document.querySelector(`[data-scale="${savedScale}"]`)?.classList.add('active');

    const savedTheme = localStorage.getItem('colorTheme');
    if (savedTheme) {
        const themeBtn = document.querySelector(`[data-theme="${savedTheme}"]`);
        if (themeBtn) themeBtn.click();
    }

    if (localStorage.getItem('imagesDisabled') === 'true') {
        document.querySelector('.toggle-images-btn').classList.add('active');
        document.body.classList.add('no-images');
    }
});