# cycle-svg-pan-and-zoom

> A Google Maps style SVG pan and zoom component for Cycle.js

`cycle-svg-pan-and-zoom` is a component for Cycle.js that allows you to pan by clicking and dragging, and to zoom with the mouse.

Currently `xstream` only, although a pull-request to support other stream libraries is welcome.

## Usage

First we need to import the component:

```js
import SvgPanAndZoom from 'cycle-svg-pan-and-zoom';
```

We also need the `h` hyperscript helper from `@cycle/dom` to make SVG elements.

```js
import {h} from '@cycle/dom';
```

Then, inside of our main, we set up our SVG:

```js
function main ({DOM}) {
  const children$ = xs.of([
    h('text', {attrs: {x: 100, y: 100}}, 'hello world')
  ]);

  const svg = SvgPanAndZoom({DOM, children$});

  return {
    DOM: svg.DOM
  }
}
```

## API

### SvgPanAndZoom({DOM, children$, attrs$})

Returns a sinks object with a DOM stream, where the top level element is the `svg`.

- `DOM` (required) - the `@cycle/dom` source
- `children$` (required) - a stream, where each item is an array of hyperscript SVG elements
- `attrs$` (optional) - a stream of objects that will be used as attrs for the `svg` element. useful for setting width and height

## Install

With [npm](https://npmjs.org/) installed, run

```
$ npm install cycle-svg-pan-and-zoom --save
```

## Contributing

Contributions are extremely welcome. Please feel free to open an issue or pull request, or to ask any questions.

## License

MIT

