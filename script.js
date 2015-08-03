
// j
//// jta product scroller
// options
var scrollerContainer = ".product-scroller"; // your scroller wrapper
var scrollerControlInActive = "product-scroller-control-inactive"; // your inactive control class
var scrollerControlActive = "product-scroller-control-active"; // your active control class
var scrollerItemsPerScroll = 6; // how many items you want to scroll by per click, usually one less than the items in view
var scrollerItemsInView = 7; // how many items are in view at a time
var scrollerSpeed = 400; // ms

var marginLeft = "margin-left";

$(scrollerContainer).each(function(){
	// finds each scroller wrapper's child elements, assigns variables
	var scrollerNext = $(this).find(".product-scroller-controls-next");
	var scrollerPrev = $(this).find(".product-scroller-controls-previous");
	var scrollerItem = $(this).find(".product-scroller-item");
	var scrollerUl = $(this).find(".product-scroller-ul");
	var scrollerWrapper = $(this).find(".product-scroller-wrapper");	

	var productScrollerCurrentPosition = 0; // current position of the scroller, 0 = start	
	var productScrollerItemTotal = $(scrollerItem).length; // amount of items within the scroller	
	var productScrollerItemWidth = $(scrollerItem).outerWidth(true); // get product scroller item width including padding and borders
	var productScrollerItemWidthTotal = productScrollerItemWidth * productScrollerItemTotal; // calculates width of total items to product scroller ul

	$(scrollerUl).css({"width":productScrollerItemWidthTotal}); // assigns width of total items to product scroller ul

	// when the window has finished loading workout the max-height of the items within the scroller and apply this height to the wrapper and container
	$(window).load(function(){
		// get an array of all element heights
		var productScrollerItemMaxHeight = $(scrollerItem).map(function(){return $(this).outerHeight(true);}).get();
		var maxHeight = Math.max.apply(null, productScrollerItemMaxHeight);

		// set wrapper and container's height to the max height of the items within
		$(scrollerWrapper).height(maxHeight);
		$(scrollerContainer).height(maxHeight);
	});

	// add prep class
	$(scrollerPrev).addClass(scrollerControlInActive);

	// on click move ul
	var productScrollerItemWidthAnimateLeft = "-=" + (productScrollerItemWidth * scrollerItemsPerScroll); // next
	var productScrollerItemWidthAnimateRight = "+=" + (productScrollerItemWidth * scrollerItemsPerScroll); // prev

	// next
	function moveProductScrollerLeft(){
		if (productScrollerCurrentPosition <= (productScrollerItemTotal - scrollerItemsInView)){
			$(scrollerUl).animate({
				marginLeft:productScrollerItemWidthAnimateLeft
			}, scrollerSpeed); // animate scroller left
			productScrollerCurrentPosition+=scrollerItemsPerScroll; // update current position

			$(scrollerPrev).removeClass(scrollerControlInActive); // inactive styles
			$(scrollerPrev).addClass(scrollerControlActive); // active styles

			if (productScrollerItemTotal >= productScrollerCurrentPosition && productScrollerItemTotal <= (productScrollerCurrentPosition + scrollerItemsPerScroll)) {
				$(scrollerNext).removeClass(scrollerControlActive); // active styles
				$(scrollerNext).addClass(scrollerControlInActive); // inactive styles
			};
		};
	};

	// prev
	function moveProductScrollerRight(){
		if (productScrollerCurrentPosition > 0){
			$(scrollerUl).animate({
				marginLeft:productScrollerItemWidthAnimateRight
			}, scrollerSpeed); // animate scroller right
			productScrollerCurrentPosition-=scrollerItemsPerScroll; // update current position

			$(scrollerNext).removeClass(scrollerControlInActive); // inactive styles
			$(scrollerNext).addClass(scrollerControlActive); // active styles

			if (productScrollerCurrentPosition == 0) {
				$(scrollerPrev).removeClass(scrollerControlActive); // active styles
				$(scrollerPrev).addClass(scrollerControlInActive); // inactive styles
			};
		};
	};

	$(scrollerNext).click(moveProductScrollerLeft); // on click move scroller left
	$(scrollerPrev).click(moveProductScrollerRight); // on click move scroller right
});
