class Userinput {
  getValue(key) {
    return document.getElementById(key).value || '';
  }

  setValue(key, val) {
    return document.getElementById(key).value = val;
  }
}

inputVal = new Userinput();
