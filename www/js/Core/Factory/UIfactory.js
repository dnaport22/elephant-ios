elephant.factory('UIfactory', function($http, $ionicPopup, $ionicLoading, $q, $ionicActionSheet, $state) {
	var alertPopup = function (title, template) {
		return $ionicPopup.alert({
      title: title,
      template: template,
      buttons: [
        {
          text: 'OK',
					type: 'button-calm'
				}
			]
		});
	};

	var noAccountPopup = function () {
    return $ionicPopup.alert({
			title: 'Alert',
			template: 'Invalid account - please register before trying to log in.',
			buttons: [
				{
					text: 'Cancel',
					type: 'button-assertive'
				},
				{
					text: 'Register',
					type: 'button-balanced',
					onTap: function (e) {
						$state.go('app.register');
					}
				}
			]
		});
	};

	var emailVerificationPopup = function (user) {
    return $ionicPopup.alert({
			title: 'Account not active!',
			template: 'Please click on the activation link sent to your LSBU email address. If the activation link has expired (which happens after 24 hours) please contact us on myelephant.xyz@gmail.com.',
			buttons: [
        {
          text: 'OK',
          type: 'button-calm'
        }
			]
		});
	};

  return {
    showAlert: function(title, template) {
      return alertPopup(title, template);
    },
    showSpinner: function() {
			return $ionicLoading.show({
				template: '<ion-spinner icon="spiral" class="spinner-dark"></ion-spinner>',
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});
    },
    hideSpinner: function() {
      return $ionicLoading.hide();
    },
    noAccountAlert: function () {
      return noAccountPopup();
		},
    resendVerificationMail: function (user) {
      return emailVerificationPopup(user);
		}
  }
});
