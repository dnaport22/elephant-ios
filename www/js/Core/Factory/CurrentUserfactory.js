elephant.factory('CurrentUserfactory', function ($localStorage) {
  const STATUS_AUTHENTICATED = 1;
  const STATUS_ANONYMOUS = 0;
  return {
    initStorage: function () {
      return $localStorage.$default({
        anonymous: true
      });
    },
    setCurrentUser: function (user) {
      $localStorage.CurrentUser = JSON.stringify({
        "uid": user['uid'] || "",
        "mail": user['mail'] || "",
        "name": user['name'] || ""
      });
    },
    setUserSecret: function (id, name, token) {
      $localStorage.UserSecret = JSON.stringify({"id": id, "name": name, "token": token});
    },
    getCurrentUser: function () {
      return $localStorage.CurrentUser;
    },
    getCurrentUserObject: function () {
      return JSON.parse($localStorage.CurrentUser) || "";
    },
    getCurrentUserName: function () {
      return this.getCurrentUser()['name'];
    },
    getCurrentUserMail: function () {
      return this.getCurrentUser()['mail'];
    },
    setLoggedInStatus: function (status) {
      $localStorage.LoggedIn = status;
    },
    isLoggedIn: function () {
      return $localStorage.LoggedIn || STATUS_ANONYMOUS;
    },
    isAnonymous: function () {
      return this.isLoggedIn() ? false:true;
    },
    setStatusAnonymous: function () {
      $localStorage.anonymous = true;
      this.setLoggedInStatus(STATUS_ANONYMOUS);
    },
    setStatusAuthenticated: function () {
      $localStorage.anonymous = false;
      this.setLoggedInStatus(STATUS_AUTHENTICATED);
    }
  }
});
