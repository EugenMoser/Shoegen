export type Result =
  | { success: true; message: string }
  | { success: false; error: string };
