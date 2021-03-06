<!--
var itemnr = 0;
var timer;
//var itemDuration = 10000; // for testing purposes -> 10 seconds
var itemDuration = 120000; // in milliseconds -> 2 minuten is 120000
var itemstimulus = "";
var response = "";
var starttime = "";
var endtime = "";

function load() {
	itemnr = document.getElementById("itemnr").value;
	itemstimulus = document.getElementById("itemstimulus").value;
	startSign();	
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

	send = encodeURIComponent(response);
	response = response.substring(0, response.length-1);
	starttime = starttime.substring(0, starttime.length-1);
	endtime = endtime.substring(0, endtime.length-1);
	window.location = "aut.php?starttime="+starttime+"&endtime="+endtime+"&response="+response;
}

function clearResponse() {
	document.getElementById("response").innerHTML="";
}

function produceStimulus() {
	var time = Math.round(new Date().getTime());
	starttime += time+";";
	
	document.getElementById("stimulus").innerHTML=itemstimulus;
	document.getElementById("answer").value="";
}

function displayMessage(msg) {
	alert(msg);
}

function appendResponse() {
	var time = Math.round(new Date().getTime());
	var answer = document.getElementById("answer").value;

	endtime += time+";";
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
	if (keycode == 13)	{
		appendResponse();
		return false;
	} else {
		return true;
	}
}

function putFocus(formInst, elementInst) {
    if (document.forms.length > 0) {
      document.forms[formInst].elements[elementInst].focus();
    }
}

function startSign() {
	displayMessage("***Begin Opdracht***\n Als je op OK drukt dan begint de tijd meteen te lopen.");
}

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}
//-->
