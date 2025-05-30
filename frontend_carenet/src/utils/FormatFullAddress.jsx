export const formatFullAddress = (fullAddress) => {
  return `${fullAddress.street || null}, ${fullAddress.ward || null}, ${
    fullAddress.district || null
  }, ${fullAddress.province || null}`;
};
