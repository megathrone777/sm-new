export type TSendSmsInput = {
  number: string;
  text: string;
};

export type TBulkgateResponse = {
  data?: {
    status?: string;
  };
};
