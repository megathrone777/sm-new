const getSettings = async (): Promise<TShopSettings> => ({
  address: "Milíčova 471/25",
  allergeny: "Seznam alergenů",
  allergenyUrl: "/uploads/settings/allergeny_img.jpg",
  businessName: "MSN form s.r.o., IČ: 099 07 017",
  companyDetails: "MSN form s.r.o.\nIČ: 099 07 017\nDIČ: CZ 099 07 017",
  contactItems: [
    {
      link: "https://instagram.com/sushiman_prague",
      type: "instagram",
    },
    { link: "http://t.me/sushimanprague", type: "telegram" },
    {
      link: "https://wa.me/420792745116?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5.%20%D0%A5%D0%BE%D1%87%D1%83%20%D1%81%D0%B4%D0%B5%D0%BB%D0%B0%D1%82%D1%8C%20%D0%B7%D0%B0%D0%BA%D0%B0%D0%B7!",
      type: "whatsapp",
    },
    {
      link: "viber://chat?number=%2B420792745116#/",
      type: "viber",
    },
    {
      link: "tel:+420792745116",
      type: "phone",
    },
  ],
  cutleryPrice: 10,
  deliveryConditions: [
    {
      distanceFrom: 0,
      distanceTo: 1500,
      id: 1,
      minimumOrderPrice: 100,
      price: 0,
      text: "Min. cena objednávky do 2km.",
      title: "Бесплатная",
    },
    {
      distanceFrom: 1500,
      distanceTo: 3000,
      id: 6,
      minimumOrderPrice: 100,
      price: 30,
      text: "Min. cena objednávky od 2km.",
      title: "Пониженая",
    },
    {
      distanceFrom: 3000,
      distanceTo: 5000,
      id: 2,
      minimumOrderPrice: 100,
      price: 70,
      text: "Min. cena objednávky od 3km.",
      title: "Обычная",
    },
    {
      distanceFrom: 5000,
      distanceTo: 7000,
      id: 3,
      minimumOrderPrice: 300,
      price: 120,
      text: "Min. cena objednávky od 5km.",
      title: "Повышенная",
    },
    {
      distanceFrom: 7000,
      distanceTo: 9000,
      id: 4,
      minimumOrderPrice: 300,
      price: 160,
      text: "Min. cena objednávky od 7km.",
      title: "Экстра",
    },
    {
      distanceFrom: 9000,
      distanceTo: 10000,
      id: 5,
      minimumOrderPrice: 300,
      price: 200,
      text: "Min. cena objednávky od 9km.",
      title: "Экстра +",
    },
    {
      distanceFrom: 10000,
      distanceTo: 12500,
      id: 7,
      minimumOrderPrice: 300,
      price: 230,
      text: "Min. cena objednávky od 10km.",
      title: "Экстра ++",
    },
  ],
  deliveryTimeOptions: ["21:00", "21:30", "22:00"],
  email: "sushimanprague@gmail.com",
  isAvailable: true,
  isOpened: true,
  lastTimeForPickup: "21:00",
  logoUrl: "/uploads/settings/logo_img.svg",
  navigation: [
    {
      href: "/#about-section",
      title: "O nas",
    },
    {
      href: "/menu",
      title: "Menu",
    },
    {
      href: "/#delivery-section",
      title: "Doprava a platba",
    },
    {
      href: "/#reviews-section",
      title: "Recenze",
    },
    {
      href: "/contacts",
      title: "Kontakty",
    },
  ],
  phone: "+420 792 745 116",
  privacyPolicy: "Zásady ochrany osobních údajů",
  termsOfUse: "Všeobecné obchodní podmínky",
  text: `Rozvoz :  Pn. - Čt., Ne. 11:00-22:00<br />\n' +
    'Noční rozvoz:  Pá. - So. 11:00-22:30<br />\n' +
    'Restaurace:  Pn. - Ne. 17:00-22:00`,
  title: "Rozvážíme",
});

export { getSettings };
