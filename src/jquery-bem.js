(function (root, factory) {
  if(typeof define === "function" && define.amd) {
    // Now we're wrapping the factory and assigning the return
    // value to the root (window) and returning it as well to
    // the AMD loader.
    define(["jQuery"], function(jQuery){
      return (root.jqueryBem = factory(jQuery));
    });
  } else if(typeof module === "object" && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.jqueryBem = factory(require("jQuery")));
  } else {
    root.jqueryBem = factory(root.jQuery);
  }
})(this, function($) {
	var regex = {
		block: function(name) {
			if(!name.length) {
				console.error('No name supplied in regex.block')
			} else {
				return name + '(?!__)';
			}
		},
		element: function(name) {
			if(!name.length) {
				console.error('No name supplied in regex.element')
			} else {
				return '__' + name + '(?!__)';
			}
		},
		modifiers: function() {
			return '--[a-z0-9]*[-_]?[a-z0-9]*';
		}
	}

	$.fn.extend({
		findBlock: function(name) {
			return $('[class^="' + name + '"').filter(function() {
				return this.className.match(new RegExp(regex.block(name), 'g'));
			});
		},
		findElement: function(name) {
			return $(this).find('[class*="' + name + '"]').filter(function() {
				return this.className.match(new RegExp(regex.element(name), 'g'));
			});
		},
		addModifier: function(mod, unique) {
			if(typeof mod === 'undefined') return;

			var $this = $(this);

			if(!$this.hasModifier(mod)) {
				var newClass = $this.attr('class') + '--' + mod;
				$this.attr('class', newClass);

				if(unique) $this.siblings().removeModifier(mod);
			}
		},
		removeModifier: function(mod) {
			var $this = $(this);
			if(!$this.length) return;

			$this.attr('class', $this.attr('class').replace(new RegExp('--' + mod + '$'), ''));
		},
		getModifiers: function() {
			var matches = $(this).attr('class').match(new RegExp(regex.modifiers(), 'gi'));

			matches = matches.map(function(str) { return str.split('').splice(2, str.length).join(''); });

			return matches;
		},
		hasModifier: function(mod) {
			var $this = $(this);
			var currentClass = $this.attr('class');
			if(!currentClass) return false;

			var mod = '--' + mod;

			if(currentClass.substr(currentClass.length - mod.length, currentClass.length) === mod) {
				return true;
			} else {
				return false;
			}
		}
	});
});