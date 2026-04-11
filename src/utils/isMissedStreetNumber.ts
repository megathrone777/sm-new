const isMissedStreetNumber = (address: string): boolean => {
  const reAddress = /.* \d{1,}(\/\d*)?([a-záčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ])?$/;

  return !reAddress.test(address);
};

export { isMissedStreetNumber };
