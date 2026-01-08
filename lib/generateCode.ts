
const CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export const generatePublicCode = (prefix = "FND") => {
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return `${prefix}-${code.slice(0, 4)}-${code.slice(4)}`;
};