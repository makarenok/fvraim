<?php

// uncomment the following to define a path alias
// Yii::setPathOfAlias('local','path/to/local-folder');

// This is the main Web application configuration. Any writable
// CWebApplication properties can be configured here.
return array(
	'basePath'=>dirname(__FILE__).DIRECTORY_SEPARATOR.'..',
	'name'=>'Favoraim',
	'language'=>'ru',
	'theme'=>'bootstrap_311',
	// preloading 'log' component
	'preload'=>array('log'),

	// autoloading model and component classes
	'import'=>array(
		'application.models.*',
		'application.components.*',
		),

	'modules'=>array(
		// uncomment the following to enable the Gii tool
		/*
		'gii'=>array(
			'class'=>'system.gii.GiiModule',
			'password'=>'Enter Your Password Here',
			// If removed, Gii defaults to localhost only. Edit carefully to taste.
			'ipFilters'=>array('127.0.0.1','::1'),
		),
		*/
	),

	// application components
	'components'=>array(
		'user'=>array(
			// enable cookie-based authentication
			'allowAutoLogin'=>true,
			),
		// uncomment the following to enable URLs in path-format
		
		'urlManager'=>array(
			'urlFormat'=>'path',
			'showScriptName'=>false,
			//'useStrictParsing'=>true,
			'rules'=>array(
				'/'=>'site/index',
				'<view:about|personal|interests|favorites|place|event|profile|kabinet>'=>'site/page',
				'<action:(contact|login|logout|home)>'=>'site/<action>',
				'<controller:\w+>/<id:\d+>'=>'<controller>/view',
				'<controller:\w+>/<action:\w+>/<id:\d+>'=>'<controller>/<action>',
				'<controller:\w+>/<action:\w+>'=>'<controller>/<action>',
				
				),
			),
		
		'db'=>array(
			'connectionString' => 'sqlite:'.dirname(__FILE__).'/../data/testdrive.db',
			),
		// uncomment the following to use a MySQL database
		/*
		'db'=>array(
			'connectionString' => 'mysql:host=localhost;dbname=favoraim_lab',
			'emulatePrepare' => true,
			'username' => 'roman',
			'password' => 'roman',
			'charset' => 'utf8',
		),
		*/
'errorHandler'=>array(
			// use 'site/error' action to display errors
	'errorAction'=>'site/error',
	),
'log'=>array(
	'class'=>'CLogRouter',
	'routes'=>array(
		array(
			'class'=>'CFileLogRoute',
			'levels'=>'error, warning',
			),
				// uncomment the following to show log messages on web pages
				/*
				array(
					'class'=>'CWebLogRoute',
				),
				*/
	),
	),
'clientScript'=>array(
	'packages'=>array(
		'jquery'=>array(
		        // 'baseUrl'=>'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js',
			'baseUrl'=>'js',
			'js'=>array(
				'jquery-1.11.0.min.js'
				),
			'coreScriptPosition'=>CClientScript::POS_END
			),
		),
	),

),

	// application-level parameters that can be accessed
	// using Yii::app()->params['paramName']
'params'=>array(
		// this is used in contact page
	'adminEmail'=>'webmaster@example.com',
	),
);