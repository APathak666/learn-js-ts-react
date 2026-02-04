// TODO: implement a safe JSON parser.
// Return { ok: true, value } on success, { ok: false, error } on failure.
export function safeJsonParse(input: string):
  | { ok: true; value: any }
  | { ok: false; error: string } {
  return { ok: false, error: 'TODO' };
}
