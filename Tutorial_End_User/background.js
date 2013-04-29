function getTutorialCount()
	{
		chrome.tabs.getSelected(null, function(tab)
		{
			var tablink = tab.url;

			//send the url to the server, get back a count of tutorials available
			$.post("<SERVER ADDRESS>/GetTutorialList.php", {GetTutorialCount: tablink}, function(count)
			{		tutorialCount = count;
					console.log(count);
					chrome.browserAction.setBadgeText({text:count}); //sets the badge of the extension to have the number of tutorials available for this tab/site.
			});
		});
	}
	//When the tab is "highlighted" get the count of tutorials for the site displayed in that tab
	chrome.tabs.onHighlighted.addListener(getTutorialCount);
	//When the tab is "updated" get the count of tutorials for the site displayed in that tab.
	chrome.tabs.onUpdated.addListener(getTutorialCount);
