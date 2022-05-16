module.exports = {
  command: (message) => {
    const words = message.split(" ");
    const isCommand = message.startsWith("!");
    if (!isCommand) return false;
    const name = words[0].slice(1);
    const args = words.slice(1);
    return { name, args };
  },
  chat: (user, message, hex) => {
    let color = [255, 0, 0];
    const timestamp = new Date().toLocaleTimeString();
    if (hex) {
      color = hex
        .replace(
          /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
          (m, r, g, b) => "#" + r + r + g + g + b + b
        )
        .substring(1)
        .match(/.{2}/g)
        .map((x) => parseInt(x, 16));
    }
    const colorString = `\x1b[38;2;${color[0]};${color[1]};${color[2]}m`;
    console.log(`[${timestamp}]${colorString}[${user}]\x1b[0m: ${message}`);
  },
  isNumber: (string, defaultTo) => {
    let number = Number(string);
    const isFinite = Number.isFinite(number);
    if (isFinite) return Math.abs(number);
    return defaultTo;
  },
};
