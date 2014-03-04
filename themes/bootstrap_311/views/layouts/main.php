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
                        'js/main.js'
                    ),
                    'css'=>array(
						'css/bootstrap.min.css',
						'css/bootstrap-theme.css',
					//	'font-awesome/css/font-awesome.css'
                    ),
                    'depends'=>array('jquery'),
                    'coreScriptPosition'=>CClientScript::POS_END
                );

	Yii::app()->clientScript->addPackage('bootstrap', $assetsPackage);
    Yii::app()->clientScript->registerPackage('bootstrap');

    Yii::app()->clientScript->registerScriptFile(Yii::app()->request->baseUrl.'/js/jquery.nicescroll.min.js', CClientScript::POS_END);
     ?>


	<!-- HTML5 shim and Respond.js IE8 support of HTML5 tooltipss and media queries -->
    <!--[if lt IE 9]>
      <script src="/js/html5shiv.min.js"></script>
      <script src="/js/respond.min.js"></script>
    <![endif]-->

	<title><?php echo CHtml::encode($this->pageTitle); ?></title>
</head>

<body>
<div class="emptydiv"></div>
<nav class="navbar navbar-default navbar-fixed-top" role="navigation">
	<div class="navbar-inner">
	<ul class="nav navbar-left top-menu">
        <li>
	        <div class="sidebar-toggle-box">
			    <img id="collapsed_leftbutton" src="<?php echo Yii::app()->baseUrl; ?>/images/bars.png" />
			</div>
            <input type="text" class="form-control search" placeholder="Поиск">
        </li>
    </ul>
	</div><!-- /.navbar-inner -->
</nav><!-- /nav -->

<div id="sidebar"  class="navbar-default">
	<?php echo CHtml::link('', Yii::app()->baseUrl.'/', array('class'=>'mark-logo')); ?>
	<?php 
		$this->widget('zii.widgets.CMenu',array(
			'items'=>array(
				array('label'=>'<i class="mark-personal img-responsive"></i> Моя страница', 'url'=>array('/site/page', 'view'=>'personal')),
				array('label'=>'<i class="mark-interests"></i> Мои интересы', 'url'=>array('/site/page', 'view'=>'interests')),
				array('label'=>'<i class="mark-favorites"></i> Избранное', 'url'=>array('/site/page', 'view'=>'favorites')),
				array('label'=>'<i class="mark-place"></i> Мое местоположение', 'url'=>array('/site/page', 'view'=>'place')),
				array('label'=>'<i class="mark-event"></i> Добавить событие', 'url'=>array('/site/page', 'view'=>'event')),
				array('label'=>'<i class="mark-profile"></i> Профиль', 'url'=>array('/site/page', 'view'=>'profile')),
				array('label'=>'<i class="mark-kabinet"></i> Кабинет компании', 'url'=>array('/site/page', 'view'=>'kabinet')),
				array('label'=>'<i class="mark-login"></i> Вход', 'url'=>array('/site/login'), 'visible'=>Yii::app()->user->isGuest),
				array('label'=>'<i class="mark-logout"></i> Выход', 'url'=>array('/site/logout'), 'visible'=>!Yii::app()->user->isGuest)
			),
			'encodeLabel'=>false,
			'htmlOptions'=>array('class'=>'nav nav-list')
		)); 
		?>
		<div id="add_links">
		<?php 
		$this->widget('zii.widgets.CMenu',array(
			'items'=>array(
				array('label'=>'Бизнес', 'url'=>array('/site/page', 'view'=>'business')),
				array('label'=>'О нас', 'url'=>array('/site/page', 'view'=>'about')),
				array('label'=>'Блог', 'url'=>array('/site/page', 'view'=>'blog')),
				array('label'=>'Соглашение', 'url'=>array('/site/page', 'view'=>'legal')),
				array('label'=>'Технологии', 'url'=>array('/site/page', 'view'=>'technology')),
			),
			'htmlOptions'=>array('class'=>'nav nav-list')
		)); 
		?>
		</div>
		<div id="lang_change">
			<?php
			$cookie = Yii::app()->request->cookies['lang'];
			$lang = 'ru';
			if ($cookie !== null) {
				$lang = $cookie->value;
			}
			$this->widget('zii.widgets.CMenu',array(
				'items'=>array(
					array('label'=>'Русский', 'url'=>array('/site/lang', 'lang'=>'ru'), 'active'=> $lang=='ru'),
					array('label'=>'English', 'url'=>array('/site/lang', 'lang'=>'en'), 'active'=> $lang=='en'),
				),
				'htmlOptions'=>array('class'=>'nav nav-pills')
			)); 
			?>
		</div>
		<div id="app_store_field">
		<?php echo CHtml::link('<i class="mark-appstore"></i>', 'https://itunes.apple.com/us/app/favoraim/id769878884?l=ru&ls=1&mt=8'); ?>
		<?php echo CHtml::link('<i class="mark-googleplay"></i>', 'https://play.google.com/store/apps/details?id=com.favoraim.favapp'); ?>
		<div class="copyright clearfix">
			<span>&copy;</span>favoraim
		</div>
		</div>
</div><!-- /#sidebar -->

<div id="main-content">
	<div id="page-wrapper" class="container-fluid">
		<div class="row">
		    <div class="col-lg-12">
		    <?php if(Yii::app()->controller->id == 'site' && Yii::app()->controller->action->id == 'index'){ ?>

		    <?php } else {  ?>

		        <h2 class="page-header"><?php echo CHtml::encode($this->pageTitle); ?></h2>

		        <?php if(isset($this->breadcrumbs)) { ?>
				<?php $this->widget('zii.widgets.CBreadcrumbs', array(
					'links'=>$this->breadcrumbs,
				)); ?><!-- breadcrumbs -->
			<?php } ?>

			<?php } ?>

			<?php echo $content; ?>

		    </div><!-- /.col-lg-12 -->
		</div><!-- /.row -->
	</div><!-- /.page-wrapper -->
</div><!-- /#main-content -->
</body>
</html>
