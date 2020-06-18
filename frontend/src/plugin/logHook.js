function consoleHook(hookFn) {
  let hookTargets = ['log', 'warn', 'error'];
  for (let key in console) {
    if (hookTargets.includes(key)) {
      let _key = console[key];
      console[key] = function(...msg) {
        hookFn(key, ...msg);
        if (key === 'warn' || key === 'error') {
          _key(console.trace(), ...msg);
        } else {
          _key(...msg);
        }
      };
    }
  }
}

export default consoleHook;
