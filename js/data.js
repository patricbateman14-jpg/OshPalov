/* ==========================================================================
   OSHPALOV — central data
   Menu items and prices are transcribed from the supplied printed menu.
   Fields:
     id        unique id
     ru        original Russian name (as printed)
     uz        Uzbek (Latin) name / translation
     price     price in soʻm, exactly as printed (null = hidden until verified)
     cat       category id (see MENU_CATEGORIES)
     img       optional image path (representative photo if no exact shot)
     desc      optional { ru, uz } short description (demo copy)
     featured  optional — shown in "signature dishes"
     review    optional — internal note for the client, never displayed
   ========================================================================== */

const IMG = 'assets/images/';
const D = IMG + 'dishes/';

const MENU_CATEGORIES = [
  { id: 'salads',    ru: 'Салаты',          uz: 'Salatlar',          img: D + 'salad-greek.jpg' },
  { id: 'first',     ru: 'Первые блюда',    uz: 'Birinchi taomlar',  img: D + 'kuza-shurva.jpg' },
  { id: 'second',    ru: 'Вторые блюда',    uz: 'Ikkinchi taomlar',  img: D + 'kazan-kabob.jpg' },
  { id: 'uyghur',    ru: 'Уйгурская кухня', uz: 'Uygʻur taomlari',   img: D + 'lagman.jpg' },
  { id: 'plov',      ru: 'Плов',            uz: 'Osh',               img: D + 'plov-hero.jpg' },
  { id: 'samsa',     ru: 'Самса',           uz: 'Somsa',             img: D + 'samsa-meat.jpg' },
  { id: 'shashlik',  ru: 'Шашлык',          uz: 'Shashlik',          img: D + 'shashlik-beef.jpg' },
  { id: 'snacks',    ru: 'Закуски',         uz: 'Gazaklar',          img: D + 'onion-rings.jpg' },
  { id: 'garnish',   ru: 'Гарниры',         uz: 'Garnirlar',         img: D + 'fries.jpg' },
  { id: 'extras',    ru: 'Добавки',         uz: 'Qoʻshimchalar',     img: D + 'smetana.jpg' },
  { id: 'drinks',    ru: 'Напитки',         uz: 'Ichimliklar',       img: D + 'compot.jpg' },
  { id: 'tea',       ru: 'Чай',             uz: 'Choy',              img: D + 'tea-black.jpg' },
  { id: 'bread',     ru: 'Хлеб',            uz: 'Non',               img: D + 'patir.jpg' }
];


