'use strict';

(function(root, factory) {
  if(typeof define === "function" && define.amd) {
    define(['jquery'], factory);
  } else if(typeof module === 'object' && module.exports) {
    factory(require('jquery'));
  } else {
    factory(root.jQuery);
  }
}(this, function($) {
	class BEM {
		constructor(opts = {}) {
			this.options = Object.assign({
				prefixes: {
					element: '__',
					modifier: '--'
				}
			}, opts);

			this.regex = {
				block: (name) => {
					if(!name.length) {
						console.error('jQuery BEM Utils: No name supplied in BEM.regex.block');
					} else {
						return name + '(?!' + this.options.prefixes.element + ')';
					}
				},
				element: (name) => {
					if(!name.length) {
						console.error('jQuery BEM Utils: No name supplied in BEM.regex.element')
					} else {
						return this.options.prefixes.element + name + '(?!' + this.options.prefixes.element + ')';
					}
				},
				modifiers: () => {
					return this.options.prefixes.modifier + '[a-z0-9]*[-_]?[a-z0-9]*';
				},
				modifier: (mod) => {
					if(!mod.length) {
						console.error('jQuery BEM Utils: No modifier supplied in BEM.regex.modifier');
					} else {
						return this.options.prefixes.modifier + mod + '$';
					}
				}
			}
		}

		findBlock(name) {
			return $('[class^=' + name + '"').filter(() => {
				return this.className.match(RegExp(this.regex.block(name), 'g'));
			});
		}

		findElement(name) {
			return $(this).find('[class*="' + name + '"]').filter(() => {
				return this.className.match(RegExp(this.regex.element(name), 'g'));
			});
		}

		addModifier(mod, unique) {
			const $this = $(this);
			if(typeof mod === 'undefined' || !$this.length) return;

			if(!$this.hasModifier(mod)) {
				const newClass = $this.attr('class') + this.options.prefixes.modifier + mod;
				$this.attr('class', newClass);

				if(unique) $this.siblings().removeModifier(mod);
			}
		}

		removeModifier(mod) {
			const $this = $(this);
			if(!$this.length) return;

			$this.attr('class', $this.attr('class').replace(RegExp(this.regex.modifier(mod)), ''));
		}

		getModifiers() {
			const $this = $(this);
			if(!$this.length) return;

			const matches = $this.attr('class').match(RegExp(this.regex.modifiers(), 'gi'));

			return matches.map((str) => {
				return str.split('').splice(this.options.prefixes.modifier.length, str.length).join('');
			});
		}

		hasModifier(mod) {
			const $this = $(this);
			const currentClass = $this.attr('class');
			if(!$this.length || !currentClass.length) return false;

			mod = this.options.prefixes.modifier + mod;

			return currentClass.substr(currentClass.length - mod.length, currentClass.length) === mod;
		}
	};

	$.fn.extend(new BEM());
}));