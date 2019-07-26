/**
 * @copyright HPE
 * @author Indrajit Kumar
 * @version 1.0
 * @created 18 July 2019
 * 
 */

// Start login related functions
function oamLogin() {
	startPageLoading();
	document.forms[0].action = "/aahk-demo/login.do";
	document.forms[0].submit();
}

function signout() {
	startPageLoading();
	document.forms[0].action = "/aahk-demo/signout.do";
	document.forms[0].submit();
}
// End login related functions
// ****************************************************************************************************************************

// Start customer related functions
function resetCustomer() {
	document.forms[0].orgId.disabled = false;
	document.forms[0].orgName.disabled = false;
	document.forms[0].orgHost.disabled = false;
	document.forms[0].orgId.value = "";
	document.forms[0].orgName.value = "";
	document.forms[0].orgHost.value = "";

	if (document.getElementById("create") != null){
		document.forms[0].create.disabled = false;
		document.getElementById("create").className = "createMemberButton";
		document.getElementById("create").className += " inputData";
	}
	if (document.getElementById("createBusinessService") != null){
		document.forms[0].createBusinessService.disabled = true;
		document.getElementById("createBusinessService").className = "createServiceButtonDisabled";
		document.getElementById("createBusinessService").className += " inputDataDisabled";
	}
	if (document.getElementById("divsuccessmessage") != null)
		document.getElementById("divsuccessmessage").innerHTML = "";
	else if (document.getElementById("divfailmessage") != null)
		document.getElementById("divfailmessage").innerHTML = "";
}

function customerStatusSuccess() {
	document.forms[0].orgId.disabled = true;
	document.forms[0].orgName.disabled = true;
	document.forms[0].orgHost.disabled = true;
	if (document.getElementById("create") != null)
		document.forms[0].create.disabled = true;
	if (document.getElementById("update") != null) {
		document.forms[0].orgName.disabled = false;
		document.forms[0].orgHost.disabled = false;
		document.forms[0].update.disabled = false;
	}
}

function customerStatusFail() {
	document.forms[0].orgId.disabled = true;
	document.forms[0].orgName.disabled = true;
	document.forms[0].orgHost.disabled = true;
	if (document.getElementById("create") != null)
		document.forms[0].create.disabled = false;
	if (document.getElementById("update") != null) {
		document.forms[0].orgName.disabled = false;
		document.forms[0].orgHost.disabled = false;
		document.forms[0].update.disabled = false;
	}
}

function createNotdisable() {
	document.forms[0].orgId.disabled = false;
	document.forms[0].orgName.disabled = false;
	document.forms[0].orgHost.disabled = false;
	document.forms[0].create.disabled = false;
}

function updateDisable() {
	document.forms[0].orgId.disabled = true;
	document.forms[0].orgName.disabled = true;
	document.forms[0].orgHost.disabled = true;
	document.forms[0].update.disabled = true;
}

function displayCreateCustomer() {
	startPageLoading();
	document.forms[0].action = "/OnboardingServicesUI/displayCreateCustomer.do";
	document.forms[0].submit();
}

function createNewCustomer() {
	var hosts = '';
	var arrHosts = $.trim(document.forms[0].orgHost.value).replace(/\r\n/g,
			"\n").split("\n");
	// var arrHosts =
	// $.trim(document.forms[0].orgHost.value).split(/\s*[,;]\s*|\s{2,}|[\r\n]|\s+/i);
	var urls = new Array();
	j = 0;
	for ( var i in arrHosts) {
		if ($.trim(arrHosts[i]) == '') {
			delete arrHosts[i];
			continue;
		}
		urls[j++] = $.trim(arrHosts[i]);
	}
	for ( var i in urls) {
		if (i < urls.length - 1)
			hosts = hosts + urls[i] + '\n';
		else
			hosts = hosts + urls[i];
	}
	for ( var i in urls) {
		document.forms[0].orgHost.value = urls[i];
		$("#orgHost").validate();
		if (!$("#orgHost").valid()) {
			break;
		}
	}
	if ($("#createCustomerForm").valid()) {
		startPageLoading();
		document.forms[0].orgId.disabled = false;
		document.forms[0].orgName.disabled = false;
		document.forms[0].orgHost.disabled = false;
		document.forms[0].orgHost.value = hosts;

		document.forms[0].action = "/OnboardingServicesUI/createNewCustomer.do";
		document.forms[0].submit();
	} else {
		document.forms[0].orgHost.value = hosts;
		return false;
	}
}

