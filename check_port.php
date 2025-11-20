<?php
$connection = @fsockopen("127.0.0.1", 3307, $errno, $errstr, 3);

if ($connection) {
    echo "PHP CAN reach MySQL on port 3307";
    fclose($connection);
} else {
    echo "PHP CANNOT reach MySQL on port 3307 — ERROR: $errstr";
}
?>
