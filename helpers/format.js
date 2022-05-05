module.exports = {
  isNumber: (string, defaultTo) => {
    let number = Number(string);
    const isFinite = Number.isFinite(number);
    if (isFinite) return Math.abs(number);
    return defaultTo;
  },
  hexToRGB: (hex) =>
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
      )
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16)),
};
