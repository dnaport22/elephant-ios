<?php

require_once 'db_connect.php';
require_once 'user.php';
require_once 'item.php';
require_once 'response.php';

function emailUser() {
  $to_email = (@$_POST['useremail']);
  $to_username = (@$_POST['username']);
  $itemname = (@$_POST['itemname']);
  $subject = "elephant app item upload request.";
  $message = <<<HTML
<b>This is an automated email sent by the elephant app:</b><hr>
Dear {$to_username},<br/><br/>
Your {$itemname} has not been declined.<br><br>
Regards,<br>the elephant app team.<br><br><hr>
HTML;
  $header  = "Sender: noreply@maddna.xyz \r\n";
  $header .= "MIME-Version: 1.0\r\n";
  $header .= "Content-type: text/html\r\n";
  return mail($to_email, $subject, $message, $header) == TRUE;
}

$user = User::authorize();
$item = new Item($mysql_db);
$item->loadByItemId(@$_POST['itemId']);
// if ($item->authorize($user)) {
// 	$item->setStatus(2);
// 	$item->save();
// 	Response::flush(1, 'Item dismissed successfully');
// }
$item->setStatus(2);
if ($item->save()) {
  emailUser();
  Response::flush(1, 'Item dismissed successfully');
}
