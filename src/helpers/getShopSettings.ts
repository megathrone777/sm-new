const getShopSettings = async (): Promise<TShopSettings> => ({
  address: "Milíčova 471/25",
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
      type: "tel",
    },
  ],
  deliveryTimeOptions: ["21:00", "21:30", "22:00"],
  email: "sushimanprague@gmail.com",
  isAvailable: true,
  isOpened: true,
  logoUrl: "/uploads/logo_img.svg",
  phone: "+420 792 745 116",
  privacyPolicy: "Zásady ochrany osobních údajů",
  termsOfUse: "Všeobecné obchodní podmínky",
  text: `Rozvoz :  Pn. - Čt., Ne. 11:00-22:00<br />\n' +
    'Noční rozvoz:  Pá. - So. 11:00-22:30<br />\n' +
    'Restaurace:  Pn. - Ne. 17:00-22:00`,
  title: "Rozvážíme",
});

export { getShopSettings };
