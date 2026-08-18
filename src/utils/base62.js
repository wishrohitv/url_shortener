const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const Base62 = {
  encode(num) {
    if (num === 0) return chars[0];

    let val = "";
    while (num > 0) {
      const remainder = num % 62;
      num = Math.floor(num / 62);
      val += chars[remainder];
    }
    return val;
  },
  decode(base62id) {
    let result = 0;
    for (let char of base62id) {
      result = result * 62 + chars.indexOf(char);
    }
    return result;
  },
};
