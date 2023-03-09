export const codePrefix = 'gm-'
export const codeLength = 8

export function validateProfileCode(code: string) {
  return code.startsWith(codePrefix) && code.replace(codePrefix, '').length === codeLength
}