var isCreateClicked = false;
var oldCreateId = "";
function populateCreateData(strCustomer, status) {
	startPageLoading();
	if (isCreateClicked == true) {
		document.getElementById(oldCreateId).style.backgroundColor = "#FFFFFF";
	}

	isCreateClicked = true;
	oldCreateId = strCustomer;
	document.getElementById(strCustomer).style.backgroundColor = "#F2F2F2";
	if (strCustomer != "" && strCustomer != null) {
		$.ajax({
			type : "POST",
			url : "/OnboardingServicesUI/populateCustomerData.do",
			data : "orgId=" + strCustomer,
			success : function(response) {
				stopPageLoading();
				displayCreateData(response, status);
			},
			error : function(e) {
				stopPageLoading();
				alert('Error: ' + e);
				createNotdisable();
				document.forms[0].orgId.value = "";
				document.forms[0].orgName.value = "";
				document.forms[0].orgHost.value = "";
			}
		});
	}
}

function displayCreateData(response, status) {
	document.forms[0].orgId.disabled = true;
	document.forms[0].orgName.disabled = true;
	document.forms[0].orgHost.disabled = true;

	if (status == "PASS"){
		document.forms[0].create.disabled = true;
		document.getElementById("create").className = "createMemberButtonDisabled";
		document.getElementById("create").className += " inputDataDisabled";
		document.forms[0].createBusinessService.disabled = false;
		document.getElementById("createBusinessService").className = "createServiceButton";
		document.getElementById("createBusinessService").className += " inputData";		
	}else{
		document.forms[0].create.disabled = true;
		document.getElementById("create").className = "createMemberButtonDisabled";
		document.getElementById("create").className += " inputDataDisabled";
		document.forms[0].createBusinessService.disabled = true;
		document.getElementById("createBusinessService").className = "createServiceButtonDisabled";
		document.getElementById("createBusinessService").className += " inputDataDisabled";
	}

	if (document.getElementById("divsuccessmessage") != null)
		document.getElementById("divsuccessmessage").innerHTML = "";
	else if (document.getElementById("divfailmessage") != null)
		document.getElementById("divfailmessage").innerHTML = "";

	if (response != null && response != "" && response.indexOf("#") != -1) {
		var arrField = response.split("#");
		document.forms[0].orgId.value = arrField[0];
		document.forms[0].orgName.value = arrField[1];
		document.forms[0].orgHost.value = arrField[2];
		
	} else {
		alert(response);
		createNotdisable();
		document.forms[0].orgId.value = "";
		document.forms[0].orgName.value = "";
		document.forms[0].orgHost.value = "";
	}
}

function displayUpdateCustomer() {
	startPageLoading();
	document.forms[0].action = "/OnboardingServicesUI/displayUpdateCustomer.do";
	document.forms[0].submit();
}

function updateCustomer() {
	var hosts = '';
	var arrHosts = $.trim(document.forms[0].orgHost.value).replace(/\r\n/g,
			"\n").split("\n");
	// var arrHosts =
	// $.trim(document.forms[0].orgHost.value).split(/\s*[,;]\s*|\s{2,}|[\r\n]|\s+/i);
	var urls = new Array();
	j = 0;
	for ( var i in arrHosts) {
		if ($.trim(arrHosts[i]) == '') {
			delete arrHosts[i];
			continue;
		}
		urls[j++] = $.trim(arrHosts[i]);
	}
	for ( var i in urls) {
		if (i < urls.length - 1)
			hosts = hosts + urls[i] + '\n';
		else
			hosts = hosts + urls[i];
	}
	for ( var i in urls) {
		document.forms[0].orgHost.value = urls[i];
		$("#orgHost").validate();
		if (!$("#orgHost").valid()) {
			break;
		}
	}
	if ($("#updateCustomerForm").valid()) {
		startPageLoading();
		document.forms[0].orgId.disabled = false;
		document.forms[0].orgName.disabled = false;
		document.forms[0].orgHost.disabled = false;
		document.forms[0].orgHost.value = hosts;

		document.forms[0].action = "/OnboardingServicesUI/updateCustomer.do";
		document.forms[0].submit();
	} else {
		document.forms[0].orgHost.value = hosts;
		return false;
	}
}

