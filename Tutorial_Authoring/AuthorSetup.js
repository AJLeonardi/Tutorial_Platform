var isFirstEntry = true;
var elementID;
var elementType;
var stepNumCount = 1;
var masterSelector;
var masterTutorialName;
var masterContent;
var masterOrder;
var masterViewType;

$('body').append("<div id=\'Modal-Container\' class=\'modal-popup\'><div id=\'Modal-Contents\' class=\'modal-contents\'><\/div><div id=\'Modal-Nav\' class=\'modal-nav\'><\/div><\/div>");
$('body').prepend("<div id=\'TutorialHeader\' class=\'tutorial-header\'>Tutorial To Add or Edit: <input id=\'MasterTutName\'><\/input><button id=\'tutLock\'>Lock Name<\/button><button id=\'addModal\'>Add Modal<\/button><button id=\'quitTutEditor\'>Quit<\/button><\/div>");
$('#tutLock').live('click', function() {toggleTutorialName();});
$('#quitTutEditor').live('click', function(){location.reload();});
$('#addModal').live('click', function(){thingClicked("","","")});

//keep the header div anchored at the top of the page.
$(window).scroll(function(){
	var aboveBar = (parseInt($('#TutorialHeader').css('background-position'))*-1);
	var hiddenView = $(window).scrollTop();

	if(hiddenView > 0)
	{
		$('#TutorialHeader').addClass('keep_in_view');
	}
	else
	{
		$('#TutorialHeader').removeClass('keep_in_view');
	}
});

function toggleTutorialName()
{
	if($('#MasterTutName').prop('disabled'))
	{
		$('#MasterTutName').prop('disabled', false);
		$('#MasterTutName').removeClass('disabled_input');
		$('#tutLock').empty();
		$('#tutLock').append('Lock Name');
	}
	else
	{
		$('#MasterTutName').prop('disabled', true);
		$('#MasterTutName').addClass('disabled_input');
		$('#tutLock').empty();
		$('#tutLock').append('Unlock Name');
	}
}

function showModalWindow()
	{ 
		isModalDisplayed = true;
		var displayBox = '#Modal-Container';
		$(displayBox).fadeIn(300);
		$('#Modal-Contents').fadeIn(300);
		$('#Modal-Nav').fadeIn(300);
		var popMargTop = ($(displayBox).height() + 24) / 2; 
		var popMargLeft = ($(displayBox).width() + 24) / 2;
		$(displayBox).css({ 'margin-top' : -popMargTop,'margin-left' : -popMargLeft});
		$('body').append("<div id=\'mask\'></div>");
		$('#mask').fadeIn(300);
	}

function createSelector(element)
{
	var thisID = element.attr('id');
	var parentElementTag = element.parent().prop('tagName');
	var parentElementID = element.parent().attr('id');
	var elementTag = element.prop('tagName');
	var elementClasses = element.attr('class').split(" ");
	var firstElementClass = elementClasses[0];
	var contents = element.prop('innerHTML');

	var selector = "#" + thisID;
	if($(selector).size() === 1)
	{	
		selector = cleanSelector(selector);
		return selector;
	}
	else
	{
		//Get rid of any HTML elements in the contents. contains:() looks for text.
		contents = contents.replace(/(<([^>]+)>)/ig,"");

		// PUT SOMETHING HERE TO CLEAR PARENTHASES contents = contents.replace(, "");
		selector = elementTag.toLowerCase() + ":contains(\'" + contents + "\')";
		
		if($(selector).size() === 1)
		{	selector = cleanSelector(selector);
			return selector;
		}
		else
		{
			selector = "false";
			return selector;
		}
	}

}

function cleanSelector(selector)
{
	//gets rid of non-Ascii characters. Not really sure if I need to do this.
	//*******  May want to move the HTML scrub here **********

	var cleanSelector = selector.replace(/[^\x00-\x7F]/, "");
	console.log("selector: " +selector+ " clean: " + cleanSelector);
	return cleanSelector;
}


//*********  Need to fix the interaction between "thing clicked" and "addToDB" -- cause the data passing sucks.

