elephant.factory('CurrentUserfactory', function ($localStorage) {
  const STATUS_AUTHENTICATED = true;
  const STATUS_ANONYMOUS = false;

  return {
    initStorage: $localStorage.$default({
      anonymous: true,
      username: null,
      authenticated: false
    }),
    setAuthenticated: function () {
      $localStorage.authenticated = true;
      $localStorage.anonymous = false;
    },
    setAnonymous: function () {
      $localStorage.authenticated = false;
      $localStorage.anonymous = true;
    },
    setUsername: function (name) {
     $localStorage.username = name;
    }
  }
});
