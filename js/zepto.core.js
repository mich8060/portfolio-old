$(document).ready(function(){
	$(document).on('click','.popover',function(e){
		e.preventDefault();
		$el = $(this);
		$el.hasClass('open') ? $el.removeClass('open') : $el.addClass('open');
	});
	
	$(document).on('click','.popover .option',function(e){
		e.preventDefault();
		$(this).closest('.popover').find('.label').html($(this).html());
	});
	
	$(document).on('keydown','.popover .label',function(e){
		$(this).closest('.popover').removeClass('open');
	});
});