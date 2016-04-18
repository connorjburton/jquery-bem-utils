$.fn.extend({
	addModifier: function(mod, unique) {
		if(typeof mod === 'undefined') return;

		var $this = $(this);
		var newClass = $this.attr('class') + '--' + mod;
		if(!$this.hasClass(newClass)) {
			$this.attr('class', newClass);

			if(unique) $this.siblings().removeModifier(mod);
		}
	},
	removeModifier: function(mod) {
		var $this = $(this);

		$this.each(function() {
			$this.attr('class', $this.attr('class').replace(new RegExp('--' + mod + '$'), ''));
		});
	}
});
