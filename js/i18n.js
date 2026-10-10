/* ==========================================================================
   OSHPALOV — translations (RU default, UZ Latin)
   Markup hooks:
     data-i18n="key"              -> textContent
     data-i18n-placeholder="key"  -> placeholder
     data-i18n-aria="key"         -> aria-label
     data-i18n-alt="key"          -> alt
     data-i18n-title="key"        -> document title (on <title>)
   ========================================================================== */

const I18N = {
  ru: {
    /* common */
    'skip': 'Перейти к содержанию',
    'nav.home': 'Главная',
    'nav.menu': 'Меню',
    'nav.about': 'О ресторане',
    'nav.gallery': 'Галерея',
    'nav.contacts': 'Контакты',
    'nav.reserve': 'Забронировать',
    'nav.open': 'Открыть меню навигации',
    'nav.close': 'Закрыть меню навигации',
    'nav.main': 'Основная навигация',
    'lang.label': 'Выбор языка',
    'logo.alt': 'Логотип OSHPALOV',
    'currency': 'сум',
    'service.note': 'Обслуживание — 15%',
    'service.hint': 'Указано в меню ресторана. Не включено в цены блюд.',
    'toTop': 'Наверх',
    'alt.hall': 'Сервированный зал ресторана',
    'alt.grill': 'Шашлык с мангала',
    'img.fallback': 'Фото скоро появится',
    'footer.tagline': 'Узбекская кухня, гостеприимство и тёплая атмосфера за большим дастарханом.',
    'footer.nav': 'Навигация',
    'footer.contacts': 'Контакты',
    'footer.follow': 'Мы в соцсетях',
    'footer.demo': 'Демонстрационная версия сайта. Контактные данные — образец.',
    'footer.rights': 'Все права защищены.',

    /* home */
    'title.home': 'OSHPALOV — Настоящий вкус Востока',
    'home.eyebrow': 'Узбекская кухня',
    'home.title': 'Настоящий вкус Востока',
    'home.lead': 'Свадебный плов из казана, наваристые шурпы, уйгурский лагман и шашлык на углях — блюда, которые хочется разделить с близкими.',
    'home.ctaMenu': 'Заказать онлайн',
    'home.ctaAbout': 'О ресторане',
    'home.frameCaption': 'Свадебный плов',
    'home.feat1': 'Свадебный плов',
    'home.feat2': 'Уйгурская кухня',
    'home.feat3': 'Шашлык на углях',
    'home.sigEyebrow': 'Выбор шефа',
    'home.sigTitle': 'Фирменные блюда',
    'home.sigLead': 'Блюда, с которых стоит начать знакомство с OSHPALOV.',
    'home.sigAll': 'Всё меню и заказ',
    'home.catEyebrow': 'Меню',
    'home.catTitle': 'Популярные разделы',
    'home.catLead': 'От лёгких салатов до праздничного плова — выберите раздел меню.',
    'home.catCount': 'позиций',
    'home.introEyebrow': 'О нас',
    'home.introTitle': 'Дастархан, за которым всем рады',
    'home.introText1': 'OSHPALOV — ресторан узбекской кухни, где традиционные рецепты встречаются с современным гостеприимством.',
    'home.introText2': 'Мы готовим плов в казане, лепим самсу и манты, томим шурпу и подаём горячий чай — так, как принято встречать дорогих гостей.',
    'home.introCta': 'Узнать больше',
    'home.photoEyebrow': 'С нашей кухни',
    'home.photoTitle': 'Вкус, который видно',
    'home.photoCta': 'Открыть галерею',
    'home.atmoEyebrow': 'Атмосфера',
    'home.atmoQuote': '«Гость в доме — радость в доме»',
    'home.atmoText': 'Уютный зал для семейного ужина, встречи с друзьями или праздника.',
    'home.ctaEyebrow': 'Бронирование',
    'home.ctaTitle': 'Забронируйте стол',
    'home.ctaText': 'Оставьте заявку — и мы подготовим для вас стол к нужному времени.',
    'home.ctaBtn': 'Забронировать стол',
    'home.ctaMenuBtn': 'Сначала меню',

    /* menu */
    'title.menu': 'Меню — OSHPALOV',
    'menu.eyebrow': 'Меню ресторана',
    'menu.title': 'Меню',
    'menu.lead': 'Выбирайте блюда, добавляйте в корзину и оформляйте заказ на доставку, самовывоз или в ресторане. Цены в сумах.',
    'menu.catNav': 'Разделы меню',
    'menu.all': 'Все',
    'menu.searchLabel': 'Поиск по меню',
    'menu.searchPh': 'Найти блюдо…',
    'menu.searchClear': 'Очистить поиск',
    'menu.sigTitle': 'Фирменные блюда',
    'menu.sigLead': 'Рекомендации шефа',
    'menu.emptyTitle': 'Ничего не найдено',
    'menu.emptyText': 'Попробуйте изменить запрос или выбрать другой раздел.',
    'menu.reset': 'Сбросить фильтры',
    'menu.results': 'Найдено позиций: {n}',
    'menu.backTop': 'К началу меню',
    'menu.plovExtras': 'Добавки к плову',
    'menu.priceSoon': 'Цена уточняется',
    'menu.signature': 'Фирменное',

    /* about */
    'title.about': 'О ресторане — OSHPALOV',
    'about.eyebrow': 'О ресторане',
    'about.title': 'Традиции, которые объединяют',
    'about.lead': 'Узбекская кухня — это не только вкус, но и особое отношение к гостю.',
    'about.storyEyebrow': 'Наша история',
    'about.storyTitle': 'Кухня, рождённая у казана',
    'about.storyText1': 'В узбекской традиции застолье — это повод собраться вместе. Плов готовят неспешно, лепёшки подают горячими, а чай наливают первым делом.',
    'about.storyText2': 'В OSHPALOV мы бережно сохраняем эти привычки: готовим по классическим рецептам, подаём щедро и встречаем каждого гостя с теплом.',
    'about.expEyebrow': 'Как у нас принято',
    'about.expTitle': 'Ваш вечер в OSHPALOV',
    'about.exp1Title': 'Тёплая встреча',
    'about.exp1Text': 'Первым делом — пиала горячего чая и свежая патыр кульча.',
    'about.exp2Title': 'Щедрый дастархан',
    'about.exp2Text': 'Салаты, шурпа, плов из казана и шашлык — блюда, которыми принято делиться.',
    'about.exp3Title': 'Неспешная беседа',
    'about.exp3Text': 'Уютный зал, где можно провести вечер с семьёй и друзьями.',
    'about.foodEyebrow': 'С нашей кухни',
    'about.foodTitle': 'Блюда, приготовленные с душой',
    'about.quote': 'Хороший плов готовят не для себя, а для тех, кто сядет за стол.',
    'about.ctaTitle': 'Попробуйте сами',
    'about.ctaText': 'Загляните в меню и выберите блюда для вашего вечера.',
    'about.ctaBtn': 'Перейти в меню',

    /* gallery */
    'title.gallery': 'Галерея — OSHPALOV',
    'gal.eyebrow': 'Галерея',
    'gal.title': 'Вкус в каждом кадре',
    'gal.lead': 'Блюда нашей кухни и атмосфера ресторана.',
    'gal.filter': 'Фильтр галереи',
    'gal.all': 'Все',
    'gal.plov': 'Плов',
    'gal.dishes': 'Горячие блюда',
    'gal.salads': 'Салаты',
    'gal.grill': 'Шашлык и самса',
    'gal.atmosphere': 'Атмосфера',
    'gal.open': 'Открыть фото: {name}',
    'gal.close': 'Закрыть',
    'gal.prev': 'Предыдущее фото',
    'gal.next': 'Следующее фото',
    'gal.dialog': 'Просмотр фото',

    /* contacts */
    'title.contacts': 'Контакты — OSHPALOV',
    'con.eyebrow': 'Контакты',
    'con.title': 'Ждём вас в гости',
    'con.lead': 'Свяжитесь с нами или оставьте заявку на бронирование стола.',
    'con.phone': 'Телефон',
    'con.address': 'Адрес',
    'con.hours': 'Часы работы',
    'con.email': 'Эл. почта',
    'con.social': 'Социальные сети',
    'con.placeholderNote': 'Контактные данные на этой странице — демонстрационные и будут заменены.',
    'con.mapTitle': 'Карта',
    'con.mapText': 'Здесь будет карта с расположением ресторана.',
    'con.formEyebrow': 'Бронирование',
    'con.formTitle': 'Забронировать стол',
    'con.formLead': 'Заполните форму — поля со звёздочкой обязательны.',
    'form.name': 'Имя',
    'form.phone': 'Телефон',
    'form.date': 'Дата',
    'form.time': 'Время',
    'form.guests': 'Количество гостей',
    'form.comment': 'Комментарий',
    'form.optional': 'необязательно',
    'form.namePh': 'Как к вам обращаться',
    'form.phonePh': '+998 90 123 45 67',
    'form.commentPh': 'Пожелания к столу, повод, детский стул…',
    'form.submit': 'Отправить заявку',
    'form.demoNote': 'Демо-форма: данные никуда не отправляются.',
    'form.errorSummary': 'Проверьте выделенные поля.',
    'err.required': 'Заполните это поле.',
    'err.name': 'Введите имя (минимум 2 буквы).',
    'err.phone': 'Введите номер телефона, например +998 90 123 45 67.',
    'err.datePast': 'Дата не может быть в прошлом.',
    'err.guests': 'Укажите от 1 до 50 гостей.',
    'form.successTitle': 'Спасибо, {name}!',
    'form.successText': 'Это демонстрационная форма: заявка не отправлена и бронирование не создано. На рабочем сайте здесь появится подтверждение от ресторана.',
    'form.successDetails': '{date}, {time} · гостей: {guests}',
    'form.again': 'Заполнить снова',
    /* cart & checkout */
    'cart.title': 'Корзина',
    'cart.open': 'Открыть корзину, товаров: {n}',
    'cart.add': 'В корзину',
    'cart.addTo': 'Добавить в корзину: {name}',
    'cart.inc': 'Добавить ещё одну порцию',
    'cart.dec': 'Убрать одну порцию',
    'cart.added': '«{name}» добавлено в корзину',
    'cart.emptyTitle': 'Корзина пуста',
    'cart.emptyText': 'Выберите блюда в меню — они появятся здесь.',
    'cart.toMenu': 'Перейти в меню',
    'cart.subtotal': 'Сумма заказа',
    'cart.note': 'Стоимость доставки и обслуживание рассчитываются при оформлении.',
    'cart.checkout': 'Оформить заказ',
    'cart.clear': 'Очистить корзину',
    'nav.order': 'Заказать онлайн',
    'title.checkout': 'Оформление заказа — OSHPALOV',
    'co.eyebrow': 'Онлайн-заказ',
    'co.title': 'Оформление заказа',
    'co.lead': 'Проверьте заказ, укажите контакты и способ получения.',
    'co.summary': 'Ваш заказ',
    'co.edit': 'Изменить в меню',
    'co.subtotal': 'Блюда',
    'co.service': 'Обслуживание 15%',
    'co.delivery': 'Доставка',
    'co.deliveryTbd': 'уточнит оператор',
    'co.free': '—',
    'co.total': 'Итого',
    'co.contacts': 'Контактные данные',
    'co.type': 'Способ получения',
    'co.typeDelivery': 'Доставка',
    'co.typePickup': 'Самовывоз',
    'co.typeDine': 'В ресторане',
    'co.address': 'Адрес доставки',
    'co.addressPh': 'Улица, дом, квартира, ориентир',
    'co.when': 'Время',
    'co.asap': 'Как можно скорее',
    'co.later': 'Ко времени',
    'co.payment': 'Оплата',
    'co.payCash': 'Наличными',
    'co.payCard': 'Картой при получении',
    'co.submit': 'Подтвердить заказ',
    'co.demoNote': 'Демо: заказ никуда не отправляется и оплата не производится.',
    'co.emptyTitle': 'В корзине пока ничего нет',
    'co.emptyText': 'Добавьте блюда из меню, чтобы оформить заказ.',
    'co.successTitle': 'Спасибо, {name}! Заказ принят',
    'co.successNumber': 'Заказ № {n}',
    'co.successText': 'Это демонстрационная версия: заказ не отправлен в ресторан и оплата не списана. На рабочем сайте здесь появится подтверждение и звонок оператора.',
    'co.successBack': 'Вернуться в меню',
    'co.items': 'позиций: {n}',
    'err.address': 'Укажите адрес доставки.',
    'err.time': 'Укажите время.'
  },

  uz: {
    /* common */
    'skip': 'Asosiy qismga oʻtish',
    'nav.home': 'Bosh sahifa',
    'nav.menu': 'Menyu',
    'nav.about': 'Restoran haqida',
    'nav.gallery': 'Galereya',
    'nav.contacts': 'Aloqa',
    'nav.reserve': 'Joy band qilish',
    'nav.open': 'Navigatsiya menyusini ochish',
    'nav.close': 'Navigatsiya menyusini yopish',
    'nav.main': 'Asosiy navigatsiya',
    'lang.label': 'Tilni tanlash',
    'logo.alt': 'OSHPALOV logotipi',
    'currency': 'soʻm',
    'service.note': 'Xizmat haqi — 15%',
    'service.hint': 'Restoran menyusida koʻrsatilgan. Taomlar narxiga kiritilmagan.',
    'toTop': 'Yuqoriga',
    'alt.hall': 'Restoranning bezatilgan zali',
    'alt.grill': 'Mangaldan shashlik',
    'img.fallback': 'Surat tez orada qoʻshiladi',
    'footer.tagline': 'Oʻzbek oshxonasi, mehmondoʻstlik va katta dasturxon atrofidagi iliq muhit.',
    'footer.nav': 'Navigatsiya',
    'footer.contacts': 'Aloqa',
    'footer.follow': 'Ijtimoiy tarmoqlar',
    'footer.demo': 'Saytning namoyish versiyasi. Aloqa maʼlumotlari — namuna.',
    'footer.rights': 'Barcha huquqlar himoyalangan.',

    /* home */
    'title.home': 'OSHPALOV — Sharqning haqiqiy taʼmi',
    'home.eyebrow': 'Oʻzbek oshxonasi',
    'home.title': 'Sharqning haqiqiy taʼmi',
    'home.lead': 'Qozonda damlangan toʻy oshi, quyuq shoʻrvalar, uygʻurcha lagʻmon va choʻgʻda pishgan shashlik — yaqinlaringiz bilan baham koʻrishni istaydigan taomlar.',
    'home.ctaMenu': 'Onlayn buyurtma',
    'home.ctaAbout': 'Restoran haqida',
    'home.frameCaption': 'Toʻy oshi',
    'home.feat1': 'Toʻy oshi',
    'home.feat2': 'Uygʻur taomlari',
    'home.feat3': 'Choʻgʻda shashlik',
    'home.sigEyebrow': 'Oshpaz tanlovi',
    'home.sigTitle': 'Firmaviy taomlar',
    'home.sigLead': 'OSHPALOV bilan tanishuvni aynan shu taomlardan boshlang.',
    'home.sigAll': 'Toʻliq menyu va buyurtma',
    'home.catEyebrow': 'Menyu',
    'home.catTitle': 'Mashhur boʻlimlar',
    'home.catLead': 'Yengil salatlardan bayramona oshgacha — menyu boʻlimini tanlang.',
    'home.catCount': 'ta taom',
    'home.introEyebrow': 'Biz haqimizda',
    'home.introTitle': 'Hammaga joy topiladigan dasturxon',
    'home.introText1': 'OSHPALOV — anʼanaviy retseptlar zamonaviy mehmondoʻstlik bilan uygʻunlashgan oʻzbek oshxonasi restorani.',
    'home.introText2': 'Biz oshni qozonda damlaymiz, somsa va manti tugamiz, shoʻrvani sekin olovda pishiramiz va issiq choy uzatamiz — aziz mehmonlarni shunday kutib olish odat tusiga kirgan.',
    'home.introCta': 'Batafsil',
    'home.photoEyebrow': 'Oshxonamizdan',
    'home.photoTitle': 'Koʻzga koʻrinadigan taʼm',
    'home.photoCta': 'Galereyani ochish',
    'home.atmoEyebrow': 'Muhit',
    'home.atmoQuote': '«Mehmon — otangdan ulugʻ»',
    'home.atmoText': 'Oilaviy kechki ovqat, doʻstlar bilan uchrashuv yoki bayram uchun shinam zal.',
    'home.ctaEyebrow': 'Joy band qilish',
    'home.ctaTitle': 'Stol band qiling',
    'home.ctaText': 'Ariza qoldiring — stolingizni kerakli vaqtga tayyorlab qoʻyamiz.',
    'home.ctaBtn': 'Stol band qilish',
    'home.ctaMenuBtn': 'Avval menyu',

    /* menu */
    'title.menu': 'Menyu — OSHPALOV',
    'menu.eyebrow': 'Restoran menyusi',
    'menu.title': 'Menyu',
    'menu.lead': 'Taomlarni tanlang, savatga qoʻshing va yetkazib berish, olib ketish yoki restoranda buyurtma bering. Narxlar soʻmda.',
    'menu.catNav': 'Menyu boʻlimlari',
    'menu.all': 'Barchasi',
    'menu.searchLabel': 'Menyudan qidirish',
    'menu.searchPh': 'Taomni topish…',
    'menu.searchClear': 'Qidiruvni tozalash',
    'menu.sigTitle': 'Firmaviy taomlar',
    'menu.sigLead': 'Oshpaz tavsiyalari',
    'menu.emptyTitle': 'Hech narsa topilmadi',
    'menu.emptyText': 'Soʻrovni oʻzgartiring yoki boshqa boʻlimni tanlang.',
    'menu.reset': 'Filtrlarni tozalash',
    'menu.results': 'Topilgan taomlar: {n}',
    'menu.backTop': 'Menyu boshiga',
    'menu.plovExtras': 'Oshga qoʻshimchalar',
    'menu.priceSoon': 'Narx aniqlanmoqda',
    'menu.signature': 'Firmaviy',

    /* about */
    'title.about': 'Restoran haqida — OSHPALOV',
    'about.eyebrow': 'Restoran haqida',
    'about.title': 'Birlashtiruvchi anʼanalar',
    'about.lead': 'Oʻzbek oshxonasi — bu nafaqat taʼm, balki mehmonga boʻlgan alohida eʼtibor hamdir.',
    'about.storyEyebrow': 'Bizning hikoyamiz',
    'about.storyTitle': 'Qozon boshida tugʻilgan oshxona',
    'about.storyText1': 'Oʻzbek anʼanasida dasturxon — birga yigʻilish uchun bahona. Osh shoshilmasdan damlanadi, non issiq holda tortiladi, choy esa birinchi boʻlib quyiladi.',
    'about.storyText2': 'OSHPALOVda biz bu odatlarni ehtiyotkorlik bilan saqlaymiz: klassik retseptlar asosida pishiramiz, saxovat bilan tortamiz va har bir mehmonni iliq kutib olamiz.',
    'about.expEyebrow': 'Bizda shunday odat',
    'about.expTitle': 'OSHPALOVdagi oqshomingiz',
    'about.exp1Title': 'Iliq kutib olish',
    'about.exp1Text': 'Avvalo — bir piyola issiq choy va yangi patir kulcha.',
    'about.exp2Title': 'Saxovatli dasturxon',
    'about.exp2Text': 'Salatlar, shoʻrva, qozonda osh va shashlik — baham koʻriladigan taomlar.',
    'about.exp3Title': 'Shoshilmas suhbat',
    'about.exp3Text': 'Oila va doʻstlar bilan oqshom oʻtkazish mumkin boʻlgan shinam zal.',
    'about.foodEyebrow': 'Oshxonamizdan',
    'about.foodTitle': 'Mehr bilan tayyorlangan taomlar',
    'about.quote': 'Yaxshi osh oʻzing uchun emas, dasturxonga oʻtiradiganlar uchun damlanadi.',
    'about.ctaTitle': 'Oʻzingiz tatib koʻring',
    'about.ctaText': 'Menyuga koʻz tashlang va oqshomingiz uchun taomlarni tanlang.',
    'about.ctaBtn': 'Menyuga oʻtish',

    /* gallery */
    'title.gallery': 'Galereya — OSHPALOV',
    'gal.eyebrow': 'Galereya',
    'gal.title': 'Har bir kadrda taʼm',
    'gal.lead': 'Oshxonamiz taomlari va restoran muhiti.',
    'gal.filter': 'Galereya filtri',
    'gal.all': 'Barchasi',
    'gal.plov': 'Osh',
    'gal.dishes': 'Issiq taomlar',
    'gal.salads': 'Salatlar',
    'gal.grill': 'Shashlik va somsa',
    'gal.atmosphere': 'Muhit',
    'gal.open': 'Suratni ochish: {name}',
    'gal.close': 'Yopish',
    'gal.prev': 'Oldingi surat',
    'gal.next': 'Keyingi surat',
    'gal.dialog': 'Suratni koʻrish',

    /* contacts */
    'title.contacts': 'Aloqa — OSHPALOV',
    'con.eyebrow': 'Aloqa',
    'con.title': 'Sizni mehmonga kutamiz',
    'con.lead': 'Biz bilan bogʻlaning yoki stol band qilish uchun ariza qoldiring.',
    'con.phone': 'Telefon',
    'con.address': 'Manzil',
    'con.hours': 'Ish vaqti',
    'con.email': 'Elektron pochta',
    'con.social': 'Ijtimoiy tarmoqlar',
    'con.placeholderNote': 'Ushbu sahifadagi aloqa maʼlumotlari namunaviy va keyinroq almashtiriladi.',
    'con.mapTitle': 'Xarita',
    'con.mapText': 'Bu yerda restoran joylashuvi koʻrsatilgan xarita boʻladi.',
    'con.formEyebrow': 'Joy band qilish',
    'con.formTitle': 'Stol band qilish',
    'con.formLead': 'Shaklni toʻldiring — yulduzcha belgilangan maydonlar majburiy.',
    'form.name': 'Ism',
    'form.phone': 'Telefon',
    'form.date': 'Sana',
    'form.time': 'Vaqt',
    'form.guests': 'Mehmonlar soni',
    'form.comment': 'Izoh',
    'form.optional': 'ixtiyoriy',
    'form.namePh': 'Sizga qanday murojaat qilaylik',
    'form.phonePh': '+998 90 123 45 67',
    'form.commentPh': 'Stol boʻyicha istaklar, sabab, bolalar stuli…',
    'form.submit': 'Ariza yuborish',
    'form.demoNote': 'Demo-shakl: maʼlumotlar hech qayerga yuborilmaydi.',
    'form.errorSummary': 'Belgilangan maydonlarni tekshiring.',
    'err.required': 'Ushbu maydonni toʻldiring.',
    'err.name': 'Ismingizni kiriting (kamida 2 harf).',
    'err.phone': 'Telefon raqamini kiriting, masalan +998 90 123 45 67.',
    'err.datePast': 'Sana oʻtgan kun boʻlishi mumkin emas.',
    'err.guests': '1 dan 50 gacha mehmon sonini kiriting.',
    'form.successTitle': 'Rahmat, {name}!',
    'form.successText': 'Bu namoyish shakli: ariza yuborilmadi va joy band qilinmadi. Ishchi saytda bu yerda restorandan tasdiq chiqadi.',
    'form.successDetails': '{date}, {time} · mehmonlar: {guests}',
    'form.again': 'Qayta toʻldirish',
    /* cart & checkout */
    'cart.title': 'Savat',
    'cart.open': 'Savatni ochish, mahsulotlar: {n}',
    'cart.add': 'Savatga',
    'cart.addTo': 'Savatga qoʻshish: {name}',
    'cart.inc': 'Yana bir porsiya qoʻshish',
    'cart.dec': 'Bir porsiyani olib tashlash',
    'cart.added': '«{name}» savatga qoʻshildi',
    'cart.emptyTitle': 'Savat boʻsh',
    'cart.emptyText': 'Menyudan taom tanlang — ular shu yerda paydo boʻladi.',
    'cart.toMenu': 'Menyuga oʻtish',
    'cart.subtotal': 'Buyurtma summasi',
    'cart.note': 'Yetkazib berish va xizmat haqi rasmiylashtirishda hisoblanadi.',
    'cart.checkout': 'Buyurtma berish',
    'cart.clear': 'Savatni tozalash',
    'nav.order': 'Onlayn buyurtma',
    'title.checkout': 'Buyurtmani rasmiylashtirish — OSHPALOV',
    'co.eyebrow': 'Onlayn buyurtma',
    'co.title': 'Buyurtmani rasmiylashtirish',
    'co.lead': 'Buyurtmani tekshiring, aloqa maʼlumotlari va olish usulini kiriting.',
    'co.summary': 'Sizning buyurtmangiz',
    'co.edit': 'Menyuda oʻzgartirish',
    'co.subtotal': 'Taomlar',
    'co.service': 'Xizmat haqi 15%',
    'co.delivery': 'Yetkazib berish',
    'co.deliveryTbd': 'operator aniqlaydi',
    'co.free': '—',
    'co.total': 'Jami',
    'co.contacts': 'Aloqa maʼlumotlari',
    'co.type': 'Olish usuli',
    'co.typeDelivery': 'Yetkazib berish',
    'co.typePickup': 'Olib ketish',
    'co.typeDine': 'Restoranda',
    'co.address': 'Yetkazib berish manzili',
    'co.addressPh': 'Koʻcha, uy, xonadon, moʻljal',
    'co.when': 'Vaqt',
    'co.asap': 'Imkon qadar tez',
    'co.later': 'Belgilangan vaqtga',
    'co.payment': 'Toʻlov',
    'co.payCash': 'Naqd pul',
    'co.payCard': 'Olishda karta orqali',
    'co.submit': 'Buyurtmani tasdiqlash',
    'co.demoNote': 'Demo: buyurtma hech qayerga yuborilmaydi va toʻlov olinmaydi.',
    'co.emptyTitle': 'Savatda hozircha hech narsa yoʻq',
    'co.emptyText': 'Buyurtma berish uchun menyudan taom qoʻshing.',
    'co.successTitle': 'Rahmat, {name}! Buyurtma qabul qilindi',
    'co.successNumber': 'Buyurtma № {n}',
    'co.successText': 'Bu namoyish versiyasi: buyurtma restoranga yuborilmadi va toʻlov olinmadi. Ishchi saytda bu yerda tasdiq va operator qoʻngʻirogʻi boʻladi.',
    'co.successBack': 'Menyuga qaytish',
    'co.items': 'pozitsiyalar: {n}',
    'err.address': 'Yetkazib berish manzilini kiriting.',
    'err.time': 'Vaqtni kiriting.'
  }
};

