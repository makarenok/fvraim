<?php

Yii::import('zii.widgets.CListView');

class MListView extends CListView
{

	public $sorterUlHtmlOptions = array();
	public $itemsHtmlOptions = array();
	/**
	 * Renders the data item list.
	 */
	public function renderItems()
	{
		echo CHtml::openTag($this->itemsTagName,$this->itemsHtmlOptions===null ? '' : $this->itemsHtmlOptions)."\n";
		$data=$this->dataProvider->getData();
		if(($n=count($data))>0)
		{
			$owner=$this->getOwner();
			$viewFile=$owner->getViewFile($this->itemView);
			$j=0;
			foreach($data as $i=>$item)
			{
				$data=$this->viewData;
				$data['index']=$i;
				$data['data']=$item;
				$data['widget']=$this;
				$owner->renderFile($viewFile,$data);
				if($j++ < $n-1)
					echo $this->separator;
			}
		}
		else
			$this->renderEmptyText();
		echo CHtml::closeTag($this->itemsTagName);
	}
	/**
	 * Renders the sorter.
	 */
	public function renderSorter()
	{
		if($this->dataProvider->getItemCount()<=0 || !$this->enableSorting || empty($this->sortableAttributes))
			return;
		echo CHtml::openTag('div',array('class'=>$this->sorterCssClass))."\n";
		echo $this->sorterHeader===null ? Yii::t('zii','Sort by: ') : $this->sorterHeader;
		echo CHtml::openTag('ul',$this->sorterUlHtmlOptions===null ? '' : $this->sorterUlHtmlOptions)."\n";
		$sort=$this->dataProvider->getSort();
		foreach($this->sortableAttributes as $name=>$label)
		{
			echo "<li>";
			if(is_integer($name))
				echo $sort->link($label);
			else
				echo $sort->link($name,$label);
			echo "</li>\n";
		}
		echo CHtml::closeTag('ul');
		echo $this->sorterFooter;
		echo CHtml::closeTag('div');
	}
}
