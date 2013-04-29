var firstClick = true;
chrome.browserAction.onClicked.addListener(function(){if(firstClick == true){iconClicked();}});
	
function iconClicked()
{
	firstClick=false;
	chrome.tabs.executeScript(null, {file:"jquery.js"}, function()
	{
	if(chrome.extension.lastError)
	{console.log("Error inserting jquery");}
	else
		{
			chrome.tabs.insertCSS(null, {file:"AuthorSetup.css"}, function()
			{
				if(chrome.extension.lastError)
				{console.log("Error inserting AuthorSetup.css");}
				else
				{
					chrome.tabs.executeScript(null, {file:"AuthorSetup.js"}, function()
					{
						if(chrome.extension.lastEttor)
						{console.log("Error inserting AuthorSetup.js");}
						else
							{
							}
					});
				}
			});
		}
	});
}

chrome.tabs.onUpdated.addListener(function(){resetClick();});
	
function resetClick()
{
	firstClick = true;
}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.RequestType === "Post")
    {
    	console.log("About to Send Post. Order is : " + request.order);
    	var postString = request.tutorialDomain+","+ request.elementType+","+ request.selector+","+ request.contentType+","+ request.viewType+","+ request.tutName+","+ request.contents+","+ request.order;

		$.post("<SERVER ADDRESS>/insertTutorial.php", 
		{InsertTutorialStep: postString}, 
		function(xml)
			{	console.log('in background callback');
				if(xml != '1')
				{	console.log('unsuccessful post');
					var resp = xml;
					sendResponse({resp: resp});
				}
				else
				{	console.log('successful post');
					var resp = "success"
					sendResponse({resp: resp});
				}

			}
		);

    }
    else
    {	var response = "Unkown Request Type!"
    	sendResponse({resp: response});
    }
    return true;
  });

