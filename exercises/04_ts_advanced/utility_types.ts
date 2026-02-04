export interface Project {
  id: string;
  name: string;
  status: 'DRAFT' | 'TRAINING' | 'READY';
  description: string;
}

export type ProjectUpdate = Partial<Omit<Project, 'id'>>;
export type ProjectSummary = Pick<Project, 'id' | 'name' | 'status'>;

// TODO: apply a partial update without mutating the original.
export function updateProject(project: Project, update: ProjectUpdate): Project {
  return project;
}

// TODO: return only id, name, status.
export function toSummary(project: Project): ProjectSummary {
  return { id: '', name: '', status: 'DRAFT' };
}
