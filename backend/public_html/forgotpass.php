 <?php

 class ForgotPassword {

   /**
    * Database connection.
    *
    * @var dbConnect
    */
   private $db;

   /**
    * User constructor.
    *
    * @param dbConnect $db
    */
   public function __construct(dbConnect $db) {
     $this->db = $db;
   }

   protected function generateKey($length = 256) {
     $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
     $charactersLength = strlen($characters);
     $randomString = '';
     mt_srand(time());
     for ($i = 0; $i < $length; $i++) {
       $randomString .= $characters[mt_rand(0, $charactersLength - 1)];
     }
     return $randomString;
   }

   public function create($email) {
     $key = $this->generateKey();
     $result = $this->db->query('INSERT INTO forgotpass (email, code, expires) VALUES (:email, :code, now() + INTERVAL 3 DAY)', [
       ':email' => $email,
       ':code' => $key,
     ]);
     return $result->rowCount() ? $key : '';
   }

   public function verify($key) {
     $result = $this->db->query('SELECT * FROM forgotpass WHERE code = :code AND expires >= now()', [
       ':code' => $key,
     ]);
     return $result->fetch(PDO::FETCH_ASSOC);
   }

   public function remove($key) {
     $result = $this->db->query('DELETE FROM forgotpass WHERE code = :code', [
       ':code' => $key,
     ]);
     return (bool) $result->rowCount();
   }

   protected function getResetPasswordUrl($key) {
     return 'http://' . $_SERVER['HTTP_HOST'] . '/WebApp/www/#/app/resetpassword/' . $key;
   }

   public function sendEmail($email, $key) {
     $subject = 'Reset password for the elephant app';
     $link = $this->getResetPasswordUrl($key);
     $message = <<<HTML
<b>This is an automated email sent by the elephant app:</b><hr>
A password reset has been requested for an elephant app account associated with this email address.<br/>
Please follow this link to reset your password:
<a href="{$link}">{$link}</a><br><br>
Regards,<br>the elephant app team.<br><br><hr>
HTML;

     $header  = "From: noreply@maddna.xyz \r\n";
     $header .= "MIME-Version: 1.0\r\n";
     $header .= "Content-type: text/html\r\n";

     return mail ($email, $subject, $message, $header);
   }
 }
