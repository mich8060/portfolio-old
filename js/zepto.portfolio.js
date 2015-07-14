$(document).ready(function(){	
	
	$.fn.distance = function(){
		$el = this[0].getBoundingClientRect();
		var obj = {
			top: $el.top,
			left: $el.left,
			width: $el.width,
			height: $el.height
		}
		return obj;
	}
	
	$.fn.distanceParent = function(){
		$el = this[0].getBoundingClientRect();
		$parent = $(this).parent()[0].getBoundingClientRect()
		
		var obj = {
			top: $el.top - $parent.top,
			left: $el.left- $parent.left
		}
		return obj;
	}
	
	$.fn.cleanHTML = function(){
		$html = "";
		$(this).children().each(function(){
			if(!$(this).is(':empty') && $(this).text() != " "){
				$tag = $(this).prop("tagName").toLowerCase();
				$html += '<'+$tag+'>'+$(this).html()+'</'+$tag+'>\n';
			}
		})	
		$('.data').text($html);
	}
	
	$.fn.toolkit = function() {
		if($(this).is(':empty') || $(this).html() == " "){
			distance = $(this).distanceParent();
			$('.toolkit .event').show();
			$('.toolkit').css({
				top: distance.top
			});
		}else{
			$('.toolkit .event').hide();
		}
	}
	
	$(document).not('.toolkit').on('click','article',function(e){
		if(!$(e.target).is("img")){
			$('.toolkit .event').hide();
			$('.toolkit .actions').hide();
		}
	});
	
	$(document).on('click','.toolkit',function(){
		
	});
	
	$(document).on('click','.toolkit .event',function(e){
		e.preventDefault();
		$(this).find('img').css('transform','rotate(45deg)');
		$('.toolkit .actions').show();
	});
	
	$(document).on('click','.toolkit .actions a',function(e){
		e.preventDefault();
		if($(this).attr('data') == "video"){

		}
	});
	
	// Editable Content
	$el = $('.editing');
	
	$(document).on('keyup','#editor',function(e){
		if(e.keyCode == 13 || e.keyCode == 9){
			if($el.hasClass('first') || $el.hasClass('h1')){
				$el.next().removeClass('h1 first');
				$el.next().attr('placeholder','Tell your story...').html('');
				$el.next().trigger('click');		
			}
		}
	}).on('click','[contenteditable="true"]',function(e){
		$el = $(e.target);
		$('.editing').removeClass('editing');
		$el.addClass('editing');
	});

});