var message = document.querySelector('#message');

//***********************************************************************
//************* Synchronosly insert all the necessary files.*************
//************* SHOULD PROBABLY DO THIS WHEN TUTORIAL CLICKED... ********
//***********************************************************************

chrome.tabs.executeScript(null, {file: "jquery.js"}, function(){
	if(chrome.extension.lastError)
	{message.innerText = "There was an error inserting jquery.js";}
	else
	{
		chrome.tabs.insertCSS(null, {file: "TutorialClasses.css" }, function()
		{
			if(chrome.extension.lastError)
			{message.innerText = message.innerText + " There was an error inserting TutorialClasses.css";}
			else
			{
				chrome.tabs.insertCSS(null, {file: "PopOver.css"}, function()
				{
					if(chrome.extension.lastError)
					{message.innerText = message.innerText + " There was an error inserting PopOver.css";}
					else
					{
						chrome.tabs.insertCSS(null, {file: "modal.css"}, function()
						{
							if(chrome.extension.lastError)
							{message.innerText = message.innerText + " There was an error inserting modal.css";}
							else
							{
								chrome.tabs.executeScript(null, {file: "popover.js"}, function()
								{
									if(chrome.extension.lastError)
									{message.innerText = message.innerText + " There was an error inserting popover.js";}
									else
									{
										chrome.tabs.executeScript(null, {file: "controls.js"}, function()
										{
											if(chrome.extension.lastError)
											{message.innerText = message.innerText + " There was an error inserting controls.js";}
											else
											{
												chrome.tabs.executeScript(null, {file: "NavAndViewSetup.js"}, function()
												{
													if(chrome.extension.lastError)
													{message.innerText = message.innerText + " There was an error inserting NavAndViewSetup.js";}
													else
													{}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	}
});

	
//-------LIST TUTORIAL NAMES AND SET UP CLICK EVENT -----------	
$(document).ready(function()
	{
		$("#TutorialNames").append("Tutorial Names:");
		chrome.tabs.getSelected(null, function(tab)
		{
			var tablink = tab.url;
			$.post("<SERVER ADDRESS>/GetTutorialList.php", {getTutorialNames: tablink}, function(xml)
			{
				parseNames(xml);
				
				$("a").click(function(e) 
   					{ 
   						e.preventDefault();
   			 			var tutorialName = $(this).html();
  						clickTutorial(tutorialName);
					});
			});
		});
	});

//Should update these parse functions so that the div name isn't hard coded in them -- should just return html?
function parseNames(xmlArg)
{  

	$("#TutorialNames").append("<ul>");
	$(xmlArg).find("Name").each(function()
		{ 
			var thisName = $(this).text();
			var appendText = "<li><a href='#'>" + thisName + "</a></li>";
			$("#TutorialNames").append(appendText);
		});

	$("#TutorialNames").append("</ul>");

}		

function clickTutorial(paramText)
{ 
	chrome.tabs.getSelected(null, function(tab)
 		{ 
 			var tablink = tab.url;

 			//****** GET TUTORIAL DETAILS ********
 			$.post("<SERVER ADDRESS>/GetTutorialList.php", {getTutorial: paramText}, function(xml)
 				{
	 			  	var xmlText = (new XMLSerializer()).serializeToString(xml);
 			  	
 			  		// FADE IN NAV BAR
 			  		var navStuff = "$(\'#Anchor-Nav\').fadeIn(300);";
 			  		navStuff = navStuff + 'tutorialXML=\"' + xmlText + '\";';

 			  		chrome.tabs.executeScript(null, {code: navStuff}, function()
 			  			{
							if(chrome.extension.lastError)
							{
								message.innerText = message.innerText + " There was an error inserting code to fade in Anchor-Nav";
							}
							else
							{
								window.close(); //close the chrome browser action popup
							}
						});
 			  	});
 		});

}
