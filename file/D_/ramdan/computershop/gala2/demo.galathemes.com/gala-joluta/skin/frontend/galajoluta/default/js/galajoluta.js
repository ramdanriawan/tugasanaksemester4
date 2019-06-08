/**
 * Javascript library for template ExtremeMagento
 * @copyright 2007 Quick Solution LTD. All rights reserved.
 * @author Giao L. Trinh <giao.trinh@quicksolutiongroup.com>
 */

(function() {
	
// EM.tools {{{
	
if (typeof BLANK_IMG == 'undefined') 
	var BLANK_IMG = '';

// declare namespace() method
String.prototype.namespace = function(separator) {
  this.split(separator || '.').inject(window, function(parent, child) {
    var o = parent[child] = { }; return o;
  });
};


'EM.tools'.namespace();


// EM0027 {{{

function decorateSlideshow1() {
	var $$li = $$('#slideshow1 ul li');
	if ($$li.length > 0) {
		
		// reset UL's width
		var ul = $$('#slideshow1 ul')[0];
		var w = 0;
		$$li.each(function(li) {
			w += li.getWidth();
		});
		ul.setStyle({'width':w+'px'});
		
		// private variables
		var previous = $$('#slideshow1 a.previous')[0];
		var next = $$('#slideshow1 a.next')[0];
		var num = 1;
		var width = ul.down().getWidth() * num;
		var slidePeriod = 3; // seconds
		var manualSliding = false;
		
		// next slide
		function nextSlide() {
			new Effect.Move(ul, { 
				x: -width,
				mode: 'relative',
				queue: 'end',
				duration: 1.0,
				//transition: Effect.Transitions.sinoidal,
				afterFinish: function() {
					for (var i = 0; i < num; i++)
						ul.insert({ bottom: ul.down() });
					ul.setStyle('left:0');
				}
			});
		}
		
		// previous slide
		function previousSlide() {
			new Effect.Move(ul, { 
				x: width,
				mode: 'relative',
				queue: 'end',
				duration: 1.0,
				//transition: Effect.Transitions.sinoidal,
				beforeSetup: function() {
					for (var i = 0; i < num; i++)
						ul.insert({ top: ul.down('li:last-child') });
					ul.setStyle({'position': 'relative', 'left': -width+'px'});
				}
			});
		}
		
		function startSliding() {
			sliding = true;
		}
		
		function stopSliding() {
			sliding = false;
		}
		
		// bind next button's onlick event
		next.observe('click', function(event) {
			Event.stop(event);
			manualSliding = true;
			nextSlide();
		});
		
		// bind previous button's onclick event
		previous.observe('click', function(event) {
			Event.stop(event);
			manualSliding = true;
			previousSlide();
		});
		
		/*
		// auto run slideshow
		new PeriodicalExecuter(function() {
			if (!manualSliding) previousSlide();
			manualSliding = false;
		}, slidePeriod);
		*/
		
	}
}

function decorateSlideshow2() {
	var $$li = $$('#slideshow2 ul li');
	if ($$li.length > 0) {
		
		// reset UL's width
		var ul = $$('#slideshow2 ul')[0];
		var w = 0;
		$$li.each(function(li) {
			w += li.getWidth();
		});
		ul.setStyle({'width':w+'px'});
		
		// private variables
		var previous = $$('#slideshow2 a.previous')[0];
		var next = $$('#slideshow2 a.next')[0];
		var num = 1;
		var width = ul.down().getWidth() * num;
		var slidePeriod = 3; // seconds
		var manualSliding = false;
		
		// next slide
		function nextSlide() {
			new Effect.Move(ul, { 
				x: -width,
				mode: 'relative',
				queue: 'end',
				duration: 1.0,
				//transition: Effect.Transitions.sinoidal,
				afterFinish: function() {
					for (var i = 0; i < num; i++)
						ul.insert({ bottom: ul.down() });
					ul.setStyle('left:0');
				}
			});
		}
		
		// previous slide
		function previousSlide() {
			new Effect.Move(ul, { 
				x: width,
				mode: 'relative',
				queue: 'end',
				duration: 1.0,
				//transition: Effect.Transitions.sinoidal,
				beforeSetup: function() {
					for (var i = 0; i < num; i++)
						ul.insert({ top: ul.down('li:last-child') });
					ul.setStyle({'position': 'relative', 'left': -width+'px'});
				}
			});
		}
		
		function startSliding() {
			sliding = true;
		}
		
		function stopSliding() {
			sliding = false;
		}
		
		// bind next button's onlick event
		next.observe('click', function(event) {
			Event.stop(event);
			manualSliding = true;
			nextSlide();
		});
		
		// bind previous button's onclick event
		previous.observe('click', function(event) {
			Event.stop(event);
			manualSliding = true;
			previousSlide();
		});
		
		/*
		// auto run slideshow
		new PeriodicalExecuter(function() {
			if (!manualSliding) previousSlide();
			manualSliding = false;
		}, slidePeriod);
		*/
		
	}
}


function decorateSlideshow3() {
	var $$li = $$('#slideshow3 ul li');
	if ($$li.length > 0) {
		
		// reset UL's width
		var ul = $$('#slideshow3 ul')[0];
		var w = 0;
		$$li.each(function(li) {
			w += li.getWidth();
		});
		ul.setStyle({'width':w+'px'});
		
		// private variables
		var previous = $$('#slideshow3 a.previous')[0];
		var next = $$('#slideshow3 a.next')[0];
		var num = 1;
		var width = ul.down().getWidth() * num;
		var slidePeriod = 3; // seconds
		var manualSliding = false;
		
		// next slide
		function nextSlide() {
			new Effect.Move(ul, { 
				x: -width,
				mode: 'relative',
				queue: 'end',
				duration: 1.0,
				//transition: Effect.Transitions.sinoidal,
				afterFinish: function() {
					for (var i = 0; i < num; i++)
						ul.insert({ bottom: ul.down() });
					ul.setStyle('left:0');
				}
			});
		}
		
		// previous slide
		function previousSlide() {
			new Effect.Move(ul, { 
				x: width,
				mode: 'relative',
				queue: 'end',
				duration: 1.0,
				//transition: Effect.Transitions.sinoidal,
				beforeSetup: function() {
					for (var i = 0; i < num; i++)
						ul.insert({ top: ul.down('li:last-child') });
					ul.setStyle({'position': 'relative', 'left': -width+'px'});
				}
			});
		}
		
		function startSliding() {
			sliding = true;
		}
		
		function stopSliding() {
			sliding = false;
		}
		
		// bind next button's onlick event
		next.observe('click', function(event) {
			Event.stop(event);
			manualSliding = true;
			nextSlide();
		});
		
		// bind previous button's onclick event
		previous.observe('click', function(event) {
			Event.stop(event);
			manualSliding = true;
			previousSlide();
		});
		
		/*
		// auto run slideshow
		new PeriodicalExecuter(function() {
			if (!manualSliding) previousSlide();
			manualSliding = false;
		}, slidePeriod);
		*/
		
	}
}

function decorateSlideshow4() {
	var $$li = $$('#slideshow4 ul li.item');
	if ($$li.length > 0) {
		
		// reset UL's width
		var ul = $$('#slideshow4 ul')[0];
		var w = 0;
		$$li.each(function(li) {
			w += li.getWidth();
		});
		ul.setStyle({'width':w+'px'});
		
		// private variables
		var previous = $$('#slideshow4 a.previous')[0];
		var next = $$('#slideshow4 a.next')[0];
		var num = 1;
		var width = ul.down().getWidth() * num;
		var slidePeriod = 3; // seconds
		var manualSliding = false;
		
		// next slide
		function nextSlide() {
			new Effect.Move(ul, { 
				x: -width,
				mode: 'relative',
				queue: 'end',
				duration: 1.0,
				//transition: Effect.Transitions.sinoidal,
				afterFinish: function() {
					for (var i = 0; i < num; i++)
						ul.insert({ bottom: ul.down('li.item') });
					ul.setStyle('left:0');
				}
			});
		}
		
		// previous slide
		function previousSlide() {
			new Effect.Move(ul, { 
				x: width,
				mode: 'relative',
				queue: 'end',
				duration: 1.0,
				//transition: Effect.Transitions.sinoidal,
				beforeSetup: function() {
					for (var i = 0; i < num; i++)
						ul.insert({ top: ul.down('li.item:last-child') });
					ul.setStyle({'position': 'relative', 'left': -width+'px'});
				}
			});
		}
		
		function startSliding() {
			sliding = true;
		}
		
		function stopSliding() {
			sliding = false;
		}
		
		// bind next button's onlick event
		next.observe('click', function(event) {
			Event.stop(event);
			manualSliding = true;
			nextSlide();
		});
		
		// bind previous button's onclick event
		previous.observe('click', function(event) {
			Event.stop(event);
			manualSliding = true;
			previousSlide();
		});
		
		/*
		// auto run slideshow
		new PeriodicalExecuter(function() {
			if (!manualSliding) previousSlide();
			manualSliding = false;
		}, slidePeriod);
		*/
		
	}
}

/* Main Menu */
function menu()
{
	var Width_ul=0;
	var Width_li=0;
	var Width_before=0;
	var Width_div=0;
	var Width=0;
    $$(".menu").each(function(elem) {
		Width_ul=960;
		elem.childElements().each(function(li) {
			li.addClassName("li_menu");
            Width_li=li.getWidth();
			Width=Width_ul-Width_before;
			Width_before+=Width_li;
			$div=li.select('div')[0];
			if(typeof $div != 'undefined'){
				li.addClassName("submenu");
				Width_div=$div.getWidth();
				sub=Width_div-Width;
				if(sub>0){
					$div.addClassName(' position-right')
					li.addClassName('position-right-li')
				}
			}
        });
		
	});
}

// set Height auto Grid Catalogy

function setHeightAutoGridCatagoryDefault($class){
	$$ul=$$($class);
	if($$ul.length>0){
	     for($i=0;$i<$$ul.length;$i++){
                $ul=$$ul[$i];
                $height=0;
                $ul.select("li.item").each(function(li){
                    if($height<li.getHeight())
				        $height=li.getHeight()-6; 
                });
				$ul.select("li.item").each(function(li){
				li.setStyle('height:'+$height+"px");
				});
	    }
    }
}

document.observe("dom:loaded", function() {
    decorateSlideshow1();
	decorateSlideshow2();
	decorateSlideshow3();
	decorateSlideshow4();
	menu();	
	setHeightAutoGridCatagoryDefault(".category-products .products-grid");
	setHeightAutoGridCatagoryDefault(".crosssell .products-grid");
	setHeightAutoGridCatagoryDefault(".block-related .products-grid");
});

// }}}

})();