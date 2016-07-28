<?php

require_once 'db_connect.php';

class Item {

  /**
   * Database connection.
   *
   * @var dbConnect
   */
  private $db;

  private $uid;
  private $id;
  private $name;
  private $description;
  private $image;
  private $postDate;
  private $status;

  /**
   * User constructor.
   *
   * @param dbConnect $db
   */
  public function __construct(dbConnect $db) {
    $this->db = $db;
  }

  public function authorize(User $user) {
    return $this->getUid() == $user->getUid();
  }

  protected function load($data) {
    if (is_array($data)) {
      $this->setUid($data['user_id']);
      $this->setId($data['itemID']);
      $this->setName($data['item_name']);
      $this->setDescription($data['description']);
      $this->setImage($data['image_src']);
      $this->setStatus($data['status']);
      $this->setPostDate($data['post_date']);
      return TRUE;
    }
    return FALSE;
  }

  public function save() {
    $result = $this->db->query('INSERT INTO 
				items (user_id, itemID, item_name, description, image_src, post_date, status) 
				VALUES (:uid, :itemid, :name, :description, :image, :postdate, :status)', [
      ':uid' => $this->getUid(),
      ':itemid' => $this->getId(),
      ':name' => $this->getName(),
      ':description' => $this->getDescription(),
      ':image_src' => $this->getImage(),
      ':postdate' => $this->getPostDate(),
      ':status' => $this->getStatus(),
    ]);
    return (bool) $result->rowCount();
  }

  public static function getList($offset = 0, $limit = 10) {
    /** @var PDOStatement $results */
    $results = $mysql_db->query('SELECT * FROM items ORDER BY post_date OFFSET :offset LIMIT :limit', [
      ':offset' => $offset,
      ':limit' => $limit,
    ]);
    $list = [];
    while ($data = $results->fetch(PDO::FETCH_ASSOC)) {
      $item = new static($mysql_db);
      $item->load($data);
      $list[] = $item;
    }
    return $list;
  }

  protected function loadFromPDO(PDOStatement $result) {
    return $this->load($result->fetch(PDO::FETCH_ASSOC));
  }

  public function loadByItemId($itemId) {
    return $this->loadFromPDO($this->db->query('SELECT * FROM items WHERE itemID = :itemid', [
      ':itemid' => $itemId,
    ]));
  }

  public function loadByItemName($name) {
    return $this->loadFromPDO($this->db->query('SELECT * FROM items WHERE item_name = :name', [
      ':name' => $name,
    ]));
  }

  /**
   * @return mixed
   */
  public function getUid() {
    return $this->uid;
  }

  /**
   * @return User
   */
  public function getUser() {
    $user = new User($this->db);
    $user->loadByUid($this->getUid());
    return $user;
  }

  /**
   * @param mixed $uid
   */
  public function setUid($uid) {
    $this->uid = $uid;
  }

  /**
   * @return mixed
   */
  public function getId() {
    return $this->id;
  }

  /**
   * @param mixed $id
   */
  public function setId($id) {
    $this->id = $id;
  }

  /**
   * @return mixed
   */
  public function getName() {
    return $this->name;
  }

  /**
   * @param mixed $name
   */
  public function setName($name) {
    $this->name = $name;
  }

  /**
   * @return mixed
   */
  public function getDescription() {
    return $this->description;
  }

  /**
   * @param mixed $description
   */
  public function setDescription($description) {
    $this->description = $description;
  }

  /**
   * @return mixed
   */
  public function getImage() {
    return $this->image;
  }

  /**
   * @param mixed $image
   */
  public function setImage($image) {
    $this->image = $image;
  }

  /**
   * @return mixed
   */
  public function getPostDate() {
    return $this->postDate;
  }

  /**
   * @param mixed $postDate
   */
  public function setPostDate($postDate) {
    $this->postDate = $postDate;
  }

  /**
   * @return mixed
   */
  public function getStatus() {
    return $this->status;
  }

  /**
   * @param mixed $status
   */
  public function setStatus($status) {
    $this->status = $status;
  }

}