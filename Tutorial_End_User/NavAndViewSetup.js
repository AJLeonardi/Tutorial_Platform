
// Set up DIVs for Modal Popup  and the PopOver
$('body').append("<div id=\'display-box\' class=\'modal-popup\'><div id=\'modalContents\' class=\'modal-popup\'><\/div><\/div>");

//Set up DIVs for the Nav Bar
$('body').append("<div id=\'Anchor-Nav\' class=\'anchor\'><button class=\'anchorButtons\' id=\'PrevXML\'>Previous<\/button><button class=\'anchorButtons\' id=\'NextXML\'>Next<\/button><button class=\'anchorButtons\' id=\'ModalToggle\'>Modal Toggle<\/button><button class=\'anchorButtons button-right\' id=\'quitTutorial\'>Quit<\/button><\/div>");
$('body').append("<div id=\'Tutorial-Menu\' class\'T-menu\'><\/div>");


$('#NextXML').live('click', function() {showNextXMLElement();});
$('#PrevXML').live('click', function() {showPrevXMLElement();});
$('#ModalToggle').live('click', function() {toggleModal();});
$('#quitTutorial').live('click', function(){location.reload();});

jQuery(document).ready(
	function() 
	{
  	 $('#ModalToggle').hide();
	}
);