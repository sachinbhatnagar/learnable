function turntable(filepath){
	var turntableImg = $('.turntableImg');
	var progressBarEl = $('.animateBar');
	var progressBarMax = progressBarEl.parent().width();
	var endFrame = 59;
	var framesLoaded = 0;
	var frames = [];
	var frameRate = 15;

	progressBarEl.parent().fadeIn(20);

	function createPath(frame){
		return filepath + "." + (frame < 10 ? '0' + frame : frame) + ".png";
	}

	(function tableRun(preload){
		if(preload){
			// Cache images in
			if(framesLoaded < endFrame){
				frames[framesLoaded] = new Image();
				frames[framesLoaded].src = createPath(framesLoaded);
				frames[framesLoaded].onload = function(){
					var progressBarWidth = (framesLoaded / endFrame) * progressBarMax;
					progressBarEl.width(progressBarWidth);
					framesLoaded ++;
					tableRun(true);
				}
			} else {
				progressBarEl.parent().fadeOut(100);
				tableRun(false);
			}

		} else {
			// Play the animation
			var frameCounter = 0;
			setInterval(function(){
				turntableImg.attr('src', createPath(frameCounter));
				if(frameCounter < frames.length){
					frameCounter ++;
				} else {
					frameCounter = 0;
				}
			}, 1000 / frameRate);
		}
	}(true));
	// Immediately Invoked Function Expression !
}