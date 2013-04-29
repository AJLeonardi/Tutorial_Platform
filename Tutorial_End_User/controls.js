var tutorialXML;
var iterator = 0;
var lastElements;
var isModalDisplayed = false;
var lastAddedClass;
var lastAlteredElement;

function showNextXMLElement()
{	console.log("next element");
	iterator = iterator + 1;
	var tutorialStep = findXMLElementByOrder(iterator);
	console.log(tutorialStep);

	if(tutorialStep != "No Element")
	{
		displayStep(tutorialStep);
	}
	else
	{
		iterator = iterator - 1;
	}
}

function showPrevXMLElement()
{
	iterator = iterator - 1;
	var tutorialStep = findXMLElementByOrder(iterator);

	if(tutorialStep != "No Element")
	{
		displayStep(tutorialStep);
	}
	else
	{
		iterator = iterator + 1;
	}
}


function findXMLElementByOrder(elementOrder)
{ 
	var xmlText = "xxx";

	$(tutorialXML).find("Element").each(function()
		{
			var thisOrder = $(this).find("Order").text();

			if (thisOrder == elementOrder)
			{
				//append this element if it is the right step
				if(xmlText != "xxx")
				{
					xmlText = xmlText + (new XMLSerializer()).serializeToString(this);
				}
				else
				{
					xmlText = (new XMLSerializer()).serializeToString(this);
				}
			}
			else
			{
			//console.log("this isn't the element: passed ID: " + elementID + " does not equal: " + thisID);
			}
		});

	if(xmlText != "xxx")
	{
		return xmlText;
	}
	else
	{
		xmlText = "No Element";
		return xmlText;
	}
}

function displayStep(stepToShow)
{

	var alertText = "";
	var insertCode;
	var step = stepToShow;
	var stepType = $(stepToShow).find("ContentType").text();
	var stepViewType = $(stepToShow).find("ViewType").text();
	//var elementID = "#" + $(stepToShow).find("ElementID").text();
	var unEscElementID = $(stepToShow).find("ElementID").text();
	elementID = unescape(unEscElementID);
	console.log(elementID);
	var elementClass = $(stepToShow).find("ContentValue").text();
	var content = $(stepToShow).find("ContentValue").text();
	

	removeCSS(lastAlteredElement, lastAddedClass);
	removePopover(lastAlteredElement);
	var appendText;

	if(stepType == "CSS")
	{	removeModalVideo();
		addCSS(elementID, elementClass);
	}
	else if(stepType == "VIDEO")
	{
		appendText = "<iframe width=\'560\' height=\'315\' src=\'" + content + "\' frameborder=\'0\'><\/iframe>";

		if(stepViewType == "MODAL")
		{
			addModalVideo(appendText);
		}
		else if(stepViewType == "POPOVER")
		{
			removeModalVideo();
			displayPopover(elementID, appendText);
		}	
	}
	else if(stepType == "TEXT")
	{
		appendText = "<p style=\'padding: 10px 10px 10px 10px\'>" + content + "<\/p>";

		if(stepViewType == "MODAL")
		{
			addModalVideo(appendText);
		}
		else if(stepViewType == "POPOVER")
		{
			removeModalVideo();
			displayPopover(elementID, appendText);
		}	
	}
	else{}
}

function addCSS(elementID, elementClass)
{ 
	lastAddedClass = elementClass;
	lastAlteredElement = elementID;
	$(elementID).addClass(elementClass);
}

function removeCSS(elementID, elementClass)
{ 
	if(typeof elementClass != 'undefined')
	{
		$(elementID).removeClass(elementClass);
	}

}

function addModalVideo(contentText)
{
	$('#ModalToggle').show();
	$('#display-box').empty();


	$('#display-box').append(contentText);	
	showModalWindow();
	
	return false;
}

function removeModalVideo()
{	
	hideModalWindow();
	
	$('#display-box').empty();
	$('#ModalToggle').hide();
}

function hideModalWindow()
{  
	isModalDisplayed = false;
	$('#mask , .modal-popup').fadeOut(300 , function() {$('#mask').remove();});
}

function showModalWindow()
{ 
	isModalDisplayed = true;
	var displayBox = '#display-box';

	$(displayBox).fadeIn(300);

	var popMargTop = ($(displayBox).height() + 24) / 2; 
	var popMargLeft = ($(displayBox).width() + 24) / 2;

	$(displayBox).css({ 'margin-top' : -popMargTop,'margin-left' : -popMargLeft});
	$('body').append("<div id=\'mask\'></div>");
	
	$('#mask').fadeIn(300);
}

function toggleModal()
{
	if(isModalDisplayed == true)
	{
		hideModalWindow();
	}
	else
	{
		showModalWindow();
	}
}

function displayPopover(elementID, contentText)
{
	lastAlteredElement = elementID;
	console.log($(elementID));

	//Add popOver Element to dynamic element
	$(elementID).popover({content: '.popover > .content'});
	$(elementID).addClass('highlightTutorial');
	lastAddedClass = "highlightTutorial";
	//Add Dynamic content to popOver DIV
	
	$('.contentPop').append(contentText);
	
	//Show the popOver
	$(elementID).trigger('click');
}
	
function removePopover(prevElement)
{ 
	$('div').remove('.popover');
	$(prevElement).removeClass("popover-button");
	$(prevElement).unbind('click');
	$(prevElement).unbind('showPopover');
	$(prevElement).unbind('hidePopover');
}