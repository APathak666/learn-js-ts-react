export type ParameterType = 'GEOMETRY' | 'BOUNDARY_CONDITION' | 'OUTPUT_SCALAR';

export interface SimulationParameter {
  id: string;
  name: string;
  type: ParameterType;
  unit?: string;
  min?: number;
  max?: number;
  value?: number | string;
  isFixed?: boolean;
}

// TODO: return a readable description.
// - If isFixed and value exists: "<name> = <value> <unit>"
// - Else if min/max exist: "<name> [min-max] <unit>"
// - Else: just the name
export function describeParameter(p: SimulationParameter): string {
  if (p.value !== undefined && p.isFixed === true) { return `${p.name} = ${p.value} ${p.unit}`; }
  else if (p.min !== undefined && p.max !== undefined) { return `${p.name} [${p.min}-${p.max}] ${p.unit}`; }
  else { return `${p.name}`;}
}
