<?php
clearstatcache();
header('Content-Type: application/json');
$current_dir = getcwd();

function foreach_dir($current_dir) {
    $files_and_folders = scandir($current_dir);
    $result = [];
    foreach ($files_and_folders as $item) {
        if ($item !== "." && $item !== ".." && $item !== "directory_structure.json") {
            $full_path = $current_dir . DIRECTORY_SEPARATOR . $item;
            $file_data = [
                "name" => $item,
                "timestamp" => filemtime($full_path),
                "type" => is_dir($full_path) ? "Folder" : "File"
            ];

            if (is_dir($full_path)) {
                $file_data["contents"] = foreach_dir($full_path); // Recursive call for directories
            }

            $result[] = $file_data;
        }
    }

    return $result;
}

$directory_structure = foreach_dir($current_dir);

$json_data = json_encode($directory_structure, JSON_PRETTY_PRINT);

echo $json_data;

// $json_file_path = $current_dir . DIRECTORY_SEPARATOR . "directory_structure.json";
// file_put_contents($json_file_path, $json_data);

?>