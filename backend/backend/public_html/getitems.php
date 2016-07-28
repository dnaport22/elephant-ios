<?php

$list = Item::getList($_GET['offset'], $_GET['limit']);
$response = new Response(1);
$response->setItems($list);
$response->send();