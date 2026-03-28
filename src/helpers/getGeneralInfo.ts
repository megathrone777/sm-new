// import { redis } from "@/lib";

// const getGeneralInfo = async (): Promise<Record<string, TGeneralInfo>> => {
//   const initialInfo: Record<string, TGeneralInfo> = {
//     address: "",
//     businessName: "",
//     companyDetails: "",
//     contactItems: [],
//     email: "",
//     logo: "",
//     phone: "",
//     privacyPolicy: "",
//     termsOfUse: "",
//   };

//   try {
//     const generalInfo = await redis.hgetall<Record<string, TGeneralInfo>>("generalInfo");

//     if (generalInfo && !!Object.keys(generalInfo).length) {
//       return generalInfo;
//     }

//     return initialInfo;
//   } catch (error) {
//     console.error("Cannot get products: ", error);

//     return initialInfo;
//   }
// };

// export { getGeneralInfo };

export const getGeneralInfo = async (): Promise<void> => {};
