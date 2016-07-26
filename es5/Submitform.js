function Submitform(type, url, datastring, cache) {
    this.type = type;
    this.dataString = datastring;
    this.url = url;
    this.cache = cache;
    this.success = '';
    this.error = '';
    this.response = '';
}
Submitform.prototype.ajaxSubmit = function() {
  $.ajax({
    type: this.type,
    url: this.url,
    cache: this.cache,
    success: function(success) {
      this.response = 'success';
      this.success = success;
    },
    error: function(error) {
      this.response = 'error';
      this.error = error;
    }
  });
  if (this.response == 'success') {
    return this.success;
  }
  else if (this.response == 'error') {
    return this.error;
  }
}
