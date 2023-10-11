export const allowOnlyNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
  event.target.value = event.target.value.replace(/[^0-9]/g, "");
};

export const plus5Percent = (number: number) => {
  return number + Math.ceil((number * 0.05) / 10) * 10;
};
