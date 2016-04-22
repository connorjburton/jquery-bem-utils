# jQuery BEM

Simple & sweet BEM integration in jQuery.

# Installation

```
npm i --save-dev jquery-bem-utils
```

```javascript
require('jquery-bem-utils');
```

# Usage

You're BEM has to be in the style of `block__element--modifier` for this plugin to work.

**Find Block**

```javascript
findBlock(elementName)
```

```javascript
$('body').findBlock('foo'); // => returns $('.foo--red--padding-large')
```

```html
<body>
	<div class="foo--red--padding-large">
		<div class="foo__bar"></div>
	</div>
</body>
```

**Find Element**

```javascript
findElement(elementName)
```

```javascript
$('body').findBlock('foo').findElement('bar'); // => returns ('.foo__bar')
```

```html
<body>
	<div class="foo--red--padding-large">
		<div class="foo__bar"></div>
	</div>
</body>
```

**Get Modifiers**

```javascript
$('body').findBlock('foo').getModifiers(); // => returns ['red', 'padding-large']
```

```html
<body>
	<div class="foo--red--padding-large">
		<div class="foo__bar"></div>
	</div>
</body>
```

**Has Modifier**

```javascript
hasModifier(modifierName)
```

```javascript
$('body').findBlock('foo').hasModifier('red'); // => returns true
$('body').findBlock('foo').hasModifier('bar'); // => returns false
```

```html
<body>
	<div class="foo--red--padding-large">
		<div class="foo__bar--bar"></div>
		<div class="foo__bar--bar"></div>
		<div class="foo__bar--bar"></div>
	</div>
</body>
```

**Set Modifier**

```javascript
addModifier(modifierName, unique)
```

```javascript
$('body').findBlock('foo').findElement('bar').addModifier('hello'); // => returns (1)
$('body').findBlock('foo').findElement('bar').filter(':nth-child(2)').addModifier('hello', true); // => returns (2)
$('body').findBlock('foo').findElement('bar').filter(':nth-child(3)').addModifier('hello', true); // => returns (3)
```

*(1)*
```html
<body>
	<div class="foo--red--padding-large">
		<div class="foo__bar--bye--hello"></div>
		<div class="foo__bar--bye--hello"></div>
		<div class="foo__bar--bye--hello"></div>
	</div>
</body>
```

*(2)*
```html
<body>
	<div class="foo--red--padding-large">
		<div class="foo__bar--bye"></div>
		<div class="foo__bar--bye--hello"></div>
		<div class="foo__bar--bye"></div>
	</div>
</body>
```

*(3)*
```html
<body>
	<div class="foo--red--padding-large">
		<div class="foo__bar--bye"></div>
		<div class="foo__bar--bye"></div>
		<div class="foo__bar--bye--hello"></div>
	</div>
</body>
```
