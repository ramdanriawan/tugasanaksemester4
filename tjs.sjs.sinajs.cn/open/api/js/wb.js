(function(){var STK=(function(){var that={};var errorList=[];that.inc=function(ns,undepended){return true};that.register=function(ns,maker){var NSList=ns.split(".");var step=that;var k=null;while(k=NSList.shift()){if(NSList.length){if(step[k]===undefined){step[k]={}}step=step[k]}else{if(step[k]===undefined){try{step[k]=maker(that)}catch(exp){errorList.push(exp)}}}}};that.regShort=function(sname,sfun){if(that[sname]!==undefined){throw"["+sname+"] : short : has been register"}that[sname]=sfun};that.IE=/msie/i.test(navigator.userAgent);that.E=function(id){if(typeof id==="string"){return document.getElementById(id)}else{return id}};that.C=function(tagName){var dom;tagName=tagName.toUpperCase();if(tagName=="TEXT"){dom=document.createTextNode("")}else{if(tagName=="BUFFER"){dom=document.createDocumentFragment()}else{dom=document.createElement(tagName)}}return dom};that.log=function(str){errorList.push("["+((new Date()).getTime()%100000)+"]: "+str)};that.getErrorLogInformationList=function(n){return errorList.splice(0,n||errorList.length)};return that})();$Import=STK.inc;STK.register("core.str.trim",function($){return function(str){if(typeof str!=="string"){throw"trim need a string as parameter"}var len=str.length;var s=0;var reg=/(\u3000|\s|\t|\u00A0)/;while(s<len){if(!reg.test(str.charAt(s))){break}s+=1}while(len>s){if(!reg.test(str.charAt(len-1))){break}len-=1}return str.slice(s,len)}});STK.register("core.evt.addEvent",function($){return function(sNode,sEventType,oFunc){var oElement=$.E(sNode);if(oElement==null){return false}sEventType=sEventType||"click";if((typeof oFunc).toLowerCase()!="function"){return}if(oElement.addEventListener){oElement.addEventListener(sEventType,oFunc,false)}else{if(oElement.attachEvent){oElement.attachEvent("on"+sEventType,oFunc)}else{oElement["on"+sEventType]=oFunc}}return true}});STK.register("core.obj.parseParam",function($){return function(oSource,oParams,isown){var key,obj={};oParams=oParams||{};for(key in oSource){obj[key]=oSource[key];if(oParams[key]!=null){if(isown){if(oSource.hasOwnProperty[key]){obj[key]=oParams[key]}}else{obj[key]=oParams[key]}}}return obj}});STK.register("core.arr.isArray",function($){return function(o){return Object.prototype.toString.call(o)==="[object Array]"}});STK.register("core.json.queryToJson",function($){return function(QS,isDecode){var _Qlist=$.core.str.trim(QS).split("&");var _json={};var _fData=function(data){if(isDecode){return decodeURIComponent(data)}else{return data}};for(var i=0,len=_Qlist.length;i<len;i++){if(_Qlist[i]){var _hsh=_Qlist[i].split("=");var _key=_hsh[0];var _value=_hsh[1];if(_hsh.length<2){_value=_key;_key="$nullName"}if(!_json[_key]){_json[_key]=_fData(_value)}else{if($.core.arr.isArray(_json[_key])!=true){_json[_key]=[_json[_key]]}_json[_key].push(_fData(_value))}}}return _json}});STK.register("core.obj.isEmpty",function($){return function(o,isprototype){var ret=true;for(var k in o){if(isprototype){ret=false;break}else{if(o.hasOwnProperty(k)){ret=false;break}}}return ret}});STK.register("core.util.cookie",function($){var that={set:function(sKey,sValue,oOpts){var arr=[];var d,t;var cfg=$.core.obj.parseParam({expire:null,path:"/",domain:null,secure:null,encode:true},oOpts);if(cfg.encode==true){sValue=escape(sValue)}arr.push(sKey+"="+sValue);if(cfg.path!=null){arr.push("path="+cfg.path)}if(cfg.domain!=null){arr.push("domain="+cfg.domain)}if(cfg.secure!=null){arr.push(cfg.secure)}if(cfg.expire!=null){d=new Date();t=d.getTime()+cfg.expire*3600000;d.setTime(t);arr.push("expires="+d.toGMTString())}document.cookie=arr.join(";")},get:function(sKey){sKey=sKey.replace(/([\.\[\]\$])/g,"\\$1");var rep=new RegExp(sKey+"=([^;]*)?;","i");var co=document.cookie+";";var res=co.match(rep);if(res){return res[1]||""}else{return""}},remove:function(sKey,oOpts){oOpts=oOpts||{};oOpts.expire=-10;that.set(sKey,"",oOpts)}};return that});STK.register("core.str.parseURL",function($){return function(url){var parse_url=/^(?:([A-Za-z]+):(\/{0,3}))?([0-9.\-A-Za-z]+\.[0-9A-Za-z]+)?(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;var names=["url","scheme","slash","host","port","path","query","hash"];var results=parse_url.exec(url);var that={};for(var i=0,len=names.length;i<len;i+=1){that[names[i]]=results[i]||""}return that}});STK.register("core.json.jsonToQuery",function($){var _fdata=function(data,isEncode){data=data==null?"":data;data=$.core.str.trim(data.toString());if(isEncode){return encodeURIComponent(data)}else{return data}};return function(JSON,isEncode){var _Qstring=[];if(typeof JSON=="object"){for(var k in JSON){if(k==="$nullName"){_Qstring=_Qstring.concat(JSON[k]);continue}if(JSON[k] instanceof Array){for(var i=0,len=JSON[k].length;i<len;i++){_Qstring.push(k+"="+_fdata(JSON[k][i],isEncode))}}else{if(typeof JSON[k]!="function"){_Qstring.push(k+"="+_fdata(JSON[k],isEncode))}}}}if(_Qstring.length){return _Qstring.join("&")}else{return""}}});STK.register("core.util.URL",function($){return function(sURL,args){var opts=$.core.obj.parseParam({isEncodeQuery:false,isEncodeHash:false},args||{});var that={};var url_json=$.core.str.parseURL(sURL);var query_json=$.core.json.queryToJson(url_json.query);var hash_json=$.core.json.queryToJson(url_json.hash);that.setParam=function(sKey,sValue){query_json[sKey]=sValue;return this};that.getParam=function(sKey){return query_json[sKey]};that.setParams=function(oJson){for(var key in oJson){that.setParam(key,oJson[key])}return this};that.setHash=function(sKey,sValue){hash_json[sKey]=sValue;return this};that.getHash=function(sKey){return hash_json[sKey]};that.valueOf=that.toString=function(){var url=[];var query=$.core.json.jsonToQuery(query_json,opts.isEncodeQuery);var hash=$.core.json.jsonToQuery(hash_json,opts.isEncodeQuery);if(url_json.scheme!=""){url.push(url_json.scheme+":");url.push(url_json.slash)}if(url_json.host!=""){url.push(url_json.host);if(url_json.port!=""){url.push(":");url.push(url_json.port)}}url.push("file:///");url.push(url_json.path);if(query!=""){url.push("?"+query)}if(hash!=""){url.push("#"+hash)}return url.join("")};return that}});STK.register("core.util.browser",function($){var ua=navigator.userAgent.toLowerCase();var external=window.external||"";var core,m,extra,version,os;var numberify=function(s){var c=0;return parseFloat(s.replace(/\./g,function(){return(c++==1)?"":"."}))};try{if((/windows|win32/i).test(ua)){os="windows"}else{if((/macintosh/i).test(ua)){os="macintosh"}else{if((/rhino/i).test(ua)){os="rhino"}}}if((m=ua.match(/applewebkit\/([^\s]*)/))&&m[1]){core="webkit";version=numberify(m[1])}else{if((m=ua.match(/presto\/([\d.]*)/))&&m[1]){core="presto";version=numberify(m[1])}else{if(m=ua.match(/msie\s([^;]*)/)){core="trident";version=1;if((m=ua.match(/trident\/([\d.]*)/))&&m[1]){version=numberify(m[1])}}else{if(/gecko/.test(ua)){core="gecko";version=1;if((m=ua.match(/rv:([\d.]*)/))&&m[1]){version=numberify(m[1])}}}}}if(/world/.test(ua)){extra="world"}else{if(/360se/.test(ua)){extra="360"}else{if((/maxthon/.test(ua))||typeof external.max_version=="number"){extra="maxthon"}else{if(/tencenttraveler\s([\d.]*)/.test(ua)){extra="tt"}else{if(/se\s([\d.]*)/.test(ua)){extra="sogou"}}}}}}catch(e){}var ret={OS:os,CORE:core,Version:version,EXTRA:(extra?extra:false),IE:/msie/.test(ua),OPERA:/opera/.test(ua),MOZ:/gecko/.test(ua)&&!/(compatible|webkit)/.test(ua),IE5:/msie 5 /.test(ua),IE55:/msie 5.5/.test(ua),IE6:/msie 6/.test(ua),IE7:/msie 7/.test(ua),IE8:/msie 8/.test(ua),IE9:/msie 9/.test(ua),SAFARI:!/chrome\/([\d.]*)/.test(ua)&&/\/([\d.]*) safari/.test(ua),CHROME:/chrome\/([\d.]*)/.test(ua),IPAD:/\(ipad/i.test(ua),IPHONE:/\(iphone/i.test(ua),ITOUCH:/\(itouch/i.test(ua),MOBILE:/mobile/i.test(ua)};return ret});STK.register("core.dom.isNode",function($){return function(node){return(node!=undefined)&&Boolean(node.nodeName)&&Boolean(node.nodeType)}});STK.register("core.util.hideContainer",function($){var hideDiv;var initDiv=function(){if(hideDiv){return}hideDiv=$.C("div");hideDiv.style.cssText="position:absolute;top:-9999px;left:-9999px;";document.getElementsByTagName("head")[0].appendChild(hideDiv)};var that={appendChild:function(el){if($.core.dom.isNode(el)){initDiv();hideDiv.appendChild(el)}},removeChild:function(el){if($.core.dom.isNode(el)){hideDiv&&hideDiv.removeChild(el)}}};return that});window.WB2=window.WB2||{};WB2._config=WB2._config||{};WB2._config.host=(window.location.protocol=="https:"?"https:":"http:")+"//js.t.sinajs.cn";WB2._config.cssHost=(window.location.protocol=="https:"?"https:":"http:")+"//img.t.sinajs.cn";WB2._config.cdn_version="20150130.02";window.WB2=window.WB2||{};WB2.Module={loginButton:{versions:{"1.0":{js:"loginButton{ver}.js?version=20140327",css:"/t3/style/css/common/card.css?version=20140327"},latest:{js:"loginButton.js?version=20140327",css:"/t4/appstyle/widget/css/loginButton/loginButton.css"}}},followButton:{versions:{"1.0":{js:"followButton{ver}.js",css:"/t3/style/css/common/card.css?version=20140327"},latest:{js:"followButton.js?version=20140327",css:"/t4/appstyle/widget/css/followButton/followButtonSdk.css"}}},publish:{versions:{"1.0":{js:"publish{ver}.js?version=20170720",css:"/t3/style/css/thirdpart/rlsbox.css?version=20140327"},"1.1":{js:"publish{ver}.js?version=20170720",css:"/t35/appstyle/opent/css/widgets/js_weibo_send/js_weibo_send.css"},latest:{js:"publish.js?version=20170720",css:"/t4/appstyle/widget/css/weiboPublish/weiboPublish.css"}}},hoverCard:{versions:{"1.0":{js:"hoverCard{ver}.js?version=20141124",css:"/t3/style/css/common/card.css?version=20140327"},latest:{js:"hoverCard.js?version=20141124",css:"/t4/appstyle/widget/css/weiboCard/weiboCard.css"}}},recommend:{versions:{"1.0":{js:"recommend{ver}.js"},latest:{js:"recommend.js",css:"/t3/style/css/thirdpart/interested.css"}}},selector:{versions:{"1.0":{js:"selector{ver}.js?version=20140327",css:"/t3/style/css/thirdpart/csuser.css"},latest:{js:"selector.js?version=20140327",css:"/t4/appstyle/widget/css/selector/selector.css?version=20150714"}}},shareRecommend:{versions:{"1.0":{js:"shareRecommend{ver}.js?version=20140327"},latest:{js:"shareRecommend.js?version=20140327",css:"/t4/appstyle/widget/css/weiboFamous/weiboFamous.css"}}},like:{versions:{"1.0":{js:"like{ver}.js?version=20140327"},latest:{js:"like.js?version=20140327",css:"/t4/appstyle/widget/css/praiseButton/praiseButton.css?version=20140327"}}},iframeWidget:{versions:{latest:{js:"iframeWidget.js?version=20140327"}}},invite:{versions:{"1.0":{js:"invite{ver}.js?version=20140327"},latest:{js:"invite.js?version=20140327",css:(window.location.protocol=="https:"?"https:":"http:")+"//img.t.sinajs.cn/t4/appstyle/V5_invite/css/module/frame/layer_frame.css"}}},quote:{versions:{"1.0":{js:"quote{ver}.js?version=20140327"},latest:{js:"quote.js?version=20140327"}}}};STK.register("core.func.getType",function($){return function(oObject){var _t;return((_t=typeof(oObject))=="object"?oObject==null&&"null"||Object.prototype.toString.call(oObject).slice(8,-1):_t).toLowerCase()}});STK.register("core.dom.ready",function($){var funcList=[];var inited=false;var getType=$.core.func.getType;var browser=$.core.util.browser;var addEvent=$.core.evt.addEvent;var checkReady=function(){if(!inited){if(document.readyState==="complete"){return true}}return inited};var execFuncList=function(){if(inited==true){return}inited=true;for(var i=0,len=funcList.length;i<len;i++){if(getType(funcList[i])==="function"){try{funcList[i].call()}catch(exp){}}}funcList=[]};var scrollMethod=function(){if(checkReady()){execFuncList();return}try{document.documentElement.doScroll("left")}catch(e){setTimeout(arguments.callee,25);return}execFuncList()};var readyStateMethod=function(){if(checkReady()){execFuncList();return}setTimeout(arguments.callee,25)};var domloadMethod=function(){addEvent(document,"DOMContentLoaded",execFuncList)};var windowloadMethod=function(){addEvent(window,"load",execFuncList)};if(!checkReady()){if($.IE&&window===window.top){scrollMethod()}domloadMethod();readyStateMethod();windowloadMethod()}return function(oFunc){if(checkReady()){if(getType(oFunc)==="function"){oFunc.call()}}else{funcList.push(oFunc)}}});STK.register("conf.api.wbml",function($){window.WB2=window.WB2||{};var loadJs=function(sURL,oCallBack){var js;js=parent.document.createElement("script");js.charset="UTF-8";var IE=/msie/i.test(navigator.userAgent);if(IE){js.onreadystatechange=function(){if(js.readyState.toLowerCase()=="complete"||js.readyState.toLowerCase()=="loaded"){oCallBack();js.onreadystatechange=null}}}else{js.onload=function(){oCallBack();js.onload=null}}js.src=sURL;parent.document.getElementsByTagName("head")[0].appendChild(js);return js};var WidgetLoad={widgetCache:{},loadCss:function(url){css=document.createElement("link");css.href=url;css.type="text/css";css.rel="stylesheet";document.getElementsByTagName("head")[0].appendChild(css);WidgetLoad.widgetCache[url]=1},getWidgetFile:function(module,version){var baseUrl=window.WB2._config.host+"/open/api";var cssHost=window.WB2._config.cssHost;var widgetModule=WB2.Module;var Module=widgetModule[module];if(!Module){throw ("Module "+module+" can not be found!")}Module=widgetModule[module]["versions"][version];if(!Module){Module=widgetModule[module]["versions"]["latest"]}var _js=Module.js.replace("{ver}",version);var _css=(Module.css!=null?Module.css:widgetModule[module]["versions"]["latest"]["css"])||"";var js=baseUrl+"/js/widget/"+module+"/"+_js;var css=_css!=""?(/^http:\/\/|https:\/\/|\/\//.test(_css)?_css:cssHost+_css):"";return{js:js,css:css}},loadWidget:function(opts,callback){var name=opts.module,version=opts.version,loadcss=opts.loadcss;var wFiles=this.getWidgetFile(name,version);var myCallBack=function(){callback&&callback(wFiles);queue.next()};WidgetLoad._init(wFiles.js,myCallBack);if(!loadcss){return}if(wFiles.css&&!this.widgetCache[wFiles.css]){this.loadCss(wFiles.css)}},_init:function(url,callback){if(WidgetLoad.widgetCache[url]){callback&&callback()}else{loadJs(url,function(){WidgetLoad.widgetCache[url]=1;callback&&callback()})}}};var widgetObject=(function(){var that={load:function(oArgs,oPara){var _moduleName=oArgs.module||"",_version,loadCss=true;if(_moduleName==""){throw"no availiable module found."}if(typeof oPara==="string"){_version=oPara||"latest"}else{if(typeof oPara==="object"){_version=oPara.version||"latest";loadCss=oPara.loadcss}}var args={module:_moduleName,version:_version,loadcss:loadCss};if(_moduleName=="connectButton"){_moduleName="loginButton"}WidgetLoad.loadWidget(args,function(file){try{WB2.widget[_moduleName].call(window,oArgs.params)}catch(e){STK.common.log.monitor({from:"jssdk",url:file.js,param:oArgs.params,title:_moduleName,error:e.toString()});throw e.toString()}});return this}};var widgetModule=WB2.Module;for(var key in widgetModule){if(key&&widgetModule[key]){if(key=="loginButton"){that.connectButton=(function(k){return function(args,opts){that.load({module:k,params:args},opts)}})(key)}that[key]=(function(k){return function(args,opts){that.load({module:k,params:args},opts)}})(key)}}return that})();return function(){var browser=$.core.util.browser;var tagInfo=[{tagName:"login-button",widgetName:"loginButton"},{tagName:"publish",widgetName:"publish"},{tagName:"share-recommend",widgetName:"shareRecommend"},{tagName:"like",widgetName:"like"},{tagName:"follow-button",widgetName:"iframeWidget"},{tagName:"share-button",widgetName:"iframeWidget"},{tagName:"list",widgetName:"iframeWidget"},{tagName:"show",widgetName:"iframeWidget"},{tagName:"topic",widgetName:"iframeWidget"},{tagName:"comments",widgetName:"iframeWidget"},{tagName:"livestream",widgetName:"iframeWidget"},{tagName:"bulkfollow",widgetName:"iframeWidget"},{tagName:"hotlist",widgetName:"iframeWidget"},{tagName:"invite",widgetName:"invite"},{tagName:"quote",widgetName:"quote"}];var getDomElementsNs=function(localName,xmlns){xmlns=xmlns||"wb";var ua=navigator.userAgent.toLowerCase();var fullName=xmlns+":"+localName;if(browser.IE){try{var docNamespaces=document.namespaces;if(docNamespaces&&docNamespaces[xmlns]){return document.getElementsByTagName(localName).length==0?document.getElementsByTagName(fullName):document.getElementsByTagName(localName)}}catch(e){}return document.getElementsByTagName(fullName)}else{if(browser.MOZ){return document.getElementsByTagNameNS(document.body.namespaceURI,fullName)}else{return document.getElementsByTagName(fullName)}}};var getDomAttribute=function(oCustomDom,tagName){var attrArr=oCustomDom.attributes;var oAttr={};for(var i=attrArr.length-1;i>=0;i--){var oAttrib=attrArr[i];if(oAttrib.specified){oAttr[attrArr[i].name]=attrArr[i].value}}oAttr.dom=oCustomDom;oAttr.tagName=tagName;return oAttr};var initCustomTag=function(){var widgetList=[];for(var i=0,len=tagInfo.length;i<len;i++){var oTag=tagInfo[i];var tagName=oTag.tagName;var widget=oTag.widgetName;var cDomList=getDomElementsNs(tagName);for(var j=0,wlen=cDomList.length;j<wlen;j++){cDomList[j].innerHTML='<span style="background:url('+(window.location.protocol=="https:"?"https:":"http:")+'//timg.sjs.sinajs.cn/t4/appstyle/widget/images/library/base/loading1.gif) no-repeat;height:18px;padding:0 0 2px 20px;">Loading...</span>';widgetList.push({tag:tagName,widget:widget,params:getDomAttribute(cDomList[j],tagName)})}}var len=widgetList.length;if(len>0){if(/weibo|ucbrowser/i.test(navigator.userAgent)){for(var i=0,len=widgetList.length;i<len;i++){var oWidget=widgetList[i];(function(ow){setTimeout(function(){widgetObject[ow.widget](ow.params)},i*50)})(oWidget)}}else{WB2.anyWhere(function(W){for(var i=0,len=widgetList.length;i<len;i++){var oWidget=widgetList[i];(function(ow){setTimeout(function(){W.widget[ow.widget](ow.params)},i*50)})(oWidget)}})}}};(function(){try{if(document.namespaces&&!document.namespaces.item.wb){document.namespaces.add("wb")}}catch(e){}}());WB2.initCustomTag=initCustomTag;$.core.dom.ready(function(){initCustomTag()})}});STK.register("core.json.jsonToStr",function($){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}return function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}});STK.register("common.util.date",function(){var format=function(date,fmt){var o={"M+":date.getMonth()+1,"d+":date.getDate(),"h+":date.getHours()%12==0?12:date.getHours()%12,"H+":date.getHours(),"m+":date.getMinutes(),"s+":date.getSeconds(),"q+":Math.floor((date.getMonth()+3)/3),S:date.getMilliseconds()};var week={"0":"/u65e5","1":"/u4e00","2":"/u4e8c","3":"/u4e09","4":"/u56db","5":"/u4e94","6":"/u516d"};if(/(y+)/.test(fmt)){fmt=fmt.replace(RegExp.$1,(date.getFullYear()+"").substr(4-RegExp.$1.length))}if(/(E+)/.test(fmt)){fmt=fmt.replace(RegExp.$1,((RegExp.$1.length>1)?(RegExp.$1.length>2?"/u661f/u671f":"/u5468"):"")+week[date.getDay()+""])}for(var k in o){if(new RegExp("("+k+")").test(fmt)){fmt=fmt.replace(RegExp.$1,(RegExp.$1.length==1)?(o[k]):(("00"+o[k]).substr((""+o[k]).length)))}}return fmt};return function(date,pattern){date=date||new Date();pattern=pattern||"yyyy-MM-dd hh:mm:ss";return format(date,pattern)}});STK.register("conf.api.log",function($){var isConsoleEnable=typeof window.console=="object"&&(typeof window.console.log=="function"||typeof window.console.log=="object");var panelId="weibo_jssdk_console_panel";var minHeight=30,maxHeight=90;var Icon={info:"#0088CC",warn:"#D2D128",error:"#F50A0A"};var cPanel={init:function(){var pos="position:fixed;";if($.core.util.browser.IE6){pos="position:absolute;"}var title=$.C("h5");title.innerHTML='Sina Weibo JSSDK Console Panel<a href="http://jssdk.sinaapp.com/help.php" target="_blank" style="position:absolute;right:0;margin-right:5px;color:#0088CC;font-size:12px;font-weight:normal;">Help?</a>';title.style.cssText="margin: 8px;font-size:13px;border-bottom:1px solid #ccc;";var logDiv=$.C("div");logDiv.id=panelId+"_logdiv";logDiv.style.cssText="background:#000; color:#FFF; margin:5px; border:1px solid #ccc; height:150px; max-height:150px; overflow-x:hidden; overflow-y: auto; word-break:nowrap; padding:5px 5px;border-radius:5px;";var textArea=$.C("textarea");textArea.value='WB2.console.log("test");';textArea.style.cssText="line-height:20px;font-size:12px;width:380px;height:30px;overflow-y:auto;margin:3px;padding:5px; border-radius:5px;border:1px solid #ccc;";textArea.onfocus=function(){textArea.select()};textArea.ondblclick=function(){if(parseInt(textArea.style.height)<maxHeight){textArea.style.height=maxHeight+"px"}else{textArea.style.height=minHeight+"px"}};var clear=$.C("input");clear.type="button";clear.value="Clear";clear.style.cssText="width:60px;height: 30px;border:1px solid #ccc; padding:2px 15px;border-radius:5px 0 0 5px;";clear.onclick=function(){logDiv.innerHTML=""};var run=$.C("input");run.type="button";run.value="Run";run.style.cssText="width:60px;height: 30px;border:1px solid #ccc; border-right:0;border-left:0; padding:2px 15px;";run.onclick=function(){var val=textArea.value;if(val){eval(val)}};var close=$.C("input");close.type="button";close.value="Close";close.style.cssText="width:60px;height: 30px;border:1px solid #ccc; padding:2px 15px;border-radius:0 5px 5px 0;";close.onclick=function(){cPanel.hide()};var bar=$.C("p");bar.appendChild(clear);bar.appendChild(run);bar.appendChild(close);bar.style.cssText="margin:5px 3px;";var panel=document.createElement("div");panel.id=panelId;panel.style.cssText=pos+"z-index:9999;left:0;top:0;width:400px;background:#eee;padding:5px;border-radius:5px;border:1px solid #bbb;";panel.appendChild(title);panel.appendChild(logDiv);panel.appendChild(textArea);panel.appendChild(bar);cPanel.output=logDiv;cPanel.close=close;cPanel.panel=panel;document.body.appendChild(panel)},show:function(){if(!$.E(panelId)){cPanel.init()}cPanel.output=cPanel.output||$.E(panelId+"_logdiv");cPanel.panel&&(cPanel.panel.style.display="block")},hide:function(){cPanel.panel&&(cPanel.panel.style.display="none")},setLog:function(obj,level){if(typeof obj=="string"){var date=new Date(),now=$.common.util.date(new Date()),styles="";switch(level){case"info":styles=Icon.info;break;case"warn":styles=Icon.warn;break;case"error":styles=Icon.error;break}styles="color:"+styles;var html='<p style="line-height:18px;margin:0;padding:0;"><span style="font-size:12px;color:#2EBC2C;">'+now+'</span><span style="font-size:12px;font-family: Verdana;padding-left:5px;'+styles+'">'+obj;if(cPanel.output.innerHTML!=""){html=html+"\r\n"+cPanel.output.innerHTML}cPanel.output.innerHTML=html+"</span></p>";cPanel.output.scrollTop=0}},log:function(info,level){cPanel.show();var output="";if(typeof info=="object"||Object.prototype.toString.call(info)==="[object Array]"){if(typeof info.parent==="object"){output=info.toString()}else{output=$.core.json.jsonToStr(info,null,"\t")}}else{if(typeof info=="undefined"){output="undefined"}else{output=info.toString()}}cPanel.setLog(output,level)}};var debugLevel=["log","info","warn","error","dir"];return function(){window.WB2=window.WB2||{};window.WB2.console=window.WB2.console||{};window.WB2.console.init=function(){WB2._config.debug=true;isConsoleEnable=false};function init(){for(var i=0,len=debugLevel.length;i<len;i++){var lv=debugLevel[i];WB2.console[lv]=(function(level){return function(info){if(WB2._config.debug){if(isConsoleEnable){window.console[level](info)}else{try{cPanel.log(info,level)}catch(e){cPanel.log(e.message,level)}}}}})(lv)}}init();var logList={"USE_X-UA-Compatible":function(){if(!$.core.util.browser.IE11){return}var isCompatible=false,cMeta;var metas=document.getElementsByTagName("meta");if(metas&&metas.length>0){for(var i=0,len=metas.length;i<len;i++){if(metas[i].getAttribute("http-equiv")=="X-UA-Compatible"){cMeta=metas[i];if(metas[i].getAttribute("content").indexOf("IE7")!=-1){isCompatible=true}break}}}var ret={output:true,reason:"Use X-UA-Compatible Model In Current Page. "};return ret}};$.core.dom.ready(function(){for(var k in logList){var result=logList[k]();if(result&&result.output){WB2.console.warn(result.reason)}}})}});var USER_STATUS;var APPKEY_AVAILABLE=true;var LOGIN_FUNC_LIST=[];var API_VERSION=2;var OAUTH_QUERY_URL="https://api.weibo.com/"+API_VERSION+"/oauth2/query";var OAUTH_LOGIN_WINDOW;var OAUTH_LOGIN_URL="https://api.weibo.com/"+API_VERSION+"/oauth2/authorize";var JS_CACHE={};var $=STK;var parseParam=$.core.obj.parseParam,addEvent=$.core.evt.addEvent,trim=$.core.str.trim,browser=$.core.util.browser,CookieUtil=$.core.util.cookie,queryToJson=$.core.json.queryToJson;var jsonp=function(oOpts){var opts={url:"",charset:"UTF-8",timeout:30*1000,args:{},onComplete:null,onTimeout:null,responseName:null,varkey:"callback"};var funcStatus=-1;opts=parseParam(opts,oOpts);var uniqueID=opts.responseName||("STK_"+Math.floor(Math.random()*1000)+new Date().getTime().toString());opts.args[opts.varkey]=uniqueID;var completeFunc=opts.onComplete;var timeoutFunc=opts.onTimeout;window[uniqueID]=function(oResult){if(funcStatus!=2&&completeFunc!=null){funcStatus=1;completeFunc(oResult)}};opts.onComplete=null;opts.onTimeout=function(){if(funcStatus!=1&&timeoutFunc!=null){funcStatus=2;timeoutFunc()}};return loadJs(opts)};var loadJs=function(oOpts){var js,requestTimeout;var opts={url:"",charset:"UTF-8",timeout:30*1000,args:{},onComplete:null,onTimeout:null,uniqueID:null};opts=parseParam(opts,oOpts);if(opts.url==""){throw"url is null"}js=document.createElement("script");js.charset="UTF-8";var IE=/msie/i.test(navigator.userAgent);if(opts.onComplete!=null){if(IE){js.onreadystatechange=function(){if(js.readyState.toLowerCase()=="complete"||js.readyState.toLowerCase()=="loaded"){clearTimeout(requestTimeout);opts.onComplete();js.onreadystatechange=null}}}else{js.onload=function(){clearTimeout(requestTimeout);opts.onComplete();js.onload=null}}}var jsonToQuery=function(oArgs){if(oArgs){var _query=[];for(var p in oArgs){_query.push(p+"="+encodeURIComponent(trim(oArgs[p])))}if(_query.length){return _query.join("&")}else{return""}}};var query=jsonToQuery(opts.args);if(opts.url.indexOf("?")==-1){if(query!=""){query="?"+query}}else{if(query!=""){query="&"+query}}js.src=opts.url+query;document.getElementsByTagName("head")[0].appendChild(js);if(opts.timeout>0&&opts.onTimeout!=null){requestTimeout=setTimeout(function(){opts.onTimeout()},opts.timeout)}return js};var Queue=function(){this.started=1;this.taskList=[];this.setStatue=function(statue){this.started=statue};this.start=function(){this.setStatue(0);var i,method,args,pointer;var fun=this.taskList.shift();var method=fun[0],args=fun[1],pointer=fun[2];method.apply(pointer,args)};this.next=function(){this.setStatue(1);if(this.taskList.length>0){this.start()}};this.add=function(oFunc,oOpts){var opts={args:[],pointer:window,top:false};opts=parseParam(opts,oOpts);if(opts.top){this.taskList.unshift([oFunc,opts.args,opts.pointer])}else{this.taskList.push([oFunc,opts.args,opts.pointer])}if(this.started){this.start()}}};var queue=new Queue();function initCommunicate(options){var ver=WB2._config.version,instances=WB2.anyWhere._instances,blankIframe=instances[ver];if(blankIframe){if(blankIframe.contentWindow._ready){blankIframe.contentWindow.request(options)}else{WB2.addToCallbacks(blankIframe.contentWindow,options)}}else{WB2.delayCall(options)}}function anyWhere(callback){var oRequest={requestType:"anywhere",callback:callback};regIframeRequest(oRequest)}function regIframeRequest(options){var oRequest=options||{};var myCallBack=function(){initCommunicate(oRequest);queue.next()};var init=function(oCallback){if(JS_CACHE.bundle){oCallback&&oCallback()}else{loadJs({url:WB2._config.host+"/open/api/js/api/bundle.js?version="+WB2._config.cdn_version,onComplete:function(){JS_CACHE.bundle=1;oCallback&&oCallback()}})}};queue.add(init,{args:[myCallBack]})}function clientInfo(){var scripts=document.getElementsByTagName("script");var len=scripts.length,index=0,weiboJs,url,appkey,secret,version;if(len>0){weiboJs=scripts[index++];while(weiboJs){if(weiboJs.src.indexOf("api/js/wb.js")!=-1){url=weiboJs.src.split("?").pop();break}weiboJs=scripts[index++]}}url=url.toLowerCase();var oPara=queryToJson(url);appkey=oPara.appkey||"";secret=oPara.secret||"";debug=oPara.debug||false;version=oPara.version||1;return{appkey:appkey,secret:secret,debug:debug,version:version}}function loginReady(oFunc,bStart){var i,len;if(oFunc!=null){if(bStart==true){LOGIN_FUNC_LIST.unshift(oFunc)}else{LOGIN_FUNC_LIST.push(oFunc)}}if(WB2.checkLogin()){for(i=0,len=LOGIN_FUNC_LIST.length;i<len;i++){LOGIN_FUNC_LIST[i].call()}LOGIN_FUNC_LIST=[]}}function showLogin(oArgs){var url=$.core.util.URL(file:///D:/ramdan/computershop/gala2/s7.addthis.com/js/250/OAUTH_LOGIN_URL),iWidth=600,iHeight=455;url.setParam("client_id",oArgs.appkey);url.setParam("response_type","token");url.setParam("display","js");url.setParam("transport","html5");url.setParam("referer",encodeURI(document.location.href));OAUTH_LOGIN_WINDOW=window.open(url,"oauth_login_window","width="+iWidth+",height="+iHeight+",toolbar=no,menubar=no,resizable=no,status=no,left="+(screen.width-iWidth)/2+",top="+(screen.height-iHeight)/2);if(OAUTH_LOGIN_WINDOW){OAUTH_LOGIN_WINDOW.focus()}return}function messageHandler(event){if((/\api.weibo\.com$/).test(event.origin)){var data=event.data;data=unescape(data);data=queryToJson(data);if(data.error_code){data.success=-1;data.status=-1}else{data.success=1;data.status=1}loginCallBack(data)}}function loginCallBack(data){WB2.console.log(data);loginStatus(data.status);if(data.success==1){Cookie.save(data);loginReady()}else{LOGIN_FUNC_LIST.pop()}}function login(oCallBack){if(!APPKEY_AVAILABLE){return}loginReady(oCallBack,true);if(!WB2.checkLogin()){if(window.postMessage&&!browser.IE){showLogin({appkey:WB2._config.appkey})}else{regIframeRequest({appkey:WB2._config.appkey,requestType:"login",callback:loginCallBack})}}}function logout(oCallBack){if(!WB2.checkLogin()){return}if(WB2._config.appkey!=null){Cookie.del();loginStatus(-1);WB2._config.access_token=null;delete WB2._config.access_token;try{jsonp({url:"https://api.weibo.com/2/account/end_session.json?source="+WB2._config.appkey,onComplete:function(o){oCallBack&&oCallBack(o.data)}})}catch(e){throw"JavaScript SDK: logout error"}}}function loginStatus(status){if(status==null){return}USER_STATUS=status}function checkLogin(){return USER_STATUS==1}var Cookie={load:function(){if(!$.core.obj.isEmpty(WB2.oauthData)){return WB2.oauthData}else{var _cookie=CookieUtil.get("weibojs_"+WB2._config.appkey);_cookie=unescape(_cookie);var oCookie=queryToJson(_cookie);return oCookie}},save:function(oCookie){WB2.oauthData=oCookie;var _cookie="access_token="+(oCookie.access_token||"")+"&refresh_token="+(oCookie.refresh_token||"")+"&expires_in="+(oCookie.expires_in||0)+"&uid="+(oCookie.uid||"")+"&status="+(oCookie.status||USER_STATUS||-1);CookieUtil.set("weibojs_"+WB2._config.appkey,_cookie,{path:"/",domain:document.domain})},del:function(){WB2.oauthData={};CookieUtil.remove("weibojs_"+WB2._config.appkey,{path:"/",domain:document.domain})}};function getLoginStatus(options){var oCookie=options||Cookie.load();var access_token=oCookie.access_token||"";var expires_in=oCookie.expires_in||"";if(access_token!=""){USER_STATUS=1}jsonp({url:OAUTH_QUERY_URL,onComplete:function(oData){WB2.console.log(oData);oData=oData||{};if(oData.status==1&&oData.access_token){Cookie.save(oData);WB2._config.access_token=oData.access_token;WB2._config.uid=oData.uid}if(oData.error){APPKEY_AVAILABLE=false;WB2.console.warn(oData.error);if(oData.error=="xd2.jsp has not Referer!"){WB2.console.warn("您使用的appkey未和域名进行绑定，请绑定后使用。")}return}USER_STATUS=oData.status;loginReady()},args:{source:WB2._config.appkey}})}var init=function(opts){if(opts.access_token){USER_STATUS=1;APPKEY_AVAILABLE=true;var oData={status:USER_STATUS,access_token:opts.access_token};if(opts.uid){oData.uid=opts.uid}Cookie.save(oData)}};window.WB2=window.WB2||{};WB2.widget={};var sdkClient=clientInfo();WB2._config=WB2._config||{};WB2._config.version=sdkClient.version;WB2._config.appkey=sdkClient.appkey;WB2._config.secret=sdkClient.secret;WB2._config.debug=sdkClient.debug;WB2.oauthData={};WB2.init=init;WB2.login=login;WB2.logout=logout;WB2.checkLogin=checkLogin;WB2.anyWhere=anyWhere;WB2.anyWhere._instances={};WB2.Cookie=Cookie;WB2.regIframeRequest=regIframeRequest;$.conf.api.log();$.conf.api.wbml();WB2._config.appkey&&getLoginStatus();if(window.postMessage&&!browser.IE){$.core.evt.addEvent(window,"message",messageHandler)}})();