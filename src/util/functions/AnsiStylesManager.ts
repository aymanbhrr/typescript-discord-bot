export const reset = (text: string): string => `\x1b[0m${text}\x1b[0m`;
export const makeBright = (text: string): string => `\x1b[1m${text}\x1b[0m`;
export const makeDim = (text: string): string => `\x1b[2m${text}\x1b[0m`;
export const makeUnderscore = (text: string): string => `\x1b[4m${text}\x1b[0m`;
export const makeBold = (text: string): string => `\x1b[1m${text}\x1b[0m`;
export const makeItalic = (text: string): string => `\x1b[3m${text}\x1b[0m`;
export const makeItalicAndBold = (text: string): string => `\x1b[1;3m${text}\x1b[0m`;
export const makeBlink = (text: string): string => `\x1b[5m${text}\x1b[0m`;
export const reserve = (text: string): string => `\x1b[7m${text}\x1b[0m`;
export const makeHidden = (text: string): string => `\x1b[8m${text}\x1b[0m`;

//Foreground
export namespace Fg {
 export const makeBlack = (text: string): string => `\x1b[30m${text}\x1b[0m`;
 export const makeRed = (text: string): string => `\x1b[31m${text}\x1b[0m`;
 export const makeGreen = (text: string): string => `\x1b[32m${text}\x1b[0m`;
 export const makeYellow = (text: string): string => `\x1b[33m${text}\x1b[0m`;
 export const makeBlue = (text: string): string => `\x1b[34m${text}\x1b[0m`;
 export const makeMagneta = (text: string): string => `\x1b[35m${text}\x1b[0m`;
 export const makeCyan = (text: string): string => `\x1b[36m${text}\x1b[0m`;
 export const makeWhite = (text: string): string => `\x1b[37m${text}\x1b[0m`;
}

//Background
export namespace Bg {
 export const makeBlack = (text: string): string => `\x1b[40m${text}\x1b[0m`;
 export const makeRed = (text: string): string => `\x1b[41m${text}\x1b[0m`;
 export const makeGreen = (text: string): string => `\x1b[42m${text}\x1b[0m`;
 export const makeYellow = (text: string): string => `\x1b[43m${text}\x1b[0m`;
 export const makeBlue = (text: string): string => `\x1b[44m${text}\x1b[0m`;
 export const makeMagneta = (text: string): string => `\x1b[45m${text}\x1b[0m`;
 export const makeCyan = (text: string): string => `\x1b[46m${text}\x1b[0m`;
 export const makeWhite = (text: string): string => `\x1b[47m${text}\x1b[0m`;
}
