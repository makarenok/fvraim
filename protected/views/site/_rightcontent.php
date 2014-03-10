<div class="page-header">
						<div class="pull-left">Группы по интересам</div>
						<a id="groups-right-shevron" class="pull-right" href="#testimonials-groups" data-slide="next"></a>		
						 <div class="clearfix"></div>
						</div>
						
						 
					<div class="carousel slide" id="testimonials-groups">
						<ol class="pull-right carousel-indicators">
						    <li data-target="#testimonials-groups" data-slide-to="0" class="active"></li>
						    <li data-target="#testimonials-groups" data-slide-to="1"></li>
						    <li data-target="#testimonials-groups" data-slide-to="2"></li>
						 </ol>
						 	
						<div class="clearfix"></div>
						<div class="carousel-inner">
							<div class="item active row">							
						
								<div class="testimonials  col-lg-12">



								<?php 
								$this->widget('ext.isotope.Isotope',array(
								'iso'=>2,
							    'id'=>'testimonials-groups-1',
							    'itemContainerId'=>'testimonials-groups-1',
							    'dataProvider' => $dataProvider,
							    'itemView'=>'_view_groups',
							    'template'=>"{items}",
							    'itemSelectorClass'=>'item_group',
							    'itemsTagName'=>'items',
							    'itemsCssClass'=>'col-lg-12 col-md-12 col-sm-12 col-xs-12 itemsgroups',
							    'isoClass'=>'itemsgroups',
							    'options'=>array(
							      'layoutMode'=> 'masonry',
							      'columnWidth'=>'.grid-sizer',
							      'itemSelector' => '.item_group'
							      ), // options for the isotope jquery
							    'htmlOptions'=>array('class'=>'row'),
							));
							?>
 
								</div>
 
								<div class="clearfix"></div>
							</div>
							<div class="item row">						
							
								<div class="testimonials  col-lg-12">
 
								<?php 
								$this->widget('ext.isotope.Isotope',array(
								'iso'=>3,
							    'id'=>'testimonials-groups-2',
							    'itemContainerId'=>'testimonials-groups-2',
							    'dataProvider' => $dataProvider,
							    'itemView'=>'_view_groups',
							    'template'=>"{items}",
							    'itemSelectorClass'=>'item_group',
							    'itemsTagName'=>'items',
							    'itemsCssClass'=>'col-lg-12 col-md-12 col-sm-12 col-xs-12 itemsgroups',
							    'isoClass'=>'itemsgroups',
							    'options'=>array(
							      'layoutMode'=> 'masonry',
							      'columnWidth'=>'.grid-sizer',
							      'itemSelector' => '.item_group'
							      ), // options for the isotope jquery
							    'htmlOptions'=>array('class'=>'row'),
							));
							?>
 
								</div>
 
								<div class="clearfix"></div>
							</div>
							<div class="item row">
								
								<div class="testimonials  col-lg-12">
 
								<?php 
								$this->widget('ext.isotope.Isotope',array(
								'iso'=>4,
							    'id'=>'testimonials-groups-3',
							    'itemContainerId'=>'testimonials-groups-3',
							    'dataProvider' => $dataProvider,
							    'itemView'=>'_view_groups',
							    'template'=>"{items}",
							    'itemSelectorClass'=>'item_group',
							    'itemsTagName'=>'items',
							    'itemsCssClass'=>'col-lg-12 col-md-12 col-sm-12 col-xs-12 itemsgroups',
							    'isoClass'=>'itemsgroups',
							    'options'=>array(
							      'layoutMode'=> 'masonry',
							      'columnWidth'=>'.grid-sizer',
							      'itemSelector' => '.item_group'
							      ), // options for the isotope jquery
							    'htmlOptions'=>array('class'=>'row'),
							));
							?>
 
								</div>
 
								<div class="clearfix"></div>
							</div>
						</div> 					
					</div>