var isClicked = false;
var oldId = "";
function populateUpdateData(strCustomer, updatestatus, createstatus) {
	startPageLoading();
	if (isClicked == true) {
		document.getElementById(oldId).style.backgroundColor = "#FFFFFF";
	}

	isClicked = true;
	oldId = strCustomer;
	document.getElementById(strCustomer).style.backgroundColor = "#F2F2F2";
	if (strCustomer != "" && strCustomer != null) {
		$.ajax({
			type : "POST",
			url : "/OnboardingServicesUI/populateCustomerData.do",
			data : "orgId=" + strCustomer,
			success : function(response) {
				stopPageLoading();
				displayData(response, updatestatus, createstatus);
			},
			error : function(e) {
				stopPageLoading();
				alert('Error: ' + e);
			}
		});
	}
}

function displayData(response, updatestatus, createstatus) {
	document.forms[0].orgId.disabled = true;

	if (updatestatus != "PASS" && updatestatus != "INIT") {
		updateDisable();
	}
	if (updatestatus == "INIT" && createstatus != "PASS") {
		updateDisable();
	} else {
		document.forms[0].orgName.disabled = false;
		document.forms[0].orgHost.disabled = false;
		document.forms[0].update.disabled = false;
	}

	if (document.getElementById("divsuccessmessage") != null)
		document.getElementById("divsuccessmessage").innerHTML = "";
	else if (document.getElementById("divfailmessage") != null)
		document.getElementById("divfailmessage").innerHTML = "";

	if (response != null && response != "" && response.indexOf("#") != -1) {
		var arrField = response.split("#");
		document.forms[0].orgId.value = arrField[0];
		document.forms[0].orgName.value = arrField[1];
		document.forms[0].orgHost.value = arrField[2];
	} else {
		alert(response);
	}
}

// End customer related functions
// ****************************************************************************************************************************

// Start Business related functions
function displayBusinessService() {
	startPageLoading();
	document.forms[0].orgId.disabled = false;
	document.forms[0].action = "/OnboardingServicesUI/displayBusinessService.do";
	document.forms[0].submit();
}

function createBusinessService() {
	$("#createBusinessServiceForm").validate();

	if ($("#createBusinessServiceForm").valid()) {
		startPageLoading();
		document.forms[0].orgId.disabled = false;
		document.forms[0].action = "/OnboardingServicesUI/createBusinessService.do";
		document.forms[0].submit();
	} else {
		return;
	}
}

function populateBusinessList(rowId) {
	startPageLoading();

	document.forms[0].orgId.value = rowId;
	document.forms[0].serviceName.value = "";
	document.forms[0].orgId.disabled = false;

	document.forms[0].action = "/OnboardingServicesUI/populateBusinessList.do";
	document.forms[0].submit();
}

var isBusinessServicesClicked = false;
var oldBusinessServicesId = "";
function businessServiceClick(rowId) {
	if (isBusinessServicesClicked == true) {
		document.getElementById(oldBusinessServicesId).style.backgroundColor = "#FFFFFF";
	}

	isBusinessServicesClicked = true;
	oldBusinessServicesId = rowId;

	document.getElementById(oldBusinessServicesId).style.backgroundColor = "#F2F2F2";
	document.forms[0].serviceName.value = rowId;
	document.forms[0].serviceName.disabled = true;

	document.forms[0].create.disabled = true;
	document.getElementById("create").className = "createServiceButtonDisabled";
	document.getElementById("create").className += " inputDataDisabled";

	document.forms[0].add.disabled = false;
	document.getElementById("add").className = "addSystemButton";
	document.getElementById("add").className += " inputData";

	document.forms[0].retire.disabled = false;
	document.getElementById("retire").className = "retireButton";
	document.getElementById("retire").className += " inputData";

	if (document.getElementById("divsuccessmessage") != null)
		document.getElementById("divsuccessmessage").innerHTML = "";
	else if (document.getElementById("divfailmessage") != null)
		document.getElementById("divfailmessage").innerHTML = "";
}
// End Business related functions
// ****************************************************************************************************************************

