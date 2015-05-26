/* The following is a sample

	#homepage_headings
		- for headings, index in ctrl_headings
			.headings_item(id="headings#{index}", style="background-image: url('#{headings.image}')")
				.grid
				.text
					.title= headings.title
					.explore Explore
	#homepage_headings_control
		- for headings, index in ctrl_headings
			.control(id="headings_control#{index}", data-index="#{index}")
				.focus

	script.
		var rotation_headings = {
			instance: {},
			current: 0,
			last: 0,
			timeout: 5000,
			amount: 4,
			image_selector:   '.headings_item',
			image_prefix:     '#headings',
			control_selector: '#homepage_headings_control .control',
			control_prefix:   '#headings_control'
		}
		rotateImage(rotation_headings);
 */
function rotateImage(options) {
	var current = options.current;
	if (options.instance) clearTimeout(options.instance);

	$(options.image_prefix + options.last).fadeOut(function() {
		options.last = options.current;
		$(options.control_selector).removeClass('selected');

		options.current = ++options.current % options.amount;
		$(options.image_prefix + current).fadeIn();
		$(options.control_prefix + current).addClass('selected');

		options.instance = setTimeout(function() {
			rotateImage(options);
		}, options.timeout);
	});
}


// Neil_20121129: Fit, scale, and crop image into a DIV.
function fitImageEvent(event) {
	var img = (event.currentTarget)? event.currentTarget: event.srcElement;
	fitImage(img);
}

function fitImage(img) {
	if (!img || typeof($(img).attr('src'))=='undefined')
		return;

	var wParent = $(img).parent().width();
	var hParent = $(img).parent().height();
	var ratioParent = wParent / hParent;

	var origin = new Image();
	origin.src = $(img).attr('src');
	var w = origin.width;
	var h = origin.height;
	var ratio = w / h;

	var wResult, hResult;
	if (ratio > ratioParent) {
		wResult = Math.floor(ratio * hParent);
		hResult = hParent;			
	}
	else {
		wResult = wParent;
		hResult = Math.floor(wParent / ratio);
	}

	// var top = 0;
	// var top = Math.floor((hParent - hResult) / 2);
	var top = Math.floor((hParent - hResult) / 5);
	var left = Math.floor((wParent - wResult) / 2);

	$(img).css({
		'position':'relative',
		'width': wResult+'px',
		'height': hResult+'px',
		'left':left+'px',
		'top':top+'px'
	})
}


// Neil_20140903: Scale image into a DIV, no crop.
function fitDivEvent(event) {
	var img = (event.currentTarget)? event.currentTarget: event.srcElement;
	fitDiv(img);
}

function fitDiv(img) {
	if (!img || typeof($(img).attr('src'))=='undefined') return;

	var wParent = $(img).parent().width();
	var hParent = $(img).parent().height();
	var ratioParent = wParent / hParent;

	var origin = new Image();
	origin.src = $(img).attr('src');
	var w = origin.width;
	var h = origin.height;
	var ratio = w / h;

	var fitWidth = (ratioParent > ratio)? false: true;

	if (fitWidth) {
		$(img).css({
			'position': 'relative',
			'top': (hParent - (wParent/ratio)) / 2,
			'left': 0,
			'width': wParent + 'px',
			'height': 'auto',
		});
	}
	else {
		$(img).attr('title', ratio);
		$(img).css({
			'position': 'relative',
			'top': 0,
			'left': (wParent - (hParent*ratio)) / 2,
			'width': 'auto',
			'height': hParent + 'px',
		});
	}
}

function htmlNl2Para(className) {
	$(className).each(function(i,item){
		$(item).html(function(i,html){
			html = html
				.replace(/(\r?\n){2,}/g, '<div style="height: 1em;"></div>')
				.replace(/\r?\n/g, '<br>');
			return html;
		});
	});
}
function parseURL(className) {
	// Modified@20140528
	var uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>（）]+|\(([^\s()<>（）]+|(\([^\s()<>（）]+\)))*\))+(?:\(([^\s()<>（）]+|(\([^\s()<>（）]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’（）]))/ig;
	$(className).each(function(i,item){
		$(item).html(function(i,html){
    		html = html
    			.replace(uri_pattern, "<a href=$& target='_blank'>"+'$&'+"</a>");
    		return html;
		});
	});
}
