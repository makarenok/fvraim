<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="FavorAim">
    <meta name="author" content="FavorAim">
    <meta name="keywords" content="FavorAim">
    <link rel="icon" href="/favicon.ico" type="image/x-icon">

	<?php Yii::app()->clientScript->registerPackage('jquery'); ?>
	<?php

	$assetsPackage=array(
                    'baseUrl'=>Yii::app()->theme->baseUrl,
                    'js'=>array(
                        'js/bootstrap.min.js',
                        'js/plugins/metisMenu/jquery.metisMenu.js',
                        'js/main.js'
                    ),
                    'css'=>array(
						'css/bootstrap.min.css',
						'css/bootstrap-theme.css',
						'font-awesome/css/font-awesome.css'
                    ),
                    'depends'=>array('jquery'),
                    'coreScriptPosition'=>CClientScript::POS_END
                );

	Yii::app()->clientScript->addPackage('bootstrap', $assetsPackage);
    Yii::app()->clientScript->registerPackage('bootstrap');
     ?>


	<!-- HTML5 shim and Respond.js IE8 support of HTML5 tooltipss and media queries -->
    <!--[if lt IE 9]>
      <script src="/js/html5shiv.min.js"></script>
      <script src="/js/respond.min.js"></script>
    <![endif]-->

	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
</head>

<body>

<div id="container">
<header class="header white-bg">
<div class="sidebar-toggle-box">

    <i data-original-title="Toggle Navigation" data-placement="right" class="fa fa-bars icon-reorder"></i>
    
</div>
<ul class="nav pull-left top-menu">
                    <li>
                        <input type="text" class="form-control search" placeholder="Поиск">
                    </li>
                   
                </ul>
<div class="top-nav">
  	
	    
		<?php 
		/*$this->widget('zii.widgets.CMenu',array(
			'items'=>array(
				array('label'=>'Главная', 'url'=>array('/site/index')),
				array('label'=>'О нас', 'url'=>array('/site/page', 'view'=>'about')),
				array('label'=>'Контакты', 'url'=>array('/site/contact')),
				array('label'=>'Вход', 'url'=>array('/site/login'), 'visible'=>Yii::app()->user->isGuest),
				array('label'=>'Выход ('.Yii::app()->user->name.')', 'url'=>array('/site/logout'), 'visible'=>!Yii::app()->user->isGuest)
			),
			'htmlOptions'=>array('class'=>'nav navbar-top-links navbar-right')
		)); 
	*/
		?>


	</div><!-- /.top-nav -->
</header><!-- /.header -->
	<aside>
	<div id="sidebar"  class="nav-collapse">
                <ul class="nav sidebar-menu" id="side-menu">
                    <li>
                        <?php echo CHtml::link('<i class="fa fa-file-o  fa-lg"></i> Моя страница', array('/site/page', 'view'=>'personal')); ?>
                    </li>
                    <li>
                        <?php echo CHtml::link('<i class="fa fa-heart  fa-lg"></i> Мои интересы', array('/site/page', 'view'=>'interests')); ?>
                    </li>
                    <li>
                         <?php echo CHtml::link('<i class="fa fa-star  fa-lg"></i> Избранное', array('/site/page', 'view'=>'favorites')); ?>
                    </li>
                    <li>
                         <?php echo CHtml::link('<i class="fa fa-map-marker  fa-lg"></i> Мое местоположение', array('/site/page', 'view'=>'place')); ?>
                    </li>
                    <li>
                        <?php echo CHtml::link('<i class="fa fa-plus-circle  fa-lg"></i> Добавить событие', array('/site/page', 'view'=>'event')); ?>
                    </li>
                    <li>
                        <?php echo CHtml::link('<i class="fa fa-user  fa-lg"></i> Профиль', array('/site/page', 'view'=>'profile')); ?>
                    </li>
                    <li>
                        <?php echo CHtml::link('<i class="fa fa-question-circle  fa-lg"></i> Кабинет компании', array('/site/page', 'view'=>'kabinet')); ?>
                    </li>
                    <li>
                        <a href="#"><i class="fa fa-share fa-rotate-180  fa-lg"></i> Выход</a>
                    </li>
                </ul><!-- /#side-menu -->
        </div><!-- /#sidebar -->
        </aside>
<div id="main-content">
<div class="wrapper">
<div class="row">
    <div class="col-lg-12">
        <h1 class="page-header"><?php echo CHtml::encode($this->pageTitle); ?></h1>

        <?php if(isset($this->breadcrumbs)):?>
		<?php $this->widget('zii.widgets.CBreadcrumbs', array(
			'links'=>$this->breadcrumbs,
		)); ?><!-- breadcrumbs -->
	<?php endif?>

	<?php echo $content; ?>

    </div><!-- /.col-lg-12 -->

</div><!-- /.row -->

</div><!-- /.wrapper -->
</div><!-- /#main-content -->
</div><!-- /#container -->
</body>
</html>
