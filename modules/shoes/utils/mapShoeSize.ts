import { ShoeSize } from "../types";

export function mapToShoeSize(size: number): ShoeSize {
  return String(size) as ShoeSize;
}

export function mapSizeRecord(s: { size: number; stock: number }) {
  return {
    size: mapToShoeSize(s.size),
    stock: s.stock,
  };
}