// Start Retire Business Service related functions
function displayRetireBusinessService() {
	startPageLoading();
	document.forms[0].orgId.disabled = false;
	document.forms[0].serviceName.disabled = false;
	document.forms[0].action = "/OnboardingServicesUI/displayRetireBusinessService.do";
	document.forms[0].submit();
}

function retireBusinessService() {
	$("#retireBusinessServiceForm").validate();
	if ($("#retireBusinessServiceForm").valid()) {
		document.forms[0].retireServiceName.disabled = false;
		if (confirm("Do you want to retire the Business Service associated to '" + document.forms[0].retireServiceName.value + "'?") == true) {
			startPageLoading();			
			document.forms[0].action = "/OnboardingServicesUI/retireBusinessService.do";
			document.forms[0].submit();
		}else{
			document.forms[0].retireServiceName.disabled = true;
		}
	} else {
		return false;
	}
}

var isRetireClicked = false;
var oldRetireId = "";
function populateRetireData(rowId) {
	if (isRetireClicked == true) {
		document.getElementById(oldRetireId).style.backgroundColor = "#FFFFFF";
	}

	isRetireClicked = true;
	oldRetireId = rowId;
	document.getElementById(oldRetireId).style.backgroundColor = "#F2F2F2";
	document.forms[0].retireServiceName.value = rowId;
	document.forms[0].retire.disabled = false;
}
// End Retire Business Service related functions
// ****************************************************************************************************************************

// Start Activate Business Service related functions
function displayActivateBusinessService() {
	startPageLoading();
	document.forms[0].orgId.disabled = false;
	document.forms[0].serviceName.disabled = false;
	document.forms[0].action = "/OnboardingServicesUI/displayActivateBusinessService.do";
	document.forms[0].submit();
}

function activateBusinessService() {
	$("#activateBusinessServiceForm").validate();
	if ($("#activateBusinessServiceForm").valid()) {
		startPageLoading();
		document.forms[0].activateServiceName.disabled = false;
		document.forms[0].action = "/OnboardingServicesUI/activateBusinessService.do";
		document.forms[0].submit();
	} else {
		return false;
	}
}

var isActivateClicked = false;
var oldActivateId = "";
function populateActivateData(rowId) {
	if (isActivateClicked == true) {
		document.getElementById(oldActivateId).style.backgroundColor = "#FFFFFF";
	}

	isActivateClicked = true;
	oldActivateId = rowId;
	document.getElementById(oldActivateId).style.backgroundColor = "#F2F2F2";
	document.forms[0].activateServiceName.value = rowId;
	document.forms[0].activate.disabled = false;

}
// End Activate Business Service related functions
// ****************************************************************************************************************************

// Start Add System related functions
function systemDisable() {
	document.forms[0].softwareSystemName.disabled = true;
	document.forms[0].multientantSystem[0].disabled = true;
	document.forms[0].multientantSystem[1].disabled = true;
	document.forms[0].softwareSystemVersion.disabled = true;
	document.forms[0].systemBaseURI.disabled = true;
	document.forms[0].hostName.disabled = true;
}

function displayAddSystemToBusinessService(str) {
	if (str != null && str != "") {
		document.forms[0].addSystemHome.value = str;
	}

	startPageLoading();

	document.forms[0].orgId.disabled = false;
	document.forms[0].serviceName.disabled = false;

	document.forms[0].action = "/OnboardingServicesUI/displayAddSystemToBusinessService.do";
	document.forms[0].submit();
}