const MENU_ITEMS = [
  /* ---------- Салаты ---------- */
  { id: 'sal-caesar',      cat: 'salads', ru: 'Цезарь',               uz: 'Sezar',                         price: 54000, img: D + 'salad-caesar.jpg'},
  { id: 'sal-eggplant',    cat: 'salads', ru: 'Хрустящий Баклажан',   uz: 'Qarsildoq baqlajon',            price: 65000, img: D + 'salad-eggplant.jpg',
    desc: { ru: 'Хрустящие баклажаны с овощами и кунжутом.', uz: 'Sabzavot va kunjut bilan qarsildoq baqlajon.' } },
  { id: 'sal-greek',       cat: 'salads', ru: 'Греческий',            uz: 'Grek salati',                   price: 49000, img: D + 'salad-greek.jpg'},
  { id: 'sal-japanese',    cat: 'salads', ru: 'Японский',             uz: 'Yapon salati',                  price: 46000, img: D + 'salad-japanese.jpg'},
  { id: 'sal-kapriz',      cat: 'salads', ru: 'Мужской каприз',       uz: 'Mujskoy kapriz',                price: 50000, img: D + 'salad-kapriz.jpg'},
  { id: 'sal-olivier',     cat: 'salads', ru: 'Оливье',               uz: 'Olivye',                        price: 36000, img: D + 'salad-olivier.jpg'},
  { id: 'sal-rucola',      cat: 'salads', ru: 'Руккола со свеклой',   uz: 'Rukkola lavlagi bilan',         price: 50000, img: D + 'salad-rucola-beet.jpg'},
  { id: 'sal-signature',   cat: 'salads', ru: 'Фирменный Ошпалов',    uz: 'Oshpalov firmaviy salati',      price: 65000, img: D + 'salad-signature.jpg', featured: true,
    desc: { ru: 'Фирменный салат шефа — свежие овощи, зелень и мясная нарезка.', uz: 'Oshpazning firmaviy salati — yangi sabzavotlar, koʻkatlar va goʻsht.' } },
  { id: 'sal-maftunkor',   cat: 'salads', ru: 'Мафтункор',            uz: 'Maftunkor',                     price: 52000, img: D + 'salad-maftunkor.jpg'},
  { id: 'sal-achichuk',    cat: 'salads', ru: 'Ачичук',               uz: 'Achchiq-chuchuk',               price: 18000, img: D + 'achichuk.jpg' },
  { id: 'sal-fresh',       cat: 'salads', ru: 'Свежий',               uz: 'Yangi sabzavotli salat',        price: 25000, img: D + 'salad-fresh.jpg' },
  { id: 'sal-bahor',       cat: 'salads', ru: 'Бахор',                uz: 'Bahor',                         price: 18000, img: D + 'salad-bahor.jpg' },
  { id: 'sal-marinated-s', cat: 'salads', ru: 'Маринованное ассорти мал', uz: 'Marinadlangan assorti (kichik)', price: 18000, img: D + 'pickled.jpg' },
  { id: 'sal-marinated-l', cat: 'salads', ru: 'Маринованное ассорти бол', uz: 'Marinadlangan assorti (katta)',  price: 30000, img: D + 'pickled.jpg' },
  { id: 'sal-salted-s',    cat: 'salads', ru: 'Соленое ассорти мал',  uz: 'Tuzlangan assorti (kichik)',    price: 18000, img: D + 'salted.jpg' },
  { id: 'sal-suzma',       cat: 'salads', ru: 'Сузьма',               uz: 'Suzma',                         price: 20000, img: D + 'suzma.jpg' },
  { id: 'sal-chiroqchi',   cat: 'salads', ru: 'Чирокчи',              uz: 'Chiroqchi',                     price: 25000, img: D + 'chiroqchi.jpg' },

  /* ---------- Хлеб ---------- */
  { id: 'bread-patir',     cat: 'bread', ru: 'Патыр кульча',                  uz: 'Patir kulcha',                     price: 7000, img: D + 'patir.jpg' },
  { id: 'bread-assorti',   cat: 'bread', ru: 'Хлебное ассорти (по заказу)',   uz: 'Non assorti (buyurtma boʻyicha)',  price: 30000, img: D + 'bread-assorti.jpg' },

  /* ---------- Первые блюда ---------- */
  { id: 'soup-kuza',       cat: 'first', ru: 'Куза Шурва',          uz: 'Koʻza shoʻrva',          price: 55000, img: D + 'kuza-shurva.jpg', featured: true,
    desc: { ru: 'Наваристая шурпа, томлённая в глиняном горшочке.', uz: 'Sopol koʻzada dimlangan quyuq shoʻrva.' } },
  { id: 'soup-mastava',    cat: 'first', ru: 'Мастава',             uz: 'Mastava',                price: 36000, img: D + 'mastava.jpg'},
  { id: 'soup-chuchvara',  cat: 'first', ru: 'Чучвара',             uz: 'Chuchvara',              price: 38000, img: D + 'chuchvara.jpg'},
  { id: 'soup-noodle',     cat: 'first', ru: 'Куриная Лапша',       uz: 'Tovuqli lapsha',         price: 34000, img: D + 'chicken-noodle.jpg' },
  { id: 'soup-meatball',   cat: 'first', ru: 'Фрикадельки',         uz: 'Frikadelkali shoʻrva',   price: 38000, img: D + 'meatball-soup.jpg' },
  { id: 'soup-kaynatma',   cat: 'first', ru: 'Кайнатма Шурва',      uz: 'Qaynatma shoʻrva',       price: 56000, img: D + 'kaynatma-shurva.jpg'},
  { id: 'soup-darmon',     cat: 'first', ru: 'Дармон Шурва',        uz: 'Darmon shoʻrva',         price: 65000, img: D + 'darmon-shurva.jpg'},
  { id: 'soup-lentil',     cat: 'first', ru: 'Суп чечевичный',      uz: 'Yasmiq shoʻrva',         price: 25000, img: D + 'lentil-soup.jpg' },
  { id: 'soup-borsch',     cat: 'first', ru: 'Украинский Борщ',     uz: 'Ukraincha borshch',      price: 38000, img: D + 'borscht.jpg' },
  { id: 'soup-norin',      cat: 'first', ru: 'Бульон Норын',        uz: 'Norin bulyoni',          price: 10000, img: D + 'norin-broth.jpg' },
  { id: 'soup-khash',      cat: 'first', ru: 'Хаш',                 uz: 'Xash',                   price: 50000, img: D + 'khash.jpg' },
  { id: 'soup-kuksi',      cat: 'first', ru: 'Кукси (сезонное)',    uz: 'Kuksi (mavsumiy)',       price: 50000, img: D + 'kuksi.jpg' },
  { id: 'soup-okroshka',   cat: 'first', ru: 'Окрошка (сезонное)',  uz: 'Okroshka (mavsumiy)',    price: 30000, img: D + 'okroshka.jpg' },

  /* ---------- Уйгурская кухня ---------- */
  { id: 'uy-lagman',       cat: 'uyghur', ru: 'Лагман',          uz: 'Lagʻmon',             price: 50000, img: D + 'lagman.jpg', featured: true,
    desc: { ru: 'Тянутая вручную лапша с мясом и овощами.', uz: 'Qoʻlda choʻzilgan lagʻmon, goʻsht va sabzavotlar bilan.' } },
  { id: 'uy-fried-lagman', cat: 'uyghur', ru: 'Жаренный Лагман', uz: 'Qovurilgan lagʻmon',  price: 55000, img: D + 'lagman-fried.jpg'},
  { id: 'uy-sokoro',       cat: 'uyghur', ru: 'Сокоро',          uz: 'Sokoro',              price: 90000, img: D + 'sokoro.jpg'},
  { id: 'uy-sumboro',      cat: 'uyghur', ru: 'Сумборо',         uz: 'Sumboro',             price: 80000, img: D + 'sumboro.jpg'},
  { id: 'uy-gushtsay',     cat: 'uyghur', ru: 'Гуштсай',         uz: 'Goʻshtsay',           price: 75000, img: D + 'gushtsay.jpg'},
  { id: 'uy-mampar',       cat: 'uyghur', ru: 'Мампар',          uz: 'Mampar',              price: 41000, img: D + 'mampar.jpg' },
  { id: 'uy-ayrim-say',    cat: 'uyghur', ru: 'Айрим сай',       uz: 'Ayrim say',           price: 55000, img: D + 'ayrim-say.jpg'},
  { id: 'uy-ganfan',       cat: 'uyghur', ru: 'Ганфан',          uz: 'Ganfan',              price: 51000, img: D + 'ganfan.jpg' },

  /* ---------- Вторые блюда ---------- */
  { id: 'main-kazan',      cat: 'second', ru: 'Казон Кабоб',                  uz: 'Qozon kabob',                  price: 95000, img: D + 'kazan-kabob.jpg', featured: true,
    desc: { ru: 'Мясо, обжаренное в казане до золотистой корочки.', uz: 'Qozonda tillarang qilib qovurilgan goʻsht.' } },
  { id: 'main-chicken',    cat: 'second', ru: 'Хрустящий сливочный цыпленок', uz: 'Qarsildoq qaymoqli joʻja',     price: 65000, img: D + 'cream-chicken.jpg' },
  { id: 'main-assorti',    cat: 'second', ru: 'Ассорти',                      uz: 'Assorti',                      price: 95000, img: D + 'assorti.jpg'},
  { id: 'main-nokhat',     cat: 'second', ru: 'Нохат шурак',                  uz: 'Noʻxat shoʻrak',               price: 60000, img: D + 'nokhat-shurak.jpg', featured: true,
    desc: { ru: 'Нут с отварным мясом, луком и специями.', uz: 'Qaynatilgan goʻsht, piyoz va ziravorlar bilan noʻxat.' } },
  { id: 'main-jiz',        cat: 'second', ru: 'Жиз',                          uz: 'Jiz',                          price: 95000, img: D + 'jiz.jpg'},
  { id: 'main-tushenka',   cat: 'second', ru: 'Тушенка',                      uz: 'Tushonka',                     price: 86000, img: D + 'tushenka.jpg' },
  { id: 'main-steak',      cat: 'second', ru: 'Бифштекс',                     uz: 'Bifshteks',                    price: 45000, img: D + 'bifshteks.jpg' },
  { id: 'main-stroganoff', cat: 'second', ru: 'Бифстроганов',                 uz: 'Befstroganov',                 price: 60000, img: D + 'stroganoff.jpg' },
  { id: 'main-dolma',      cat: 'second', ru: 'Долма',                        uz: 'Doʻlma',                       price: 50000, img: D + 'dolma.jpg' },
  { id: 'main-golubtsy',   cat: 'second', ru: 'Голубцы',                      uz: 'Golubsi',                      price: 52000, img: D + 'golubtsy.jpg' },
  { id: 'main-potato',     cat: 'second', ru: 'Картошка по домашнему (в сливочном соусе)', uz: 'Uycha kartoshka (qaymoqli sousda)', price: 65000, img: D + 'home-potato.jpg' },
  { id: 'main-manti',      cat: 'second', ru: 'Манты',                        uz: 'Manti',                        price: 12000, img: D + 'manti.jpg',
    review: 'Printed as 12 000 without a unit; the fried variant below is marked "(1шт)". Confirm whether this is per piece.' },
  { id: 'main-fried-manti', cat: 'second', ru: 'Жаренный манты (1шт)',         uz: 'Qovurilgan manti (1 dona)',    price: 15000, img: D + 'fried-manti.jpg'},
  { id: 'main-norin',      cat: 'second', ru: 'Норин',                        uz: 'Norin',                        price: 38000, img: D + 'norin.jpg' },

  /* ---------- Шашлык ---------- */
  { id: 'kebab-beef',      cat: 'shashlik', ru: 'Кусковой Говяжий', uz: 'Mol goʻshtidan boʻlakli', price: 27000, img: D + 'shashlik-beef.jpg', featured: true,
    desc: { ru: 'Сочная говядина на углях.', uz: 'Choʻgʻda pishirilgan suvli mol goʻshti.' } },
  { id: 'kebab-minced',    cat: 'shashlik', ru: 'Молотый',          uz: 'Qiymali',                 price: 22000, img: D + 'shashlik-minced.jpg'},
  { id: 'kebab-chicken',   cat: 'shashlik', ru: 'Куриный',          uz: 'Tovuqli',                 price: 20000, img: D + 'shashlik-chicken.jpg'},
  { id: 'kebab-liver',     cat: 'shashlik', ru: 'Печень',           uz: 'Jigar',                   price: 22000, img: D + 'shashlik-liver.jpg'},

  /* ---------- Плов ---------- */
  { id: 'plov-set',        cat: 'plov', ru: 'Свадебный плов комплект',     uz: 'Toʻy oshi (komplekt)',     price: 62000, img: D + 'plov.jpg', featured: true,
    desc: { ru: 'Свадебный плов с казы, долмой и перепелиными яйцами.', uz: 'Qazi, doʻlma va bedana tuxumi bilan toʻy oshi.' },
    review: 'The set contents in the description are inferred from the menu photo — confirm with the restaurant.' },
  { id: 'plov-set-07',     cat: 'plov', ru: 'Свадебный плов комплект 0,7', uz: 'Toʻy oshi (komplekt) 0,7', price: 58000, img: D + 'plov-table.jpg'},
  { id: 'plov-wedding',    cat: 'plov', ru: 'Свадебный плов',              uz: 'Toʻy oshi',                price: 49000, img: D + 'plov-hero.jpg'},
  { id: 'plov-wedding-07', cat: 'plov', ru: 'Свадебный плов 0,7',          uz: 'Toʻy oshi 0,7',            price: 45000, img: D + 'plov-table.jpg'},
  { id: 'plov-kazy',       cat: 'plov', group: 'plovExtras', ru: 'Казы',              uz: 'Qazi',              price: 12000 },
  { id: 'plov-meat',       cat: 'plov', group: 'plovExtras', ru: 'Доп мясо',          uz: 'Qoʻshimcha goʻsht', price: 22000 },
  { id: 'plov-dolma',      cat: 'plov', group: 'plovExtras', ru: 'Долма',             uz: 'Doʻlma',            price: 5000 },
  { id: 'plov-eggs',       cat: 'plov', group: 'plovExtras', ru: 'Яйца перепелиные',  uz: 'Bedana tuxumi',     price: 2000 },

  /* ---------- Самса ---------- */
  { id: 'samsa-meat',      cat: 'samsa', ru: 'С мясом',            uz: 'Goʻshtli',             price: 13000, img: D + 'samsa-meat.jpg', featured: true,
    desc: { ru: 'Слоёная самса с сочной мясной начинкой.', uz: 'Suvli goʻsht qiymali qatlama somsa.' } },
  { id: 'samsa-chicken',   cat: 'samsa', ru: 'С курицей',          uz: 'Tovuqli',              price: 10000, img: D + 'samsa-chicken.jpg'},
  { id: 'samsa-potato',    cat: 'samsa', ru: 'С картошкой',        uz: 'Kartoshkali',          price: 8000,  img: D + 'samsa-potato.jpg'},
  { id: 'samsa-greens',    cat: 'samsa', ru: 'С зеленью (сезонное)', uz: 'Koʻkatli (mavsumiy)', price: 8000,  img: D + 'samsa-tandir.jpg'},

  /* ---------- Закуски ---------- */
  { id: 'snk-nuggets',     cat: 'snacks', ru: 'Наггетсы',          uz: 'Nagetslar',              price: 35000, img: D + 'nuggets.jpg' },
  { id: 'snk-cheese',      cat: 'snacks', ru: 'Сырные подушечки',  uz: 'Pishloqli yostiqchalar', price: 30000, img: D + 'cheese-pillows.jpg' },
  { id: 'snk-onion',       cat: 'snacks', ru: 'Луковые кольца',    uz: 'Piyoz halqalari',        price: 28000, img: D + 'onion-rings.jpg' },
  { id: 'snk-garlic',      cat: 'snacks', ru: 'Чесночный соус',    uz: 'Sarimsoqli sous',        price: 8000, img: D + 'garlic-sauce.jpg' },
  { id: 'snk-ketchup',     cat: 'snacks', ru: 'Кетчуп соус',       uz: 'Ketchup sousi',          price: 6000, img: D + 'ketchup.jpg' },
  { id: 'snk-cheese-sauce', cat: 'snacks', ru: 'Сырный соус',      uz: 'Pishloqli sous',         price: 10000, img: D + 'cheese-sauce.jpg' },

  /* ---------- Гарниры ---------- */
  { id: 'gar-fries',       cat: 'garnish', ru: 'Картошка фри',  uz: 'Kartoshka fri',      price: 25000, img: D + 'fries.jpg' },
  { id: 'gar-rice',        cat: 'garnish', ru: 'Рис',           uz: 'Guruch',             price: 15000, img: D + 'rice.jpg' },
  { id: 'gar-mash',        cat: 'garnish', ru: 'Пюре',          uz: 'Kartoshka pyuresi',  price: 15000, img: D + 'mash.jpg' },
  { id: 'gar-buckwheat',   cat: 'garnish', ru: 'Гречка',        uz: 'Grechka',            price: 15000, img: D + 'buckwheat.jpg' },

  /* ---------- Добавки ---------- */
  { id: 'ext-pepper',      cat: 'extras', ru: 'Перец стручковый', uz: 'Achchiq qalampir',  price: 5000, img: D + 'chili.jpg' },
  { id: 'ext-kefir',       cat: 'extras', ru: 'Кефир',            uz: 'Kefir',             price: 10000, img: D + 'kefir.jpg' },
  { id: 'ext-smetana',     cat: 'extras', ru: 'Сметана',          uz: 'Smetana',           price: 10000, img: D + 'smetana.jpg' },
  { id: 'ext-egg',         cat: 'extras', ru: 'Жареное яйцо',     uz: 'Qovurilgan tuxum',  price: 8000, img: D + 'fried-egg.jpg' },
  { id: 'ext-cutlet',      cat: 'extras', ru: 'Котлета',          uz: 'Kotlet',            price: 18000, img: D + 'cutlet.jpg' },

  /* ---------- Напитки ---------- */
  { id: 'drk-compot-03',   cat: 'drinks', ru: 'Компот (стакан 0,3 л)', uz: 'Kompot (stakan 0,3 l)', price: 8000, img: D + 'compot.jpg' },
  { id: 'drk-compot-1',    cat: 'drinks', ru: 'Компот 1 л',           uz: 'Kompot 1 l',            price: 20000, img: D + 'compot-jug.jpg' },
  { id: 'drk-bonaqua-05',  cat: 'drinks', ru: 'Bonaqua 0,5 л',        uz: 'Bonaqua 0,5 l',         price: 6000, img: D + 'water-bottle.jpg' },
  { id: 'drk-bonaqua-15',  cat: 'drinks', ru: 'Bonaqua 1,5 л',        uz: 'Bonaqua 1,5 l',         price: 8000, img: D + 'water-bottle.jpg' },
  { id: 'drk-fuse-05',     cat: 'drinks', ru: 'Fuse tea 0,5 л',       uz: 'Fuse tea 0,5 l',        price: 10000, img: D + 'iced-tea.jpg' },
  { id: 'drk-fuse-1',      cat: 'drinks', ru: 'Fuse tea 1 л',         uz: 'Fuse tea 1 l',          price: 15000, img: D + 'iced-tea.jpg' },
  { id: 'drk-chortoq-033', cat: 'drinks', ru: 'Chortoq 0,33 л',       uz: 'Chortoq 0,33 l',        price: 14000, img: D + 'sparkling.jpg' },
  { id: 'drk-chortoq-05',  cat: 'drinks', ru: 'Chortoq 0,5 л',        uz: 'Chortoq 0,5 l',         price: 18000, img: D + 'sparkling.jpg' },
  { id: 'drk-chortoq-075', cat: 'drinks', ru: 'Chortoq 0,75 л',       uz: 'Chortoq 0,75 l',        price: 22000, img: D + 'sparkling.jpg' },
  { id: 'drk-cola-025',    cat: 'drinks', ru: 'Coca cola/Fanta/Sprite 0,25 л', uz: 'Coca cola/Fanta/Sprite 0,25 l', price: 10000, img: D + 'cola-bottle.jpg' },
  { id: 'drk-cola-05',     cat: 'drinks', ru: 'Coca cola/Fanta/Sprite 0,5 л',  uz: 'Coca cola/Fanta/Sprite 0,5 l',  price: 10000, img: D + 'cola-glass.jpg',
    review: 'Printed with the same price as the 0,25 л bottle (10 000). Confirm this is not a typo.' },
  { id: 'drk-cola-15',     cat: 'drinks', ru: 'Coca cola/Fanta/Sprite 1,5 л',  uz: 'Coca cola/Fanta/Sprite 1,5 l',  price: 20000, img: D + 'cola-large.jpg' },

  /* ---------- Чай ---------- */
  { id: 'tea-black',       cat: 'tea', ru: 'Черный чай',      uz: 'Qora choy',          price: 7000, img: D + 'tea-black.jpg' },
  { id: 'tea-green',       cat: 'tea', ru: 'Зеленый чай',     uz: 'Koʻk choy',          price: 7000, img: D + 'tea-green.jpg' },
  { id: 'tea-lemon',       cat: 'tea', ru: 'Чай с лимоном',   uz: 'Limonli choy',       price: 12000, img: D + 'tea-lemon.jpg' },
  { id: 'tea-navat',       cat: 'tea', ru: 'Чай с наватом',   uz: 'Novvotli choy',      price: 12000, img: D + 'tea-navat.jpg' },
  { id: 'tea-add-navat',   cat: 'tea', ru: 'Добавка навата',  uz: 'Qoʻshimcha novvot',  price: 5000, img: D + 'navat.jpg' },
  { id: 'tea-add-lemon',   cat: 'tea', ru: 'Добавка лимона',  uz: 'Qoʻshimcha limon',   price: 5000, img: D + 'lemon.jpg' }
];

