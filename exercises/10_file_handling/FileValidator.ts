export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export interface FileConstraints {
  maxSizeMB: number;
  allowedExtensions: string[];  // e.g. [".zip", ".csv"]
}

// TODO: validate a list of files against constraints.
// Check each file:
//   - If file.size > maxSizeMB * 1024 * 1024, add error: "<name> exceeds <maxSizeMB>MB limit"
//   - If file name doesn't end with any allowed extension, add error: "<name> has invalid extension"
// Return { valid: true, errors: [] } if all files pass.
// Return { valid: false, errors: [...] } with all errors if any fail.
export function validateFiles(files: File[], constraints: FileConstraints): ValidationResult {
  return { valid: true, errors: [] };
}
