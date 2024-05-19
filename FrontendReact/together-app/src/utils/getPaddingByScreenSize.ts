export const getPadding = (width: number) => {
  if (width >= 1800) {
    return 25;
  } else if (width >= 1400) {
    return 20;
  } else if (width >= 992) {
    return 20;
  } else if (width >= 768) {
    return 15;
  } else {
    return 10;
  }
};
