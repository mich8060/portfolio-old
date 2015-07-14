$(document).ready(function(){
	
	$(document).on('keydown','[contenteditable="true"]',function(e){
		var options = {
			el: 	$(this),
			next: 	$(this).next(),
			prev: 	$(this).prev(),
			caret: 	window.getSelection().getRangeAt(0).startOffset,
			length: $(this).text().length,
			key: 	e.keyCode
		}
		$('.controls').addClass('hidden');
		
		if(options.key == 13){
			if(options.el.hasClass('first')){
				e.preventDefault();
				options.el.after($('<p />').attr({
					contenteditable: true
				}).text(' '));
				options.el.next().focus();
			}else{
				$('.editor').attr({
					contenteditable: true
				});
			}
		}else if(e.keyCode == 40 || e.keyCode == 38){
			$('.editor').attr({
				contenteditable: true
			});
		}
	}).on('keyup','',function(e){
		$editor = $('.editor');
		window.setTimeout(function(){
			$editor.attr({
				contenteditable: false
			});
		},2000);
	}).on('mouseup','[contenteditable="true"]',function(e){
		var pos = $('<span />').css('border','solid 3px blue');
		var range = window.getSelection().getRangeAt(0);
		if(window.getSelection().toString() != ""){
			range.insertNode(pos[0]);
			var box = pos[0].getBoundingClientRect();
				box = {
					top: Math.round(box.top),
					left: Math.round(box.left)
				}
			pos[0].parentNode.removeChild(pos[0]);
			$('.controls').css({
				left:(box.left - 120),
				top:(box.top - 50)
			}).removeClass('hidden');
		}else{
			$('.controls').addClass('hidden');
		}

	}).on('mousedown','[contenteditable="true"]',function(e){
		$('.controls').addClass('hidden');
	}).on('click','',function(e){
		e.stopPropagation();
	});
	
	$(document).on('click','article',function(e){
		if(!$(e.target).parents('.editor').length){
			$('.controls').addClass('hidden');
		}
	});
	
	$(document).on('click','.control',function(e){
		e.preventDefault();
		$command = $(this).attr('data');
		
		console.log("Command: "+$command);
		try {
			if(document.queryCommandSupported($command)){
				console.log('The command is supported');
			}else{
				console.log('The command is not supported');
			}
		}catch(e){
			console.log('Your browser does not support the queryCommandSupported method');
		}
		
		
		if($command == "createLink"){
			document.execCommand($command, false, 'http://www.backcountry.com');
		}else if($command == "h2"){
			document.execCommand('formatBlock', false, '<h2>'); 
		}else if($command == "h3"){
			document.execCommand('formatBlock', false, '<h3>'); 
		}else if($command == "blockquote"){
			document.execCommand('formatBlock', false, '<blockquote>'); 
		}else{
			if(document.queryCommandEnabled($command)){
				document.execCommand($command, false, null);
			}
		}
		

		
		
	});
});

//$('b').replaceWith(function(){
//    return $("<strong />", {html: $(this).html()});
//});