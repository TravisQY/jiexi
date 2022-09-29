(function($){'use strict';var _destroyFn;$.scrollupbar=function($bar,options){options=$.extend({enterViewport:$.noop,fullyEnterViewport:$.noop,exitViewport:$.noop,partiallyExitViewport:$.noop},options);function isFullyInViewport(){return $window.scrollTop()<=$bar.offset().top;}
function isInViewport(){return $window.scrollTop()<$bar.offset().top+$bar.outerHeight();}
var $window=$(window),$document=$(document),minY=$bar.css('position')=='fixed'?0:$bar.offset().top,lastY=$window.scrollTop(),initialPosTop=$bar.position().top,iOS=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),timeout;$.scrollupbar.isInViewport=isInViewport();$.scrollupbar.isFullyInViewport=isFullyInViewport();if(!iOS){$window.on('scroll.scrollupbar',function(){var y=$window.scrollTop(),barHeight=$bar.outerHeight();if(y<0||y>($document.height()-$window.height())){return;}
if(timeout){clearTimeout(timeout);}
if(y<lastY){if(!$.scrollupbar.isInViewport&&lastY-barHeight>=minY){$bar.css('top',lastY-barHeight);$.scrollupbar.isInViewport=true;options.enterViewport();}
if(isFullyInViewport()){if(y>=minY){$bar.css({'position':'fixed','top':0});}else{$bar.css({'position':'absolute','top':initialPosTop});}
if(!$.scrollupbar.isFullyInViewport){$.scrollupbar.isFullyInViewport=true;options.fullyEnterViewport();}}
timeout=setTimeout(function(){if(!isFullyInViewport()){$bar.css({'position':'fixed','top':$bar.offset().top-y});$bar.animate({'top':0},100,function(){$.scrollupbar.isFullyInViewport=true;options.fullyEnterViewport();});}},400);}else if(y>lastY){if($.scrollupbar.isFullyInViewport){$bar.css({'position':'absolute','top':lastY>minY?lastY:initialPosTop});if(!isFullyInViewport()){$.scrollupbar.isFullyInViewport=false;options.partiallyExitViewport();}}
if($.scrollupbar.isInViewport&&!isInViewport()){$.scrollupbar.isInViewport=false;options.exitViewport();}
timeout=setTimeout(function(){if(isInViewport()&&y-barHeight>=minY){$bar.animate({'top':y-barHeight},100,function(){$.scrollupbar.isInViewport=false;options.exitViewport();});}},400);}
lastY=y;});}else{$window.on('touchstart.scrollupbar',function(){lastY=$window.scrollTop();});$window.on('touchend.scrollupbar',function(){var y=$window.scrollTop();if(y<lastY||y-$bar.outerHeight()<minY){if(y<=minY){$bar.css({'position':'absolute','top':initialPosTop});$bar.show(function(){$.scrollupbar.isInViewport=true;$.scrollupbar.isFullyInViewport=true;options.enterViewport();options.fullyEnterViewport();});}else{$bar.css({'position':'fixed','top':0});$.scrollupbar.isInViewport=true;options.enterViewport();$bar.slideDown(function(){$.scrollupbar.isFullyInViewport=true;options.fullyEnterViewport();});}}else if(y>lastY){$.scrollupbar.isFullyInViewport=false;options.partiallyExitViewport();$bar.slideUp(function(){$.scrollupbar.isInViewport=false;options.exitViewport();});}
lastY=y;});}
_destroyFn=function(){$window.off('.scrollupbar');$bar.css({'position':'absolute','top':initialPosTop});};return $bar;};$.scrollupbar.destroy=function(){if(_destroyFn){return _destroyFn();}};$.fn.scrollupbar=function(options){return $.scrollupbar(this,options);};})(jQuery);