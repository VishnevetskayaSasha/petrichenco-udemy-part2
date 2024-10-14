<?php
$_POST = json_decode(file_get_contents("php://input"), true); // т.к. php не умеет работать в JSON прописываем такую строку
echo var_dump($_POST);