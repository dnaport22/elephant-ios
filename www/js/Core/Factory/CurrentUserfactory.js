elephant.factory('CurrentUserfactory', function ($localStorage) {
  return {
    STATUS_AUTHENTICATED: 1,
    STATUS_ANONYMOUS: 0,
    setCurrentUser: function (user) {
      $localStorage.CurrentUser = JSON.stringify({
        "uid": user['uid'] || "",
        "mail": user['mail'] || "",
        "name": user['name'] || "",
        "phone": user['field_phone_number'] || "",
        "institute": user['field_engineerng_professional_in'] || "",
        "discipline": user['field_engineering_discipline']|| "",
        "grade": user['field_membership_grade'] || "",
        "company": user['field_company'] || "",
        "position": user['field_position_job_title'] || "",
        "address": user['field_work_address'] || ""
      });
    },
    setUserSecret: function (id, name, token) {
      $localStorage.UserSecret = JSON.stringify({"id": id, "name": name, "token": token});
    },
    getCurrentUser: function () {
      return $localStorage.CurrentUser;
    },
    getCurrentUserObject: function () {
      return JSON.parse($localStorage.CurrentUser);
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
      return $localStorage.LoggedIn || this.STATUS_ANONYMOUS;
    },
    setStatusAnonymous: function () {
      this.setLoggedInStatus(this.STATUS_ANONYMOUS);
    },
    setStatusAuthenticated: function () {
      this.setLoggedInStatus(this.STATUS_AUTHENTICATED);
    }
  }
});
