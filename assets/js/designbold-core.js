/*!
 * UAParser.js v0.7.18
 * Lightweight JavaScript-based User-Agent string parser
 * https://github.com/faisalman/ua-parser-js
 *
 * Copyright © 2012-2016 Faisal Salman <fyzlman@gmail.com>
 * Dual licensed under GPLv2 or MIT
 */
(function(window,undefined){"use strict";var LIBVERSION="0.7.18",EMPTY="",UNKNOWN="?",FUNC_TYPE="function",UNDEF_TYPE="undefined",OBJ_TYPE="object",STR_TYPE="string",MAJOR="major",MODEL="model",NAME="name",TYPE="type",VENDOR="vendor",VERSION="version",ARCHITECTURE="architecture",CONSOLE="console",MOBILE="mobile",TABLET="tablet",SMARTTV="smarttv",WEARABLE="wearable",EMBEDDED="embedded";var util={extend:function(regexes,extensions){var margedRegexes={};for(var i in regexes){if(extensions[i]&&extensions[i].length%2===0){margedRegexes[i]=extensions[i].concat(regexes[i])}else{margedRegexes[i]=regexes[i]}}return margedRegexes},has:function(str1,str2){if(typeof str1==="string"){return str2.toLowerCase().indexOf(str1.toLowerCase())!==-1}else{return false}},lowerize:function(str){return str.toLowerCase()},major:function(version){return typeof version===STR_TYPE?version.replace(/[^\d\.]/g,"").split(".")[0]:undefined},trim:function(str){return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}};var mapper={rgx:function(ua,arrays){var i=0,j,k,p,q,matches,match;while(i<arrays.length&&!matches){var regex=arrays[i],props=arrays[i+1];j=k=0;while(j<regex.length&&!matches){matches=regex[j++].exec(ua);if(!!matches){for(p=0;p<props.length;p++){match=matches[++k];q=props[p];if(typeof q===OBJ_TYPE&&q.length>0){if(q.length==2){if(typeof q[1]==FUNC_TYPE){this[q[0]]=q[1].call(this,match)}else{this[q[0]]=q[1]}}else if(q.length==3){if(typeof q[1]===FUNC_TYPE&&!(q[1].exec&&q[1].test)){this[q[0]]=match?q[1].call(this,match,q[2]):undefined}else{this[q[0]]=match?match.replace(q[1],q[2]):undefined}}else if(q.length==4){this[q[0]]=match?q[3].call(this,match.replace(q[1],q[2])):undefined}}else{this[q]=match?match:undefined}}}}i+=2}},str:function(str,map){for(var i in map){if(typeof map[i]===OBJ_TYPE&&map[i].length>0){for(var j=0;j<map[i].length;j++){if(util.has(map[i][j],str)){return i===UNKNOWN?undefined:i}}}else if(util.has(map[i],str)){return i===UNKNOWN?undefined:i}}return str}};var maps={browser:{oldsafari:{version:{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}}},device:{amazon:{model:{"Fire Phone":["SD","KF"]}},sprint:{model:{"Evo Shift 4G":"7373KT"},vendor:{HTC:"APA",Sprint:"Sprint"}}},os:{windows:{version:{ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2000:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"}}}};var regexes={browser:[[/(opera\smini)\/([\w\.-]+)/i,/(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,/(opera).+version\/([\w\.]+)/i,/(opera)[\/\s]+([\w\.]+)/i],[NAME,VERSION],[/(opios)[\/\s]+([\w\.]+)/i],[[NAME,"Opera Mini"],VERSION],[/\s(opr)\/([\w\.]+)/i],[[NAME,"Opera"],VERSION],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]*)/i,/(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,/(?:ms|\()(ie)\s([\w\.]+)/i,/(rekonq)\/([\w\.]*)/i,/(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark)\/([\w\.-]+)/i],[NAME,VERSION],[/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i],[[NAME,"IE"],VERSION],[/(edge|edgios|edgea)\/((\d+)?[\w\.]+)/i],[[NAME,"Edge"],VERSION],[/(yabrowser)\/([\w\.]+)/i],[[NAME,"Yandex"],VERSION],[/(puffin)\/([\w\.]+)/i],[[NAME,"Puffin"],VERSION],[/((?:[\s\/])uc?\s?browser|(?:juc.+)ucweb)[\/\s]?([\w\.]+)/i],[[NAME,"UCBrowser"],VERSION],[/(comodo_dragon)\/([\w\.]+)/i],[[NAME,/_/g," "],VERSION],[/(micromessenger)\/([\w\.]+)/i],[[NAME,"WeChat"],VERSION],[/(qqbrowserlite)\/([\w\.]+)/i],[NAME,VERSION],[/(QQ)\/([\d\.]+)/i],[NAME,VERSION],[/m?(qqbrowser)[\/\s]?([\w\.]+)/i],[NAME,VERSION],[/(BIDUBrowser)[\/\s]?([\w\.]+)/i],[NAME,VERSION],[/(2345Explorer)[\/\s]?([\w\.]+)/i],[NAME,VERSION],[/(MetaSr)[\/\s]?([\w\.]+)/i],[NAME],[/(LBBROWSER)/i],[NAME],[/xiaomi\/miuibrowser\/([\w\.]+)/i],[VERSION,[NAME,"MIUI Browser"]],[/;fbav\/([\w\.]+);/i],[VERSION,[NAME,"Facebook"]],[/headlesschrome(?:\/([\w\.]+)|\s)/i],[VERSION,[NAME,"Chrome Headless"]],[/\swv\).+(chrome)\/([\w\.]+)/i],[[NAME,/(.+)/,"$1 WebView"],VERSION],[/((?:oculus|samsung)browser)\/([\w\.]+)/i],[[NAME,/(.+(?:g|us))(.+)/,"$1 $2"],VERSION],[/android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)*/i],[VERSION,[NAME,"Android Browser"]],[/(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i],[NAME,VERSION],[/(dolfin)\/([\w\.]+)/i],[[NAME,"Dolphin"],VERSION],[/((?:android.+)crmo|crios)\/([\w\.]+)/i],[[NAME,"Chrome"],VERSION],[/(coast)\/([\w\.]+)/i],[[NAME,"Opera Coast"],VERSION],[/fxios\/([\w\.-]+)/i],[VERSION,[NAME,"Firefox"]],[/version\/([\w\.]+).+?mobile\/\w+\s(safari)/i],[VERSION,[NAME,"Mobile Safari"]],[/version\/([\w\.]+).+?(mobile\s?safari|safari)/i],[VERSION,NAME],[/webkit.+?(gsa)\/([\w\.]+).+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[[NAME,"GSA"],VERSION],[/webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i],[NAME,[VERSION,mapper.str,maps.browser.oldsafari.version]],[/(konqueror)\/([\w\.]+)/i,/(webkit|khtml)\/([\w\.]+)/i],[NAME,VERSION],[/(navigator|netscape)\/([\w\.-]+)/i],[[NAME,"Netscape"],VERSION],[/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,/(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([\w\.-]+)$/i,/(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir)[\/\s]?([\w\.]+)/i,/(links)\s\(([\w\.]+)/i,/(gobrowser)\/?([\w\.]*)/i,/(ice\s?browser)\/v?([\w\._]+)/i,/(mosaic)[\/\s]([\w\.]+)/i],[NAME,VERSION]],cpu:[[/(?:(amd|x(?:(?:86|64)[_-])?|wow|win)64)[;\)]/i],[[ARCHITECTURE,"amd64"]],[/(ia32(?=;))/i],[[ARCHITECTURE,util.lowerize]],[/((?:i[346]|x)86)[;\)]/i],[[ARCHITECTURE,"ia32"]],[/windows\s(ce|mobile);\sppc;/i],[[ARCHITECTURE,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?:\smac|;|\))/i],[[ARCHITECTURE,/ower/,"",util.lowerize]],[/(sun4\w)[;\)]/i],[[ARCHITECTURE,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|arm(?:64|(?=v\d+;))|(?=atmel\s)avr|(?:irix|mips|sparc)(?:64)?(?=;)|pa-risc)/i],[[ARCHITECTURE,util.lowerize]]],device:[[/\((ipad|playbook);[\w\s\);-]+(rim|apple)/i],[MODEL,VENDOR,[TYPE,TABLET]],[/applecoremedia\/[\w\.]+ \((ipad)/],[MODEL,[VENDOR,"Apple"],[TYPE,TABLET]],[/(apple\s{0,1}tv)/i],[[MODEL,"Apple TV"],[VENDOR,"Apple"]],[/(archos)\s(gamepad2?)/i,/(hp).+(touchpad)/i,/(hp).+(tablet)/i,/(kindle)\/([\w\.]+)/i,/\s(nook)[\w\s]+build\/(\w+)/i,/(dell)\s(strea[kpr\s\d]*[\dko])/i],[VENDOR,MODEL,[TYPE,TABLET]],[/(kf[A-z]+)\sbuild\/.+silk\//i],[MODEL,[VENDOR,"Amazon"],[TYPE,TABLET]],[/(sd|kf)[0349hijorstuw]+\sbuild\/.+silk\//i],[[MODEL,mapper.str,maps.device.amazon.model],[VENDOR,"Amazon"],[TYPE,MOBILE]],[/\((ip[honed|\s\w*]+);.+(apple)/i],[MODEL,VENDOR,[TYPE,MOBILE]],[/\((ip[honed|\s\w*]+);/i],[MODEL,[VENDOR,"Apple"],[TYPE,MOBILE]],[/(blackberry)[\s-]?(\w+)/i,/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[\s_-]?([\w-]*)/i,/(hp)\s([\w\s]+\w)/i,/(asus)-?(\w+)/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/\(bb10;\s(\w+)/i],[MODEL,[VENDOR,"BlackBerry"],[TYPE,MOBILE]],[/android.+(transfo[prime\s]{4,10}\s\w+|eeepc|slider\s\w+|nexus 7|padfone)/i],[MODEL,[VENDOR,"Asus"],[TYPE,TABLET]],[/(sony)\s(tablet\s[ps])\sbuild\//i,/(sony)?(?:sgp.+)\sbuild\//i],[[VENDOR,"Sony"],[MODEL,"Xperia Tablet"],[TYPE,TABLET]],[/android.+\s([c-g]\d{4}|so[-l]\w+)\sbuild\//i],[MODEL,[VENDOR,"Sony"],[TYPE,MOBILE]],[/\s(ouya)\s/i,/(nintendo)\s([wids3u]+)/i],[VENDOR,MODEL,[TYPE,CONSOLE]],[/android.+;\s(shield)\sbuild/i],[MODEL,[VENDOR,"Nvidia"],[TYPE,CONSOLE]],[/(playstation\s[34portablevi]+)/i],[MODEL,[VENDOR,"Sony"],[TYPE,CONSOLE]],[/(sprint\s(\w+))/i],[[VENDOR,mapper.str,maps.device.sprint.vendor],[MODEL,mapper.str,maps.device.sprint.model],[TYPE,MOBILE]],[/(lenovo)\s?(S(?:5000|6000)+(?:[-][\w+]))/i],[VENDOR,MODEL,[TYPE,TABLET]],[/(htc)[;_\s-]+([\w\s]+(?=\))|\w+)*/i,/(zte)-(\w*)/i,/(alcatel|geeksphone|lenovo|nexian|panasonic|(?=;\s)sony)[_\s-]?([\w-]*)/i],[VENDOR,[MODEL,/_/g," "],[TYPE,MOBILE]],[/(nexus\s9)/i],[MODEL,[VENDOR,"HTC"],[TYPE,TABLET]],[/d\/huawei([\w\s-]+)[;\)]/i,/(nexus\s6p)/i],[MODEL,[VENDOR,"Huawei"],[TYPE,MOBILE]],[/(microsoft);\s(lumia[\s\w]+)/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/[\s\(;](xbox(?:\sone)?)[\s\);]/i],[MODEL,[VENDOR,"Microsoft"],[TYPE,CONSOLE]],[/(kin\.[onetw]{3})/i],[[MODEL,/\./g," "],[VENDOR,"Microsoft"],[TYPE,MOBILE]],[/\s(milestone|droid(?:[2-4x]|\s(?:bionic|x2|pro|razr))?:?(\s4g)?)[\w\s]+build\//i,/mot[\s-]?(\w*)/i,/(XT\d{3,4}) build\//i,/(nexus\s6)/i],[MODEL,[VENDOR,"Motorola"],[TYPE,MOBILE]],[/android.+\s(mz60\d|xoom[\s2]{0,2})\sbuild\//i],[MODEL,[VENDOR,"Motorola"],[TYPE,TABLET]],[/hbbtv\/\d+\.\d+\.\d+\s+\([\w\s]*;\s*(\w[^;]*);([^;]*)/i],[[VENDOR,util.trim],[MODEL,util.trim],[TYPE,SMARTTV]],[/hbbtv.+maple;(\d+)/i],[[MODEL,/^/,"SmartTV"],[VENDOR,"Samsung"],[TYPE,SMARTTV]],[/\(dtv[\);].+(aquos)/i],[MODEL,[VENDOR,"Sharp"],[TYPE,SMARTTV]],[/android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i,/((SM-T\w+))/i],[[VENDOR,"Samsung"],MODEL,[TYPE,TABLET]],[/smart-tv.+(samsung)/i],[VENDOR,[TYPE,SMARTTV],MODEL],[/((s[cgp]h-\w+|gt-\w+|galaxy\snexus|sm-\w[\w\d]+))/i,/(sam[sung]*)[\s-]*(\w+-?[\w-]*)/i,/sec-((sgh\w+))/i],[[VENDOR,"Samsung"],MODEL,[TYPE,MOBILE]],[/sie-(\w*)/i],[MODEL,[VENDOR,"Siemens"],[TYPE,MOBILE]],[/(maemo|nokia).*(n900|lumia\s\d+)/i,/(nokia)[\s_-]?([\w-]*)/i],[[VENDOR,"Nokia"],MODEL,[TYPE,MOBILE]],[/android\s3\.[\s\w;-]{10}(a\d{3})/i],[MODEL,[VENDOR,"Acer"],[TYPE,TABLET]],[/android.+([vl]k\-?\d{3})\s+build/i],[MODEL,[VENDOR,"LG"],[TYPE,TABLET]],[/android\s3\.[\s\w;-]{10}(lg?)-([06cv9]{3,4})/i],[[VENDOR,"LG"],MODEL,[TYPE,TABLET]],[/(lg) netcast\.tv/i],[VENDOR,MODEL,[TYPE,SMARTTV]],[/(nexus\s[45])/i,/lg[e;\s\/-]+(\w*)/i,/android.+lg(\-?[\d\w]+)\s+build/i],[MODEL,[VENDOR,"LG"],[TYPE,MOBILE]],[/android.+(ideatab[a-z0-9\-\s]+)/i],[MODEL,[VENDOR,"Lenovo"],[TYPE,TABLET]],[/linux;.+((jolla));/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/((pebble))app\/[\d\.]+\s/i],[VENDOR,MODEL,[TYPE,WEARABLE]],[/android.+;\s(oppo)\s?([\w\s]+)\sbuild/i],[VENDOR,MODEL,[TYPE,MOBILE]],[/crkey/i],[[MODEL,"Chromecast"],[VENDOR,"Google"]],[/android.+;\s(glass)\s\d/i],[MODEL,[VENDOR,"Google"],[TYPE,WEARABLE]],[/android.+;\s(pixel c)\s/i],[MODEL,[VENDOR,"Google"],[TYPE,TABLET]],[/android.+;\s(pixel xl|pixel)\s/i],[MODEL,[VENDOR,"Google"],[TYPE,MOBILE]],[/android.+;\s(\w+)\s+build\/hm\1/i,/android.+(hm[\s\-_]*note?[\s_]*(?:\d\w)?)\s+build/i,/android.+(mi[\s\-_]*(?:one|one[\s_]plus|note lte)?[\s_]*(?:\d?\w?)[\s_]*(?:plus)?)\s+build/i,/android.+(redmi[\s\-_]*(?:note)?(?:[\s_]*[\w\s]+))\s+build/i],[[MODEL,/_/g," "],[VENDOR,"Xiaomi"],[TYPE,MOBILE]],[/android.+(mi[\s\-_]*(?:pad)(?:[\s_]*[\w\s]+))\s+build/i],[[MODEL,/_/g," "],[VENDOR,"Xiaomi"],[TYPE,TABLET]],[/android.+;\s(m[1-5]\snote)\sbuild/i],[MODEL,[VENDOR,"Meizu"],[TYPE,TABLET]],[/android.+a000(1)\s+build/i,/android.+oneplus\s(a\d{4})\s+build/i],[MODEL,[VENDOR,"OnePlus"],[TYPE,MOBILE]],[/android.+[;\/]\s*(RCT[\d\w]+)\s+build/i],[MODEL,[VENDOR,"RCA"],[TYPE,TABLET]],[/android.+[;\/\s]+(Venue[\d\s]{2,7})\s+build/i],[MODEL,[VENDOR,"Dell"],[TYPE,TABLET]],[/android.+[;\/]\s*(Q[T|M][\d\w]+)\s+build/i],[MODEL,[VENDOR,"Verizon"],[TYPE,TABLET]],[/android.+[;\/]\s+(Barnes[&\s]+Noble\s+|BN[RT])(V?.*)\s+build/i],[[VENDOR,"Barnes & Noble"],MODEL,[TYPE,TABLET]],[/android.+[;\/]\s+(TM\d{3}.*\b)\s+build/i],[MODEL,[VENDOR,"NuVision"],[TYPE,TABLET]],[/android.+;\s(k88)\sbuild/i],[MODEL,[VENDOR,"ZTE"],[TYPE,TABLET]],[/android.+[;\/]\s*(gen\d{3})\s+build.*49h/i],[MODEL,[VENDOR,"Swiss"],[TYPE,MOBILE]],[/android.+[;\/]\s*(zur\d{3})\s+build/i],[MODEL,[VENDOR,"Swiss"],[TYPE,TABLET]],[/android.+[;\/]\s*((Zeki)?TB.*\b)\s+build/i],[MODEL,[VENDOR,"Zeki"],[TYPE,TABLET]],[/(android).+[;\/]\s+([YR]\d{2})\s+build/i,/android.+[;\/]\s+(Dragon[\-\s]+Touch\s+|DT)(\w{5})\sbuild/i],[[VENDOR,"Dragon Touch"],MODEL,[TYPE,TABLET]],[/android.+[;\/]\s*(NS-?\w{0,9})\sbuild/i],[MODEL,[VENDOR,"Insignia"],[TYPE,TABLET]],[/android.+[;\/]\s*((NX|Next)-?\w{0,9})\s+build/i],[MODEL,[VENDOR,"NextBook"],[TYPE,TABLET]],[/android.+[;\/]\s*(Xtreme\_)?(V(1[045]|2[015]|30|40|60|7[05]|90))\s+build/i],[[VENDOR,"Voice"],MODEL,[TYPE,MOBILE]],[/android.+[;\/]\s*(LVTEL\-)?(V1[12])\s+build/i],[[VENDOR,"LvTel"],MODEL,[TYPE,MOBILE]],[/android.+[;\/]\s*(V(100MD|700NA|7011|917G).*\b)\s+build/i],[MODEL,[VENDOR,"Envizen"],[TYPE,TABLET]],[/android.+[;\/]\s*(Le[\s\-]+Pan)[\s\-]+(\w{1,9})\s+build/i],[VENDOR,MODEL,[TYPE,TABLET]],[/android.+[;\/]\s*(Trio[\s\-]*.*)\s+build/i],[MODEL,[VENDOR,"MachSpeed"],[TYPE,TABLET]],[/android.+[;\/]\s*(Trinity)[\-\s]*(T\d{3})\s+build/i],[VENDOR,MODEL,[TYPE,TABLET]],[/android.+[;\/]\s*TU_(1491)\s+build/i],[MODEL,[VENDOR,"Rotor"],[TYPE,TABLET]],[/android.+(KS(.+))\s+build/i],[MODEL,[VENDOR,"Amazon"],[TYPE,TABLET]],[/android.+(Gigaset)[\s\-]+(Q\w{1,9})\s+build/i],[VENDOR,MODEL,[TYPE,TABLET]],[/\s(tablet|tab)[;\/]/i,/\s(mobile)(?:[;\/]|\ssafari)/i],[[TYPE,util.lowerize],VENDOR,MODEL],[/(android[\w\.\s\-]{0,9});.+build/i],[MODEL,[VENDOR,"Generic"]]],engine:[[/windows.+\sedge\/([\w\.]+)/i],[VERSION,[NAME,"EdgeHTML"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,/(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,/(icab)[\/\s]([23]\.[\d\.]+)/i],[NAME,VERSION],[/rv\:([\w\.]{1,9}).+(gecko)/i],[VERSION,NAME]],os:[[/microsoft\s(windows)\s(vista|xp)/i],[NAME,VERSION],[/(windows)\snt\s6\.2;\s(arm)/i,/(windows\sphone(?:\sos)*)[\s\/]?([\d\.\s\w]*)/i,/(windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i],[NAME,[VERSION,mapper.str,maps.os.windows.version]],[/(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i],[[NAME,"Windows"],[VERSION,mapper.str,maps.os.windows.version]],[/\((bb)(10);/i],[[NAME,"BlackBerry"],VERSION],[/(blackberry)\w*\/?([\w\.]*)/i,/(tizen)[\/\s]([\w\.]+)/i,/(android|webos|palm\sos|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]*)/i,/linux;.+(sailfish);/i],[NAME,VERSION],[/(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]*)/i],[[NAME,"Symbian"],VERSION],[/\((series40);/i],[NAME],[/mozilla.+\(mobile;.+gecko.+firefox/i],[[NAME,"Firefox OS"],VERSION],[/(nintendo|playstation)\s([wids34portablevu]+)/i,/(mint)[\/\s\(]?(\w*)/i,/(mageia|vectorlinux)[;\s]/i,/(joli|[kxln]?ubuntu|debian|suse|opensuse|gentoo|(?=\s)arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?(?!chrom)([\w\.-]*)/i,/(hurd|linux)\s?([\w\.]*)/i,/(gnu)\s?([\w\.]*)/i],[NAME,VERSION],[/(cros)\s[\w]+\s([\w\.]+\w)/i],[[NAME,"Chromium OS"],VERSION],[/(sunos)\s?([\w\.\d]*)/i],[[NAME,"Solaris"],VERSION],[/\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]*)/i],[NAME,VERSION],[/(haiku)\s(\w+)/i],[NAME,VERSION],[/cfnetwork\/.+darwin/i,/ip[honead]{2,4}(?:.*os\s([\w]+)\slike\smac|;\sopera)/i],[[VERSION,/_/g,"."],[NAME,"iOS"]],[/(mac\sos\sx)\s?([\w\s\.]*)/i,/(macintosh|mac(?=_powerpc)\s)/i],[[NAME,"Mac OS"],[VERSION,/_/g,"."]],[/((?:open)?solaris)[\/\s-]?([\w\.]*)/i,/(aix)\s((\d)(?=\.|\)|\s)[\w\.])*/i,/(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,/(unix)\s?([\w\.]*)/i],[NAME,VERSION]]};var UAParser=function(uastring,extensions){if(typeof uastring==="object"){extensions=uastring;uastring=undefined}if(!(this instanceof UAParser)){return new UAParser(uastring,extensions).getResult()}var ua=uastring||(window&&window.navigator&&window.navigator.userAgent?window.navigator.userAgent:EMPTY);var rgxmap=extensions?util.extend(regexes,extensions):regexes;this.getBrowser=function(){var browser={name:undefined,version:undefined};mapper.rgx.call(browser,ua,rgxmap.browser);browser.major=util.major(browser.version);return browser};this.getCPU=function(){var cpu={architecture:undefined};mapper.rgx.call(cpu,ua,rgxmap.cpu);return cpu};this.getDevice=function(){var device={vendor:undefined,model:undefined,type:undefined};mapper.rgx.call(device,ua,rgxmap.device);return device};this.getEngine=function(){var engine={name:undefined,version:undefined};mapper.rgx.call(engine,ua,rgxmap.engine);return engine};this.getOS=function(){var os={name:undefined,version:undefined};mapper.rgx.call(os,ua,rgxmap.os);return os};this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}};this.getUA=function(){return ua};this.setUA=function(uastring){ua=uastring;return this};return this};UAParser.VERSION=LIBVERSION;UAParser.BROWSER={NAME:NAME,MAJOR:MAJOR,VERSION:VERSION};UAParser.CPU={ARCHITECTURE:ARCHITECTURE};UAParser.DEVICE={MODEL:MODEL,VENDOR:VENDOR,TYPE:TYPE,CONSOLE:CONSOLE,MOBILE:MOBILE,SMARTTV:SMARTTV,TABLET:TABLET,WEARABLE:WEARABLE,EMBEDDED:EMBEDDED};UAParser.ENGINE={NAME:NAME,VERSION:VERSION};UAParser.OS={NAME:NAME,VERSION:VERSION};if(typeof exports!==UNDEF_TYPE){if(typeof module!==UNDEF_TYPE&&module.exports){exports=module.exports=UAParser}exports.UAParser=UAParser}else{if(typeof define===FUNC_TYPE&&define.amd){define(function(){return UAParser})}else if(window){window.UAParser=UAParser}}var $=window&&(window.jQuery||window.Zepto);if(typeof $!==UNDEF_TYPE){var parser=new UAParser;$.ua=parser.getResult();$.ua.get=function(){return parser.getUA()};$.ua.set=function(uastring){parser.setUA(uastring);var result=parser.getResult();for(var prop in result){$.ua[prop]=result[prop]}}}})(typeof window==="object"?window:this);

"use strict";

/*
 * DesignBold JS SDK v1.0
 *
 * Using in Design IT Button
 *
 * Copyright (c) DesignBold
 */

window.DBSDK_Cfg = {
    export_mode : ['publish', 'download'],
    export_callback: function (resultUrl, document_id, options) {
        // do something with design image URL, which is only accessible for 24 hours
        resultUrl = encodeURIComponent(resultUrl);
        var url  = DBWP5_localize.siteurl + "/wp-admin/admin-ajax.php?action=dbwp5_download_image";
        var params = "post_id=" + DBWP5_localize.post_id + "&image_url=" + resultUrl + "&image_name=" + document_id;
        DBSDK.uploadImage(url, params, "POST");
    },
};

window.DBSDK = {
    app_id : "08b68956d3",
    API: {
        host: 'www.designbold.com'
    }
};

(function (doc) {
    var style = doc.createElement('style');
    style.type = 'text/css';
    style.innerHTML = ".db-btn-designit,.db-btn-redesign{-moz-box-shadow:0 10px 14px -7px #000;-webkit-box-shadow:0 10px 14px -7px #000;background-color:#0098fe}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}.fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn}.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.db-btn-designit{box-shadow:0 10px 14px -7px #000;font-family:Arial;-moz-border-radius:3px;border-radius:3px;display:inline-block;cursor:pointer;color:#fff;font-size:13px;font-weight:700;padding:0 10px 0 30px;height:30px;line-height:32px;z-index:99999;text-decoration:none;-moz-transition:all ease .3s;-o-transition:all ease .3s;-webkit-transition:all ease .3s;transition:all ease .3s;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAADvqaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/Pgo8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzExMSA3OS4xNTgzMjUsIDIwMTUvMDkvMTAtMDE6MTA6MjAgICAgICAgICI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iPgogICAgICAgICA8eG1wOkNyZWF0b3JUb29sPkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wNC0xNVQxMzozNjo1MyswNzowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TWV0YWRhdGFEYXRlPjIwMTYtMDQtMTVUMTQ6MzE6MDUrMDc6MDA8L3htcDpNZXRhZGF0YURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTA0LTE1VDE0OjMxOjA1KzA3OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDo5MjU4YjVmNi03ZjI3LWQyNGMtYmYyNi02N2FlZDY3ZTc2Nzc8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDo2ZGIzZmY3ZC0wMmQ0LTExZTYtOTg0ZC1mMzU1ZWE5OGUxNGU8L3htcE1NOkRvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+eG1wLmRpZDpjM2QwMjFlNC02NTNhLWU5NDQtODFjMS01Njg0OGE2ZTE4N2U8L3htcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOkhpc3Rvcnk+CiAgICAgICAgICAgIDxyZGY6U2VxPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5jcmVhdGVkPC9zdEV2dDphY3Rpb24+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDppbnN0YW5jZUlEPnhtcC5paWQ6YzNkMDIxZTQtNjUzYS1lOTQ0LTgxYzEtNTY4NDhhNmUxODdlPC9zdEV2dDppbnN0YW5jZUlEPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6d2hlbj4yMDE2LTA0LTE1VDEzOjM2OjUzKzA3OjAwPC9zdEV2dDp3aGVuPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6c29mdHdhcmVBZ2VudD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoV2luZG93cyk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmJjN2I1NTg2LTExNDQtMzM0Ni04ZWFkLTIyOWFhZDQxZmZiOTwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0wNC0xNVQxMzozNjo1MyswNzowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpPC9zdEV2dDpzb2Z0d2FyZUFnZW50PgogICAgICAgICAgICAgICAgICA8c3RFdnQ6Y2hhbmdlZD4vPC9zdEV2dDpjaGFuZ2VkPgogICAgICAgICAgICAgICA8L3JkZjpsaT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+c2F2ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDo5MjU4YjVmNi03ZjI3LWQyNGMtYmYyNi02N2FlZDY3ZTc2Nzc8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTYtMDQtMTVUMTQ6MzE6MDUrMDc6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8cGhvdG9zaG9wOklDQ1Byb2ZpbGU+c1JHQiBJRUM2MTk2Ni0yLjE8L3Bob3Rvc2hvcDpJQ0NQcm9maWxlPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT4xPC9leGlmOkNvbG9yU3BhY2U+CiAgICAgICAgIDxleGlmOlBpeGVsWERpbWVuc2lvbj4yMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOlBpeGVsWURpbWVuc2lvbj4yMDwvZXhpZjpQaXhlbFlEaW1lbnNpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSJ3Ij8+1i5r2gAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAACoUlEQVR42pSVy0tUYRjGf3NmvF8iL6ndoBKisMuiFkE3Kiq6aWXRokWbaNtfUNCiC5VKBEEuWnWBMLNcFEFQSheMUYlEY8qcxPHajDnN7eg8LRrldEYtH/g273Pe3wff973PcUhiGuUB24BDwEZgYaLeB7QAT4BmYCipU5J9HZHUqn/rk6Rj9n47rEpmTHEzqjmoeiZgjSSZnS0K37usOarGDqycdMyuDwocXSjT/XKu0GOSMIAc4NLkmRrZ81AkSKyuBiIh5qCLQI4BHARKp4DOFFJy5sOQF2JjAAwGTbyjUUJmfDZgKXDIlQBOKb5gKel7T2G8eURLb4javh94un1EJkRhVgrlq/M4ub6AVKdjOugBF7DWWumKm3RureBwRjr1777yMLCUVZki3WXwaTBM07ceegJRzu1YhNORBF3rAkqsFf/oCGe9H9mw/Tg7e9JYZmSwe0UW2alO3H0hqpr7uPm2nzVFmVSW5dmBJUjyW6+qO+iXs+G6Kt3Ppn/NA2GtvN6myrufFYxO2G2/AfisW4wD+a40vowOMTweTjqk1QvSWb9kMa++pzIQnLDbPgNot1YcgP7MJPGJ5FuNC7YUutlT8JgMY8xutxtAo7VSlJZJWW4BHYEBvKGkBhzxMU4XnuHOxvOUZEXsdqORSA7PZCXblcr+4uVEzQhXPR8YiYUtQQKR/mqC/m7M3BOQUmyFeYCnSaMnSSOxsDa/vi8eXNCm13W64WnVsK9W8c/7NNyM/O5lGg93TDt61nCotrodP0e0s+mBqLslV/1VtTTlSu+Rv7VUscDzf4bD5PorZn6ZUd3v/aYrXW/V670mDd/WePS7HXZ5tjxEUoWktv9Il9bEt3/1O2b4BeQDu4ByYJ1lmnyJZ9YAvAB+2Bt/DwBjORDN8Mr1IAAAAABJRU5ErkJggg==);background-repeat:no-repeat;background-position:5px 5px}.db-btn-designit:hover{background-color:#37acfb;color:#fff;text-decoration:none}.db-btn-designit:active{margin-top:1px}.db-overlay{padding:0;margin:0;background-color:rgba(0,0,0,.5);position:fixed;top:0;left:0;bottom:0;right:0;z-index:999999;-moz-transition:all ease .3s;-o-transition:all ease .3s;-webkit-transition:all ease .3s;transition:all ease .3s;display:none}.db-lightbox{position:fixed;top:30px;left:20px;right:20px;background-color:#fff;z-index:99999;bottom:20px;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;overflow:hidden}.db-lightbox.db-fullscreen{top:0;left:0;right:0;bottom:0}.db-close-lightbox{width:30px;height:30px;display:block;line-height:30px;font-size:26px;color:#eee;-moz-transition:all ease .2s;-o-transition:all ease .2s;-webkit-transition:all ease .2s;transition:all ease .2s;position:absolute;top:3px;text-align:center;font-family:Arial;right:10px}.db-load,.db-loading{top:0;left:0;bottom:0;z-index:999;position:absolute}.db-close-lightbox:hover{cursor:pointer;color:#fff;-moz-transform:rotate(180deg);-webkit-transform:rotate(180deg);-o-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.db-lightbox iframe{border:none;width:100%;height:100%}.db-loading{right:0;background-color:#f5f5f5}.db-load{right:0;background-color:rgba(0,0,0,.6);-moz-transition:all ease .3s;-o-transition:all ease .3s;-webkit-transition:all ease .3s;transition:all ease .3s}.inner-circles-loader:not(:required),.large.inner-circles-loader:not(:required){background:rgba(2,188,155,.7);overflow:hidden;text-indent:-9999px;-webkit-mask-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAA5JREFUeNpiYGBgAAgwAAAEAAGbA+oJAAAAAElFTkSuQmCC);border-radius:50%}.db-load .db-load-img{position:absolute;top:50%;left:50%;margin:-25px 0 0 -25px;display:block}.inner-circles-loader:not(:required){-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);position:relative;display:inline-block;width:50px;height:50px}.inner-circles-loader:not(:required):after,.inner-circles-loader:not(:required):before{content:\'\';position:absolute;top:0;display:inline-block;width:50px;height:50px;border-radius:50%}.large.inner-circles-loader:not(:required){-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);position:relative;display:inline-block;width:90px;height:90px}.large.inner-circles-loader:not(:required):after,.large.inner-circles-loader:not(:required):before{content:\'\';position:absolute;top:0;display:inline-block;width:90px;height:90px;border-radius:50%}.inner-circles-loader:not(:required):before{-moz-animation:inner-circles-loader 3s infinite;-webkit-animation:inner-circles-loader 3s infinite;animation:inner-circles-loader 3s infinite;-moz-transform-origin:0 50%;-ms-transform-origin:0 50%;-webkit-transform-origin:0 50%;transform-origin:0 50%;left:0;background:#c7efcf}.inner-circles-loader:not(:required):after{-moz-animation:inner-circles-loader 3s .2s reverse infinite;-webkit-animation:inner-circles-loader 3s .2s reverse infinite;animation:inner-circles-loader 3s .2s reverse infinite;-moz-transform-origin:100% 50%;-ms-transform-origin:100% 50%;-webkit-transform-origin:100% 50%;transform-origin:100% 50%;right:0;background:#eef5db;background-color:rgba(44,151,221,.7)}@-moz-keyframes inner-circles-loader{0%,100%{-moz-transform:rotate(0);transform:rotate(0)}50%{-moz-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes inner-circles-loader{0%,100%{-webkit-transform:rotate(0);transform:rotate(0)}50%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes inner-circles-loader{0%,100%{-moz-transform:rotate(0);-ms-transform:rotate(0);-webkit-transform:rotate(0);transform:rotate(0)}50%{-moz-transform:rotate(360deg);-ms-transform:rotate(360deg);-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.inner-circles-loader.large{position:absolute!important;top:50%;left:50%;margin:-50px 0 0 -50px}";
    doc.getElementsByTagName('head')[0].appendChild(style);
})(document);

(function (self) {
    'use strict';

    if (self.fetch) {
        return
    }

    var support = {
        searchParams: 'URLSearchParams' in self,
        iterable: 'Symbol' in self && 'iterator' in Symbol,
        blob: 'FileReader' in self && 'Blob' in self && (function () {
            try {
                new Blob();
                return true
            } catch (e) {
                return false
            }
        })(),
        formData: 'FormData' in self,
        arrayBuffer: 'ArrayBuffer' in self
    };

    if (support.arrayBuffer) {
        var viewClasses = [
            '[object Int8Array]',
            '[object Uint8Array]',
            '[object Uint8ClampedArray]',
            '[object Int16Array]',
            '[object Uint16Array]',
            '[object Int32Array]',
            '[object Uint32Array]',
            '[object Float32Array]',
            '[object Float64Array]'
        ];

        var isDataView = function (obj) {
            return obj && DataView.prototype.isPrototypeOf(obj)
        };

        var isArrayBufferView = ArrayBuffer.isView || function (obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
        }
    }

    function normalizeName(name) {
        if (typeof name !== 'string') {
            name = String(name)
        }
        if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
            throw new TypeError('Invalid character in header field name')
        }
        return name.toLowerCase()
    }

    function normalizeValue(value) {
        if (typeof value !== 'string') {
            value = String(value)
        }
        return value
    }

    // Build a destructive iterator for the value list
    function iteratorFor(items) {
        var iterator = {
            next: function () {
                var value = items.shift();
                return {done: value === undefined, value: value}
            }
        };

        if (support.iterable) {
            iterator[Symbol.iterator] = function () {
                return iterator
            }
        }

        return iterator
    }

    function Headers(headers) {
        this.map = {};

        if (headers instanceof Headers) {
            headers.forEach(function (value, name) {
                this.append(name, value)
            }, this)

        } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function (name) {
                this.append(name, headers[name])
            }, this)
        }
    }

    Headers.prototype.append = function (name, value) {
        name = normalizeName(name);
        value = normalizeValue(value);
        var oldValue = this.map[name];
        this.map[name] = oldValue ? oldValue + ',' + value : value
    };

    Headers.prototype['delete'] = function (name) {
        delete this.map[normalizeName(name)]
    };

    Headers.prototype.get = function (name) {
        name = normalizeName(name);
        return this.has(name) ? this.map[name] : null
    };

    Headers.prototype.has = function (name) {
        return this.map.hasOwnProperty(normalizeName(name))
    };

    Headers.prototype.set = function (name, value) {
        this.map[normalizeName(name)] = normalizeValue(value)
    };

    Headers.prototype.forEach = function (callback, thisArg) {
        for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
                callback.call(thisArg, this.map[name], name, this)
            }
        }
    };

    Headers.prototype.keys = function () {
        var items = [];
        this.forEach(function (value, name) {
            items.push(name)
        });
        return iteratorFor(items)
    };

    Headers.prototype.values = function () {
        var items = [];
        this.forEach(function (value) {
            items.push(value)
        });
        return iteratorFor(items)
    };

    Headers.prototype.entries = function () {
        var items = [];
        this.forEach(function (value, name) {
            items.push([name, value])
        });
        return iteratorFor(items)
    };

    if (support.iterable) {
        Headers.prototype[Symbol.iterator] = Headers.prototype.entries
    }

    function consumed(body) {
        if (body.bodyUsed) {
            return Promise.reject(new TypeError('Already read'))
        }
        body.bodyUsed = true
    }

    function fileReaderReady(reader) {
        return new Promise(function (resolve, reject) {
            reader.onload = function () {
                resolve(reader.result)
            };
            reader.onerror = function () {
                reject(reader.error)
            }
        })
    }

    function readBlobAsArrayBuffer(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsArrayBuffer(blob);
        return promise
    }

    function readBlobAsText(blob) {
        var reader = new FileReader();
        var promise = fileReaderReady(reader);
        reader.readAsText(blob);
        return promise
    }

    function readArrayBufferAsText(buf) {
        var view = new Uint8Array(buf);
        var chars = new Array(view.length);

        for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i])
        }
        return chars.join('')
    }

    function bufferClone(buf) {
        if (buf.slice) {
            return buf.slice(0)
        } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer
        }
    }

    function Body() {
        this.bodyUsed = false;

        this._initBody = function (body) {
            this._bodyInit = body;
            if (!body) {
                this._bodyText = ''
            } else if (typeof body === 'string') {
                this._bodyText = body
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
                this._bodyBlob = body
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
                this._bodyFormData = body
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this._bodyText = body.toString()
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
                this._bodyArrayBuffer = bufferClone(body.buffer);
                // IE 10-11 can't handle a DataView body.
                this._bodyInit = new Blob([this._bodyArrayBuffer])
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
                this._bodyArrayBuffer = bufferClone(body)
            } else {
                throw new Error('unsupported BodyInit type')
            }

            if (!this.headers.get('content-type')) {
                if (typeof body === 'string') {
                    this.headers.set('content-type', 'text/plain;charset=UTF-8')
                } else if (this._bodyBlob && this._bodyBlob.type) {
                    this.headers.set('content-type', this._bodyBlob.type)
                } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                    this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
                }
            }
        };

        if (support.blob) {
            this.blob = function () {
                var rejected = consumed(this);
                if (rejected) {
                    return rejected
                }

                if (this._bodyBlob) {
                    return Promise.resolve(this._bodyBlob)
                } else if (this._bodyArrayBuffer) {
                    return Promise.resolve(new Blob([this._bodyArrayBuffer]))
                } else if (this._bodyFormData) {
                    throw new Error('could not read FormData body as blob')
                } else {
                    return Promise.resolve(new Blob([this._bodyText]))
                }
            };

            this.arrayBuffer = function () {
                if (this._bodyArrayBuffer) {
                    return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
                } else {
                    return this.blob().then(readBlobAsArrayBuffer)
                }
            }
        }

        this.text = function () {
            var rejected = consumed(this);
            if (rejected) {
                return rejected
            }

            if (this._bodyBlob) {
                return readBlobAsText(this._bodyBlob)
            } else if (this._bodyArrayBuffer) {
                return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
            } else if (this._bodyFormData) {
                throw new Error('could not read FormData body as text')
            } else {
                return Promise.resolve(this._bodyText)
            }
        };

        if (support.formData) {
            this.formData = function () {
                return this.text().then(decode)
            }
        }

        this.json = function () {
            return this.text().then(JSON.parse)
        };

        return this
    }

    // HTTP methods whose capitalization should be normalized
    var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

    function normalizeMethod(method) {
        var upcased = method.toUpperCase();
        return (methods.indexOf(upcased) > -1) ? upcased : method
    }

    function Request(input, options) {
        options = options || {};
        var body = options.body;

        if (typeof input === 'string') {
            this.url = input
        } else {
            if (input.bodyUsed) {
                throw new TypeError('Already read')
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
                this.headers = new Headers(input.headers)
            }
            this.method = input.method;
            this.mode = input.mode;
            if (!body && input._bodyInit !== null) {
                body = input._bodyInit;
                input.bodyUsed = true
            }
        }

        this.credentials = options.credentials || this.credentials || 'omit';
        if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers)
        }
        this.method = normalizeMethod(options.method || this.method || 'GET');
        this.mode = options.mode || this.mode || null;
        this.referrer = null;

        if ((this.method === 'GET' || this.method === 'HEAD') && body) {
            throw new TypeError('Body not allowed for GET or HEAD requests')
        }
        this._initBody(body)
    }

    Request.prototype.clone = function () {
        return new Request(this, {body: this._bodyInit})
    };

    function decode(body) {
        var form = new FormData();
        body.trim().split('&').forEach(function (bytes) {
            if (bytes) {
                var split = bytes.split('=');
                var name = split.shift().replace(/\+/g, ' ');
                var value = split.join('=').replace(/\+/g, ' ');
                form.append(decodeURIComponent(name), decodeURIComponent(value))
            }
        });
        return form
    }

    function parseHeaders(rawHeaders) {
        var headers = new Headers();
        rawHeaders.split(/\r?\n/).forEach(function (line) {
            var parts = line.split(':');
            var key = parts.shift().trim();
            if (key) {
                var value = parts.join(':').trim();
                headers.append(key, value)
            }
        });
        return headers
    }

    Body.call(Request.prototype);

    function Response(bodyInit, options) {
        if (!options) {
            options = {}
        }

        this.type = 'default';
        this.status = 'status' in options ? options.status : 200;
        this.ok = this.status >= 200 && this.status < 300;
        this.statusText = 'statusText' in options ? options.statusText : 'OK';
        this.headers = new Headers(options.headers);
        this.url = options.url || '';
        this._initBody(bodyInit)
    }

    Body.call(Response.prototype);

    Response.prototype.clone = function () {
        return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
        })
    };

    Response.error = function () {
        var response = new Response(null, {status: 0, statusText: ''});
        response.type = 'error';
        return response
    };

    var redirectStatuses = [301, 302, 303, 307, 308];

    Response.redirect = function (url, status) {
        if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError('Invalid status code')
        }

        return new Response(null, {status: status, headers: {location: url}})
    };

    self.Headers = Headers;
    self.Request = Request;
    self.Response = Response;

    self.fetch = function (input, init) {
        return new Promise(function (resolve, reject) {
            var request = new Request(input, init);
            var xhr = new XMLHttpRequest();

            xhr.onload = function () {
                var options = {
                    status: xhr.status,
                    statusText: xhr.statusText,
                    headers: parseHeaders(xhr.getAllResponseHeaders() || '')
                };
                options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
                var body = 'response' in xhr ? xhr.response : xhr.responseText;
                resolve(new Response(body, options))
            };

            xhr.onerror = function () {
                reject(new TypeError('Network request failed'))
            };

            xhr.ontimeout = function () {
                reject(new TypeError('Network request failed'))
            };

            xhr.open(request.method, request.url, true);

            if (request.credentials === 'include') {
                xhr.withCredentials = true
            }

            if ('responseType' in xhr && support.blob) {
                xhr.responseType = 'blob'
            }

            request.headers.forEach(function (value, name) {
                xhr.setRequestHeader(name, value)
            });

            xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
        })
    };
    self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

