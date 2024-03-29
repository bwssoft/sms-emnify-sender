export function reverseArray<T>(arr: T[]): T[] {
  if (!arr) return []

  const reversedArray: T[] = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    reversedArray.push(arr[i]);
  }

  return reversedArray;
}