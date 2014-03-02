<?php

class SiteController extends Controller
{
	/**
	 * Declares class-based actions.
	 */
	public function actions()
	{
		return array(
			// captcha action renders the CAPTCHA image displayed on the contact page
			'captcha'=>array(
				'class'=>'CCaptchaAction',
				'backColor'=>0xFFFFFF,
			),
			// page action renders "static" pages stored under 'protected/views/site/pages'
			// They can be accessed via: index.php?r=site/page&view=FileName
			'page'=>array(
				'class'=>'CViewAction',
			),
		);
	}

	/**
	 * This is the default 'index' action that is invoked
	 * when an action is not explicitly requested by users.
	 */
	public function actionIndex()
	{
 
        	
        	

		$rawData=array(
			array('id'=>1, 'title'=>'calendar', 'link'=>'/uploads/calendar.jpg', 'sort'=>'new'),
			array('id'=>2, 'title'=>'car', 'link'=>'/uploads/car.jpg', 'sort'=>'near'),
			array('id'=>3, 'title'=>'music', 'link'=>'/uploads/music.jpg', 'sort'=>'new'),
			array('id'=>4, 'title'=>'rock', 'link'=>'/uploads/rock.jpg', 'sort'=>'near'),
			array('id'=>5, 'title'=>'rul', 'link'=>'/uploads/rul.jpg', 'sort'=>'near'),
			array('id'=>6, 'title'=>'calendar', 'link'=>'/uploads/calendar.jpg', 'sort'=>'new'),
			array('id'=>7, 'title'=>'car', 'link'=>'/uploads/car.jpg', 'sort'=>'near'),
			array('id'=>8, 'title'=>'music', 'link'=>'/uploads/music.jpg', 'sort'=>'weekend'),
			array('id'=>9, 'title'=>'rock', 'link'=>'/uploads/rock.jpg', 'sort'=>'weekend'),
			array('id'=>10, 'title'=>'rul', 'link'=>'/uploads/rul.jpg', 'sort'=>'weekend'),
			array('id'=>11, 'title'=>'calendar', 'link'=>'/uploads/calendar.jpg', 'sort'=>'new'),
			array('id'=>12, 'title'=>'car', 'link'=>'/uploads/car.jpg', 'sort'=>'near'),
			array('id'=>13, 'title'=>'music', 'link'=>'/uploads/music.jpg', 'sort'=>'new'),
			array('id'=>14, 'title'=>'rock', 'link'=>'/uploads/rock.jpg', 'sort'=>'near'),
			array('id'=>15, 'title'=>'rul', 'link'=>'/uploads/rul.jpg', 'sort'=>'near'),
			array('id'=>16, 'title'=>'calendar', 'link'=>'/uploads/calendar.jpg', 'sort'=>'new'),
			array('id'=>17, 'title'=>'car', 'link'=>'/uploads/car.jpg', 'sort'=>'near'),
			array('id'=>18, 'title'=>'music', 'link'=>'/uploads/music.jpg', 'sort'=>'weekend'),
			array('id'=>19, 'title'=>'rock', 'link'=>'/uploads/rock.jpg', 'sort'=>'weekend'),
			array('id'=>20, 'title'=>'rul', 'link'=>'/uploads/rul.jpg', 'sort'=>'weekend'),
			array('id'=>21, 'title'=>'rul', 'link'=>'/uploads/rul.jpg', 'sort'=>'weekend'),
			array('id'=>22, 'title'=>'calendar', 'link'=>'/uploads/calendar.jpg', 'sort'=>'new'),
			array('id'=>23, 'title'=>'car', 'link'=>'/uploads/car.jpg', 'sort'=>'near'),
			array('id'=>24, 'title'=>'music', 'link'=>'/uploads/music.jpg', 'sort'=>'new'),
			array('id'=>25, 'title'=>'rock', 'link'=>'/uploads/rock.jpg', 'sort'=>'near'),
			array('id'=>26, 'title'=>'rul', 'link'=>'/uploads/rul.jpg', 'sort'=>'near'),
			array('id'=>27, 'title'=>'calendar', 'link'=>'/uploads/calendar.jpg', 'sort'=>'new'),
			array('id'=>28, 'title'=>'car', 'link'=>'/uploads/car.jpg', 'sort'=>'near'),
			array('id'=>29, 'title'=>'music', 'link'=>'/uploads/music.jpg', 'sort'=>'weekend'),
			array('id'=>30, 'title'=>'rock', 'link'=>'/uploads/rock.jpg', 'sort'=>'weekend'),
			array('id'=>31, 'title'=>'rul', 'link'=>'/uploads/rul.jpg', 'sort'=>'weekend'),
			array('id'=>32, 'title'=>'calendar', 'link'=>'/uploads/calendar.jpg', 'sort'=>'new'),
			array('id'=>33, 'title'=>'car', 'link'=>'/uploads/car.jpg', 'sort'=>'near'),
			array('id'=>34, 'title'=>'music', 'link'=>'/uploads/music.jpg', 'sort'=>'new'),
			array('id'=>35, 'title'=>'rock', 'link'=>'/uploads/rock.jpg', 'sort'=>'near'),
			array('id'=>36, 'title'=>'rul', 'link'=>'/uploads/rul.jpg', 'sort'=>'near'),
			array('id'=>37, 'title'=>'calendar', 'link'=>'/uploads/calendar.jpg', 'sort'=>'new'),
			array('id'=>38, 'title'=>'car', 'link'=>'/uploads/car.jpg', 'sort'=>'near'),
			array('id'=>39, 'title'=>'music', 'link'=>'/uploads/music.jpg', 'sort'=>'weekend'),
			array('id'=>40, 'title'=>'rock', 'link'=>'/uploads/rock.jpg', 'sort'=>'weekend'),
			array('id'=>41, 'title'=>'rul', 'link'=>'/uploads/rul.jpg', 'sort'=>'weekend'),
		);
		/*if( strlen($filter) > 0 )
		{
			$sortData = array();
			foreach($rawData as $k=>$v){
				if($v['sort'] == $filter)
					$sortData[] = $v;
			}
			$rawData = $sortData;
		}*/
		// or using: $rawData=User::model()->findAll();
		$dataProvider = new CArrayDataProvider($rawData, array(
			    'id'=>'event',
			    'sort'=>array(
			        'attributes'=>array(
			             'id', 'title', 'link', 'sort',
			        ),
			    ),
			    'pagination'=>array(
			        'pageSize'=>20,
			    ),
		));


		$params =array(
			'dataProvider'=>$dataProvider,
		);
		if($this->processPageRequest('event_page')) {
			$this->renderPartial('index', $params);
		} else {
			$this->render('index', $params);
		}

	}

