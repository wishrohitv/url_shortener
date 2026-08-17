const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const Base62 = {
  encode(num) {
    let val = "";
    while (num > 0) {
      const remainder = num % 62;
      num = Math.floor(num / 62);
      val += chars[remainder];
      console.log(chars[remainder],"Current Value:", val, "Remainder:", remainder, "Next Num:", num);
    }
    return val;
  },
  decode(base62id) {
    let result = 0;
    for (char of base62id) {
      result = result * 62 + chars.indexOf(char);
    }
    return result;
  },
};
