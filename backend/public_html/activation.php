<?php

require_once "db_connect.php";
require_once "user.php";
require_once "response.php";

$code = $_GET['uniqueId'];

$user = new User($mysql_db);
if ($user->loadByCode($code)) {
	if ($user->isActive()) {
		Response::flush(1, 'Your user account was already active');
	}
	else {
		$user->setStatus(1);
		$user->save();
		Response::flush(1, 'Thank you for activating your account, You are now now ready to use Sustainability app.');
	}
}
Response::flush(0, 'Wrong Activation Code');
