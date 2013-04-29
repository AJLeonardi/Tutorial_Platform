<?php
require('DBConnect.php');

if(isset($_REQUEST["getTutorialNames"]))
	{
		//***** GRAB REQUEST DATA   *********
		$getNames = $_REQUEST["getTutorialNames"];
		$nameRequestArray[] = $getNames;
		$pageURL = $nameRequestArray[0];	
		
		// ****** GET DISTINCT Tutorial NAMES for Domain *********
		$getNamesQuery = "SELECT DISTINCT TutorialName FROM ExtensionTest WHERE TutorialDomain = \"";
		$getNamesQuery .= $pageURL;
		$getNamesQuery .= "\"";
		$tutorialNames = mysql_query($getNamesQuery) or die(mysql_error());
		
		//*********** SETUP RESPONSE XML   **********
		$returnXML = "<TutorialNames>";
		while ($info = mysql_fetch_array($tutorialNames))
		{
			$returnXML .= "<Name>";
			$returnXML .= $info["TutorialName"];
			$returnXML .= "</Name>";	
		}
		$returnXML .= "</TutorialNames>";
		header('Content-type: text/xml');
		//$returnXML = "TEST";
		echo $returnXML;
	}

else if(isset($_REQUEST["GetTutorialCount"]))
{
	//******* Get Count Request Details ***********
	$getCount = $_REQUEST["GetTutorialCount"];
	$countArray[] = $getCount;
	$pageURL = $countArray[0];
	
	 
	$countQuery = "SELECT COUNT(*) FROM (SELECT DISTINCT TutorialName FROM ExtensionTest WHERE TutorialDomain = \"";
	$countQuery .= $pageURL;
	$countQuery .= "\")AS T"; 
  $returnCount = mysql_query($countQuery) or die(mysql_error());
  $info = mysql_fetch_array($returnCount);
  
  $count = $info['COUNT(*)'];
  //$count = "1";
  echo $count;	
}
else if(isset($_REQUEST["getTutorial"]))
	{
		$getTutorial = $_REQUEST["getTutorial"];
		$requestArray[] = $getTutorial;
		$tutorialName = $requestArray[0];
		
		//******* get the records from this URL ********
		$getRowsQuery = " SELECT * FROM (SELECT * FROM ExtensionTest WHERE TutorialName = \""; 
		$getRowsQuery .= $tutorialName;
		$getRowsQuery .= "\") AS T ORDER BY T.Order";
		$tutorialData = mysql_query($getRowsQuery) or die(mysql_error());
		
		//**********   Set Return XML   *************
		$returnXML = "<TutorialElements>";
		
		while ($info = mysql_fetch_array($tutorialData))
		{ $returnXML .= "<Element>";
			//---------------DOMAIN OF TUTORIAL------------------------
			$returnXML .= "<Domain>"; 
			$returnXML .= $info['TutorialDomain'];
			$returnXML .= "</Domain>";
			//----------------ID of element to attach----------------------
			$returnXML .= "<ElementID>"; 
			$returnXML .= $info['ElementID'];
			$returnXML .= "</ElementID>";
			//--------------Type of View: MODAL, POPOVER, NONE-------------------------
			$returnXML .= "<ViewType>";
			$returnXML .= $info['ViewType'];
			$returnXML .= "</ViewType>";
			//--------------CONTENT TYPE: CSS, VIDEO, URL------------------------			
			$returnXML .= "<ContentType>";
			$returnXML .= $info['ContentType'];
			$returnXML .= "</ContentType>";
			//--------------CONTENT TO INSERT/APPEND/LOAD--------------------			
			$returnXML .= "<ContentValue>";
			$returnXML .= $info['ContentValue'];
			$returnXML .= "</ContentValue>";
			//--------------NAME OF THE TUTORIAL-------------------------
			$returnXML .= "<TutorialName>";
			$returnXML .= $info['TutorialName'];
			$returnXML .= "</TutorialName>";
			//-----------------KEY OF THIS ELEMENT----------------------			
			$returnXML .= "<Key>";
			$returnXML .= $info['Key'];
			$returnXML .= "</Key>";
			//-----------------Text in TOC OF THIS ELEMENT----------------------			
			$returnXML .= "<StepHeader>";
			$returnXML .= $info['StepHeader'];
			$returnXML .= "</StepHeader>";
			//-----------------Order in TOC OF THIS ELEMENT----------------------			
			$returnXML .= "<Order>";
			$returnXML .= $info['Order'];
			$returnXML .= "</Order>";
			//---------------------------------------			
			$returnXML .= "</Element>";
		}
		
		$returnXML .= "</TutorialElements>";

		header('Content-type: text/xml');
		echo $returnXML;
	}
else
	{
		$error = "Request type not supported";
		console.log("Request Type not supported");
		echo $error;
	}

?>