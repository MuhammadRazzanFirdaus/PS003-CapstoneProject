<?php

use App\Http\Controllers\Api\GoalController;
use Illuminate\Http\Request;
use App\Models\Goal;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$controller = new GoalController();

// Create sample goal if none exists to test
$goal = Goal::first();
if (!$goal) {
    echo "No goal found to test.";
    exit;
}

$response = $controller->show($goal->id);
echo "Status Code: " . $response->getStatusCode() . "\n";
echo "Content: " . $response->getContent() . "\n";
