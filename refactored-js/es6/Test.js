
// class Test {
//   mytest() {
//     var validate = new Validation('nav8699@lsbu.com');
//     if (validate.emailValidate() == 'formatError') {
//       alert('Plase enter valid lsbu email');
//     }
//     else if (validate.emailValidate() == 'invalid') {
//       alert("Invalid Email",'Alert');
//     }
//   }
// }
//
// testThis = new Test();
function Test(type) {
  this.type = type;
  this.color = "red";
}

Test.prototype.getInfo = function() {
  console.log('in GetInfo Function');
  return this.callTest();
}

Test.prototype.callTest = function() {
  return alert("This is call test");
}
