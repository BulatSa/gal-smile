<?php
// Читаем файл построчно.

$file = "maratneva-followers.txt";

$link = "http://example.com/image2.png";
$exists = false;

function getLines($file) {
	$f = fopen($file, 'r');
	try {
		while ($line = fgets($f)) {
			yield $line;
		}
	} finally {
		fclose($f);
	}
}



// Проверяем ссылку.
foreach (getLines($file) as $line) {
	$exists = $exists || trim($line) === $link;
}

if (!$exists) {
	file_put_contents ($file, $link . PHP_EOL, FILE_APPEND);
} else {
	echo('No exist!');
}