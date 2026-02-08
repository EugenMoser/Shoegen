// Standardized error codes for server actions
export type ActionErrorCode = 401 | 403 | 404 | 409 | 500;

// Enhanced Result type with error codes
export type ActionResult<T = undefined> =
  | { success: true; data?: T; message?: string }
  | { success: false; error: string; code?: ActionErrorCode };

// Helper to create success results
export function success<T>(message?: string, data?: T): ActionResult<T> {
  return { success: true, message, data };
}

// Helper to create error results
export function error(
  message: string,
  code?: ActionErrorCode,
): ActionResult {
  return { success: false, error: message, code };
}

// Type guard to check if result is successful
export function isSuccess<T>(
  result: ActionResult<T>,
): result is { success: true; data?: T; message?: string } {
  return result.success === true;
}