/* Gallery — dish photos supplied by the client plus licensed stock images
   (Unsplash / Wikimedia Commons) for dishes without a supplied photo;
   atmosphere photos are representative stock images for the demo. */
const GALLERY = [
  { src: D + 'plov-hero.jpg',        group: 'plov',       ru: 'Плов',                    uz: 'Osh' },
  { src: D + 'kazan-kabob.jpg',      group: 'dishes',     ru: 'Казон кабоб',             uz: 'Qozon kabob' },
  { src: IMG + 'interior-hall.jpg',  group: 'atmosphere', ru: 'Сервированный зал',       uz: 'Bezatilgan zal' },
  { src: D + 'lagman.jpg',           group: 'dishes',     ru: 'Лагман',                  uz: 'Lagʻmon' },
  { src: D + 'shashlik-beef.jpg',    group: 'grill',      ru: 'Шашлык на углях',         uz: 'Choʻgʻda shashlik' },
  { src: D + 'salad-eggplant.jpg',   group: 'salads',     ru: 'Хрустящий баклажан',      uz: 'Qarsildoq baqlajon' },
  { src: D + 'plov.jpg',             group: 'plov',       ru: 'Свадебный плов',          uz: 'Toʻy oshi' },
  { src: D + 'samsa-tandir.jpg',     group: 'grill',      ru: 'Самса из тандыра',        uz: 'Tandir somsa' },
  { src: D + 'nokhat-shurak.jpg',    group: 'dishes',     ru: 'Нохат шурак',             uz: 'Noʻxat shoʻrak' },
  { src: D + 'salad-signature.jpg',  group: 'salads',     ru: 'Фирменный Ошпалов',       uz: 'Oshpalov firmaviy salati' },
  { src: IMG + 'hero-dining.jpg',    group: 'atmosphere', ru: 'Ужин при свечах',         uz: 'Shamlar yonidagi kechki ovqat' },
  { src: D + 'kuza-shurva.jpg',      group: 'dishes',     ru: 'Куза шурва',              uz: 'Koʻza shoʻrva' },
  { src: D + 'plov-table.jpg',       group: 'plov',       ru: 'Плов на лягане',          uz: 'Lagandagi osh' },
  { src: D + 'shashlik-minced.jpg',  group: 'grill',      ru: 'Люля-кебаб',              uz: 'Qiymali kabob' },
  { src: D + 'salad-greek.jpg',      group: 'salads',     ru: 'Греческий салат',         uz: 'Grek salati' },
  { src: D + 'sokoro.jpg',           group: 'dishes',     ru: 'Сокоро',                  uz: 'Sokoro' },
  { src: IMG + 'interior-warm.jpg',  group: 'atmosphere', ru: 'Тёплый вечер в зале',     uz: 'Zalda iliq oqshom' },
  { src: D + 'samsa-meat.jpg',       group: 'grill',      ru: 'Самса с мясом',           uz: 'Goʻshtli somsa' },
  { src: D + 'kaynatma-shurva.jpg',  group: 'dishes',     ru: 'Кайнатма шурва',          uz: 'Qaynatma shoʻrva' },
  { src: D + 'salad-eggplant-tomato.jpg', group: 'salads', ru: 'Салат с баклажанами',    uz: 'Baqlajonli salat' },
  { src: D + 'assorti.jpg',          group: 'grill',      ru: 'Мясное ассорти',          uz: 'Goʻshtli assorti' },
  { src: D + 'manti-yogurt.jpg',     group: 'dishes',     ru: 'Манты с катыком',         uz: 'Qatiqli manti' },
  { src: D + 'tea-black.jpg',        group: 'atmosphere', ru: 'Чай для гостей',          uz: 'Mehmonlar uchun choy' },
  { src: D + 'salad-caesar.jpg',     group: 'salads',     ru: 'Цезарь',                  uz: 'Sezar' },
  { src: D + 'jiz.jpg',              group: 'dishes',     ru: 'Жиз',                     uz: 'Jiz' },
  { src: D + 'shashlik-chicken.jpg', group: 'grill',      ru: 'Куриный шашлык',          uz: 'Tovuqli shashlik' },
  { src: IMG + 'interior-evening.jpg', group: 'atmosphere', ru: 'Вечерний свет',         uz: 'Oqshom chiroqlari' },
  { src: D + 'lagman-fried.jpg',     group: 'dishes',     ru: 'Жаренный лагман',         uz: 'Qovurilgan lagʻmon' }
];

/* DEMO PLACEHOLDERS — the client has not provided contact details yet.
   Replace every value below before going live. */
const CONTACTS = {
  phone: '+998 (00) 000-00-00',       // DEMO PLACEHOLDER
  phoneHref: 'tel:+998000000000',     // DEMO PLACEHOLDER
  email: 'info@oshpalov.example',     // DEMO PLACEHOLDER
  address: { ru: 'Адрес ресторана — уточняется', uz: 'Restoran manzili — aniqlanmoqda' }, // DEMO PLACEHOLDER
  hours: { ru: 'Часы работы — уточняются', uz: 'Ish vaqti — aniqlanmoqda' },              // DEMO PLACEHOLDER
  social: [                                                                             // DEMO PLACEHOLDERS
    { name: 'Instagram', href: '#' },
    { name: 'Telegram',  href: '#' },
    { name: 'Facebook',  href: '#' }
  ]
};
