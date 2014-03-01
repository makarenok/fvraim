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
                      //  'js/plugins/metisMenu/jquery.metisMenu.js',
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
<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
	<div class="navbar-inner">
	<ul class="nav navbar-left top-menu">
        <li>
	        <div class="sidebar-toggle-box">
			    <i id="collapsed_leftbutton" data-original-title="Toggle Navigation"  class="fa fa-bars"></i>
			</div>
            <input type="text" class="form-control search" placeholder="Поиск">
                <button  id="collapsed_rightpbutton" type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
			    <span class="sr-only">Toggle Navigation</span>
			    <span class="icon-bar"></span>
			    <span class="icon-bar"></span>
			    <span class="icon-bar"></span>
			    </button>
        </li>
    </ul>

    <div  id="collapsing_topmenu" class="navbar-collapse collapse">
		<?php 
		$this->widget('zii.widgets.CMenu',array(
			'items'=>array(
				array('label'=>'Главная', 'url'=>array('/site/index')),
				array('label'=>'О нас', 'url'=>array('/site/page', 'view'=>'about')),
				array('label'=>'Контакты', 'url'=>array('/site/contact'))
			),
			'htmlOptions'=>array('class'=>'nav navbar-nav navbar-right')
		)); 
		?>
    </div><!-- /.navbar-collapse -->
	</div><!-- /.navbar-inner -->
</nav><!-- /nav -->
<div id="topbarplace"></div>
<div id="sidebar"  class="navbar-default">
	<?php 
		$this->widget('zii.widgets.CMenu',array(
			'items'=>array(
				array('label'=>'<i class="fa fa-file-o  fa-lg"></i> Моя страница', 'url'=>array('/site/page', 'view'=>'personal')),
				array('label'=>'<i class="fa fa-heart  fa-lg"></i> Мои интересы', 'url'=>array('/site/page', 'view'=>'interests')),
				array('label'=>'<i class="fa fa-star  fa-lg"></i> Избранное', 'url'=>array('/site/page', 'view'=>'favorites')),
				array('label'=>'<i class="fa fa-map-marker  fa-lg"></i> Мое местоположение', 'url'=>array('/site/page', 'view'=>'place')),
				array('label'=>'<i class="fa fa-plus-circle  fa-lg"></i> Добавить событие', 'url'=>array('/site/page', 'view'=>'event')),
				array('label'=>'<i class="fa fa-user  fa-lg"></i> Профиль', 'url'=>array('/site/page', 'view'=>'profile')),
				array('label'=>'<i class="fa fa-question-circle  fa-lg"></i> Кабинет компании', 'url'=>array('/site/page', 'view'=>'kabinet')),
				array('label'=>'<i class="fa fa-share   fa-lg"></i> Вход', 'url'=>array('/site/login'), 'visible'=>Yii::app()->user->isGuest),
				array('label'=>'<i class="fa fa-share fa-rotate-180  fa-lg"></i> Выход', 'url'=>array('/site/logout'), 'visible'=>!Yii::app()->user->isGuest)
			),
			'encodeLabel'=>false,
			'htmlOptions'=>array('class'=>'nav navbar-nav')
		)); 
		?>
</div><!-- /#sidebar -->

<div id="main-content">
	<div id="page-wrapper" class="container-fluid">
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
	</div><!-- /.page-wrapper -->
</div><!-- /#main-content -->
</body>
</html>
