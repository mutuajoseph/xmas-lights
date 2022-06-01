export type PatternFunction = (
  total: number,
  rowSize: number
) => (i: number, step: number) => boolean;

export interface Color {
  id: string;
  value: string;
}

export interface Settings {
  colors: Color[];
  rows: number;
  patternIndex: number;
}
