// TODO: implement array helpers using map/filter/reduce.

export function onlyEven(numbers: number[]): number[] {
  return numbers.filter(n => n%2 === 0);
}

export function sumNumbers(numbers: number[]): number {
  return numbers.reduce((acc, n) => acc += n, 0);
}

// export function unique<T>(items: T[]): T[] {
//   let items_unique: T[] = [];
//   items.filter(item => {
//     if(!items_unique.includes(item)) {
//       items_unique.push(item);
//     }
//   });
//   return items_unique;
// }

export function unique<T>(items: T[]): T[] {
  return items.filter((item, index) => items.indexOf(item) === index)
}