function populateSystemBusinessList(rowId) {
	startPageLoading();

	document.forms[0].orgId.value = rowId;

	document.forms[0].action = "/OnboardingServicesUI/populateSystemBusinessList.do";
	document.forms[0].submit();
}

function getAssociatedSystemsToBusinessService(orgid, servicename) {
	startPageLoading();

	document.forms[0].orgId.value = orgid;
	document.forms[0].serviceName.value = servicename;

	document.forms[0].action = "/OnboardingServicesUI/getAssociatedSystemsToBusinessService.do";
	document.forms[0].submit();
}

var isSystemClicked = false;
var oldSystemId = "";
function getSystemData(productName, productVersion, systemname) {
	if (document.getElementById("divsuccessmessage") != null)
		document.getElementById("divsuccessmessage").innerHTML = "";
	if (document.getElementById("divfailmessage") != null)
		document.getElementById("divfailmessage").innerHTML = "";

	if (isSystemClicked == true) {
		// document.getElementById(oldSystemId).style.backgroundColor =
		// "#FFFFFF";
	}

	isSystemClicked = true;
	oldSystemId = productName + "_" + productVersion;
	// document.getElementById(orgid).style.backgroundColor = "#F2F2F2";
	if (productName != "" && productName != null)
		setTimeout(function() {
			readSystemAjaxCall(productName, productVersion, systemname);
		}, 300);
}

function readSystemAjaxCall(productName, productVersion, systemname) {
	startPageLoading();
	$.ajax({
		type : "POST",
		url : "/OnboardingServicesUI/getSystemData.do",
		data : "softwareSystemName=" + productName + "&softwareSystemVersion="
				+ productVersion + "&childSystem=" + systemname,
		success : function(response) {
			stopPageLoading();
			displaySystemData(response);
		},
		error : function(e) {
			stopPageLoading();
			alert('Error: ' + e);
		}
	});
}

function displaySystemData(response) {
	if (response != null && response != "" && response.indexOf("#") != -1) {
		var arrField = response.split("#");

		document.forms[0].softwareSystemName.value = arrField[0];
		document.forms[0].softwareSystemVersion.value = arrField[1];
		document.forms[0].systemBaseURI.value = arrField[2];
		document.forms[0].hostName.value = arrField[3];

		if (arrField[4] == 'false') {
			document.getElementById("multientantSystem2").checked = true;
			document.getElementById("multientantSystem1").checked = false;
		} else {
			document.getElementById("multientantSystem1").checked = true;
			document.getElementById("multientantSystem2").checked = false;
		}
	} else {
		alert(response);
	}
}

function addSystemToBusinessService(orgid, servicename) {
	startPageLoading();

	systemList = "";
	listItems = $('#parrentElementNode a');
	// alert($('#parrentElementNode').innerHTML);

	for ( var i = 0; i < listItems.size(); i++) {
		if (i < listItems.size() - 1)
			systemList = systemList + listItems[i].innerHTML + "#";
		else
			systemList = systemList + listItems[i].innerHTML;
	}

	document.forms[0].attachedSystem.value = systemList;
	document.forms[0].orgId.value = orgid;
	document.forms[0].serviceName.value = servicename;

	reAddedSystem = "";
	for (key in mapReAdd)
		reAddedSystem = reAddedSystem + key + "#";

	if (reAddedSystem.indexOf("#") != -1)
		reAddedSystem = reAddedSystem.slice(0, reAddedSystem.length - 1);

	document.forms[0].reAttachedSystem.value = reAddedSystem;

	document.forms[0].action = "/OnboardingServicesUI/addSystemToBusinessService.do";
	document.forms[0].submit();
}
// End Add System related functions
// ****************************************************************************************************************************

// Start Edit System related functions
function displayEditExistingBusinessService() {
	startPageLoading();

	document.forms[0].action = "/OnboardingServicesUI/displayEditExistingBusinessService.do";
	document.forms[0].submit();
}

