import {h} from '@cycle/dom';
import xs from 'xstream';
import svgPanAndZoom from './svg-pan-and-zoom';

function App ({DOM}) {
  const children$ = xs.of(
    [
      h('text', {attrs: {x: 100, y: 100, fill: 'black'}}, 'hello world')
    ]
  );

  const svg$ = svgPanAndZoom({DOM, children$}).DOM;

  return {
    DOM: svg$
  };
}


export default App;
