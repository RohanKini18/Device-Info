function copyToClipboard(str) {
    var el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    var selected = (document.getSelection().rangeCount > 0) ? document.getSelection().getRangeAt(0) : false;
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
        document.getSelection().removeAllRanges();
        document.getSelection().addRange(selected);
    }
}

                              //rk2

var d = new Date();
var month = ((d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1));
var timestamp = d.getFullYear() + '' + month + '' + d.getDate() + '' + d.getHours() + '' + d.getMinutes() + '' + d.getSeconds();

var deviceFromUrl, locationFromUrl;
var qs = window.location.search;
if (qs.indexOf('?info=') > -1) {
    var urlParams = new URLSearchParams(qs);
    deviceFromUrl = JSON.parse(decodeURIComponent(urlParams.get('info')));
    locationFromUrl = decodeURIComponent(urlParams.get('location'));
}

                               //rk3

var parser = new UAParser();
var device = parser.getResult();
device.screensize = window.screen.width + ' x ' + window.screen.height;
device.browsersize = window.innerWidth + ' x ' + window.innerHeight;
if (deviceFromUrl) {
    device = deviceFromUrl;
}
var deviceDetails = {
    'Browser Name': device.browser.name,
    'Browser Version': device.browser.version,
    'Operating System': device.os.name,
    'Operating System Version': device.os.version,
    'Screen Size': device.screensize,
    'Browser Window Size': device.browsersize,
    'User Agent': device.ua
}
var devContainer = document.getElementById('device');
var devProps = [];
for (var key in deviceDetails) {
    devProps.push('<li>' + key + ': <b>' + (deviceDetails[key] ? deviceDetails[key].replace(/(<([^>]+)>)/gi, '') : '') + '</b></li>');
}
devContainer.innerHTML = '<ul>' + devProps.join('') + '</ul>';

                                  //rk4

var ipLocContainer = document.getElementById('iplocation');
var ipLocProps = [];
if (locationFromUrl) {
    ipLocProps.push('<li id="location">Location: <b>' + locationFromUrl.replace(/(<([^>]+)>)/gi, '') + '</b></li>');
    ipLocContainer.innerHTML = '<ul>' + ipLocProps.join('') + '</ul>';
} else {
    fetch('https://ipv4.myip.wtf/json').then(response => response.json()).then(function(data) {
        var location = data.YourFuckingLocation.split(',')[0] + ', ' + data.YourFuckingCountryCode;
        ipLocProps.push('<li>IP Address: <b>' + data.YourFuckingIPAddress + '</b></li>');
        ipLocProps.push('<li>ISP: <b>' + data.YourFuckingISP + '</b></li>');
        ipLocProps.push('<li id="location">Location: <b>' + location + '</b></li>');
        ipLocContainer.innerHTML = '<ul>' + ipLocProps.join('') + '</ul>';
    });
}

                                //rk5

document.getElementById('copyInfo').onclick = function(e) {
    var devInfo = document.getElementById('device');
    var devInfoAsText = devInfo.innerText || devInfo.textContent;
    var locInfo = document.getElementById('location');
    var locInfoAsText = locInfo.innerText || locInfo.textContent;
    copyToClipboard(devInfoAsText + '\n' + locInfoAsText + '\nDevice Information Source: https://deviceinfo.cc');
    alert('Your device information is now copied to the clipboard.\n\nYou can paste this information in your message to the site owners you wish to contact and provide feedback.');
}

                                //rk6

document.getElementById('copyLink').onclick = function(e) {
    var locInfo = document.getElementById('location').getElementsByTagName('b')[0];
    var locInfoAsText = locInfo.innerText || locInfo.textContent;
    var currentUrl = window.location.href;
    if (currentUrl.indexOf('?') > -1) {
        currentUrl = currentUrl.split('?')[0];
    }
    var link = currentUrl + '?info=' + encodeURIComponent(JSON.stringify(device)) + '&location=' + encodeURIComponent(locInfoAsText);
    copyToClipboard(link);
    alert('Your device information has been copied into a shareable URL.\n\nYou can paste this URL in your message to the site owners you wish to contact and provide feedback.');
}

function initBattery(){
const batteryLiquid = document.querySelector('.battery__liquid'),
batteryStatus = document.querySelector('.battery__status'),
batteryPercentage = document.querySelector('.battery__percentage')

navigator.getBattery().then((batt) =>{
updateBattery = () =>{

let level = Math.floor(batt.level * 100)
batteryPercentage.innerHTML ='Battery Percentage:'+' '+level+ '<b>%</b>'


batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`


if(level == 100){ 
    batteryStatus.innerHTML = 'Charging Status:'+' '+`<b>Full battery</b> <i class="ri-battery-2-fill green-color"></i>`
    batteryLiquid.style.height = '103%' 
}
else if(level <= 20 &! batt.charging){ /* We validate if the battery is low */
    batteryStatus.innerHTML = 'Charging Status:'+' '+`<b>Low battery</b> <i class="ri-plug-line animated-red"></i>`
}
else if(batt.charging){ /* We validate if the battery is charging */
    batteryStatus.innerHTML = 'Charging Status:'+' '+`<b>Charging...</b> <i class="ri-flashlight-line animated-green"></i>`
}
else{ /* If it's not loading, don't show anything. */
    batteryStatus.innerHTML = 'Charging Status:'+' '+'<b>Charger Not connected</b>'
}


}
updateBattery()

/* 5. Battery status events */
batt.addEventListener('chargingchange', () => {updateBattery()})
batt.addEventListener('levelchange', () => {updateBattery()})
})
}