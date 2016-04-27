'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (root, factory) {
	if (typeof define === "function" && define.amd) {
		define(['jquery'], factory);
	} else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
		factory(require('jquery'));
	} else {
		factory(root.jQuery);
	}
})(undefined, function ($) {
	var BEM = function () {
		function BEM() {
			var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			_classCallCheck(this, BEM);

			this.options = Object.assign({
				prefixes: {
					element: '__',
					modifier: '--'
				}
			}, opts);

			console.log(Reflect.construct(this));

			this.regex = {};
		}

		_createClass(BEM, [{
			key: '_regexBlock',
			value: function _regexBlock() {}
		}]);

		return BEM;
	}();

	;

	var regex = {
		block: function block(name) {
			if (!name.length) {
				console.error('No name supplied in regex.block');
			} else {
				return name + '(?!' + this.options.prefixes.element + ')';
			}
		},
		element: function element(name) {
			if (!name.length) {
				console.error('No name supplied in regex.element');
			} else {
				return '__' + name + '(?!__)';
			}
		},
		modifiers: function modifiers() {
			return '--[a-z0-9]*[-_]?[a-z0-9]*';
		}
	};

	$.fn.extend({
		findBlock: function findBlock(name) {
			return $('[class^="' + name + '"').filter(function () {
				return this.className.match(new RegExp(regex.block(name), 'g'));
			});
		},
		findElement: function findElement(name) {
			return $(this).find('[class*="' + name + '"]').filter(function () {
				return this.className.match(new RegExp(regex.element(name), 'g'));
			});
		},
		addModifier: function addModifier(mod, unique) {
			if (typeof mod === 'undefined') return;

			var $this = $(this);

			if (!$this.hasModifier(mod)) {
				var newClass = $this.attr('class') + '--' + mod;
				$this.attr('class', newClass);

				if (unique) $this.siblings().removeModifier(mod);
			}
		},
		removeModifier: function removeModifier(mod) {
			var $this = $(this);
			if (!$this.length) return;

			$this.attr('class', $this.attr('class').replace(new RegExp('--' + mod + '$'), ''));
		},
		getModifiers: function getModifiers() {
			var matches = $(this).attr('class').match(new RegExp(regex.modifiers(), 'gi'));

			matches = matches.map(function (str) {
				return str.split('').splice(2, str.length).join('');
			});

			return matches;
		},
		hasModifier: function hasModifier(mod) {
			var $this = $(this);
			var currentClass = $this.attr('class');
			if (!currentClass) return false;

			var mod = '--' + mod;

			if (currentClass.substr(currentClass.length - mod.length, currentClass.length) === mod) {
				return true;
			} else {
				return false;
			}
		}
	});
});