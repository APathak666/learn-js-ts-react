export interface Dataset {
  name: string;
  fileCount: number;
  size: string;
}

// TODO: return "<n> B" for bytes <= 1024, otherwise "<mb> MB" with 1 decimal.
export function formatBytes(bytes: number): string {
  if (bytes <= 1024) { return `${bytes} B`; }
  else { return `${(bytes/(1024*1024)).toFixed(1)} MB`; }
}

// TODO: build a Dataset object using formatBytes for size.
export function makeDataset(name: string, fileCount: number, sizeBytes: number): Dataset {
  return { name, fileCount, size: formatBytes(sizeBytes) };
}
