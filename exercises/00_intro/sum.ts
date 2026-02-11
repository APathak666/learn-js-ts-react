// TODO: return the sum of all numbers in the array.
// If the array is empty, return 0.
export function sum(numbers: number[]): number {
  let sum = 0;

  for (const n of numbers) {
    sum += n;
  }

  return sum;
}
