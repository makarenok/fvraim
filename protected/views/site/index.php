<?php
/* @var $this SiteController */

//$cs = Yii::app()->clientScript;
//$cs->registerScriptFile("/js/jquery.isotope.min.js");

$this->pageTitle = Yii::app()->name;

?>

<div class="row">
<div class="col-lg-12">
<?php

 echo CHtml::openTag('selection', array('id'=>'options','class'=>'col-lg-12'));
 echo CHtml::openTag('ul', array('id'=>'filters','class'=>'nav nav-pills pull-right  option-set','data-option-key'=>"filter"));
 //echo CHtml::tag('li', array(),'<a data-option-value="*" class="selected" href="">Все</a>');
 echo CHtml::tag('li', array(),'<a id="newgrid" data-option-value=".new" href="">Новое</a>');
 echo CHtml::tag('li', array(),'<a data-option-value=".near" href="">Ближайшее</a>');
 echo CHtml::tag('li', array(),'<a data-option-value=".weekend" href="">На выходных</a>');
 echo CHtml::closeTag('ul');
 echo CHtml::closeTag('selection');

?>
</div>
</div>

<?php
/*
$this->widget('ext.widgets.MListView.MListView', array(
    'id'=>'wall',
    'dataProvider'=>$dataProvider,
    'itemView'=>'_view', 
    'ajaxUpdate'=>true, 
    'template'=>"{sorter}{items}\n{pager}",
    'sorterHeader'=>'',
    'sorterCssClass'=>'col-lg-12 sorter',
    'sorterUlHtmlOptions'=>array(
      'id'=>'filters',
      'class'=>'nav nav-pills pull-right  option-set',
      ),
    'sortableAttributes'=>array('new','near','weekend'),
    'itemsTagName'=>'items',
    'itemsHtmlOptions'=>array(
      'class'=>'col-lg-12',
    ),
    'pager'=>array(
        'class'=>'CLinkPager',
        'header'=>false,
        'htmlOptions'=>array('class'=>'pager'),
    ),
    'htmlOptions'=>array('class'=>'row'),
    
));*/

$this->widget('ext.isotope.Isotope',array(
    'iso'=>1,
    'id'=>'wall',
    'dataProvider' => $dataProvider,
    'itemView'=>'_view',
    'template'=>"{items}\n{pager}",
    'itemSelectorClass'=>'itemsevents',
    'itemsTagName'=>'items',
    'itemsCssClass'=>'col-lg-12 col-md-12 col-sm-12 col-xs-12 items',
    'isoClass'=>'items',
    'options'=>array(
     'layoutMode'=> 'masonry',
     'columnWidth'=>'.grid-sizer-event',
      'isOriginLeft'=> false,
      'itemSelector' => '.itemsevents'
      ), // options for the isotope jquery
    'infiniteScroll'=>true, // default to true
    'infiniteOptions'=>array(
    	'loading' => array(
            'msgText' => 'Загружается ...',
            'finishedMsg' => 'Загружено'
        )), // javascript options for infinite scroller
    'htmlOptions'=>array('class'=>'row'),
));

?>



