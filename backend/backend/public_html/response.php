<?php

class Response implements JsonSerializable {

  private $status;

  private $message;

  private $user;

  private $items;

  public function __construct($status, $message = '') {
    $this->setStatus($status);
    $this->setMessage($message);
  }

  function jsonSerialize() {
    foreach (get_object_vars($this) as $key => $value) {
      if (!$value && !is_integer($value)) {
        unset($this->{$key});
      }
    }
    return get_object_vars($this);;
  }

  public function send() {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    echo json_encode($this);
    exit;
  }

  public static function flush($status, $message = '') {
    $response = new static($status, $message);
    $response->send();
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

  /**
   * @return mixed
   */
  public function getMessage() {
    return $this->message;
  }

  /**
   * @param mixed $message
   */
  public function setMessage($message) {
    $this->message = $message;
  }

  /**
   * @return mixed
   */
  public function getUser() {
    return $this->user;
  }

  /**
   * @param mixed $user
   */
  public function setUser($user) {
    $this->user = $user;
  }

  /**
   * @return mixed
   */
  public function getItems() {
    return $this->items;
  }

  /**
   * @param mixed $items
   */
  public function setItems($items) {
    $this->items = $items;
  }
}