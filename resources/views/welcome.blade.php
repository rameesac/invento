<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">

        <title>Invento</title>

        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="icon" type="image/x-icon" href="assets/layout/images/favicon.ico">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <style type="text/css">
            html,
            body,
            #root {
                height: 100%;
            }
        </style>
    </head>
    <body>
        <noscript>
            You need to enable JavaScript to run this app.
        </noscript>
        <div id="root">
            <div class="splash-screen">
                <div class="splash-container">
                    <div class="splash-double-bounce1"></div>
                    <div class="splash-double-bounce2"></div>
                </div>
            </div>
        </div>
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>
