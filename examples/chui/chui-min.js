const CHUIVersion="0.5beta";const UIExpectedChocolateChipJSVersion="1.1.3";$.ready(function(){UICheckChocolateChipJSVersion=function(){if($.version!==UIExpectedChocolateChipJSVersion){console.error("This version of ChocolateChip-UI requries ChococlateChip.js version "+UIExpectedChocolateChipJSVersion+"!");console.error("ChocolateChip.js has been disabled until this problem is resolved.");window.$=null}};UICheckChocolateChipJSVersion();$.extend($,{UITouchedButton:null,UIButton:function(){$.app.delegate("uibutton","touchstart",function(a){if(!$.UITouchedButton){$.UITouchedButton=a;a.addClass("touched")}else{$.UITouchedButton.removeClass("touched");$.UITouchedButton=a;a.addClass("touched")}})}});$.UIButton();$.extend($,{UINavigationHistory:["#main"],UIBackNavigation:function(){$.app.delegate("uibutton","click",function(a){if(a.getAttribute("ui-implements")==="back"){var b=$.UINavigationHistory[$.UINavigationHistory.length-1];$.UINavigationHistory.pop();$($.UINavigationHistory[$.UINavigationHistory.length-1]).setAttribute("ui-navigation-status","current");$(b).setAttribute("ui-navigation-status","upcoming");$.UIHideURLbar()}})}});$.UIBackNavigation();$.extend($,{UINavigationList:function(){$.app.delegate("tablecell","click",function(a){if(a.hasAttribute("href")){$(a.getAttribute("href")).setAttribute("ui-navigation-status","current");$($.UINavigationHistory[$.UINavigationHistory.length-1]).setAttribute("ui-navigation-status","traversed");if(!$("#main").getAttribute("ui-navigation-status")==="traversed"){$("#main").setAttribute("ui-navigation-status","traversed")}$.UINavigationHistory.push(a.getAttribute("href"));$.UIHideURLbar()}})}});$.UINavigationList();$.extend($,{UITouchedTableCell:null,UITableview:function(){$.app.delegate("tablecell","touchstart",function(a){if(!$.UITouchedTableCell){$.UITouchedTableCell=a;a.addClass("touched")}else{$.UITouchedTableCell.removeClass("touched");a.addClass("touched");$.UITouchedTableCell=a}})}});$.UITableview()});$.extend($,{UIScrollControl:function(a,b){var c=this,i;c.element=typeof a==='object'?a:$(a);c.wrapper=c.element.parentNode;c.element.style.webkitTransitionProperty='-webkit-transform';c.element.style.webkitTransitionTimingFunction='cubic-bezier(0,0,0.25,1)';c.element.style.webkitTransitionDuration='0';c.element.style.webkitTransform=$.UI_TranslateOpen+'0,0'+$.UI_TranslateClose;c.options={bounce:$.UI_Supports3D,momentum:$.UI_Supports3D,checkDOMChanges:true,topOnDOMChanges:false,hScrollbar:$.UI_Supports3D,vScrollbar:$.UI_Supports3D,fadeScrollbar:$.iphone||$.ipad||!$.UI_TouchEnabled,shrinkScrollbar:$.iphone||$.ipad||!$.UI_TouchEnabled,desktopCompatibility:false,overflow:'hidden',snap:false};if(typeof b==='object'){for(i in b){c.options[i]=b[i]}}if(c.options.desktopCompatibility){c.options.overflow='hidden'}c.wrapper.style.overflow=c.options.overflow;c.refresh();window.addEventListener('onorientationchange'in window?'orientationchange':'resize',c,false);if($.UI_TouchEnabled||c.options.desktopCompatibility){c.element.addEventListener($.UI_START_EVENT,c,false);c.element.addEventListener($.UI_MOVE_EVENT,c,false);c.element.addEventListener($.UI_END_EVENT,c,false)}if(c.options.checkDOMChanges){c.element.addEventListener('DOMSubtreeModified',c,false)}}});$.UIScrollControl.prototype={x:0,y:0,enabled:true,handleEvent:function(e){var a=this;switch(e.type){case $.UI_START_EVENT:a.touchStart(e);break;case $.UI_MOVE_EVENT:a.touchMove(e);break;case $.UI_END_EVENT:a.touchEnd(e);break;case'webkitTransitionEnd':a.transitionEnd();break;case'orientationchange':case'resize':a.refresh();break;case'DOMSubtreeModified':a.onDOMModified(e);break}},onDOMModified:function(e){var a=this;if(e.target.parentNode!==a.element){return}var b=setTimeout(function(){a.refresh()},0);if(a.options.topOnDOMChanges&&(a.x!==0||a.y!==0)){a.scrollTo(0,0,'0')}},refresh:function(){var a=this,resetX=this.x,resetY=this.y,snap;a.scrollWidth=a.wrapper.clientWidth;a.scrollHeight=a.wrapper.clientHeight;a.scrollerWidth=a.element.offsetWidth;a.scrollerHeight=a.element.offsetHeight;a.maxScrollX=a.scrollWidth-a.scrollerWidth;a.maxScrollY=a.scrollHeight-a.scrollerHeight;a.directionX=0;a.directionY=0;if(a.scrollX){if(a.maxScrollX>=0){resetX=0}else if(a.x<a.maxScrollX){resetX=a.maxScrollX}}if(a.scrollY){if(a.maxScrollY>=0){resetY=0}else if(a.y<a.maxScrollY){resetY=a.maxScrollY}}if(a.options.snap){a.maxPageX=-Math.floor(a.maxScrollX/a.scrollWidth);a.maxPageY=-Math.floor(a.maxScrollY/a.scrollHeight);snap=a.snap(resetX,resetY);resetX=snap.x;resetY=snap.y}if(resetX!==a.x||resetY!==a.y){a.setTransitionTime('0');a.setPosition(resetX,resetY,true)}a.scrollX=a.scrollerWidth>a.scrollWidth;a.scrollY=!a.scrollX||a.scrollerHeight>a.scrollHeight;if(a.options.hScrollbar&&a.scrollX){a.scrollBarX=a.scrollBarX||new $.UIScrollBar('horizontal',a.wrapper,a.options.fadeScrollbar,a.options.shrinkScrollbar);a.scrollBarX.init(a.scrollWidth,a.scrollerWidth)}else if(a.scrollBarX){a.scrollBarX=a.scrollBarX.remove()}if(a.options.vScrollbar&&a.scrollY&&a.scrollerHeight>a.scrollHeight){a.scrollBarY=a.scrollBarY||new $.UIScrollBar('vertical',a.wrapper,a.options.fadeScrollbar,a.options.shrinkScrollbar);a.scrollBarY.init(a.scrollHeight,a.scrollerHeight)}else if(a.scrollBarY){a.scrollBarY=a.scrollBarY.remove()}},setPosition:function(x,y,a){var b=this;b.x=x;b.y=y;b.element.style.webkitTransform=$.UI_TranslateOpen+b.x+'px,'+b.y+'px'+$.UI_TranslateClose;if(!a){if(b.scrollBarX){b.scrollBarX.setPosition(b.x)}if(b.scrollBarY){b.scrollBarY.setPosition(b.y)}}},setTransitionTime:function(a){var b=this;a=a||'0';b.element.style.webkitTransitionDuration=a;if(b.scrollBarX){b.scrollBarX.bar.style.webkitTransitionDuration=a;b.scrollBarX.wrapper.style.webkitTransitionDuration=$.UI_Supports3D&&b.options.fadeScrollbar?'300ms':'0'}if(b.scrollBarY){b.scrollBarY.bar.style.webkitTransitionDuration=a;b.scrollBarY.wrapper.style.webkitTransitionDuration=$.UI_Supports3D&&b.options.fadeScrollbar?'300ms':'0'}},touchStart:function(e){var a=this,matrix;e.preventDefault();e.stopPropagation();if(!a.enabled){return}a.scrolling=true;a.moved=false;a.dist=0;a.setTransitionTime('0');if(a.options.momentum||a.options.snap){matrix=new WebKitCSSMatrix(window.getComputedStyle(a.element).webkitTransform);if(matrix.e!==a.x||matrix.f!==a.y){document.removeEventListener('webkitTransitionEnd',a,false);a.setPosition(matrix.e,matrix.f);a.moved=true}}a.touchStartX=$.UI_TouchEnabled?e.changedTouches[0].pageX:e.pageX;a.scrollStartX=a.x;a.touchStartY=$.UI_TouchEnabled?e.changedTouches[0].pageY:e.pageY;a.scrollStartY=a.y;a.scrollStartTime=e.timeStamp;a.directionX=0;a.directionY=0},touchMove:function(e){var a=this,pageX=$.UI_TouchEnabled?e.changedTouches[0].pageX:e.pageX,pageY=$.UI_TouchEnabled?e.changedTouches[0].pageY:e.pageY,leftDelta=a.scrollX?pageX-a.touchStartX:0,topDelta=a.scrollY?pageY-a.touchStartY:0,newX=a.x+leftDelta,newY=a.y+topDelta;if(!a.scrolling){return}e.stopPropagation();a.touchStartX=pageX;a.touchStartY=pageY;if(newX>=0||newX<a.maxScrollX){newX=a.options.bounce?Math.round(a.x+leftDelta/3):(newX>=0||a.maxScrollX>=0)?0:a.maxScrollX}if(newY>=0||newY<a.maxScrollY){newY=a.options.bounce?Math.round(a.y+topDelta/3):(newY>=0||a.maxScrollY>=0)?0:a.maxScrollY}if(a.dist>5){a.setPosition(newX,newY);a.moved=true;a.directionX=leftDelta>0?-1:1;a.directionY=topDelta>0?-1:1}else{a.dist+=Math.abs(leftDelta)+Math.abs(topDelta)}},touchEnd:function(e){var a=this,time=e.timeStamp-a.scrollStartTime,point=$.UI_TouchEnabled?e.changedTouches[0]:e,target,ev,momentumX,momentumY,newDuration=0,newPositionX=a.x,newPositionY=a.y,snap;if(!a.scrolling){return}a.scrolling=false;if(!a.moved){a.resetPosition();if($.UI_TouchEnabled){target=point.target;while(target.nodeType!==1){target=target.parentNode}target.style.pointerEvents='auto';ev=document.createEvent('MouseEvents');ev.initMouseEvent('click',true,true,e.view,1,point.screenX,point.screenY,point.clientX,point.clientY,e.ctrlKey,e.altKey,e.shiftKey,e.metaKey,0,null);ev._fake=true;target.dispatchEvent(ev)}return}if(!a.options.snap&&time>250){a.resetPosition();return}if(a.options.momentum){momentumX=a.scrollX===true?a.momentum(a.x-a.scrollStartX,time,a.options.bounce?-a.x+a.scrollWidth/5:-a.x,a.options.bounce?a.x+a.scrollerWidth-a.scrollWidth+a.scrollWidth/5:a.x+a.scrollerWidth-a.scrollWidth):{dist:0,time:0};momentumY=a.scrollY===true?a.momentum(a.y-a.scrollStartY,time,a.options.bounce?-a.y+a.scrollHeight/5:-a.y,a.options.bounce?(a.maxScrollY<0?a.y+a.scrollerHeight-a.scrollHeight:0)+a.scrollHeight/5:a.y+a.scrollerHeight-a.scrollHeight):{dist:0,time:0};newDuration=Math.max(Math.max(momentumX.time,momentumY.time),1);newPositionX=a.x+momentumX.dist;newPositionY=a.y+momentumY.dist}if(a.options.snap){snap=a.snap(newPositionX,newPositionY);newPositionX=snap.x;newPositionY=snap.y;newDuration=Math.max(snap.time,newDuration)}a.scrollTo(newPositionX,newPositionY,newDuration+'ms')},transitionEnd:function(){var a=this;document.removeEventListener('webkitTransitionEnd',a,false);a.resetPosition()},resetPosition:function(){var a=this,resetX=a.x,resetY=a.y;if(a.x>=0){resetX=0}else if(a.x<a.maxScrollX){resetX=a.maxScrollX}if(a.y>=0||a.maxScrollY>0){resetY=0}else if(a.y<a.maxScrollY){resetY=a.maxScrollY}if(resetX!==a.x||resetY!==a.y){a.scrollTo(resetX,resetY)}else{if(a.moved){a.onScrollEnd();a.moved=false}if(a.scrollBarX){a.scrollBarX.hide()}if(a.scrollBarY){a.scrollBarY.hide()}}},snap:function(x,y){var a=this,time;if(a.directionX>0){x=Math.floor(x/a.scrollWidth)}else if(a.directionX<0){x=Math.ceil(x/a.scrollWidth)}else{x=Math.round(x/a.scrollWidth)}a.pageX=-x;x=x*a.scrollWidth;if(x>0){x=a.pageX=0}else if(x<a.maxScrollX){a.pageX=a.maxPageX;x=a.maxScrollX}if(a.directionY>0){y=Math.floor(y/a.scrollHeight)}else if(a.directionY<0){y=Math.ceil(y/a.scrollHeight)}else{y=Math.round(y/a.scrollHeight)}a.pageY=-y;y=y*a.scrollHeight;if(y>0){y=a.pageY=0}else if(y<a.maxScrollY){a.pageY=a.maxPageY;y=a.maxScrollY}time=Math.round(Math.max(Math.abs(a.x-x)/a.scrollWidth*500,Math.abs(a.y-y)/a.scrollHeight*500));return{x:x,y:y,time:time}},scrollTo:function(a,b,c){var d=this;if(d.x===a&&d.y===b){d.resetPosition();return}d.moved=true;d.setTransitionTime(c||'350ms');d.setPosition(a,b);if(c==='0'||c==='0s'||c==='0ms'){d.resetPosition()}else{document.addEventListener('webkitTransitionEnd',d,false)}},scrollToPage:function(a,b,c){var d=this,snap;if(!d.options.snap){d.pageX=-Math.round(d.x/d.scrollWidth);d.pageY=-Math.round(d.y/d.scrollHeight)}if(a==='next'){a=++d.pageX}else if(a==='prev'){a=--d.pageX}if(b==='next'){b=++d.pageY}else if(b==='prev'){b=--d.pageY}a=-a*d.scrollWidth;b=-b*d.scrollHeight;snap=d.snap(a,b);a=snap.x;b=snap.y;d.scrollTo(a,b,c||'500ms')},scrollToElement:function(a,b){a=typeof a==='object'?a:this.element.querySelector(a);if(!a){return}var c=this,x=c.scrollX?-a.offsetLeft:0,y=c.scrollY?-a.offsetTop:0;if(x>=0){x=0}else if(x<c.maxScrollX){x=c.maxScrollX}if(y>=0){y=0}else if(y<c.maxScrollY){y=c.maxScrollY}c.scrollTo(x,y,b)},momentum:function(a,b,c,d){var e=2.5,deceleration=1.2,speed=Math.abs(a)/b*1000,newDist=speed*speed/e/1000,newTime=0;if(a>0&&newDist>c){speed=speed*c/newDist/e;newDist=c}else if(a<0&&newDist>d){speed=speed*d/newDist/e;newDist=d}newDist=newDist*(a<0?-1:1);newTime=speed/deceleration;return{dist:Math.round(newDist),time:Math.round(newTime)}},onScrollEnd:function(){},destroy:function(a){var b=this;window.removeEventListener('onorientationchange'in window?'orientationchange':'resize',b,false);b.element.removeEventListener($.UI_START_EVENT,b,false);b.element.removeEventListener($.UI_MOVE_EVENT,b,false);b.element.removeEventListener($.UI_END_EVENT,b,false);document.removeEventListener('webkitTransitionEnd',b,false);if(b.options.checkDOMChanges){b.element.removeEventListener('DOMSubtreeModified',b,false)}if(b.scrollBarX){b.scrollBarX=b.scrollBarX.remove()}if(b.scrollBarY){b.scrollBarY=b.scrollBarY.remove()}if(a){b.wrapper.parentNode.removeChild(b.wrapper)}return null}};$.extend($,{UIScrollBar:function(a,b,c,d){var e=this,style;e.dir=a;e.fade=c;e.shrink=d;e.UI_SCROLL_UID=++$.UI_SCROLL_UID;e.bar=document.createElement('div');style='position:absolute;top:0;left:0;-webkit-transition-timing-function:cubic-bezier(0,0,0.25,1);pointer-events:none;-webkit-transition-duration:0;-webkit-transition-delay:0;-webkit-transition-property:-webkit-transform;z-index:10;background:rgba(0,0,0,0.5);'+'-webkit-transform:'+$.UI_TranslateOpen+'0,0'+$.UI_TranslateClose+';'+(a==='horizontal'?'-webkit-border-radius:3px 2px;min-width:6px;min-height:5px':'-webkit-border-radius:2px 3px;min-width:5px;min-height:6px');e.bar.setAttribute('style',style);e.wrapper=document.createElement('div');style='-webkit-mask:-webkit-canvas(scrollbar'+e.UI_SCROLL_UID+e.dir+');position:absolute;z-index:10;pointer-events:none;overflow:hidden;opacity:0;-webkit-transition-duration:'+(c?'300ms':'0')+';-webkit-transition-delay:0;-webkit-transition-property:opacity;'+(e.dir==='horizontal'?'bottom:2px;left:2px;right:7px;height:5px':'top:2px;right:2px;bottom:7px;width:5px;');e.wrapper.setAttribute('style',style);e.wrapper.appendChild(e.bar);b.appendChild(e.wrapper)}});$.UIScrollBar.prototype={init:function(a,b){var c=this,ctx;if(c.dir==='horizontal'){if(c.maxSize!==c.wrapper.offsetWidth){c.maxSize=c.wrapper.offsetWidth;ctx=document.getCSSCanvasContext("2d","scrollbar"+c.UI_SCROLL_UID+c.dir,c.maxSize,5);ctx.fillStyle="rgb(0,0,0)";ctx.beginPath();ctx.arc(2.5,2.5,2.5,Math.PI/2,-Math.PI/2,false);ctx.lineTo(c.maxSize-2.5,0);ctx.arc(c.maxSize-2.5,2.5,2.5,-Math.PI/2,Math.PI/2,false);ctx.closePath();ctx.fill()}}else{if(c.maxSize!==c.wrapper.offsetHeight){c.maxSize=c.wrapper.offsetHeight;ctx=document.getCSSCanvasContext("2d","scrollbar"+c.UI_SCROLL_UID+c.dir,5,c.maxSize);ctx.fillStyle="rgb(0,0,0)";ctx.beginPath();ctx.arc(2.5,2.5,2.5,Math.PI,0,false);ctx.lineTo(5,c.maxSize-2.5);ctx.arc(2.5,c.maxSize-2.5,2.5,0,Math.PI,false);ctx.closePath();ctx.fill()}}c.size=Math.max(Math.round(c.maxSize*c.maxSize/b),6);c.maxScroll=c.maxSize-c.size;c.toWrapperProp=c.maxScroll/(a-b);c.bar.style[c.dir==='horizontal'?'width':'height']=c.size+'px'},setPosition:function(a){var b=this;if(b.wrapper.style.opacity!=='1'){b.show()}a=Math.round(b.toWrapperProp*a);if(a<0){a=b.shrink?a+a*3:0;if(b.size+a<7){a=-b.size+6}}else if(a>b.maxScroll){a=b.shrink?a+(a-b.maxScroll)*3:b.maxScroll;if(b.size+b.maxScroll-a<7){a=b.size+b.maxScroll-6}}a=b.dir==='horizontal'?$.UI_TranslateOpen+a+'px,0'+$.UI_TranslateClose:$.UI_TranslateOpen+'0,'+a+'px'+$.UI_TranslateClose;b.bar.style.webkitTransform=a},show:function(){if($.UI_Supports3D){this.wrapper.style.webkitTransitionDelay='0'}this.wrapper.style.opacity='1'},hide:function(){if($.UI_Supports3D){this.wrapper.style.webkitTransitionDelay='350ms'}this.wrapper.style.opacity='0'},remove:function(){this.wrapper.parentNode.removeChild(this.wrapper);return null}};$.extend($,{UI_Supports3D:('WebKitCSSMatrix'in window&&'m11'in new WebKitCSSMatrix()),UI_TouchEnabled:$.iphone||$.ipad||$.android||$.webos||$.blackberry,UI_START_EVENT:null,UI_MOVE_EVENT:null,UI_END_EVENT:null,UI_TranslateOpen:null,UI_TranslateClose:null,UI_SCROLL_UID:null});$.UI_START_EVENT=$.UI_TouchEnabled?'touchstart':'mousedown',$.UI_MOVE_EVENT=$.UI_TouchEnabled?'touchmove':'mousemove',$.UI_END_EVENT=$.UI_TouchEnabled?'touchend':'mouseup',$.UI_TranslateOpen='translate'+($.UI_Supports3D?'3d(':'('),$.UI_TranslateClose=$.UI_Supports3D?',0)':')',$.UI_SCROLL_UID=0;$.extend($,{UIEnableScrolling:function(f){$.ready(function(){try{var c=$$("subview > scrollpanel");var d=0;c.forEach(function(a){var b=new $.UIScrollControl(a,f)})}catch(e){}})}});$.UIEnableScrolling({desktopCompatibility:true});$.extend($,{UIDeletableTableCells:[],UIDeleteTableCell:function(b,c,d){this.deletionList=[];var e=$(b);var f=$(c);var g='<uibutton ui-bar-align="left" ui-implements="delete" class="disabled" style="display: none;"><label>Delete</label></uibutton>';var h='<uibutton ui-bar-align="right"  ui-implements="edit"><label>Edit</label></uibutton>';f.insertAdjacentHTML("afterBegin",g);f.insertAdjacentHTML("beforeEnd",h);var i='<deletedisclosure><span>&#x2713</span></deletedisclosure>';$$(b+" > tablecell").forEach(function(a){a.insertAdjacentHTML("afterBegin",i)});e.setAttribute("data-deletable-items",0);var j=function(){$(c+" > uibutton[ui-implements=edit]").bind("click",function(){if(this.lastElementChild.innerText==="Edit"){this.lastElementChild.innerText="Done";this.setAttribute("ui-implements","done");e.addClass("ui-show-delete-disclosures");this.parentNode.firstElementChild.style.display="-webkit-inline-box";if(/uibutton/i.test(f.children[1].nodeName)){f.children[1].css("display","none;")}$$("tablecell > img",e).forEach(function(a){a.css("{-webkit-transform: translate3d(40px, 0, 0)}")})}else{this.lastElementChild.innerText="Edit";this.removeAttribute("ui-implements");this.parentNode.firstElementChild.style.display="none";e.removeClass("ui-show-delete-disclosures");$$("deletedisclosure").forEach(function(a){a.removeClass("checked");a.ancestorByTag("tablecell").removeClass("deletable")});if(/uibutton/i.test(f.children[1].nodeName)){f.children[1].css("display","-webkit-inline-box;")}$("uibutton[ui-implements=delete]").addClass("disabled");$$("tablecell > img",e).forEach(function(a){a.css("{-webkit-transform: translate3d(0, 0, 0)}")})}})};var k=function(){$$("deletedisclosure").forEach(function(a){a.bind("click",function(){a.toggleClass("checked");a.ancestorByTag("tablecell").toggleClass("deletable");$("uibutton[ui-implements=delete]").removeClass("disabled");if(!a.ancestorByTag("tablecell").hasClass("deletable")){e.setAttribute("data-deletable-items",parseInt(e.data("deletable-items"),10)-1);if(parseInt(e.data("deletable-items"),10)===0){f.firstElementChild.addClass("disabled")}}else{e.data("deletable-items",parseInt(e.data("deletable-items"),10)+1)}})})};var l=function(){$("uibutton[ui-implements=delete]").bind("click",function(){if(this.hasClass("disabled")){return false}$$(".deletable").forEach(function(a){e.data("deletable-items",parseInt(e.data("deletable-items"),10)-1);$.UIDeletableTableCells.push(a.id);a.remove();if(!!d){d.call(this,a)}$.UIDeletableTableCells=[];e.setAttribute("data-deletable-items",0)});this.addClass("disabled")})};j();k();l()}});$.extend(HTMLElement.prototype,{UIScreenCover:function(){var a='<screencover ui-visible-state="hidden"></screencover>';if(!$("screencover")){this.insert(a)}}});$.extend($,{});$.extend($,{UIPopUpIsActive:null,UIPopUpIdentifier:null,UIPopUp:function(a){var b=null;if(a.selector){b=a.selector}else{return false}var c="Alert!";if(a.title){c=a.title}var d="";if(a.message){d=a.message}var f="Cancel";if(a.cancelUIButton){f=a.cancelUIButton}var g="Continue";if(a.continueUIButton){g=a.continueUIButton}var h='<popup ui-visible-state="hidden"><panel>';h+='<toolbar ui-placement="top"><h1>'+c+'</h1></toolbar>';h+='<p>'+d+'</p><toolbar ui-placement="bottom">';h+='<uibutton ui-kind="action" ui-implements="cancel"><label>'+f+'</label></uibutton>';h+='<uibutton ui-kind="action" ui-implements="continue"><label>'+g+'</label></uibutton></toolbar></panel></popup>';$(b).UIScreenCover();$(b).insertAdjacentHTML("beforeEnd",h);var j=document.querySelectorAll(b+" popup uibutton");for(var i=0,len=j.length;i<len;i++){j[i].addEventListener("click",function(e){e.preventDefault();$(b+" screencover").setAttribute("ui-visible-state","hidden");$(b+" popup").setAttribute("ui-visible-state","hidden")},false);$.UIPopUpIsActive=false;$.UIPopUpIdentifier=null;j[i].addEventListener("touchend",function(e){e.preventDefault();$(b+" screencover").setAttribute("ui-visible-state","hidden");$(b+" popup").setAttribute("ui-visible-state","hidden")},false);$.UIPopUpIsActive=false;$.UIPopUpIdentifier=null}if(a.callback){var k=b+" popup uibutton[ui-implements=continue]";$(k).addEventListener("click",function(){a.callback.call(a.callback,this)},false)}}});$.extend($,{UIPopUpIsActive:false,UIPopUpIdentifier:null,UIScreenCoverIdentifier:null,UIShowPopUp:function(a){var a=a;$.UIPopUpIsActive=true;$.UIPopUpIdentifier=a;var b=$(a+" screencover");$.UIScreenCoverIdentifier=b;b.addEventListener("touchmove",function(e){e.preventDefault()},false);$.UIPositionScreenCover(b);$.UIPositionPopUp(a);$(a+" screencover").setAttribute("ui-visible-state","visible");$(a+" popup").setAttribute("ui-visible-state","visible")},UIPositionScreenCover:function(a){a.cssText="height:"+(window.innerHeight+window.pageYOffset)+"px";var b=$($.UIPopUpIdentifier+" popup")},UIPositionPopUp:function(a){$.UIPopUpIsActive=true;$.UIPopUpIdentifier=a;var b=$(a+" popup");b.style.top=((window.innerHeight/2)+window.pageYOffset)-(b.clientHeight/2)+"px";b.style.left=(window.innerWidth/2)-(b.clientWidth/2)+"px"},UIRepositionPopupOnOrientationChange:function(){$.body.bind("orientationchange",function(){if(window.orientation===90||window.orientation===-90){if($.UIPopUpIsActive){$.UIPositionScreenCover($.UIScreenCoverIdentifier);$.UIPositionPopUp($.UIPopUpIdentifier)}}else{if($.UIPopUpIsActive){$.UIPositionScreenCover($.UIScreenCoverIdentifier);$.UIPositionPopUp($.UIPopUpIdentifier)}}});window.addEventListener("resize",function(){if($.UIPopUpIsActive){$.UIPositionScreenCover($.UIScreenCoverIdentifier);$.UIPositionPopUp($.UIPopUpIdentifier)}},false)}});$.ready(function(){$.UIRepositionPopupOnOrientationChange()});$.extend(HTMLElement.prototype,{UISelectionList:function(d){var e=$.collectionToArray(this.children);e.forEach(function(b){if(b.nodeName.toLowerCase()==="tablecell"){var c="<checkmark>&#x2713</checkmark>";b.insert(c);b.bind("click",function(){e.forEach(function(a){a.removeClass("selected")});this.addClass("selected");this.last().checked=true;if(d){d.call(d,this)}})}})}});$.extend(HTMLElement.prototype,{UICreateSwitchControl:function(a){var b,status,value,callback;var c=a.id;if(!a.customClass){b=""}else{b=' '+a.customClass}if(!!a.status){status=a.status}else{status="off"}if(!!a.value){value=a.value}else{value=""}if(!!a.callback){callback=a.callback}else{callback=function(){return false}}var d='<switchcontrol class="'+status+b+'" id="'+c+'"'+'" ui-value="'+value+'">            <label ui-implements="on">ON</label>            <thumb><thumbprop></thumbprop></thumb>            <label ui-implements="off">OFF</label>        </switchcontrol>';if(this.css("position")!=="absolute"){this.css("{position: relative;}")}this.insert(d);var e="#"+c;this.addClass("ui-no-hover");$(e).bind("click",function(){this.UISwitchControl(callback)})}});$.extend(HTMLElement.prototype,{UISwitchControl:function(a){if(!a){var a=function(){return false}}if(this.nodeName.toLowerCase()==="switchcontrol"){a.call(a,this);if(this.hasClass("off")){this.toggleClass("on","off");this.checked=true}else{this.toggleClass("on","off");this.checked=false}}else{return false}}});$.extend(HTMLElement.prototype,{UIInitSwitchToggling:function(){$$("switchcontrol",this).forEach(function(a){a.parentNode.addClass("ui-no-hover");if(a.hasClass("on")){a.checked=true}else{a.checked=false}a.bind("click",function(e){this.parentNode.style.backgroundImage="none";e.preventDefault();this.UISwitchControl()})})}});$.ready(function(){$.app.UIInitSwitchToggling()});$.extend(HTMLElement.prototype,{UICreateSegmentedControl:function(a,b){var b=b||null;var c="<segmentedcontrol";if(a.id){c+=" id='"+a.id+"'"}if(a.placement){c+=" ui-bar-align='"+a.placement+"'"}if(a.selectedSegment){c+=" ui-selected-index='"+a.selectedSegment+"'"}c+="'>";if(a.numberOfSegments){segments=a.numberOfSegments;var d=1;for(var i=0;i<segments;i++){c+="<uibutton";if(a.selectedSegment){if(a.selectedSegment-1===i){c+=" class='selected'"}}if(a.disabledSegment){if(a.disabledSegment-1===i){c+=" class='disabled'"}}c+=" ui-kind='segmented'";if(a.placementOfIcons){c+=" ui-icon-alignment='"+a.placementOfIcons[d-1]+"'"}c+=">";if(a.iconsOfSegments){if(!!a.iconsOfSegments[i]){c+="<icon ui-implements='icon-mask' style='-webkit-mask-box-image: url(icons/"+a.iconsOfSegments[d-1]+".svg)'  ui-implements='icon-mask'></icon>"}}if(a.titlesOfSegments){c+="<label>"+a.titlesOfSegments[d-1]+"</label>"}c+="</uibutton>";d++}c+="</segmentedcontrol>";if(b){this.insert(c,b)}else{this.insert(c)}$("#"+a.id).UISegmentedControl()}}});$.extend(HTMLElement.prototype,{UISegmentedControl:function(){var d=this;var e=$.collectionToArray(this.children);e.forEach(function(c){c.bind("click",function(){var a=d.getAttribute("ui-selected-index");if(!!a){if(!this.hasClass("disabled")){d.children[a-1].removeClass("selected");this.addClass("selected");var b=d.childElementCount;for(var i=0;i<b;i++){if(this.isEqualNode(d.children[i])){d.setAttribute("ui-selected-index",i+1)}}}}})})},});$.ready(function(){$$("segmentedcontrol").forEach(function(a){a.UISegmentedControl()})});$.extend(HTMLElement.prototype,{UIActionSheet:function(d){var e=this;var f=d.id;var g="undefined";if(!!d.color){g=d.color}$.body.UIScreenCover();var h=function(){var a="<actionsheet id='"+f+"' class='hidden' ui-contains='action-buttons'";if(g){a+=" ui-action-sheet-color='"+g+"'"}a+="><scrollpanel>";var b="",uiButtonObj,uiButtonImplements,uiButtonTitle,uiButtonCallback;for(var i=0,len=d.uiButtons.length;i<len;i++){uiButtonObj=d.uiButtons[i];b+="<uibutton ui-kind='action' ";uiButtonTitle=uiButtonObj["title"];uiButtonImplements=uiButtonObj["uiButtonImplements"]||"";uiButtonCallback=uiButtonObj["callback"];f.trim();f.capitalize();b+=' ui-implements="'+uiButtonImplements+'" class="stretch" onclick="'+uiButtonCallback+'(\'#'+f+'\')">                <label>';b+=uiButtonTitle;b+="</label>             </uibutton>"}a+=b+"<uibutton ui-kind='action' ui-implements='cancel' class='stretch'             onclick='$.UIHideActionSheet(\"#"+f+"\")'>            <label>Cancel</label>        </uibutton>        </scrollpanel>        </actionsheet>";var c=$.make(a);e.insert(c,"last")};h();var j="#"+f+" uibutton";$$(j).forEach(function(a){a.bind("click",function(){$.UIHideActionSheet()})});var k=new $.UIScrollControl($("#"+f+" > scrollpanel"),{desktopCompatibility:true})}});$.extend($,{UIShowActionSheet:function(a){$.app.data("ui-action-sheet-id",a);window.scrollTo(0,1);var b=$("body > screencover");b.css("{ width: '"+window.innerWidth+"px; height: "+window.innerHeight+"px; }");b.setAttribute("ui-visible-state","visible");$(a).removeClass("hidden");b.addEventListener("touchmove",function(e){e.preventDefault()},false)},UIHideActionSheet:function(){var a=$.app.data("ui-action-sheet-id");$("screencover").setAttribute("ui-visible-state","hidden");try{$(a).addClass("hidden")}catch(e){}$.app.removeData("ui-action-sheet-id")},UIReadjustActionSheet:function(){var a="";if($.app.data("ui-action-sheet-id")){a=$.app.data("ui-action-sheet-id");if(!$.standalone){$(a).css("{ right: 0; bottom: -60px; left: 0;}")}else{$(a).css("{ right: 0; bottom: -10px; left: 0;}")}}}});document.addEventListener("orientationchange",function(){$.UIReadjustActionSheet()},false);$.extend($,{UIAdjustToolBarTitle:function(){$$("navbar > h1").forEach(function(a){var b=window.innerWidth;var c=0;var d=0;var e=0;a.previousElementSibling?c=a.previousElementSibling.clientWidth:c=0;a.nextElementSibling?d=a.nextElementSibling.clientWidth:d=0;if(c>d){e=c*2}else{e=d*2}if(e>0){if((b-e)<40){a.style.cssText="display: none;"}else{a.style.cssText="display: block; width: "+(b-e-20)+"px;"}}})}});document.addEventListener("DOMContentLoaded",function(){$.UIAdjustToolBarTitle()},false);document.addEventListener("orientationchange",function(){$.UIAdjustToolBarTitle()},false);window.addEventListener("resize",function(){$.UIAdjustToolBarTitle()},false);$.UIActivityIndicator=function(){};$.extend($.UIActivityIndicator.prototype,{id:null,color:null,shadow:null,container:null,size:null,init:function(a){if(a){this.id=a.id||"UIActivityIndicator";this.color=a.color||"gray";if(!!a.shadow){this.shadow=a.shadow}this.container=a.container;this.size=a.size||"75%"}$(this.container).css("{ background-position: center 70%; background-repeat: no-repeat; background-image: -webkit-canvas("+this.id+"); background-size: "+this.size+" "+this.size+"}");this.context=document.getCSSCanvasContext("2d",this.id,37,37);this.context.lineWidth=3;this.context.lineCap="round";this.context.strokeStyle=this.color;if(this.shadow){this.context.shadowOffsetX=1;this.context.shadowOffsetY=1;this.context.shadowBlur=2;this.context.shadowColor=this.shadow}this.step=0;this.timer=null},draw:function(){this.context.clearRect(0,0,137,37);this.context.save();this.context.translate(18,18);this.context.rotate(this.step*Math.PI/180);for(var i=0;i<12;i++){this.context.rotate(30*Math.PI/180);this.drawLine(i)}this.context.restore();this.step+=30;if(this.step===360){this.step=0}},drawLine:function(i){this.context.beginPath();this.context.globalAlpha=i/12;this.context.moveTo(0,8+1);this.context.lineTo(0,16-1);this.context.stroke()},stop:function(){if(this.timer){this.context.clearRect(0,0,37,37);window.clearInterval(this.timer);this.timer=null}},animate:function(){if(this.timer){return}var a=this;this.timer=window.setInterval(function(){a.draw()},100)}});$.extend(HTMLElement.prototype,{UIInsertActivityIndicator:function(a){this.insert("<panel style='height: "+a.size+"; width: "+a.size+";"+a.style+"'></panel>");var b=new $.UIActivityIndicator();b.init(a);b.animate()}});$.extend($,{UICurX:null,UICurY:null,UISliderThumbWidth:null,UISliderValue:null,UISlider:function(b,c){var d=null;if(!c){var e=function(){}}else{var e=c.callback}if(c.startValue){d=c.startValue}var f=$(b).clientWidth;if(d){$("thumb",b).css("{left: "+d+"px;}");$(b).css("{background-size: "+(d+2)+"px 9px, 100% 9px;}")}$(b).setAttribute("ui-slider-length",f);if("createTouch"in document){var g=$(b+" > thumb");g.bind("touchmove",function(a){this.UISliderTouch(event);this.UIUpdateSliderTouch(e)})}else{$.UISliderForMouse(b,c)}}});$.extend(HTMLElement.prototype,{UISliderTouch:function(a){a.preventDefault();var b=this.parentNode.getAttribute("ui-slider-length");var c=a.touches[0];$.UICurX=c.pageX-this.parentNode.offsetLeft-$.UISliderThumbWidth;var d=this.css("width");d=parseInt(d,10);$.UISliderValue=$.UICurX+d;if($.UICurX<=0-(d/2)){$.UICurX=0-(d/2)}if($.UICurX>b-12){$.UICurX=b-12}},UIUpdateSliderTouch:function(a){if(!a){var a=function(){}}this.style.left=$.UICurX-$.UISliderThumbWidth+'px';a();this.parentNode.css("{-webkit-background-size:"+($.UICurX+1)+"px 9px, 100% 9px;}");this.parentNode.css("{background-size:"+($.UICurX+1)+"px 9px, 100% 9px;}")}});$.UIDrag={obj:null,init:function(a,b,c,d,e,f,g,h){a.onmousedown=$.UIDrag.start;a.hmode=g?false:true;a.vmode=h?false:true;a.root=b&&b!==null?b:a;if(a.hmode&&isNaN(parseInt(a.root.style.left),10)){a.root.style.left=a.root.css("left")}if(a.vmode&&isNaN(parseInt(a.root.style.top),10)){a.root.style.top=a.root.css("top")}if(!a.hmode&&isNaN(parseInt(a.root.style.right),10)){a.root.style.right=a.root.css("right")}if(!a.vmode&&isNaN(parseInt(a.root.style.bottom),10)){a.root.style.bottom=a.root.css("bottom")}a.minX=typeof c!=='undefined'?c:null;a.minY=typeof e!=='undefined'?e:null;a.maxX=typeof d!=='undefined'?d:null;a.maxY=typeof f!=='undefined'?f:null;a.root.onDragStart=new Function();a.root.onDragEnd=new Function();a.root.onDrag=new Function()},start:function(e){var a=$.UIDrag.obj=this;e=$.UIDrag.fixE(e);$.UIDrag.y=parseInt(a.vmode?a.root.style.top:a.root.style.bottom,10);$.UIDrag.x=parseInt(a.hmode?a.root.style.left:a.root.style.right,10);a.root.onDragStart($.UIDrag.x,$.UIDrag.y);a.lastMouseX=e.clientX;a.lastMouseY=e.clientY;if(a.hmode){if(a.minX!==null)a.minMouseX=e.clientX-$.UIDrag.x+a.minX;if(a.maxX!==null)a.maxMouseX=a.minMouseX+a.maxX-a.minX}else{if(a.minX!==null)a.maxMouseX=-a.minX+e.clientX+$.UIDrag.x;if(a.maxX!==null)a.minMouseX=-a.maxX+e.clientX+$.UIDrag.x}if(a.vmode){if(a.minY!==null)a.minMouseY=e.clientY-$.UIDrag.y+a.minY;if(a.maxY!==null)a.maxMouseY=a.minMouseY+a.maxY-a.minY}else{if(a.minY!==null)a.maxMouseY=-a.minY+e.clientY+$.UIDrag.y;if(a.maxY!==null)a.minMouseY=-a.maxY+e.clientY+$.UIDrag.y}document.onmousemove=$.UIDrag.drag;document.onmouseup=$.UIDrag.end;return false},drag:function(e){e=$.UIDrag.fixE(e);var a=$.UIDrag.obj;var b=e.clientY;var c=e.clientX;$.UIDrag.y=parseInt(a.vmode?a.root.style.top:a.root.style.bottom,10);$.UIDrag.x=parseInt(a.hmode?a.root.style.left:a.root.style.right,10);var d,ny;if(a.minX!==null)c=a.hmode?Math.max(c,a.minMouseX):Math.min(c,a.maxMouseX);if(a.maxX!==null)c=a.hmode?Math.min(c,a.maxMouseX):Math.max(c,a.minMouseX);if(a.minY!==null)b=a.vmode?Math.max(b,a.minMouseY):Math.min(b,a.maxMouseY);if(a.maxY!==null)b=a.vmode?Math.min(b,a.maxMouseY):Math.max(b,a.minMouseY);d=$.UIDrag.x+((c-a.lastMouseX)*(a.hmode?1:-1));ny=$.UIDrag.y+((b-a.lastMouseY)*(a.vmode?1:-1));$.UICurX=d;$.UISliderValue=d+(Math.round($.UISliderThumbWidth));console.log("$.UISliderValue: "+(d+$.UISliderThumbWidth));$.UICurY=ny;$.UIDrag.obj.root.style[a.hmode?"left":"right"]=d+"px";$.UIDrag.obj.root.style[a.vmode?"top":"bottom"]=ny+"px";$.UIDrag.obj.lastMouseX=c;$.UIDrag.obj.lastMouseY=b;$.UIDrag.obj.root.onDrag(d,ny);$.UIDrag.updateSliderProgressIndicator($.UICurX);return false},end:function(){document.onmousemove=null;document.onmouseup=null;$.UIDrag.obj.root.onDragEnd(parseInt($.UIDrag.obj.root.style[$.UIDrag.obj.hmode?"left":"right"],10),parseInt($.UIDrag.obj.root.style[$.UIDrag.obj.vmode?"top":"bottom"],10));$.UIDrag.obj=null},fixE:function(e){if(typeof e.elemX==='undefined')e.elemX=e.offsetX;if(typeof e.elemY==='undefined')e.elemY=e.offsetY;return e},updateSliderProgressIndicator:function(){$.UIDrag.obj.parentNode.css("{-webkit-background-size:"+($.UICurX+1)+"px 9px, 100% 9px;}");$.UIDrag.obj.parentNode.css("{background-size:"+($.UICurX+1)+"px 9px, 100% 9px;}")}};$.extend($,{UISliderForMouse:function(a,b){if(!b){var b={}}var c=$("thumb",a);var d=$(a);var e=parseInt(c.css("width"),10);var f=parseInt(d.css("width"),10);var g=parseInt(d.css("height"),10);var h=parseInt(d.css("padding-right"),10);var i=parseInt(d.css("border-right-width"),10);f-=h;f-=i;f-=$.UISliderThumbWidth;var j=Math.round(e/2);$.UISliderThumbWidth=j;var k=(0-$.UISliderThumbWidth);$.UIDrag.init(c,null,-$.UISliderThumbWidth,f-(Math.round(e/2)),b["top"],b["top"]);c.onDrag=function(){if(b.callback){b.callback();d.UIUpdateSliderTouch()}this.style.top=-g+"px"}}});