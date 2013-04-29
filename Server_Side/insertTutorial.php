<?php
require('DBConnect.php');


if(isset($_REQUEST["InsertTutorialStep"]))
	{
		$getElements = $_REQUEST["InsertTutorialStep"];
		$arrayElement[] = $getElements;
		$temp = $arrayElement[0];
		$elements = explode(",", $temp);
		
		$pageURL = $elements[0];
		$elementType = $elements[1];
		$elementID = $elements[2];
		$contentType = $elements[3];
		$viewType = $elements[4];
		$tutorialName = $elements[5];
		$contents = $elements[6];
		$order = $elements[7];
		
		$insertQuery = "INSERT INTO ExtensionTest (TutorialDomain, ElementID, ContentType, TutorialName, ViewType, ContentValue, ExtensionTest.Order)VALUES (\"";
		$insertQuery .= $pageURL;
		$insertQuery .= "\", \"";
		$insertQuery .= $elementID;
		$insertQuery .= "\", \"";
		$insertQuery .= $contentType;
		$insertQuery .= "\", \"";
		$insertQuery .= $tutorialName;
		$insertQuery .= "\", \"";
		$insertQuery .= $viewType;
		$insertQuery .= "\", \"";		
		$insertQuery .= $contents;
		$insertQuery .= "\", \"";
		$insertQuery .= $order;
		$insertQuery .= "\")";
		$returnVal = mysql_query($insertQuery) or die(mysql_error());
		
		echo $returnVal;
	}
else
	{
		$error = "Didn't Receive correct Data format";
		console.log($error);
		echo $error;
	}
?>