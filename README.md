# What is it?

A small helper library that allows toggling classes of HTML elements without writing much JS code.
For example, to toggle class `block--red` on an element when some button is clicked, you should write the following code:

```html
<div class="block">
  <button data-toggle="block--red" data-toggle-parent=".block">
    Toggle color
  </button>
</div>
```

If you click the button, the closest parent element that matches selector in `data-toggle-parent` attribute will get the class specified in `data-toggle` attribute.
Next time you click the button, `block--red` class will be removed from the element.
To specify element receiving classes, use `data-toggle-target` and `data-toggle-parent` attributes.

# Installation

```
npm i --save @zcomp/toggler
```

# Usage

```javascript
const Toggler = require('zw-toggler');

Toggler.init();
```

## Toggler.init

Call this static member function to initialize Toggler.
All element with appropriate attributes now are going to react on events and toggle classes.

## Toggler.uninit

Call this static member function to stop Toggler.
Now event listeners are removed and togglers will no more toggle classes.

## `data-toggle`

Elements with this attribute will react on click and toggle class specified by this attribute.

## `data-toggle-focus`

Same as `data-toggle`, but toggles classes when elements receives or loses focus instead of click.
Note that it _toggles_ the class, not adds it when the toggler has focus and removes on losing.
E.g., if the target element already has the class, it is going to be removed when toggler gets focus, and vise versa.

## `data-toggle-hover`

Same as `data-toggle-focus`, but with hover instead of focus.

## `data-toggle-target`

Defines selector used to find elements that receive classes.
It will only match children of the element found by `data-toggle-parent` selector (let's call it "target root").
If no `data-toggle-target` attribute exists, the target root itself will receive classes.
But if both `data-toggle-parent` and `data-toggle-target` attributes are missing, the toggler element itself will receive classes.

## `data-toggle-parent`

Defines selector for target root.
Target root should only be a parent of the toggler element.
So, the closest parent element of the toggler is considered to be a target root.
If no `data-toggle-parent` exists, e.g., no target root defined, target root is considered to be a `document` element.

# Examples

Toggle `foo` class on `button`:

```html
<div class="grandparent">
  <div class="parent">
    <button data-toggle="foo">Click me</button>
  </div>
</div>
```

Toggle `foo` class on `.grandparent` element:

```html
<div class="grandparent">
  <div class="parent">
    <button data-toggle="foo" data-toggle-parent=".grandparent">Click me</button>
  </div>
</div>
```

Toggle `foo` class on `.panel` element:

```html
<div class="grandparent">
  <div class="parent">
    <button data-toggle="foo" data-toggle-parent=".grandparent" data-toggle-target=".panel">Click me</button>
  </div>
  <div class="panel"></div>
</div>
```

Toggle `foo` class on `.footer` element:

```html
<div class="grandparent">
  <div class="parent">
    <button data-toggle="foo" data-toggle-target=".footer">Click me</button>
  </div>
  <div class="panel"></div>
</div>
<div class="footer"></div>
```