function editExistingBusinessService(orgid, servicename) {
	startPageLoading();

	systemList = "";
	listItems = $('#parrentElementNode a');

	for ( var i = 0; i < listItems.size(); i++) {
		if (i < listItems.size() - 1)
			systemList = systemList + listItems[i].innerHTML + "#";
		else
			systemList = systemList + listItems[i].innerHTML;
	}

	document.forms[0].attachedSystem.value = systemList;
	document.forms[0].orgId.value = orgid;
	document.forms[0].serviceName.value = servicename;

	reRemoveSystem = "";
	for (key in mapReRemove)
		reRemoveSystem = reRemoveSystem + key + "#";

	if (reRemoveSystem.indexOf("#") != -1)
		reRemoveSystem = reRemoveSystem.slice(0, reRemoveSystem.length - 1);

	document.forms[0].reAttachedSystem.value = reRemoveSystem;

	document.forms[0].action = "/OnboardingServicesUI/editExistingBusinessService.do";
	document.forms[0].submit();
}

function populateEditSystemBusinessList(rowId) {
	startPageLoading();

	document.forms[0].orgId.value = rowId;

	document.forms[0].action = "/OnboardingServicesUI/populateEditSystemBusinessList.do";
	document.forms[0].submit();
}

function getEditAssociatedSystemsToBusinessService(orgid, servicename) {
	startPageLoading();

	document.forms[0].orgId.value = orgid;
	document.forms[0].serviceName.value = servicename;

	document.forms[0].action = "/OnboardingServicesUI/getEditAssociatedSystemsToBusinessService.do";
	document.forms[0].submit();
}
// End Edit System related functions
// ****************************************************************************************************************************

// Start Organization Chart related functions
function buildBusinessServiceTree(serviceName) {
	document.getElementById("chart").innerHTML = "";
	var td = document.getElementById("org");
	td.innerHTML = "";
	td.innerHTML = "<li id='" + serviceName + "_"
			+ "'><a href='javascript:void(0)' ondblclick='removeService(\""
			+ serviceName + "_" + "\")'>" + serviceName
			+ "</a><ul id='parrentElementNode'></ul></li>";

	jQuery(document).ready(function() {
		$("#org").jOrgChart({
			chartElement : '#chart',
			dragAndDrop : false
		});
	});

}

function buildSystemTree(systemName, systemVersion) {
	if ((document.getElementById(systemName + "_" + systemVersion + "_") != null)) {
		if (systemName + "_" + systemVersion + "_" in mapPrfoductStatus) {
			if (mapPrfoductStatus[systemName + "_" + systemVersion + "_"] != "NEW_INIT"
					&& mapPrfoductStatus[systemName + "_" + systemVersion + "_"] != "PASS_INIT") {
				removeSystem(systemName + "_" + systemVersion + "_");
				delete mapPrfoductStatus[systemName + "_" + systemVersion + "_"];
				mapReAdd[systemName + "_" + systemVersion] = "";

				document.getElementById("chart").innerHTML = "";

				var parrentElementNode = document
						.getElementById("parrentElementNode");
				var newNodeLi = document.createElement("li");
				newNodeLi.id = systemName + "_" + systemVersion + "_";

				var newNodeAnchor = document.createElement("a");

				newNodeAnchor.href = 'javascript:void(0)';

				newNodeAnchor.setAttribute("ondblclick", "removeSystem2(\'"
						+ systemName + "_" + systemVersion + "\');");

				newNodeAnchor.setAttribute("onclick", "getSystemData(\'"
						+ systemName + "\',\'" + systemVersion + "\','');");

				newNodeAnchor.className = "nodefont";
				var anchorText = document.createTextNode(systemName + "_"
						+ systemVersion);
				newNodeAnchor.appendChild(anchorText);

				newNodeLi.appendChild(newNodeAnchor);
				parrentElementNode.appendChild(newNodeLi);

				jQuery(document).ready(function() {
					$("#org").jOrgChart({
						chartElement : '#chart',
						dragAndDrop : false
					});
				});
			}
		} else {
			alert(systemName + "_" + systemVersion
					+ " is already part of the tree.");
			return false;
		}
	} else {
		document.getElementById("chart").innerHTML = "";

		var parrentElementNode = document.getElementById("parrentElementNode");
		if (null != parrentElementNode) {
			var newNodeLi = document.createElement("li");
			newNodeLi.id = systemName + "_" + systemVersion + "_";

			var newNodeAnchor = document.createElement("a");
			newNodeAnchor.href = 'javascript:void(0)';
			newNodeAnchor.setAttribute("ondblclick", "removeSystem(\'"
					+ systemName + "_" + systemVersion + "_" + "\');");
			newNodeAnchor.setAttribute("onclick", "getSystemData(\'"
					+ systemName + "\',\'" + systemVersion + "\','');");
			newNodeAnchor.className = "nodefont";
			var anchorText = document.createTextNode(systemName + "_"
					+ systemVersion);
			newNodeAnchor.appendChild(anchorText);

			newNodeLi.appendChild(newNodeAnchor);
			parrentElementNode.appendChild(newNodeLi);

			jQuery(document).ready(function() {
				$("#org").jOrgChart({
					chartElement : '#chart',
					dragAndDrop : false
				});
			});
		}
	}
}

