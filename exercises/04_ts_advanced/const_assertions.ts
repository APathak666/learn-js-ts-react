// TODO: use "as const" to derive a union type.

export const PARAMETER_TYPES = ['GEOMETRY', 'BOUNDARY_CONDITION', 'OUTPUT_SCALAR'];
export type ParameterType = string;

// TODO: implement a type guard.
export function isParameterType(value: string): value is ParameterType {
  return false;
}
