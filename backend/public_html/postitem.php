<?php
require "db_connect.php";
require "item.php";
require "response.php";

/**
 * Class postItem implements a post item manager.
 */
class postItem
{
	/**
	 * Database connection.
	 *
	 * @var dbConnect
	 */
	private $my_query = NULL;

	/**
	 * Folder where the images will be saved.
	 *
	 * @var string
	 */
	private $savefolder = 'images/';

	/**
	 * postItem constructor.
	 *
	 * @param dbConnect $my_query
	 */
	public function __construct(dbConnect $my_query) {
		$this->my_query = $my_query;
	}

	/**
	 * Uploads the image received where it belongs.
	 *
	 * @return string
	 *   Path to the uploaded image.
	 */
	public function uploadImage() {
		$imagesrc = $_FILES["file"]["name"];
		$postimage = $_FILES["file"]["tmp_name"];

		$target_file = $this->savefolder . basename($imagesrc);
		if (move_uploaded_file($postimage, $target_file) == True) {
			return $target_file;
		}
		Response::flush(0, 'Unable to upload the image. Please try again in few minutes or contact an administrator.');
	}

	/**
	 * Insert the item info.
	 *
	 * @param User $user
	 *   User performing the action.
	 *
	 * @param $image_source
	 *   Source image generated.
	 */
	public function insertInfo(User $user, $image_source)
	{
		$this->target_file = $this->savefolder . basename($this->imagesrc);

		$item = new Item($this->my_query);
		$item->setUid($user->getUid());
		$item->setName($_POST['itemName']);
		$item->setDescription($_POST['desc']);
		$item->setImage($image_source);
		$item->setStatus(1);
		if ($item->save()) {
			$this->sendEmail();
		}
		Response::flush(0, 'An error ocurred while trying to post your item. Please try again in few minutes or contact an administrator.');
	}

	/**
	 * Sends an email notifying of the addition of the object.
	 */
	public function sendEmail() {
		$to = $this->useremail;
		$subject= "Thank you for Wombling!";
		$message = <<<HTML
Post request by: {$this->useremail}<br/> 
Your item will be posted within our Womble app soon after approval.<br/>
Thank you.<br/>
Regards, Womble Team.
HTML;
		$header  = "From:noreply@maddna.xyz \r\n";
		$header .= "MIME-Version: 1.0\r\n";
		$header .= "Content-type: text/html\r\n";
		if (mail($to,$subject,$message,$header) == True) {
			Response::flush(1, 'Item posted successfully');
		}
	}
}

try {
	$user = User::authorize();
	$post_item = new postItem($mysql_db);
	$image_source = $post_item->uploadImage();
	$post_item->insertInfo($user, $image_source);
}
catch (Exception $exception) {
	Response::flush(0, $exception->getMessage());
}


