import { ElMessage } from 'element-plus'

// export const evil: any = (str: string) => {
//   var Fn = Function;
//   return new Fn('return ' + str)();
// }
// const str = '[5, [[4, 3], 2, 1]]'.replaceAll('[', '(').replaceAll(']', ']').replaceAll(',', '-').replaceAll(']', ')');
// console.log(evil(str))

export const myMessage: any = ElMessage
function S4(): string {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function guid(): string {
  return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
}
