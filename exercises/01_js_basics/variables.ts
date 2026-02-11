// TODO: implement these simple helpers.

// Build an id like "project-3-cold-plate" from name "Cold Plate" and seq 3.
export function buildProjectId(name: string, seq: number): string {
  let name_formatted = name.split(" ").map(word => word.toLowerCase()).join("-");
  return `project-${seq}-${name_formatted}`;
}

// Return the next integer version (e.g. 1 -> 2).
export function nextVersion(version: number): number {
  return version+1;
}
