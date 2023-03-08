export const codePrefix = 'gm-'
export const codeLength = 8

export const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
export function generateInviteCode() {
  let result = ''
  for (let i = codeLength; i > 0; --i) {
    result += codeChars[Math.floor(Math.random() * codeChars.length)]
  }
  return `${codePrefix}${result}`
}

export function validateInviteCode(code: string) {
  return code.startsWith(codePrefix) && code.replace(codePrefix, '').length === codeLength
}
