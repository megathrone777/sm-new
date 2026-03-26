const getData = async (url: string): Promise<unknown> => {
  const response = await fetch(
    `https://sushiman-office.cz/api/${url}?populate=*&populate=[productCategory][populate][0]=*`,
    {
      cache: "no-store",
      headers: {
        authorization:
          "Bearer 8112224443e79a579cc759a320e9b78e0bd5ea3bddde018c8892a4a5aec656754d1af3871cdeac33924ad9b8f2bd5ecf392a95bd63f708c083997d2bf3992083a6d093cd03c81cd50cdc9d4c4b1901d5ef8c20ea8911f206180b2b313aa5f1959bf538e018353207822ea25071f55b9226d4a8969455c8d0b5ad2a39249ccd7b",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch data");
  }

  return await response.json();
};

export { getData };