function thingClicked(type, id, element)
 {
 	console.log("thing clicked");
	elementID = id;
	elementType = type;
	var parentElementTag = element.parent().prop('tagName');
	var elementTag = element.prop('tagName');
	var elementClasses = element.attr('class').split(" ");
	var firstElementClass = elementClasses[0];
	var contents = element.prop('innerHTML');

	var elementSelector = createSelector(element);
	
	if(elementSelector === "false")
	{
		//console.log("Error: no unique identifiers");
		masterSelector = "DON'T DO IT! IT WON'T WORK!";
	}
	else
	{
		/*console.log(elementSelector);
		var test = $(elementSelector);
		console.log(test);*/
		masterSelector = elementSelector;
	}	

	//Set up HTML for Modal window that author uses to define how the tutorial will "teach" the user about the selected element
	//*************************************************************************************************************************

 	$("#Modal-Contents").append("<tr><td><b>Element Type: <\/b><\/td><td>" + elementType  + "<\/td><\/tr><tr><td><b>Element ID: <\/b><\/td><td>" + elementID + "<\/td><\/tr>" );
 	$("#Modal-Contents").append("<tr><td><b>Selector: <\/b><\/td><td>" + masterSelector + "<\/td><\/tr>");
 	$("#Modal-Contents").append("<tr><td><b>Tutorial Name:<\/b><\/td><td><input id=\'TutorialName\' class=\'disabled_input\'><\/input><td><\/tr>"
 								+ "<tr><td><b>Content Type:</b><\/td><td><select id=\'contentType\'><option value=\'\'> <\/option><option value=\'CSS\'>CSS<\/option><option value=\'VIDEO\'>URL<\/option><option value=\'TEXT\'>Text<\/option><\/select><\/td><\/tr>"
								+ "<tr><td><b>Content View:</b><\/td><td><select id=\'contentView\'><option value=\'\'> <\/option><option value=\'CSS\'>CSS Class<\/option><option value=\'MODAL\'>Modal<\/option><option value=\'POPOVER\'>Popover<\/option><\/select><\/td><\/tr>"
 								+ "<tr><td><b>Content (link/class/text):</b><\/td><td><input id=\'Content\'></input><\/td><\/tr>"
 								+ "<tr><td><b>Order:<\/b><\/td><td><input id=\'tutorialOrder\'><\/input><\/td><\/tr>");
 	$("#Modal-Nav").append("<tr><td><button id=\'CreateTutorial\'>Add to DB</button><\/td><td><button id=\'closeModal\'>Cancel<\/button><\/td><\/tr>");
 	
 	//Set tutorial name to read only and to the value of the header's tutorial name
 	var tuttext = document.getElementById('MasterTutName').value;
 	masterTutorialName = tuttext;
 	$('#TutorialName').val(tuttext);
 	$('#TutorialName').prop('disabled', true);
	
 	$('#tutorialOrder').val(stepNumCount);
 	masterOrder = stepNumCount;
 	$('#tutorialOrder').prop('disabled', true);
 	$('#tutorialOrder').addClass('disabled_input');

 	//if first time, attach click events to buttons
	if(isFirstEntry == true)
 		{
 			$("#CreateTutorial").live('click',function(){addToDB();});
 			$("#closeModal").live('click',function(){closeModal();});
 			isFirstEntry = false;
		}
 	showModalWindow();
 }
 
function addToDB()
{ 
	// get all the data from the form
	var tutName = document.getElementById('TutorialName').value;
	var contentType = document.getElementById('contentType').value;
	var contents = document.getElementById('Content').value;
	var viewType = document.getElementById('contentView').value;
	var tutorialDomain = document.URL;
	var selector = escape(masterSelector);
	masterContent = contents;
	masterViewType = viewType;
	var order = masterOrder;
	console.log("addToDB(): " + masterOrder);

	//send to background page which will post to DB
	chrome.extension.sendMessage({RequestType: 'Post', tutorialDomain: tutorialDomain, elementType: elementType, selector: selector, contentType: contentType, viewType: viewType, tutName: tutName, contents: contents, order: order}, function(response) {
  		//console.log(response.farewell);
  		console.log("got a response: " + response.resp);
  		displayPostResult(response.resp);

	});
}

function displayPostResult(response)
{
	if(response != 'success')
	{
		console.log(response);
		$("#Modal-Contents").empty();
		$("#Modal-Contents").append("<p>WHOOPS! Something went wrong. Hit cancel and try again!<\/p>");
		$('#Modal-Contents').append("<p>" + response + "<\/p>")
		$('#CreateTutorial').attr('disabled', 'disabled');
	}
	else
	{
		$("#Modal-Contents").empty();
		$("#Modal-Contents").append("<p><h3>Success! Your Step has been added. Click cancel and continue adding steps!<\/h3><\/p>"
									+ "<table><tr><td class='modal-label'>Tutorial Name:<\/td><td>" + masterTutorialName + "<\/td><td class='modal-label'>Step Number:<\/td><td>" + masterOrder+ "<\/td><\/tr>"
									+ "<tr><td class='modal-label'>Element<\/td><td>" + elementID + " <\/td><td class='modal-label'>View Type:<\/td><td>" + masterViewType + "<\/td><\/tr>"
									+ "<tr><td class='modal-label'>Content:<\/td><td colspan='3'>"+ masterContent + "<\/td><\/tr><\/table>" );
		$('#CreateTutorial').attr('disabled', 'disabled');
		$('#closeModal').empty();
		$('#closeModal').append("Close");
		stepNumCount += 1;
	}
}

function replaceContents(elementID, html)
{

}

function closeModal()
 {
 	hideModal();
 	$('#Modal-Contents').empty();
 	$('#Modal-Nav').empty();
 }

function hideModal()
{
	$('#mask , .modal-popup').fadeOut(300 , function() {$('#mask').remove();});
}


//Non-Mechanics
$(function(){
	//***********************set up so author can add popovers etc to links********************
	$("a").hover(
   		function(e)
   		{
    	 	$(this).addClass("tutorialHighlight");
   		},
   		function(e)
   		{
     		$(this).removeClass("tutorialHighlight");
   		}
   	);

   $("a").click(
   		function(e)
   		{
   			//e.preventDefault();
   			thingClicked("link", $(this).attr('id'), $(this));
   			return false;
   		}
   	);
   //************************end link setup ****************************************************
 });
 