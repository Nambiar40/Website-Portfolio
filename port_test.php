<?php
$connection = @fsockopen("127.0.0.1", 3307, $errno, $errstr, 2);

if (!$connection) {
    echo "PHP cannot reach MySQL on port 3307<br>";
    echo "Error $errno: $errstr";
} else {
    echo "SUCCESS: PHP CAN reach MySQL on port 3307";
    fclose($connection);
}
?>
