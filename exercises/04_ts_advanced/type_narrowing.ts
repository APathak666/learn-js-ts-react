// TODO: safely extract an error message.
export function getErrorMessage(err: unknown): string {
    if (err instanceof Error) { return err.message; }
    else if (typeof err === "string") { return err; }
    else { return "Unknown error" }
  }