(function(doc, win) {
    var host = null;
    var source_frame = {};
    if (typeof win === 'object' && typeof win.DBSDK === 'object' && typeof win.DBSDK.API === 'object' && typeof win.DBSDK.API.host) {
        host = win.DBSDK.API.host;
    }
    win.DBSDK = {
        'API': {
            'app_id': '',
            'scheme': 'https',
            'host': host || 'www.designbold.com',
            'path': 'design-it/create'
        },
        'error' : ""
    };

    DBSDK.loadScript = function(url, success, error) {
	    $.ajax({
	        cache: true,
	        dataType: 'script',
	        error: error,
	        success: success,
	        timeout: '5000',
	        url: url
	    });
	};

	/* Refresh media tab content */
	DBSDK.switchAndReload = function() {
		// get wp outside iframe
		var wp = parent.wp;

		// switch tabs (required for the code below)
		wp.media.frame.setState('insert');

		// refresh
		if( wp.media.frame.content.get() !== null) {
			wp.media.frame.content.get().collection.props.set({ignore: (+ new Date())});
			wp.media.frame.content.get().options.selection.reset();
		}
	};

    DBSDK.uploadImage = function(url, params, method){
        var xhr = new XMLHttpRequest();
        xhr.open(method , url, true);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            	// Upload xong thì phải show tab media
            	DBSDK.$('#dbsdk_modal_notification').style.display = 'none';
            	DBSDK.switchAndReload();
            	var media_tab = $(".media-modal-content .media-frame-router .media-router a.media-menu-item:nth-child(2)");
            	media_tab.click();
            }
        }
        xhr.send(params);

        // Show notification when download image and insert image to editor
        DBSDK.$('#dbsdk_modal_notification').style.display = 'block';
    }

    DBSDK.getParameterByName = function (name, url) {
        if (!url) url = doc.getElementById('db-js-sdk').getAttribute('src');
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[#&]" + name + "(=([^&]*)|&|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    DBSDK.validateCustomDimension_ = function (width, height, unit) {
        if (isNaN(Number(width)) || isNaN(Number(height))) {
            var msg = 'Please enter a valid width / height number';
        }
        else if (unit === 'mm') {
            if (width < 13.2 || width > 1058.3 || height < 13.2 || height > 1058.3) {
                var msg = 'Width and height must has value between of 13.2 and 1058.3 milimeters';
            }
        }
        else if (unit === 'cm') {
            if (width < 1.32 || width > 105.83 || height < 1.32 || height > 105.83) {
                var msg = 'Width and height must has value between of 1.32 and 105.83 centimeters';
            }
        }
        else if (unit === 'inch' || unit === 'in') {
            if (width < 0.52 || width > 41.67 || height < 0.52 || height > 41.67) {
                var msg = 'Width and height must has value between of 0.52 and 41.67 inches';
            }
        }
        else {
            if (width < 50 || width > 4000 || height < 50 || height > 4000) {
                var msg = 'Width and height must has value between of 50 and 4000 pixels';
            }
        }
        return msg;
    };

    DBSDK.API_CREATE = DBSDK.API.scheme + '://' + DBSDK.API.host + '/' + DBSDK.API.path;

    DBSDK.BROWSER_UNSUPPORTED = DBSDK.API.scheme + '://' + DBSDK.API.host + "/" + "browser/unsupported";

    /* validate app id */
    DBSDK.validateApp = function (callback) {
        var app_id = DBSDK.getParameterByName('app_id');
        if (app_id && app_id !== '') {
            win.fetch('https://api.designbold.com/pub/app/validate/' + app_id, {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow'
            }).then(function (response) {
                if (response.status === 200 && typeof callback === 'function') {
                    DBSDK.API.app_id = app_id;
                    callback();
                }
            }).catch(function () {
                console.warn("Application is invalid & SDK can not be initialized.");
            });
        }
        return false;
    };

    /* override dom selector */
    DBSDK.$ = function (selector) {
        var selectorType = 'querySelectorAll';

        if (selector.indexOf('#') === 0) {
            selectorType = 'getElementById';
            selector = selector.substr(1, selector.length);
        }

        return document[selectorType](selector);
    };

    /* check if dom element is in current viewport */
    DBSDK.isElementInViewport = function (el) {

        //special bonus for those using jQuery
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (win.innerHeight || doc.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (win.innerWidth || doc.documentElement.clientWidth) /*or $(window).width() */
        );
    };

    /* bind event & handler on element */
    DBSDK.bindEventHandler = function (target, type, callback, useCapture) {
        useCapture = useCapture || false;
        if (target.addEventListener) {
            target.addEventListener(type, callback, useCapture);
        }
        else {
            target.attachEvent('on' + type, callback);
        }
    };
    /* unbind event handler & return callback */
    DBSDK.unbindEventHandler = function (target, type, callback, useCapture) {
        useCapture = useCapture || false;
        if (target.removeEventListener) {
            target.removeEventListener(type, callback, useCapture);
        }
        else {
            target.detachEvent('on' + type, callback);
        }
    };

    /* check if document content is ready */
    DBSDK.documentReady = function (fn) {
        if (doc.readyState !== 'loading') {
            fn();
        } else if (win.addEventListener) {
            win.addEventListener('DOMContentLoaded', fn);
        } else {
            win.attachEvent('onreadystatechange', function () {
                if (doc.readyState !== 'loading')
                    fn();
            });
        }
    };

    /* animating function */
    DBSDK.FX = {
        easing: {
            linear: function (progress) {
                return progress;
            },
            quadratic: function (progress) {
                return Math.pow(progress, 2);
            },
            swing: function (progress) {
                return 0.5 - Math.cos(progress * Math.PI) / 2;
            },
            circ: function (progress) {
                return 1 - Math.sin(Math.acos(progress));
            },
            back: function (progress, x) {
                return Math.pow(progress, 2) * ((x + 1) * progress - x);
            },
            bounce: function (progress) {
                for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                    if (progress >= (7 - 4 * a) / 11) {
                        return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                    }
                }
            },
            elastic: function (progress, x) {
                return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
            }
        },
        animate: function (options) {
            options = options || {};
            var start = new Date;
            var id = setInterval(function () {
                var timePassed = new Date - start;
                var progress = timePassed / options.duration;
                if (progress > 1) {
                    progress = 1;
                }
                options.progress = progress;
                var delta = options.delta(progress);
                options.step(delta);
                if (progress === 1) {
                    clearInterval(id);
                    options.complete();
                }
            }, options.delay || 10);
        },
        fadeOut: function (element, options) {
            options = options || {};
            var to = 1;
            this.animate({
                duration: options.duration || 400,
                delta: function (progress) {
                    progress = this.progress;
                    return DBSDK.FX.easing.swing(progress);
                },
                complete: options.complete || function () {
                },
                step: function (delta) {
                    element.style.opacity = to - delta;
                }
            });
        },
        fadeIn: function (element, options) {
            options = options || {};
            var to = 0;
            this.animate({
                duration: options.duration || 400,
                delta: function (progress) {
                    progress = this.progress;
                    return DBSDK.FX.easing.swing(progress);
                },
                complete: options.complete || function () {
                },
                step: function (delta) {
                    element.style.opacity = to + delta;
                }
            });
        }
    };

    /* create unique id */
    DBSDK.guid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    /* trigger create or open design frame */
    DBSDK.startDesignTool = function (e) {
        var designit_uri = e.currentTarget.getAttribute('data-href'),
            uuid = e.currentTarget.getAttribute('data-id'),
            overlay = DBSDK.$('.db-overlay[data-id="' + uuid + '"]');
        if (overlay.length) {
            overlay[0].style.display = 'block';
            source_frame = window.document.getElementById('db-design-frame-'+uuid);
        }
        else {
            var iframe = doc.createElement('iframe');
            iframe.style.display = 'none';
            iframe.setAttribute('data-id', uuid);
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.src = designit_uri;
            iframe.name = 'db-design-frame-' + uuid;
            iframe.id = 'db-design-frame-' + uuid;
            var iframeOnLoad = function () {
                if (iframe.removeEventListener) {
                    iframe.removeEventListener('load', null, true);
                }
                else if (iframe.detachEvent) {
                    iframe.detachEvent('onload', null);
                }
                iframe.style.display = 'block';
                DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-loading')[0].style.display = 'none';
                DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-close-lightbox')[0].style.display = 'block';
            };
            source_frame = iframe;
            DBSDK.unbindEventHandler(iframe, 'load', iframeOnLoad, true);
            DBSDK.bindEventHandler(iframe, 'load', iframeOnLoad, true);
            var overlay = '<div class="db-overlay animated fadeIn" data-id="' + uuid + '" style="display: block;">'
                + '<span class="db-close-lightbox">×</span>'
                + '<div class="db-lightbox">'
                + '<div class="db-loading">'
                + '<div class="inner-circles-loader large loading-icon"></div>'
                + '</div>'
                + '</div>'
                + '</div>';
            doc.body.insertAdjacentHTML('beforeend', overlay);
            DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-lightbox')[0].appendChild(iframe);
            if (DBSDK.config.fullscreen){
                DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-lightbox')[0].className = 'db-lightbox db-fullscreen'
            }
            DBSDK.bindEventHandler(DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-close-lightbox')[0], 'click', function (e) {
                var el = e.currentTarget.parentNode;
                el.style.display = "none";
            });
        }
    };

    DBSDK.openDesignTool = function (attrs) {
        var doctype = attrs.doctype || '',
        layout = attrs.layout || '',
        width = attrs.width || 0,
        height = attrs.height || 0,
        unit = attrs.unit || 'px',
        image = attrs.image || '',
        uuid = attrs.id || DBSDK.guid();
        var action = attrs.action || "create";
        var docid = attrs.docid || "";
        var overlay = DBSDK.$('.db-overlay[data-id="' + uuid + '"]');
        var designit_uri = "";

        var openDesignToolSuccess = function(uri){
            var iframe = doc.createElement('iframe');
            iframe.style.display = 'none';
            iframe.setAttribute('data-id', uuid);
            iframe.width = '100%';
            iframe.height = '100%';
            iframe.src = uri;
            iframe.name = 'db-design-frame-' + uuid;
            iframe.id = 'db-design-frame-' + uuid;
            var iframeOnLoad = function () {
                if (iframe.removeEventListener) {
                    iframe.removeEventListener('load', null, true);
                }
                else if (iframe.detachEvent) {
                    iframe.detachEvent('onload', null);
                }
                iframe.style.display = 'block';
                DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-loading')[0].style.display = 'none';
            };
            source_frame = iframe;
            DBSDK.unbindEventHandler(iframe, 'load', iframeOnLoad, true);
            DBSDK.bindEventHandler(iframe, 'load', iframeOnLoad, true);
            var overlay = '<div class="db-overlay animated fadeIn" data-id="' + uuid + '" style="display: block;">'
            + '<span class="db-close-lightbox">×</span>'
            + '<div class="db-lightbox">'
            + '<div class="db-loading">'
            + '<div class="inner-circles-loader large loading-icon"></div>'
            + '</div>'
            + '</div>'
            + '</div>';
            doc.body.insertAdjacentHTML('beforeend', overlay);
            DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-lightbox')[0].appendChild(iframe);
            if (DBSDK.config.fullscreen){
                DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-lightbox')[0].className = 'db-lightbox db-fullscreen'
            }
            DBSDK.bindEventHandler(DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-close-lightbox')[0], 'click', function (e) {
                var el = e.currentTarget.parentNode;
                el.style.display = "none";
            });
        };
        var openDesignToolFailed = function(error){
            var overlay = '<div class="db-overlay animated fadeIn" data-id="' + uuid + '" style="display: block;">'
            + '<span class="db-close-lightbox">×</span>'
            + '<div class="db-lightbox">'
            + '<div class="db-loading">'
            + '<div class="inner-circles-loader large loading-icon"></div>'
            + '</div>'
            + '</div>'
            + '</div>';
            doc.body.insertAdjacentHTML('beforeend', overlay);
            var error = "Init DesignIt Button failed.<br/>" + error;
            DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-lightbox')[0].innerHTML = "<p style='color: red;font-size: 50px;text-align: center'>"+error+"</p>";
            if (DBSDK.config.fullscreen){
                DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-lightbox')[0].className = 'db-lightbox db-fullscreen'
            }
            DBSDK.bindEventHandler(DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-close-lightbox')[0], 'click', function (e) {
                var el = e.currentTarget.parentNode;
                el.style.display = "none";
            });
        };
        // prefer data-db-image
        var uap = new UAParser();
        var dv = uap.getDevice(),
        br = uap.getBrowser(),
        os = uap.getOS(),
        n = br.name,
        v = br.major,
        pn = win.location.pathname;
        if (
            (dv.type === undefined && pn !== '' &&
                (
                    ((n === 'Chrome' || n === 'Chromium') && v < 51) ||
                    (n === 'Firefox' && v < 48) ||
                    ((n === 'IE' || n === 'Edge') && v < 11) ||
                    (n === 'Safari' && v < 10)
                    )
                ) || (dv.type === 'mobile' &&
                (
                    (os.name === 'iOS' && parseInt(os.version) < 9)
                    )
                )
                ) 
        {
            designit_uri =  DBSDK.buildUnsupportedUrl();
        }
        else{
            if (image !== '') {
                designit_uri =  DBSDK.buildButtonUri(image, doctype, null, width, height, null, 'img');
            }
            else {
                if (action == "create"){
                    designit_uri = DBSDK.buildButtonUri(null, doctype, layout, width, height, unit, 'button');
                }
                else if(action == "edit"){
                    designit_uri = DBSDK.buildButtonUriEdit(docid);
                }
                else if (action == "copy"){
                    designit_uri = DBSDK.buildButtonUriCopy(docid);
                }
            }
        }
        if (overlay.length > 0){
            overlay[0].style.display = 'block';
            source_frame = window.document.getElementById('db-design-frame-'+uuid);
        }
        else{
            var validate_custom_dimesion = DBSDK.validateCustomDimension_(width,height,unit);
            if (image == ""){
                if ( action== "create" && doctype == "" && layout == "" && validate_custom_dimesion){
                    openDesignToolFailed(validate_custom_dimesion);
                }
                else if ((action == "copy" || action == "edit") && (docid == "" || !/([a-zA-Z0-9]+)/.test(docid))){
                    openDesignToolFailed("Document id is not valid!");
                }
                else{
                    openDesignToolSuccess(designit_uri);
                }
            }
            else{
                openDesignToolSuccess(designit_uri);
            }
        }
        return uuid;
    };

    DBSDK.closeDesignTool = function (attrs,isRemove) {
        var id = attrs.id || "";
        var overlay = DBSDK.$('.db-overlay[data-id="' + id + '"]');
        isRemove = isRemove || false;
        if (overlay.length) {
            if (isRemove){
                overlay[0].parentNode.removeChild(overlay[0]);
            }
            else{
                overlay[0].style.display = 'none';
            }
        }
        return id;
    };

    DBSDK.initButtonFailed = function (e) {
        var designit_uri = e.currentTarget.getAttribute('data-href'),
            uuid = e.currentTarget.getAttribute('data-id'),
            error = e.currentTarget.getAttribute('data-error'),
            overlay = DBSDK.$('.db-overlay[data-id="' + uuid + '"]');
        if (overlay.length) {
            overlay[0].style.display = 'block';
        }
        else {
            var overlay = '<div class="db-overlay animated fadeIn" data-id="' + uuid + '" style="display: block;">'
                + '<span class="db-close-lightbox">×</span>'
                + '<div class="db-lightbox">'
                + '<div class="db-loading">'
                + '<div class="inner-circles-loader large loading-icon"></div>'
                + '</div>'
                + '</div>'
                + '</div>';
            doc.body.insertAdjacentHTML('beforeend', overlay);
            error = "Init DesignIt Button failed.<br/>" + error;
            DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-lightbox')[0].innerHTML = "<p style='color: red;font-size: 50px;text-align: center'>"+error+"</p>";
            if (DBSDK.config.fullscreen){
                DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-lightbox')[0].className = 'db-lightbox db-fullscreen'
            }
            DBSDK.bindEventHandler(DBSDK.$('.db-overlay[data-id="' + uuid + '"] .db-close-lightbox')[0], 'click', function (e) {
                var el = e.currentTarget.parentNode;
                el.style.display = "none";
            });
        }
    };

    DBSDK.startDesignToolExtension = function (designit_uri,uuid, design_id) {
        var overlay = DBSDK.$('.db-overlay')[0];
        if (overlay) {
            overlay.style.display = 'block';
        }else{
            let overlay = '<div class="db-overlay animated fadeIn" style="display: block;"></div>';
            doc.body.insertAdjacentHTML('beforeend', overlay);
        }

        var iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.setAttribute('data-id', uuid);
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.src = designit_uri;
        iframe.name = 'db-design-frame-' + uuid;
        iframe.id = 'db-design-frame-' + uuid;

        var lightbox = '<div class="db-lightbox db-fullscreen" data-id="'+ uuid +'" design-id="'+ design_id +'">'
        + '<div class="db-loading">'
        + '<div class="inner-circles-loader large loading-icon"></div>'
        + '</div>'
        + '<span class="db-close-lightbox" style="display: none;">x</span>'
        + '</div>';
        DBSDK.$('.db-overlay')[0].insertAdjacentHTML('beforeend', lightbox);
        source_frame = iframe;

        var iframeOnLoad = function () {
            if (iframe.removeEventListener) {
                iframe.removeEventListener('load', null, true);
            }
            else if (iframe.detachEvent) {
                iframe.detachEvent('onload', null);
            }
            iframe.style.display = 'block';
            DBSDK.$('.db-overlay .db-lightbox[data-id="' + uuid + '"] .db-loading')[0].style.display = 'none';
            // DBSDK.$('.db-overlay .db-lightbox[data-id="' + uuid + '"] .db-close-lightbox')[0].style.display = 'block';
        };

        DBSDK.unbindEventHandler(iframe, 'load', iframeOnLoad, true);
        DBSDK.bindEventHandler(iframe, 'load', iframeOnLoad, true);
        DBSDK.$('.db-overlay .db-lightbox[data-id="' + uuid + '"]')[0].appendChild(iframe);

        DBSDK.bindEventHandler(DBSDK.$('.db-overlay .db-lightbox[data-id="' + uuid + '"] .db-close-lightbox')[0], 'click', function (e) {
            e.currentTarget.parentNode.style.display = 'none';
            e.currentTarget.parentNode.parentNode.style.display = 'none';
        });
    };

    /* build design button uri create */
    DBSDK.buildButtonUri = function (image, doctype, layout, width, height, unit, type) {
        image = image || '';
        doctype = doctype || '';
        layout = layout || '';
        width = width || 0;
        height = height || 0;
        unit = unit || 'px';
        var uri = '';
        if (image !== '') {
            console.log(window.btoa(encodeURIComponent(image)));
            uri = DBSDK.API_CREATE + '/image/w' + width + '/h' + height + '/' + window.btoa(encodeURIComponent(image));
            if (doctype != ""){
                uri = DBSDK.API_CREATE + '/image/dt-' + doctype + '/' + window.btoa(encodeURIComponent(image));
            }
            else{
                uri = DBSDK.API_CREATE + '/image/w' + width + '/h' + height + '/' + window.btoa(encodeURIComponent(image));
            }
        }
        else if (doctype !== '' || layout !== '') {
            uri = DBSDK.API_CREATE;
            if (doctype !== '') {
                uri += '/' + doctype;
            }
            else {
                uri += '/dt';
            }
            if (layout !== '') {
                uri += '/' + layout;
            }
        }
        else {
            uri = DBSDK.API_CREATE + '/custom/' + width + '/' + height + '/' + unit;
        }
        var query = [];
        if (DBSDK.API.app_id !== '') {
            query.push('app_id=' + DBSDK.API.app_id);
        }
        if (query.length > 0) {
            for (var i = 0; i < query.length; i++) {
                uri += (i === 0 ? '?' : '&') + query[i];
            }
        }
        return uri;
    };

    DBSDK.buildButtonUriEdit = function (docid) {

        var uri = '';
        uri = DBSDK.API_CREATE + '/edit/' + docid;
        var query = [];
        if (DBSDK.API.app_id !== '') {
            query.push('app_id=' + DBSDK.API.app_id);
        }
        if (query.length > 0) {
            for (var i = 0; i < query.length; i++) {
                uri += (i === 0 ? '?' : '&') + query[i];
            }
        }
        return uri;
    };

    DBSDK.buildButtonUriCopy = function (docid) {
        var uri = '';
        uri = DBSDK.API_CREATE + '/copy/' + docid;
        var query = [];
        if (DBSDK.API.app_id !== '') {
            query.push('app_id=' + DBSDK.API.app_id);
        }
        if (query.length > 0) {
            for (var i = 0; i < query.length; i++) {
                uri += (i === 0 ? '?' : '&') + query[i];
            }
        }
        return uri;
    };

    DBSDK.buildUnsupportedUrl = function () {
        return DBSDK.BROWSER_UNSUPPORTED;
    };

    DBSDK.setAttributes = function (attributes,uuid){
        var button = doc.getElementById(uuid);
        if (typeof button == "object"){
            if (attributes.hasOwnProperty('doctype')){
                button.setAttribute('data-db-doctype',attributes.doctype);
            }
            if (attributes.hasOwnProperty('layout')){
                button.setAttribute('data-db-layout',attributes.layout);
            }
            if (attributes.hasOwnProperty('title')){
                button.setAttribute('data-db-title',attributes.title);
            }
            if (attributes.hasOwnProperty('width')){
                button.setAttribute('data-db-width',attributes.width);
            }
            if (attributes.hasOwnProperty('height')){
                button.setAttribute('data-db-height',attributes.height);
            }
            if (attributes.hasOwnProperty('unit')){
                button.setAttribute('data-db-unit',attributes.unit);
            }
            if (attributes.hasOwnProperty('image')){
                button.setAttribute('data-db-image',attributes.image);
            }
            if (attributes.hasOwnProperty('previewTarget')){
                button.setAttribute('data-db-preview-target',attributes.previewTarget);
            }
            if (attributes.hasOwnProperty('action')){
                button.setAttribute('data-db-action',attributes.action);
            }
            if (attributes.hasOwnProperty('docid')){
                button.setAttribute('data-db-docid',attributes.docid);
            }
        }
    };
    DBSDK.initButton = function (btn,btn_classname) {
        var doctype = btn.getAttribute('data-db-doctype') || '',
            layout = btn.getAttribute('data-db-layout') || '',
            title = btn.getAttribute('data-db-title') || 'Design It',
            width = btn.getAttribute('data-db-width') || 0,
            height = btn.getAttribute('data-db-height') || 0,
            unit = btn.getAttribute('data-db-unit') || 'px',
            image = btn.getAttribute('data-db-image') || '',
            previewTarget = btn.getAttribute('data-db-preview-target') || '',
            uuid = btn.getAttribute('id') || DBSDK.guid();
        var action = btn.getAttribute('data-db-action') || "create";
        var docid = btn.getAttribute('data-db-docid') || "";
        var a = doc.createElement('a');
        a.setAttribute('data-db-doctype',doctype);
        a.setAttribute('data-db-layout',layout);
        a.setAttribute('data-db-title',title);
        a.setAttribute('data-db-width',width);
        a.setAttribute('data-db-height',height);
        a.setAttribute('data-db-unit',unit);
        a.setAttribute('data-db-image',image);
        a.setAttribute('data-db-preview-target',doctype);
        a.setAttribute('data-db-action',action);
        a.setAttribute('data-db-docid',docid);
        if (typeof btn_classname == "undefined"){
            btn_classname = 'db-btn-designit';
        }
        a.className = btn_classname;
        a.href = 'javascript:';
        a.innerHTML = title;
        a.setAttribute('data-id', uuid);
        a.setAttribute('id',uuid);
        var overlay = DBSDK.$('.db-overlay[data-id="' + uuid + '"]');
        if (overlay.length){
            console.log(overlay[0]);
            overlay[0].parentNode.removeChild(overlay[0]);
        }
        var validate_custom_dimesion = DBSDK.validateCustomDimension_(width,height,unit);
        if (image == ""){
            if ( action== "create" && doctype == "" && layout == "" && validate_custom_dimesion){
                a.setAttribute('data-error', validate_custom_dimesion);
                var startDesignToolFunc = function(e) {
                    DBSDK.initButtonFailed(e);
                };
            }
            else if ((action == "copy" || action == "edit") && (docid == "" || !/([a-zA-Z0-9]+)/.test(docid))){
                a.setAttribute('data-error', "Document id is not valid!");
                var startDesignToolFunc = function(e) {
                    DBSDK.initButtonFailed(e);
                };
            }
            else{
                var startDesignToolFunc = function(e) {
                    DBSDK.startDesignTool(e);
                };
            }
        }
        else{
            var startDesignToolFunc = function(e) {
                DBSDK.startDesignTool(e);
            };
        }

        if (previewTarget) {
            a.setAttribute('data-db-preview-target', previewTarget);
        }
        DBSDK.unbindEventHandler(a, 'click', startDesignToolFunc);
        DBSDK.bindEventHandler(a, 'click', startDesignToolFunc);
        // prefer data-db-image
        var uap = new UAParser();
        var dv = uap.getDevice(),
            br = uap.getBrowser(),
            os = uap.getOS(),
            n = br.name,
            v = br.major,
            pn = win.location.pathname;
        if (
            (dv.type === undefined && pn !== '' &&
                (
                    ((n === 'Chrome' || n === 'Chromium') && v < 51) ||
                    (n === 'Firefox' && v < 48) ||
                    ((n === 'IE' || n === 'Edge') && v < 11) ||
                    (n === 'Safari' && v < 10)
                )
            ) ||
            (dv.type === 'mobile' &&
                (
                    (os.name === 'iOS' && parseInt(os.version) < 9)
                )
            )
        ) {
            a.setAttribute('data-href', DBSDK.buildUnsupportedUrl());
        }
        else{
            if (image !== '') {
                a.setAttribute('data-href', DBSDK.buildButtonUri(image, doctype, null, width, height, null, 'img'));
            }
            else {
                if (action == "create"){
                    a.setAttribute('data-href', DBSDK.buildButtonUri(null, doctype, layout, width, height, unit, 'button'));
                }
                else if(action == "edit"){
                    a.setAttribute('data-href', DBSDK.buildButtonUriEdit(docid));
                }
                else if (action == "copy"){
                    a.setAttribute('data-href', DBSDK.buildButtonUriCopy(docid));
                }
            }
        }
        btn.parentNode.replaceChild(a, btn);
        return uuid;
    };

    /* start rendering button */
    DBSDK.initButtons = function () {
        // get all single designit button
        var buttonToDes = DBSDK.$('div.db-btn-design-me');
        if (buttonToDes.length) {
            for (var i = 0; i < buttonToDes.length; i++) {
                var btn = buttonToDes[i];
                DBSDK.initButton(btn);
            }
        }
        // listen for iframe postMessage
        var DBMessageListener = function (e) {
            var action = e.data.action || '',
                frame = e.data.frame || '',
                design_frame, uuid, img, href;
            if (action === '#db#design-button#getconfig') {
                if (!!source_frame) {
                    source_frame.contentWindow.postMessage({
                        action: '#db#designit#config',
                        config: DBSDK.config
                    }, '*');
                }
            }
            else if (action === '#db#design-button#close-designit') {
                design_frame = doc.getElementsByName(frame);
                uuid = design_frame[0].getAttribute('data-id');
                DBSDK.$('.db-overlay .db-lightbox[data-id="' + uuid + '"] .db-close-lightbox')[0].click();
            }
            else if (action === '#db#design-button#getconfiglogin') {
                if (!DBSDK.config.hasOwnProperty('auth')){
                    DBSDK.config.auth = {};
                }
                if (!!source_frame) {
                    source_frame.contentWindow.postMessage({
                        action: '#db#designit#configlogin',
                        config: DBSDK.config.auth
                    }, '*');
                }
            }
            else if (action === '#db#design-button#export-callback') {
                if (typeof DBSDK.exportCallback === 'function') {
                    design_frame = doc.getElementsByName(frame);
                    if (design_frame.length) {
                        var downloadUrl = e.data.src || null;
                        var document_id = e.data.document_id || null;
                        uuid = design_frame[0].getAttribute('data-id');
                        var btn = DBSDK.$('.db-btn-designit[data-id="' + uuid + '"]')[0];
                        var previewTarget = false;
                        if (typeof btn == 'object'){
                            previewTarget = btn.getAttribute('data-db-preview-target');
                        }
                        // hide the iframe modal
                        DBSDK.$('.db-overlay .db-lightbox[data-id="' + uuid + '"] .db-close-lightbox')[0].click();
                        setTimeout(function () {
                            var output  = {buttonId:uuid};
                            if (previewTarget) {
                                output.previewTarget = previewTarget;
                            }
                            DBSDK.exportCallback(downloadUrl,document_id,output);
                        }, 0);
                    }
                }
            }
            else if (action === '#db#design-button#quit') {
                design_frame = doc.getElementsByName(frame);
                if (design_frame.length) {
                    uuid = design_frame[0].getAttribute('data-id');
                    var overlay = DBSDK.$('.db-overlay[data-id="' + uuid + '"]')[0];
                    overlay.parentNode.removeChild(overlay);
                }
            }
            else if (action === '#db#design-button#logout') {
                href = e.data.href || '';
                design_frame = doc.getElementsByName(frame);
                if (design_frame.length) {
                    // cancel preview if user logged out
                    // ...
                    // create iframe to logout
                    var iframe = doc.createElement('iframe');
                    iframe.style.display = 'none';
                    iframe.onload = function (e) {
                        doc.body.removeChild(iframe);
                    };
                    iframe.src = href;
                    doc.body.appendChild(iframe);
                    // remove all design it overlay
                    var overlays = DBSDK.$('.db-overlay');
                    for (var i = 0; i < overlays.length; i++) {
                        doc.body.removeChild(overlays[i]);
                    }
                }
            }
            else if (action === '#db#design-button#getimagesize') {
                href = e.data.href || '';
                design_frame = doc.getElementsByName(frame);
                if (design_frame.length) {
                    uuid = design_frame[0].getAttribute('data-id');
                    img = DBSDK.$('.db-btn-designit[data-id="' + uuid + '"]')[0];
                    DBSDK.$('.db-overlay[data-id="' + uuid + '"] iframe')[0].contentWindow.postMessage({
                        action: '#db#designit#imagesize',
                        width: img.naturalWidth || img.offsetWidth,
                        height: img.naturalHeight || img.offsetHeight
                    }, '*');
                }
            }
        };
        DBSDK.unbindEventHandler(window, 'message', DBMessageListener, false);
        DBSDK.bindEventHandler(window, 'message', DBMessageListener, false);
    };

    DBSDK.initCustomButton = function (selector,class_name) {
        // get all single designit button
        var buttonToDes = DBSDK.$(selector);

        if (buttonToDes !== null) {
            if ( typeof buttonToDes.length !== 'undefined'){
                for (var i = 0; i < buttonToDes.length; i++) {
                    var btn = buttonToDes[i];
                    DBSDK.initButton(btn,class_name);
                }
            }
            else{
                DBSDK.initButton(buttonToDes,class_name);
            }
        }
    };

    /* reload button */
    DBSDK.reloadButton = function () {
        DBSDK.initButtons();
    };

    /* load css first */
    DBSDK.documentReady(function () {
        if (win.DBSDK_Cfg.hasOwnProperty('export_callback')) {
            DBSDK.exportCallback = win.DBSDK_Cfg.export_callback;
        }
        DBSDK.config = JSON.parse(JSON.stringify(win.DBSDK_Cfg)) || {};
        if (!DBSDK.config.hasOwnProperty('reload_mode')){
            DBSDK.config.reload_mode = 0;
        }
        if (!DBSDK.config.hasOwnProperty('fullscreen')){
            DBSDK.config.fullscreen = 0;
        }
        DBSDK.initButtons();
    });
})(document, window);

var initDesignTool = function(data){
    var flag = false;
    var image_src = '';
    var data_id = data.getAttribute('data-id');
    var selector = '.db-edit-design';

    var uuid = DBSDK.guid();

    $('.db-overlay .db-lightbox').each(function(index, value){
        let tmp_id = $(this).attr('design-id');
        if(data_id == tmp_id){
            $(this).parent().css('display', 'block');
            $(this).css('display', 'block');
            flag = true;
        }
    });

    if(data_id == ''){
        flag = true; 
    }

    if (flag == false){
        image_src = 'https://www.designbold.com/design-it/edit/' + data_id;
        DBSDK.startDesignToolExtension(image_src, uuid, data_id);
    }
};