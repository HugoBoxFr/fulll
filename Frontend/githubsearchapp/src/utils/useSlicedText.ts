export const slicedTxt = (value: string) => {
  return value.length > 8 ? `${value.slice(0, 8)}...` : value;
};
