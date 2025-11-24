<?php

use Illuminate\Support\Str;

return [

    'default' => env('DB_CONNECTION', 'pgsql'),

    'connections' => [

'pgsql' => [
    'driver' => 'pgsql',
    'host' => env('DB_HOST'),
    'port' => env('DB_PORT'),
    'database' => env('DB_DATABASE'),
    'username' => env('DB_USERNAME'),
    'password' => env('DB_PASSWORD'),
    'charset' => 'utf8',
    'prefix' => '',
    'schema' => 'public',
    'sslmode' => env('DB_SSLMODE', 'require'),
    'options' => extension_loaded('pdo_pgsql') ? [
        'endpoint' => env('DB_OPTION_ENDPOINT')
    ] : [],
],

    ],

    'migrations' => 'migrations',

    'redis' => [

        'client' => env('REDIS_CLIENT', 'phpredis'),

        'options' => [
            'cluster' => env('REDIS_CLUSTER', 'redis'),
            'prefix' => env(
                'REDIS_PREFIX',
                Str::slug(env('APP_NAME', 'laravel'), '_') . '_database_'
            ),
        ],

        'default' => [
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_DB', '0'),
        ],

        'cache' => [
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'password' => env('REDIS_PASSWORD', null),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_CACHE_DB', '1'),
        ],

    ],

];
