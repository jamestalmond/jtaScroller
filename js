//// jtaScroller
// options
var jtaScrollerContainer = ".jtaScroller"; // your scroller wrapper class
var jtaScrollerControlInActive = "jtaScroller_control-inactive"; // your inactive control class name
var jtaScrollerControlActive = "jtaScroller_control-active"; // your active control class name
var jtaScrollerItemsPerScroll = 6; // how many items you want to scroll by per click, usually one less than the items in view
var jtaScrollerItemsInView = 7; // how many items are in view at a time including the last one item that's slightly cut off
var jtaScrollerSpeed = 400; // ms

var marginLeft = "margin-left";

$(jtaScrollerContainer).each(function(){
	// finds each scroller wrapper's child elements, assigns variables
	var jtaScrollerNext = $(this).find(".jtaScroller_controls-next");
	var jtaScrollerPrev = $(this).find(".jtaScroller_controls-previous");
	var jtaScrollerItem = $(this).find(".jtaScroller_item");
	var jtaScrollerUl = $(this).find(".jtaScroller_ul");
	var jtaScrollerWrapper = $(this).find(".jtaScroller_wrapper");	

	var jtaScrollerCurrentPosition = 0; // current position of the scroller, set to 0
	var jtaScrollerItemTotal = $(jtaScrollerItem).length; // amount of items within the scroller	
	var jtaScrollerItemWidth = $(jtaScrollerItem).outerWidth(true); // get scroller item width including padding and borders
	var jtaScrollerItemWidthTotal = jtaScrollerItemWidth * jtaScrollerItemTotal; // calculates width of total items to product scroller ul

	$(jtaScrollerUl).css({"width":jtaScrollerItemWidthTotal}); // assigns width of total items to scroller ul

	// when the window has finished loading workout the max-height of the items within the scroller and apply this height to the wrapper and container
	$(window).load(function(){
		// get an array of all element heights
		var jtaScrollerItemMaxHeight = $(jtaScrollerItem).map(function(){return $(this).outerHeight(true);}).get();
		var maxHeight = Math.max.apply(null, jtaScrollerItemMaxHeight);

		// set wrapper and container's height to the max height of the items within
		$(jtaScrollerWrapper).height(maxHeight);
		$(jtaScrollerContainer).height(maxHeight);
	});

	// add prep class
	$(jtaScrollerPrev).addClass(jtaScrollerControlInActive);
	$(jtaScrollerNext).addClass(jtaScrollerControlActive);

	// on click move ul
	var jtaScrollerItemWidthAnimateLeft = "-=" + (jtaScrollerItemWidth * jtaScrollerItemsPerScroll); // next
	var jtaScrollerItemWidthAnimateRight = "+=" + (jtaScrollerItemWidth * jtaScrollerItemsPerScroll); // prev

	// next
	function moveJtaScrollerLeft(){
		if (jtaScrollerCurrentPosition <= (jtaScrollerItemTotal - jtaScrollerItemsInView)){
			$(jtaScrollerUl).animate({
				marginLeft:jtaScrollerItemWidthAnimateLeft
			}, jtaScrollerSpeed); // animate scroller left
			jtaScrollerCurrentPosition+=jtaScrollerItemsPerScroll; // update current position

			$(jtaScrollerPrev).removeClass(jtaScrollerControlInActive); // inactive styles
			$(jtaScrollerPrev).addClass(jtaScrollerControlActive); // active styles

			if (jtaScrollerItemTotal >= jtaScrollerCurrentPosition && jtaScrollerItemTotal <= (jtaScrollerCurrentPosition + jtaScrollerItemsPerScroll)) {
				$(jtaScrollerNext).removeClass(jtaScrollerControlActive); // active styles
				$(jtaScrollerNext).addClass(jtaScrollerControlInActive); // inactive styles
			};
		};
	};

	// prev
	function moveJtaScrollerRight(){
		if (jtaScrollerCurrentPosition > 0){
			$(jtaScrollerUl).animate({
				marginLeft:jtaScrollerItemWidthAnimateRight
			}, jtaScrollerSpeed); // animate scroller right
			jtaScrollerCurrentPosition-=jtaScrollerItemsPerScroll; // update current position

			$(jtaScrollerNext).removeClass(jtaScrollerControlInActive); // inactive styles
			$(jtaScrollerNext).addClass(jtaScrollerControlActive); // active styles

			if (jtaScrollerCurrentPosition == 0) {
				$(jtaScrollerPrev).removeClass(jtaScrollerControlActive); // active styles
				$(jtaScrollerPrev).addClass(jtaScrollerControlInActive); // inactive styles
			};
		};
	};

	$(jtaScrollerNext).click(moveJtaScrollerLeft); // on click move scroller left
	$(jtaScrollerPrev).click(moveJtaScrollerRight); // on click move scroller right
});
