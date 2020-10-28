export interface Settings {
  selectedKey: string;
  selectedScale: string;
  selectedNumberOfNotes: number;
  selectedTempo: number;
  selectedEmptyMode: EmptyMode;
  pattern: string[];
}

export enum EmptyMode {
  None,
  Low,
  High,
}
