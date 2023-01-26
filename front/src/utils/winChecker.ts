const checkRow = (field: number[][], rowIndex: number) => {
  const icon = field[rowIndex][0];
  return field.some(row => row.every(n => n === icon && n !== 0));
};

const checkColumn = (field: number[][], columnIndex: number, size: number) => {
  const icon = field[0][columnIndex];

  const column: number[] = [];
  for (let i = 0; i < size; i++) {
    column.push(field[i][columnIndex]);
  }

  return column.every(e => e === icon);
};

const checkDiagonal = (matrix: number[][], size: number, main: boolean) => {
  const icon = main ? matrix[0][0] : matrix[0].at(-1);

  const diagonal: number[] = [];
  for (let i = 0; i < size; i++) {
    if (main) {
      diagonal.push(matrix[i][i]);
    } else {
      diagonal.push(matrix[i][size - 1 - i]);
    }
  }

  return diagonal.every(e => e === icon && e !== 0);
};

export const winChecker = (field: number[], size: number) => {
  const copy = [...field];

  const matrixView: number[][] = [];

  for (let i = 0; i < size; i++) {
    matrixView.push(copy.splice(0, size));
  }

  let ans = checkDiagonal(matrixView, size, true);
  if (ans) {
    return matrixView[0][0];
  }

  ans = checkDiagonal(matrixView, size, false);
  if (ans) {
    return matrixView[0].at(-1);
  }

  for (let i = 0; i < size; i++) {
    ans = checkRow(matrixView, i);
    if (ans) {
      return matrixView[i][0];
    }
    ans = checkColumn(matrixView, i, size);
    if (ans) return matrixView[0][i];
  }
};