function buildRemoveSystemTree(systemName, systemVersion) {
	if ((document.getElementById(systemName + "_" + systemVersion + "_") != null)) {
		if (systemName + "_" + systemVersion + "_" in mapRemoveStatus) {
			if (mapRemoveStatus[systemName + "_" + systemVersion + "_"] == "PASS_INIT"
					|| mapRemoveStatus[systemName + "_" + systemVersion + "_"] == "PASS_FAIL") {
				removeSystem(systemName + "_" + systemVersion + "_");
				delete mapRemoveStatus[systemName + "_" + systemVersion + "_"];
				mapReRemove[systemName + "_" + systemVersion] = "";

				document.getElementById("chart").innerHTML = "";

				var parrentElementNode = document
						.getElementById("parrentElementNode");
				var newNodeLi = document.createElement("li");
				newNodeLi.id = systemName + "_" + systemVersion + "_";

				var newNodeAnchor = document.createElement("a");

				newNodeAnchor.href = 'javascript:void(0)';

				newNodeAnchor.setAttribute("ondblclick", "removeSystem3(\'"
						+ systemName + "_" + systemVersion + "\');");

				newNodeAnchor.setAttribute("onclick", "getSystemData(\'"
						+ systemName + "\',\'" + systemVersion + "\','');");

				newNodeAnchor.className = "nodefont4";
				var anchorText = document.createTextNode(systemName + "_"
						+ systemVersion);
				newNodeAnchor.appendChild(anchorText);

				newNodeLi.appendChild(newNodeAnchor);
				parrentElementNode.appendChild(newNodeLi);

				jQuery(document).ready(function() {
					$("#org").jOrgChart({
						chartElement : '#chart',
						dragAndDrop : false
					});
				});
			}
		}
	}
}

function removeSystem(id) {
	document.getElementById("chart").innerHTML = "";
	element = document.getElementById(id);
	element.parentNode.removeChild(element);

	jQuery(document).ready(function() {
		$("#org").jOrgChart({
			chartElement : '#chart',
			dragAndDrop : false
		});
	});
}

function removeSystem2(productname) {
	alert(productname
			+ " is a commited system and you can't remove it by double on it from 'Add System' page.\nIf you want to remove then go to 'Remove System' page and double click on it.");
}

function removeSystem3(productname) {
	alert("Remove request for this "
			+ productname
			+ " system is already raised and request is under process.\nGo to 'Activate a Business Service' page for further action.");
}

function removeService(serviceName) {
	document.getElementById("chart").innerHTML = "";
	element = document.getElementById(serviceName);
	element.parentNode.removeChild(element);
}

