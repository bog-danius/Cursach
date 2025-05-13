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
            itemElement.innerHTML = `
          <img src="${item.image}" alt="${item.name}" style="width: 335px; height: 406px">
          <div class="catalog-item-block">
              <p class="catalog-item-inf">${item.name} </p>
              <p class="catalog-item-inf">- ${item.price}$</p>
          </div>
          <div class="catalog-item-line"></div>
        `;
            previewContainer.appendChild(itemElement);
        });
    })
    .catch(error => console.error('Error loading catalog:', error));