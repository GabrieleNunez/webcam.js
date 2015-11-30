// getUserMedia shim
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

// initialize web cam object
$.fn.webcam = function(action) {

	var action = typeof action == "undefined" ? "auto" : action;

	// determine which type of action to take
	switch(action.toLowerCase()) {
		case "auto": 
			var obj = this;
			if($(this).data("webcam-init") === true && ($(this).prop("webcam") === true || $(this).is("webcam") || $(this).hasClass("webcam"))) { // we are already initialized on this object, let's simply return it to the caller
				obj = WebcamObject(this);
			} else {

				if($(this).prop("webcam") === true || $(this).is("webcam") || $(this).hasClass("webcam")) 
					WebcamObject(this);

				$(this).find("webcam, div[webcam], .webcam").each(function(index, item) { // unintialized look for everything inside and on the element itself for the web cam property
					WebcamObject(item);
				});
			}

			return obj;
		default:
			var webcam = WebcamObject(this);
			if(typeof webcam[action] != "undefined")
				return webcam[action]();
			else
				return this;
	}

}

// construct the web cam object
function WebcamObject(element, width, height) {

	var cameraWidth = typeof width == "undefined" ? $(element).width() : width;
	var cameraHeight = typeof height == "undefined" ? $(element).height() : height;
	var element = element;

	if(!$(element).data("webcam-init")) { // not initialized yet, create the interface now
		if(navigator.getUserMedia) {
			$(element).append('<p class="webcam-message">Establishing connection to webcam</p>');
			navigator.getUserMedia({ video: true, audio: false }, function(stream) {
				var video = $("<video></video>");

				// set the width and height
				$(video).width(cameraWidth);
				$(video).height(cameraHeight);

				if(navigator.mozGetUserMedia) { 
        			video[0].mozSrcObject = stream;
        		} else {
        			var vendorURL = window.URL || window.webkitURL;
        			video[0].src = vendorURL ? vendorURL.createObjectURL(stream) : stream;
        		}

        		video[0].play();
				$(element).empty().append(video);

			}, function(error) { // an error occurred while establishing a feed
				$(element).empty().append('<p class="webcam-message">Could not establish connection to the webcam</p>');
			});

		} else {
			$(element).empty().append('<p class="webcam-message">Could not establish connection to the webcam</p>');
		}
	}

	$(element).data("webcam-init", true); // make sure we have initialized the webcam

	// snapshots the web cam by using the video as a source and exports the data url
	function snapshot() {
		var video = $(element).find("video").first()[0];
		var canvas = $("<canvas></canvas>")[0];
		var context = canvas.getContext('2d');
		context.drawImage(video,0,0,canvas.width, canvas.height);

		var dataUrl = canvas.toDataURL();
		$(canvas).remove();

		return dataUrl;

	}

	// pause the web cam stream
	function pause() {
		var video = $(element).find("video").first()[0];
		video.pause();
		return element;
	}

	// play the web cam stream
	function play() {
		var video = $(element).find("video").first()[0];
		video.play();
		return element;
	}

	// destroy everything inside
	function destroy() {
		$(element).empty();
		return element;
	}

	return {
		snapshot : snapshot,
		stop : stop,
		play: play,
		pause: pause,
		destroy: destroy
	}
}