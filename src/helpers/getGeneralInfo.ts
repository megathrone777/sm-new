import { getClient } from "~/lib";

const getGeneralInfo = async (): Promise<TGeneralInfo> => {
  const initialInfo: TGeneralInfo = {
    address: "",
    businessName: "",
    companyDetails: "",
    contactItems: [],
    email: "",
    logo: "",
    phone: "",
    privacyPolicy: "",
    termsOfUse: "",
  };

  try {
    const client = await getClient();
    const generalInfo = (await client.hGetAll("generalInfo")) as unknown as TGeneralInfo;

    if (generalInfo && !!Object.keys(generalInfo).length) {
      return generalInfo;
    }

    return initialInfo;
  } catch (error) {
    console.error("Cannot get products: ", error);

    return initialInfo;
  }
};

export { getGeneralInfo };
