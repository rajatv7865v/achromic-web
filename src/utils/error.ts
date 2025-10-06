export function getErrorMessage(
    error: unknown,
    fallback = "Something went wrong"
  ): string {
    if (!error) return fallback;
    if (typeof error === "string") return error;
    if (error instanceof Error) return error.message || fallback;
    try {
      // Axios style
      const anyErr: any = error as any;
      const msg = anyErr?.response?.data?.message || anyErr?.message;
      if (typeof msg === "string" && msg.trim().length > 0) return msg;
    } catch (_) {}
    return fallback;
  }
  
  export function toError(
    error: unknown,
    fallbackMessage = "Something went wrong"
  ): Error {
    if (error instanceof Error) return error;
    const message = getErrorMessage(error, fallbackMessage);
    return new Error(message);
  }
  