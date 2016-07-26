function Userinput() {
  type: 'Get and Set';
}

Userinput.prototype.getValue = function(key) {
  return document.getElementById(key).value || '';
}

Userinput.prototype.setValue = function(key, val) {
  return document.getElementById(key).value = val;
}

inputVal = new Userinput();
