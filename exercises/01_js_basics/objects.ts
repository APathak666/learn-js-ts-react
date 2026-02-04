export interface Project {
  id: string;
  name: string;
  templateId: string;
  description: string;
}

export interface ProjectInput {
  id: string;
  name: string;
  templateId?: string;
  description?: string;
}

// TODO: fill missing fields with defaults.
// Defaults: templateId = "CFD-CHT", description = "".
export function createProject(input: ProjectInput): Project {
  return {
    id: input.id,
    name: input.name,
    templateId: '',
    description: ''
  };
}

// TODO: return a NEW project object with updated name.
export function renameProject(project: Project, name: string): Project {
  project.name = name;
  return project;
}
