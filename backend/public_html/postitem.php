<?php
require "db_connect.php";

class postItem
{
	private $useremail = NULL;
	private $itemname = NULL;
	private $description = NULL;
	private $imagesrc = NULL;
	private $my_query = NULL;
	private $postimage = NULL;
	private $savefolder = "images/";
	private $target_file = NULL;
	public function __construct(dbConnect $my_query, $imagesrc, $description, $useremail, $itemname, $postimage)
	{
		$this->my_query = $my_query;
		$this->imagesrc = $imagesrc;
		$this->description = $description;
		$this->useremail = $useremail;
		$this->itemname = $itemname;
		$this->postimage = $postimage;
	}

	public function uploadImage() 
	{
		$this->target_file = $this->savefolder . basename($this->imagesrc);
		if (move_uploaded_file($this->postimage, $this->target_file) == True) {
			$this->insertInfo();
		} else {
			die('0');
		}
	}

	public function insertInfo()
	{
		$this->target_file = $this->savefolder . basename($this->imagesrc);
		$query = $this->my_query->query('INSERT INTO items (user_id,item_name,description,image_src,post_date) 
				VALUES (:email, :item_name, :item_description, :targetfile, CURDATE())', [
			':email' => $this->useremail,
			':item_name' => $this->itemname,
			':item_description' => $this->description,
			':targetfile' => $this-$this->target_file,
		]);

		if ($query->rowCount()) {
			$this->sendEmail();
		}
		Response::flush(0, 'An error ocurred while trying to post your item. Please try again in few minutes or contact an administrator.');
	}

	public function sendEmail()
	{
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

$imagesrc = $_FILES["file"]["name"];
$postimage = $_FILES["file"]["tmp_name"];

$useremail = $_POST['useremail'];
$itemname = $_POST['itemName'];
$description = $_POST['desc'];

$post_item = new postItem($mysql_db, $imagesrc, $description, $useremail, $itemname, $postimage);
$post_item->uploadImage();


