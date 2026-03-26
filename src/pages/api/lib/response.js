
export const ApiResponse = {
  success: (data, message = 'Success') => ({
    message: message,
    data: data,
  }),
  error: (message, code = 'ERROR') => ({
    message: message,
    code: code,
  }),
  validationError: (fields, message = 'Validation failed') => ({
    message: message,
    code: 'VALIDATION_ERROR',
    fields: Array.isArray(fields) ? fields : [fields],
  }),
  authError: (message = 'Authentication failed') => ({
    message: message,
    code: 'AUTH_ERROR',
  }),
};