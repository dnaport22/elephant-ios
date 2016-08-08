<?php

require_once ('user.php');
require_once ('item.php');
require_once ('response.php');

$user = User::authorize();
$item = new Item($mysql_db);
$item->loadByItemId(@$_POST['name']);
if ($item->authorize($user)) {
	$item->setStatus(2);
	$item->save();
	Response::flush(1, 'Item dismissed successfully');
}
