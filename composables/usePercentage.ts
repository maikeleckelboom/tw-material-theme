export const usePercentage = (initialValue: number = 0) => {
  const percentage = ref<number>(initialValue);
  const setPercentage = (value: number): void => {
    percentage.value = value;
  };
  return {
    percentage,
    setPercentage,
  };
};
