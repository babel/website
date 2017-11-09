export default class Evaluator {
  constructor() {
    this.capturingConsole = Object.create(console);
    this.logs = [];
    this.initialize();
  }

  initialize() {
    const capturingConsole = this.capturingConsole;
    const capture = this.capture;
    const scope = this;
    ["error", "log", "info", "debug"].forEach(key => {
      capturingConsole[key] = function() {
        capture.apply(scope, arguments);
      };
    });
  }

  capture() {
    const argArray = Array.prototype.slice.call(arguments);
    const logs = argArray.map(function(log) {
      return log;
    });
    this.logs = this.logs.concat(logs);
  }

  getLogs() {
    return this.logs || [];
  }

  evaluate(code) {
    try {
      new Function("console", code)(this.capturingConsole);
    } catch (err) {
      this.logs = this.logs.concat(`${err.name} : ${err.message}`);
    }
  }
}
