<!--
var itemnr = 0;
var itemstimulus = "potlood";
var startItemNr = 1;
var pauseItemNr = 1;
// var pauseItemNr = 4;
//var endItemNr = 8;
var endItemNr = 2; // for testing purposes
var timer;
var itemDuration = 1000; // for testing purposes -> 1 second
//var itemDuration = 120000; // in milliseconds -> 2 minuten is 120000
var response = "";
var timestamp = "";

function load() {
	itemnr = document.getElementById("itemnr").value;
	itemstimulus = document.getElementById("itemstimulus").value;
	if (itemnr == startItemNr) {
		startSign();
	}	
	startItem();
}

function startItem() {
	putFocus(0,0);
	clearResponse();
	produceStimulus();
	timer=setTimeout("nextItem()",itemDuration);
}

function nextItem() {
	var send;

	if (itemnr == pauseItemNr) {
		pauseSign();
	}
	if (itemnr == endItemNr) {
		endSign();
	}
	send = encodeURIComponent(response);
	response = response.substring(0, response.length-1);
	timestamp = timestamp.substring(0, timestamp.length-1);
	window.location = "aut.php?timestamp="+timestamp+"&response="+response;
}

function clearResponse() {
	document.getElementById("response").innerHTML="";
}

function produceStimulus() {
	document.getElementById("stimulus").innerHTML=itemstimulus;
	document.getElementById("answer").value="";
}

function displayMessage(msg) {
	alert(msg);
}

function appendResponse() {
	var time = Math.round(new Date().getTime() / 1000);
	var answer = document.getElementById("answer").value;

	timestamp += time+";";
	response += answer+";";

	document.getElementById("response").innerHTML+="<br/>"+answer;
	document.getElementById("answer").value="";
}

function submitEnter(myfield,e) {
	var keycode;
	if (window.event) keycode = window.event.keyCode;
	else if (e) keycode = e.which;
	else return true;
	
	
	// if press Enter key
	if (keycode == 13)
	{
		appendResponse();
		return false;
	}
	else 
	{
		return true;
	}
}

function putFocus(formInst, elementInst) {
    if (document.forms.length > 0) 
    {
      document.forms[formInst].elements[elementInst].focus();
    }
}

function startSign() {
	displayMessage("***START*** \n\n Als je op OK drukt dan begint de tijd meteen te lopen.");
}

function pauseSign() {
	displayMessage("***PAUZE***\n\nJe bent nu halverwege de taak.\nZo nodig kan je een korte pauze houden.\nDruk daarna op OK om verder te gaan.");
}

function endSign() {	
	displayMessage("***EINDE***\n\nJe bent nu klaar met deze taak.\nDruk op OK om naar de volgende onderdeel te gaan.");
}

function preloadImages() {
	var i;
	var imageObj = new Image();
	
	for (i in rs_stimuli) {
		imageObj.src='gfx/'+stimuli_dir[sessionnr%4]+'/'+rs_stimuli[i]+'.png';
		imageObj.src='gfx/train_break/'+stimuli_dir[sessionnr%4]+'/'+rs_stimuli[i]+'.png';
		imageObj.src='gfx/train_end/'+stimuli_dir[sessionnr%4]+'/'+rs_stimuli[i]+'.png';
		imageObj.src='gfx/train_start/'+stimuli_dir[sessionnr%4]+'/'+rs_stimuli[i]+'.png';
	}
}

//-->