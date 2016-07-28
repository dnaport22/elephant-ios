function Submitform(type, url, datastring, cache) {
    this.type = type;
    this.dataString = datastring;
    this.url = url;
    this.cache = cache;
    this.feedback = null;
    this.error = null;
    this.handshake = false;
    this.response = '';
}

Submitform.prototype.ajaxSubmit = function(callback) {
  console.log('starting ajax call')
  var that = this;
  $.ajax({
    type: this.type,
    url: this.url,
    cache: this.cache,
    data: this.dataString,
    success: function(response) {
      console.log(response);
      callback.submitResponse(response);
      that.handshake = true;
    },
    error: function(error) {
      console.log(error)
      callback.submitResponse(response);
      this.handshake = false;
    }
  });
  return false;
}
