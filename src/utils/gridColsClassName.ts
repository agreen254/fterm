function getColsClassName(cols: number) {
  switch (cols) {
    case 1:
      return "grid grid-cols-1";
    case 2:
      return "grid grid-cols-2";
    case 3:
      return "grid grid-cols-3";
    default:
      return "grid grid-cols-4";
  }
}

export default getColsClassName;
