export const returnNumber = function(num: number): number {
  return num && !isNaN(num) ? Number(num) : Number(0);
};

export const roundNumber = function(num: number, scale: number): number {
  num = isNaN(num) ? num : Number(num || 0);
  if(!("" + num).includes("e")) {
    let value: any = num + "e+" + scale;
    return Number(Math.round(value)  + "e-" + scale);
  } else {
    var arr = ("" + num).split("e");
    var sig = ""
    if (+arr[1] + scale > 0) {
      sig = "+";
    }
    let value: any = +arr[0] + "e" + sig + (+arr[1] + scale);
    return +(Math.round(value) + "e-" + scale);
  }
};