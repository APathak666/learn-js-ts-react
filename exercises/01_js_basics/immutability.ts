export interface ProjectWithFiles {
  id: string;
  files: string[];
}

// TODO: return a new project object with the file appended.
export function addFile(project: ProjectWithFiles, file: string): ProjectWithFiles {
  return {...project, files: [...project.files, file]};
}

// TODO: return a new project object with the file removed.
export function removeFile(project: ProjectWithFiles, file: string): ProjectWithFiles {
  return {...project, files: project.files.filter(f => f !== file)};
}
