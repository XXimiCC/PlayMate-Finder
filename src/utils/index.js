export function expandSchemaError(error) {
  if (typeof error === 'object') {
    return Object.keys(error).map((key) => error[key]).join(' ');
  }

  return error;
};