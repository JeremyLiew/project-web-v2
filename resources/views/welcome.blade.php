<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>web_v2</title>
    @vite(['resources/css/app.css', 'vuejs/vue-web/main.js'])
    <style>
        html{
            overflow: auto !important;
        }
    </style>
</head>
<body>
    <div id="app" style="height:100% !important;">
        <app />
    </div>
</body>
</html>