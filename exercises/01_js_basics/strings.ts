// TODO: implement string helpers.

// "cold plate" -> "Cold Plate"
export function toTitleCase(input: string): string {
  return input.split(/\s+/)
              .filter(str => str !== "")
              .map(word => word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : "")
              .join(" ");
}

// If unit provided, return "${name} (${unit})", otherwise just name.
export function formatMetricLabel(name: string, unit?: string): string {
  return unit !== undefined ? `${name} (${unit})` : name;
}