const LANG_KEY = 'oshpalov-lang';
const SUPPORTED_LANGS = ['ru', 'uz'];

let currentLang = null; // in-memory copy, so switching works even without storage

function getLang() {
  if (currentLang) return currentLang;
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (SUPPORTED_LANGS.includes(saved)) currentLang = saved;
  } catch (e) { /* storage unavailable */ }
  return currentLang || 'ru';
}

/* t('key', { n: 3 }) -> translated string with {placeholders} filled */
function t(key, vars) {
  const lang = getLang();
  let str = (I18N[lang] && I18N[lang][key]) ?? I18N.ru[key] ?? key;
  if (vars) {
    Object.keys(vars).forEach(k => { str = str.split('{' + k + '}').join(vars[k]); });
  }
  return str;
}

/* Pick the localized field of a data object: loc({ru, uz}) */
function loc(obj) {
  if (!obj) return '';
  return obj[getLang()] || obj.ru || '';
}

function formatPrice(value) {
  if (value == null) return t('menu.priceSoon');
  const digits = String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return digits + ' ' + t('currency');
}

function applyTranslations(root = document) {
  const lang = getLang();
  document.documentElement.lang = lang === 'uz' ? 'uz-Latn' : 'ru';

  root.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  root.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
  root.querySelectorAll('[data-i18n-aria]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
  root.querySelectorAll('[data-i18n-alt]').forEach(el => { el.alt = t(el.dataset.i18nAlt); });

  const titleEl = document.querySelector('title[data-i18n-title]');
  if (titleEl) document.title = t(titleEl.dataset.i18nTitle);

  document.querySelectorAll('[data-lang-btn]').forEach(btn => {
    const active = btn.dataset.langBtn === lang;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) return;
  currentLang = lang;
  try { localStorage.setItem(LANG_KEY, lang); } catch (e) { /* storage unavailable */ }
  applyTranslations();
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}
