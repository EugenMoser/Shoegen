// Standardized error codes for server actions

// 400= Bad Request
// 401= Unauthorized
// 403= Forbidden
// 404= Not Found
// 409= Conflict
// 500= Internal Server Error
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
