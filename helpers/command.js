module.exports = {
  Command: class Command {
    name = "";
    description = "";
    message = "";
    execute = () => {};
    constructor(init) {
      Object.assign(this, init);
    }
  },
};
