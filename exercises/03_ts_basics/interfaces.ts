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
// - If isFixed and value exists: "<name> = <value><unit>"
// - Else if min/max exist: "<name> [min-max]<unit>"
// - Else: just the name
export function describeParameter(p: SimulationParameter): string {
  return '';
}
