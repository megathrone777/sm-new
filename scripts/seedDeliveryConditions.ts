import { deliveryConditions } from "../src/store/deliveryConditions";

type TSeedCondition = {
  distanceFrom: number;
  distanceTo: number;
  id: number;
  minimumOrderPrice: number;
  price: number;
  text: string;
  title: string;
};

const seedData: TSeedCondition[] = [
  {
    distanceFrom: 0,
    distanceTo: 1500,
    id: 1,
    minimumOrderPrice: 100,
    price: 0,
    text: "",
    title: "Бесплатная",
  },
  {
    distanceFrom: 1500,
    distanceTo: 3000,
    id: 6,
    minimumOrderPrice: 100,
    price: 30,
    text: "",
    title: "Пониженая",
  },
  {
    distanceFrom: 3000,
    distanceTo: 5000,
    id: 2,
    minimumOrderPrice: 100,
    price: 70,
    text: "",
    title: "Обычная",
  },
  {
    distanceFrom: 5000,
    distanceTo: 7000,
    id: 3,
    minimumOrderPrice: 300,
    price: 120,
    text: "",
    title: "Повышенная",
  },
  {
    distanceFrom: 7000,
    distanceTo: 9000,
    id: 4,
    minimumOrderPrice: 300,
    price: 160,
    text: "",
    title: "Экстра",
  },
  {
    distanceFrom: 9000,
    distanceTo: 10000,
    id: 5,
    minimumOrderPrice: 300,
    price: 200,
    text: "",
    title: "Экстра +",
  },
  {
    distanceFrom: 10000,
    distanceTo: 12500,
    id: 7,
    minimumOrderPrice: 300,
    price: 230,
    text: "",
    title: "Экстра ++",
  },
];

const main = async (): Promise<void> => {
  if (!process.env.APP_KV_REST_API_URL || !process.env.APP_KV_REST_API_TOKEN) {
    throw new Error("APP_KV_REST_API_URL / APP_KV_REST_API_TOKEN missing in env");
  }

  for (const condition of seedData) {
    await deliveryConditions.set(condition);
    console.log(
      `seeded: ${condition.title} (${condition.distanceFrom}–${condition.distanceTo} m)`,
    );
  }

  console.log(`\nSeeded ${seedData.length} delivery conditions.`);
};

main().catch((err: unknown): never => {
  console.error(err);
  process.exit(1);
});
