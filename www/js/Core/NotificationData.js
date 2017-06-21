elephant.constant('LoginNotifications', {
  INVALID_ACCOUNT: 'Invalid account.',
  INACTIVE_ACCOUNT: 'Please click on the activation link sent to your LSBU email address.',
  MENU_REDIRECT: 'Log in to get or post items.',
  MAIN_POST_REDIRECT: 'Log in to post items.',
  MESSAGE_REDIRECT: 'Log in to send a message.',
});

elephant.constant('RegisterNotifications', {
  ACCEPT_TC: 'Please confirm you accept the terms and conditions.',
  COMPLETE_REGISTER: 'Your registration details are being reviewed. After we approve your account you will receive an email confirming your registration. This should take no more than 24 hours.',
  DUPLICATE_ACCOUNT: 'There is already an account registered with this email address.',
  ERROR: 'An error occured while sending your data, make sure you have connection or contact our support team.'
});

elephant.constant('RequestRegisterNotification', {
  RESET_ERROR: 'Your password could not be reset. Please try again in a few minutes or email us on hello@myelephant.xyz',
  RESET_SUCCESS: 'To reset your password, please go to your LSBU email account.',
});

elephant.constant('ResetVerifyNotification', {
  RESET_SUCCESS: 'Your password has been reset.',
  RESET_ERROR: 'Your password could not be reset. Please try again in a few minutes or email us on hello@myelephant.xyz'
});

elephant.constant('MyitemPageNotification', {
  DELETE_ERROR: 'An error occurred while deleting your item. Please try restarting the app.',
});

elephant.constant('PostitemNotification', {
  MENU_TITLE: 'How would you like to select your image?',
  UPLOAD_SUCCESS: 'You will receive an email when your item has been approved. This should take no longer than 24 hours.',
  UPLOAD_ERROR: 'An error occurred while uploading your item. Please try again. If the error persists please email us on hello@myelephant.xyz'
});

elephant.constant('UserfactoryNotification', {
  EMPTY_FIELD_ALERT: 'Please complete all fields.',
  EMPTY_EMAIL_ALERT: 'Please enter your email address.',
  INVALID_EMAIL: 'Please retype your email address.',
  EMAIL_NOT_LSBU: 'Please enter a valid LSBU email address.',
  PASSWORD_MATCH_ERROR: 'Password do not match.',
  PASSWORD_LENGTH_ERROR: 'Password should be at least 8 characters long.',
  PASSWORD_STRENGTH_ERROR: 'Password should contain at least one number.'
})
