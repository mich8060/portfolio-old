;(function($){
  	var zepto = $.zepto, oldQsa = zepto.qsa, oldMatches = zepto.matches

  	function visible(elem){
    	elem = $(elem)
    	return !!(elem.width() || elem.height()) && elem.css("display") !== "none"
  	}

  	var filters = zepto.cssFilters = {
    	visible:  function(){ if (visible(this)) return this },
  		hidden:   function(){ if (!visible(this)) return this },
    	selected: function(){ if (this.selected) return this },
    	checked:  function(){ if (this.checked) return this },
    	parent:   function(){ return this.parentNode },
    	first:    function(idx){ if (idx === 0) return this },
    	last:     function(idx, nodes){ if (idx === nodes.length - 1) return this },
    	eq:       function(idx, _, value){ if (idx === value) return this },
    	contains: function(idx, _, text){ if ($(this).text().indexOf(text) > -1) return this },
    	has:      function(idx, _, sel){ if (zepto.qsa(this, sel).length) return this }
  	}

  	var re = new RegExp('(.*):(\\w+)(?:\\(([^)]+)\\))?$\\s*')

  	function process(sel, fn) {
    	var filter, arg, match = sel.match(re)
    	if(match && match[2] in filters){
      		var filter = filters[match[2]], arg = match[3]
      		sel = match[1]
      		if(arg){
        		var num = Number(arg)
        		if(isNaN(num)) arg = arg.replace(/^["']|["']$/g, '')
        		else arg = num
      		}
    	}
    	return fn(sel, filter, arg)
  	}

  	zepto.qsa = function(node, selector) {
    	return process(selector, function(sel, filter, arg){
      		try{
        		if (!sel && filter) sel = '*'
        		var nodes = oldQsa(node, sel)
      		}catch(e){
        		console.error('error performing selector: %o', selector)
        		throw e
      		}
      		return !filter ? nodes :
        	zepto.uniq($.map(nodes, function(n, i){ return filter.call(n, i, nodes, arg) }))
    	})
 	}

  	zepto.matches = function(node, selector){
    	return process(selector, function(sel, filter, arg){
      		return (!sel || oldMatches(node, sel)) &&
        	(!filter || filter.call(node, null, arg) === node)
    	})
  	}
})(Zepto)