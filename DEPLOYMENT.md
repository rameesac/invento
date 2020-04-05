# INVENTO DEPLOYMENT

-   Create a release pipeline : that automates your software delivery process using **AWS CodePipeline**
-   Connect a source repository : **GitHub** - https://github.com/rameesac/invento (master)
-   Automate code deployments by connecting your pipeline to **AWS CodeDeploy**, (a service that deploys code changes committed to your source repository to Amazon EC2 instances.)

### Application architecture

<p align="center">
<img src="https://invento.s3.amazonaws.com/misc/continuos-deployment-aws.png">
<p>

REF :

-   https://medium.com/awsofthings/deploy-a-php-application-on-ec2-with-github-and-aws-codepipeline-fb38cf204cbb
-   https://github.com/aurbac/codedeploy-codepipeline-with-laravel
-   https://medium.com/faun/deploying-and-scaling-a-laravel-app-on-aws-1349dcd7d17a
-   https://docs.aws.amazon.com/codepipeline/latest/userguide/tutorials-simple-codecommit.html
-   https://semaphoreci.com/blog/7-continuous-integration-tools-for-php-laravel

## Laravel Deployment Setup

When you're ready to deploy your Laravel application to production, there are some important things you can do to make sure your application is running as efficiently as possible.

https://laravel.com/docs/6.x/deployment#introduction

### Optimization

### Autoloader Optimization

```
composer install --optimize-autoloader --no-dev
```

Make sure you should always be sure to include a

```
composer.lock
```

file in your project's source control repository.
Note: Your project's dependencies can be installed much faster when a composer.lock file is present.

### Optimizing Configuration Loading

When deploying your application to production, you should make sure that you run the config:cache Artisan command during your deployment process:

```
php artisan config:cache
```

This command will,

-   combine all of Laravel's configuration files into a single, cached file, which greatly reduces the number of trips the framework must make to the filesystem when loading your configuration values.

### Optimizing Route Loading

If you are building a large application with many routes, you should make sure that you are running the route:cache Artisan command during your deployment process:

```
php artisan route:cache
```

-   This command reduces all of your route registrations into a single method call within a cached file.
-   Improving the performance of route registration when registering hundreds of routes.

## AWS Deployment Setup

    1 - Create a EB instance and Configure SSH for connection
    2 - Upload sample app and configure public root if needed
    3 - Create RDS DB
    if mysq < 5.7.7
    For Index Lengths & MySQL / MariaDB
    Add below code to AppServiceProvider
    For ref: https://laravel.com/docs/5.8/migrations

```
use Illuminate\Support\Facades\Schema;

                /**
                * Bootstrap any application services.
                *
                * @return void
                */
                public function boot()
                {
                    Schema::defaultStringLength(191);
                }
```

4 - RDS environment gives the dynamic value of onstance credential via RDS Environemnt values.

So we have to fetch those value and configure to config/database.php

https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/create_deploy_PHP.rds.html

How do I perform Laravel Artisan migrations on AWS Elastic Beanstalk ?

Since we are using codedeploy, no need to go for below steps :

Creating a new directory in the root of my project named .ebextensions. In that directory I created a script file migraiton.config:

https://stackoverflow.com/questions/19754812/aws-elastic-beanstalk-why-would-i-use-leader-only-for-a-command/19782538
https://stackoverflow.com/questions/22974516/how-do-i-perform-laravel-artisan-migrations-on-aws-elastic-beanstalk
https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/customize-containers-ec2.html

Go through Code Deploy :

https://deliciousbrains.com/scaling-laravel-using-aws-elastic-beanstalk-part-3-setting-elastic-beanstalk/

Permission issue resolved by :

https://stackoverflow.com/questions/37878951/how-to-clear-route-caching-on-server-laravel-5-2-37