	public function actionLang($lang)
	{
		if($lang == 'ru' ||  $lang == 'en'){

            $cookie = Yii::app()->request->cookies['lang'];
            if ($cookie !== null) {
                unset(Yii::app()->request->cookies['lang']);
            } 
             $cookie = new CHttpCookie('lang', $lang);
             $cookie->expire = time()+60*60*24*30; // на 30 дней  
             Yii::app()->request->cookies['lang']=$cookie;
            }
            Yii::app()->request->redirect($_SERVER['HTTP_REFERER']);
	}
	/**
	 * This is the action to handle external exceptions.
	 */
	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	/**
	 * Displays the contact page
	 */
	public function actionContact()
	{
		$model=new ContactForm;
		if(isset($_POST['ContactForm']))
		{
			$model->attributes=$_POST['ContactForm'];
			if($model->validate())
			{
				$name='=?UTF-8?B?'.base64_encode($model->name).'?=';
				$subject='=?UTF-8?B?'.base64_encode($model->subject).'?=';
				$headers="From: $name <{$model->email}>\r\n".
					"Reply-To: {$model->email}\r\n".
					"MIME-Version: 1.0\r\n".
					"Content-Type: text/plain; charset=UTF-8";

				mail(Yii::app()->params['adminEmail'],$subject,$model->body,$headers);
				Yii::app()->user->setFlash('contact','Thank you for contacting us. We will respond to you as soon as possible.');
				$this->refresh();
			}
		}
		$this->render('contact',array('model'=>$model));
	}

	/**
	 * Displays the login page
	 */
	public function actionLogin()
	{
		$model=new LoginForm;

		// if it is ajax validation request
		if(isset($_POST['ajax']) && $_POST['ajax']==='login-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}

		// collect user input data
		if(isset($_POST['LoginForm']))
		{
			$model->attributes=$_POST['LoginForm'];
			// validate user input and redirect to the previous page if valid
			if($model->validate() && $model->login())
				$this->redirect(Yii::app()->user->returnUrl);
		}
		// display the login form
		$this->render('login',array('model'=>$model));
	}

	/**
	 * Logs out the current user and redirect to homepage.
	 */
	public function actionLogout()
	{
		Yii::app()->user->logout();
		$this->redirect(Yii::app()->homeUrl);
	}

	protected function processPageRequest($param='page')
    {
        if (Yii::app()->request->isAjaxRequest && isset($_POST[$param])) {
            $_GET[$param] = Yii::app()->request->getPost($param);
            return true;
        } elseif (Yii::app()->request->isAjaxRequest && isset($_GET[$param])) {
        	$_GET[$param] = Yii::app()->request->getQuery($param);
            return true;
        }
        return false;
    }
}