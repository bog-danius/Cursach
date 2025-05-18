document.querySelector('widget-header').setAttribute('data-lang', 'ru');
// document.querySelector('widget-footer').setAttribute('data-lang', 'ru');

const translations = {
    en: {
        natural_care: "Natural + Sustainable Oral Care",
        refreshing: "We're refreshing, but not just because we're toothpaste.",
        shop_all: "Shop all products",
        biodegradable: "Biodegradable Tubes. Vitamins. Vegan. Cruelty Free.",
        biodegradable_info: {
            logo: "Made with biodegradable tubes.",
            info1: "We think about our footprint, almost as much as our teeth. Every year 1,500,000,000 toothpaste tubes enter landfill. And live there for 500+ years.",
            info2: "We found a better way - a biodegradable toothpaste tube. The first of its kind in Australia. Our game-changing tube breaks down in landfill in just 6-10 years.",
            info3: "Make a difference, every time you brush. (That's twice a day if you're playing along at home.)"
        },
        vitamins_info: {
            logo: "Made with vitamins + earth minerals.",
            info1: "Our toothpaste is packed with minerals and vitamins, designed for whole mouth health.",
            info2: "Take our B12 Mint & Coconut toothpaste, for example. It contains the most natural, high quality B12 Methylcobalamin, plus coconut oil to prevent bad breath and tooth decay.",
            info3: "Isn't that a breath of fresh air?"
        },
        healthy_info: {
            logo: "Made for healthy mouths.",
            info1: "We prefer superfoods like Mint. Coconut. Green tea. We think your mouth does, too.",
            info2: "Our toothpaste is made from real, delicious ingredients. No nasty chemicals, no extreme flavours, and definitely no Arctic Blast.",
            info3: "It's a holiday for your teeth. And a sweet post-dinner treat."
        },
        what_we_stand: "What we stand for",
        vegan: "Vegan Friendly",
        gluten_free: "Gluten Free",
        natural_ingredients: "Naturally Derived Ingredients",
        whiter_teeth: "Naturally Whiter Teeth",
        sustainable: "Sustainable",
        cruelty_free: "Cruelty Free",
        biodegradable_tube: "Bio Degradable Tube",
        get_in_mouth: "Get it in your mouth.",
        review1: {
            text: "This toothpaste is super cute in my bathroom - no more ugly toothpaste tubes. And it's biodegradable, win-win!"
        },
        review2: {
            text: "We love these products!! And we can't say enough great things about the natural ingredients either! 3 benefits in 1!! :)"
        },
        review3: {
            text: "B12 in a toothpaste?! As a long-term vegan this is so exciting! Love the super minty taste too."
        },
        who_connected: "Who doesn't want to be connected?"
    },
    ru: {
        natural_care: "Натуральный и устойчивый уход за полостью рта",
        refreshing: "Мы освежаем, но не только потому, что мы зубная паста.",
        shop_all: "Все продукты",
        biodegradable: "Биоразлагаемые тюбики. Витамины. Веган. Без жестокости.",
        biodegradable_info: {
            logo: "Сделано с биоразлагаемыми тюбиками.",
            info1: "Мы думаем о своем следе почти так же, как о наших зубах. Каждый год 1 500 000 000 тюбиков зубной пасты отправляются на свалку. И живут там более 500 лет.",
            info2: "Мы нашли лучший способ — биоразлагаемый тюбик зубной пасты. Первый в своем роде в Австралии. Наш революционный тюбик разлагается на свалке всего за 6–10 лет.",
            info3: "Создавайте разницу каждый раз, когда чистите зубы. (Это два раза в день, если вы играете дома.)"
        },
        vitamins_info: {
            logo: "Сделано с витаминами + минералами земли.",
            info1: "Наша зубная паста наполнена минералами и витаминами, разработана для здоровья всей полости рта.",
            info2: "Возьмите, например, нашу зубную пасту B12 Mint & Coconut. Она содержит самый натуральный, высококачественный метилкобаламин B12, а также кокосовое масло для предотвращения неприятного запаха изо рта и кариеса.",
            info3: "Разве это не глоток свежего воздуха?"
        },
        healthy_info: {
            logo: "Сделано для здоровых ртов.",
            info1: "Мы предпочитаем суперпродукты, такие как мята. Кокос. Зеленый чай. Мы думаем, что ваш рот тоже.",
            info2: "Наша зубная паста сделана из настоящих, вкусных ингредиентов. Никаких вредных химикатов, никаких экстремальных вкусов и определенно никакого Arctic Blast.",
            info3: "Это отпуск для ваших зубов. И сладкое удовольствие после ужина."
        },
        what_we_stand: "За что мы выступаем",
        vegan: "Подходит для веганов",
        gluten_free: "Без глютена",
        natural_ingredients: "Натуральные ингредиенты",
        whiter_teeth: "Естественно белые зубы",
        sustainable: "Устойчивое развитие",
        cruelty_free: "Без жестокости",
        biodegradable_tube: "Биоразлагаемый тюбик",
        get_in_mouth: "Попробуйте это.",
        review1: {
            text: "Эта зубная паста отлично смотрится в моей ванной - больше никаких уродливых тюбиков. И она биоразлагаема, победа!"
        },
        review2: {
            text: "Мы обожаем эти продукты!! И не можем нарадоваться натуральным ингредиентам! 3 преимущества в 1!! :)"
        },
        review3: {
            text: "B12 в зубной пасте?! Как давнему вегану, мне это так нравится! И супер мятный вкус тоже прекрасен."
        },
        who_connected: "Кто не хочет быть на связи?"
    }
};

function changeLanguage(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.querySelectorAll('widget-header, widget-footer').forEach(component => {
        component.setAttribute('data-lang', lang);
    });


    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;

        if (translations[lang] && translations[lang][key]) {
            if (typeof translations[lang][key] === 'object') {
                if (element.tagName === 'WIDGET-BLOCK') {
                    element.setAttribute('logo', translations[lang][key].logo || element.getAttribute('logo'));
                    element.setAttribute('info1', translations[lang][key].info1);
                    element.setAttribute('info2', translations[lang][key].info2);
                    element.setAttribute('info3', translations[lang][key].info3);
                    if (element.onAttributeChange) element.onAttributeChange();
                } else if (element.tagName === 'WIDGET-REVIEW') {
                    element.setAttribute('text', translations[lang][key].text);
                    if (element.onAttributeChange) element.onAttributeChange();
                }
            } else {
                if (element.tagName === 'WIDGET-FAVORITE') {
                    element.setAttribute('info', translations[lang][key]);
                    if (element.onAttributeChange) element.onAttributeChange();
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        }
    });

}

document.addEventListener('DOMContentLoaded', () => {
    changeLanguage('en');

    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            changeLanguage(btn.dataset.lang);
        });
    });
});