function buildBusinessServiceTree2(serviceName, systemName) {
	document.getElementById("chart").innerHTML = "";
	var td = document.getElementById("org");
	td.innerHTML = "";
	td.innerHTML = "<li id='" + serviceName + "_"
			+ "'><a href='javascript:void(0)' ondblclick='removeService(\""
			+ serviceName + "_" + "\")'>" + serviceName
			+ "</a><ul id='parrentElementNode'></ul></li>";

	var parrentElementNode = document.getElementById("parrentElementNode");
	strSystemName = systemName.split("_");
	for ( var i = 0, ii = strSystemName.length - 1; i < ii; i++) {
		var newNodeLi = document.createElement("li");
		newNodeLi.id = strSystemName[i] + "_";

		var newNodeAnchor = document.createElement("a");
		newNodeAnchor.href = 'javascript:void(0)';
		newNodeAnchor.setAttribute("ondblclick", "removeSystem(\'"
				+ strSystemName[i] + "_" + "\');");

		var anchorText = document.createTextNode(strSystemName[i]);
		newNodeAnchor.appendChild(anchorText);

		newNodeLi.appendChild(newNodeAnchor);
		parrentElementNode.appendChild(newNodeLi);
	}

	jQuery(document).ready(function() {
		$("#org").jOrgChart({
			chartElement : '#chart',
			dragAndDrop : false
		});
	});
}

function getSystemNodes() {
	var node = document.getElementById('parrentElementNode').childNodes;
	var strSystem = "";
	for ( var i = 0, ii = node.length; i < ii; i++) {
		if (node[i].nodeName == "LI" || node[i].nodeName == "li") {
			strSystem = strSystem + node[i].id;
		}
	}
	return strSystem;
}
// End Organization Chart related functions
// ****************************************************************************************************************************

// Start Breadcrum related functions
function updateBreadcrum(str) {
	if (str == "Home") {
		startPageLoading();
		document.forms[0].submitname.value = "Home";
		document.forms[0].action = "/OnboardingServicesUI/home.do";
		document.forms[0].submit();
	}
	if (str == "Add a System to a Business Service") {
		startPageLoading();
		document.forms[0].submitname.value = "Add a System to a Business Service";
		document.forms[0].action = "/OnboardingServicesUI/displayAddSystemToBusinessService.do";
		document.forms[0].submit();
	}
	if (str == "Create Customer") {
		startPageLoading();
		document.forms[0].submitname.value = "Create Customer";
		document.forms[0].action = "/OnboardingServicesUI/displayCreateCustomer.do";
		document.forms[0].submit();
	}
	
	if (str == "Create a Business Service") {
		startPageLoading();
		document.forms[0].submitname.value = "Create a Business Service";
		document.forms[0].action = "/OnboardingServicesUI/displayBusinessService.do";
		document.forms[0].submit();
	}
}
// End Breadcrum related functions
// ****************************************************************************************************************************

// Start Page Loading related functions
function startPageLoading() {
	// document.body.style.overflow="hidden";
	var strDivNumber = "100";
	var objProgressDiv = document.getElementById("divProgressBar"
			+ strDivNumber);
	var objBlurDiv = document.getElementById("divBlur" + strDivNumber);
	// objProgressDiv.style.overflow="hidden";
	// objBlurDiv.style.overflow="hidden";
	if (objBlurDiv) {
		objBlurDiv.style.width = document.body.clientWidth + "px";
		objBlurDiv.style.height = document.body.clientHeight + "px";
		objBlurDiv.style.display = "";
	}
	if (objProgressDiv) {
		objProgressDiv.style.display = "";
	}
}

function stopPageLoading() {
	var strDivNumber = "100";
	objProgressDiv = document.getElementById("divProgressBar" + strDivNumber);
	objBlurDiv = document.getElementById("divBlur" + strDivNumber);
	if (objBlurDiv) {
		objBlurDiv.style.width = "0px";
		objBlurDiv.style.height = "0px";
	}
	if (objProgressDiv)
		objProgressDiv.style.display = "none";
}
// End Page Loading related functions
// ****************************************************************************************************************************

// Start other utilities functions
function trim(myString) {
	return myString.replace(/^s+/g, '').replace(/s+$/g, '');
}
// End other utilities functions
// ****************************************************************************************************************************
