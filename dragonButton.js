var setupFilePath="Runner.exe";
 function IEExe()   
        /* {  
		 if(!IEfileExist("file:///localhost/C:/Runner/Runner.exe")){
		// window.open("file:///C:\\MySetup.exe");
		location.href=setupFilePath;
		
		 }else{*/
		 
					 
		  MyObject = new ActiveXObject( "WScript.Shell" ) ;  
             MyObject.Run("C|/Runner\\Runner.exe");
			//}file:///C|/My Documents\flowers.exe
			

			sleep(2000);
			var data=document.getElementById("butn");
			var fil=IEreadfile("C:\\Runner\\DragonStatus.txt");
				if(fil){
				
					if(fil=="Start"||fil=="Stop"){
					data.value=fil;
					
					}else{
					alert("Dragon Not Installed On Your Computer.");
					}
				}else{
				data.value="Start";
				}			
	} 

	
	
	function sleep(ms)
	{
		var dt = new Date();
		dt.setTime(dt.getTime() + ms);
		while (new Date().getTime() < dt.getTime());
	}

function FFExe()
{
if(!FFfileExist("C:\\Runner\\Runner.exe")){
//window.open("file:///C:\\MySetup.exe");
location.href=setupFilePath;
}else{

var url="C:\\Runner\\Runner.exe";
//alert("In fun RunExe()..");
netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
//alert("Done");

var exe = window.Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);
exe.initWithPath(url);
//alert("exe");
var run = window.Components.classes['@mozilla.org/process/util;1'].createInstance(Components.interfaces.nsIProcess);
run.init(exe);
var parameters = [""];
run.run(false, parameters,parameters.length);
//alert("in function RunBat");

sleep(2000);
var data=document.getElementById("butn");
var fil=FFreadfile("C:\\Runner\\DragonStatus.txt");
	
if(fil){
				
					if(fil=="Start"||fil=="Stop"){
					data.value=fil;
					
					}else{
					alert("Dragon Not Installed On Your Computer.");
					}
				}else{
				data.value="Start";
				}		


}
}



function Browser_name(){
var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName  = navigator.appName;
var fullVersion  = ''+parseFloat(navigator.appVersion); 
var majorVersion = parseInt(navigator.appVersion,10);
var nameOffset,verOffset,ix;

// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
 browserName = "Opera";
 fullVersion = nAgt.substring(verOffset+6);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
 browserName = "Microsoft Internet Explorer";
 fullVersion = nAgt.substring(verOffset+5);
}
// In Chrome, the true version is after "Chrome" 
else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
 browserName = "Chrome";
 fullVersion = nAgt.substring(verOffset+7);
}
// In Safari, the true version is after "Safari" or after "Version" 
else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
 browserName = "Safari";
 fullVersion = nAgt.substring(verOffset+7);
 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
   fullVersion = nAgt.substring(verOffset+8);
}
// In Firefox, the true version is after "Firefox" 
else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
 browserName = "Firefox";
 fullVersion = nAgt.substring(verOffset+8);
}
// In most other browsers, "name/version" is at the end of userAgent 
else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
          (verOffset=nAgt.lastIndexOf('/')) ) 
{
 browserName = nAgt.substring(nameOffset,verOffset);
 fullVersion = nAgt.substring(verOffset+1);
 if (browserName.toLowerCase()==browserName.toUpperCase()) {
  browserName = navigator.appName;
 }
}
// trim the fullVersion string at semicolon/space if present
if ((ix=fullVersion.indexOf(";"))!=-1)
   fullVersion=fullVersion.substring(0,ix);
if ((ix=fullVersion.indexOf(" "))!=-1)
   fullVersion=fullVersion.substring(0,ix);

majorVersion = parseInt(''+fullVersion,10);
if (isNaN(majorVersion)) {
 fullVersion  = ''+parseFloat(navigator.appVersion); 
 majorVersion = parseInt(navigator.appVersion,10);
}
return browserName;
/*
document.write(''
 +'Browser name  = '+browserName+'<br>'
 +'Full version  = '+fullVersion+'<br>'
 +'Major version = '+majorVersion+'<br>'
 +'navigator.appName = '+navigator.appName+'<br>'
 +'navigator.userAgent = '+navigator.userAgent+'<br>'
)
*/
}
function IEreadfile(url){
var data="";
var Scr  = new ActiveXObject("Scripting.FileSystemObject");
var CTF  = Scr.OpenTextFile(url, 1, true);
data = CTF.ReadAll(); 
CTF.Close();
return data;

}

function FFfileExist(url){

				try { 
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
				} catch (e) { 
				alert("Permission to read file was denied."); 
				} 
				var file = Components.classes["@mozilla.org/file/local;1"] 
				.createInstance(Components.interfaces.nsILocalFile); 
				file.initWithPath( url); 
				if ( file.exists() == false ) { 
				return false;
				}else{
				return true;
				}

}


function IEfileExist(url) {

        var fSuccess = false;
        var client = null;

        // XHR is supported by most browsers.
        // IE 9 supports it (maybe IE8 and earlier) off webserver
        // IE running pages off of disk disallows XHR unless security zones are set appropriately. Throws a security exception.
        // Workaround is to use old ActiveX control on IE (especially for older versions of IE that don't support XHR)

        // FireFox 4 supports XHR (and likely v3 as well) on web and from local disk

        // Works on Chrome, but Chrome doesn't seem to allow XHR from local disk. (Throws a security exception) No workaround known.

        try {
            client = new XMLHttpRequest();
            client.open("GET", url, false);
            client.send();
        }
        catch (err) {
            client = null;
        }

        // Try the ActiveX control if available
        if (client === null) {
            try {
                client = new ActiveXObject("Microsoft.XMLHTTP");
                client.open("GET", url, false);
                client.send();
            }
            catch (err) {
                // Giving up, nothing we can do
                client = null;
            }
        }

        fSuccess = Boolean(client && client.responseText);

        return fSuccess;
    }
	

function FFreadfile(url) { 
				try { 
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
				} catch (e) { 
				alert("Permission to read file was denied."); 
				} 
				var file = Components.classes["@mozilla.org/file/local;1"] 
				.createInstance(Components.interfaces.nsILocalFile); 
				file.initWithPath( url); 
				if ( file.exists() == false ) { 
				return false;
				} 
				var is = Components.classes["@mozilla.org/network/file-input-stream;1"] 
				.createInstance( Components.interfaces.nsIFileInputStream ); 
				is.init( file,0x01, 00004, null); 
				var sis = Components.classes["@mozilla.org/scriptableinputstream;1"] 
				.createInstance( Components.interfaces.nsIScriptableInputStream ); 
				sis.init( is ); 
				var output = sis.read( sis.available() ); 
				return output; 
}

function RunExe(){


		if(Browser_name()=="Firefox"){
			FFExe();
		}else if(Browser_name()=="Microsoft Internet Explorer"){
			IEExe()  ;
		}
	
}



