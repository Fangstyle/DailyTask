<?php
$userName = $_POST['userName'];
$passWord = $_POST['passWord'];
if($userName == 'admin' && $passWord == '123456'){
 echo 'login success';
 }else{
 echo 'fail'
 }
?>