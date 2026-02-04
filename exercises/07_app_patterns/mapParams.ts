export enum ParameterType {
  GEOMETRY = 'GEOMETRY',
  BOUNDARY_CONDITION = 'BOUNDARY_CONDITION',
  MATERIAL = 'MATERIAL',
  OUTPUT_SCALAR = 'OUTPUT_SCALAR'
}

export interface ExtractedStructure {
  suggestedParameters: {
    name: string;
    type: string;
    description: string;
    unit?: string;
    min?: number;
    max?: number;
    value?: string | number;
  }[];
  suggestedTargets: {
    name: string;
    type: string;
    description: string;
    unit?: string;
  }[];
}

export interface SimulationParameter {
  id: string;
  name: string;
  type: ParameterType;
  description?: string;
  unit?: string;
  min?: number;
  max?: number;
  nominal?: number;
  value?: string | number;
  isFixed?: boolean;
}

// TODO: map extracted structure into SimulationParameter arrays.
export function mapStructure(structure: ExtractedStructure): {
  inputs: SimulationParameter[];
  targets: SimulationParameter[];
} {
  return { inputs: [], targets: [] };
}
