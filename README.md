# jQuery BEM

In progress, very basic BEM manipulation in jQuery.

# Usage

**Add Modifier**

```javascript
addModifier(modifier (string), unique (boolean))
```

```html
<div class="block"></div>
```

```javascript
$('.block').addModifier('hello');
/**
<div class="block--hello"></div>
**/
```
