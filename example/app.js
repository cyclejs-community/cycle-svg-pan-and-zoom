import {h} from '@cycle/dom';
import xs from 'xstream';
import SvgPanAndZoom from '../src/svg-pan-and-zoom';

function App ({DOM}) {
  const children$ = xs.periodic(1000).map(i =>
    [
      h('text', {attrs: {x: 100, y: 100, fill: 'black'}}, 'hello world ' + i)
    ]
  );

  const attrs$ = xs.of({width: innerWidth, height: innerHeight});

  const svg$ = SvgPanAndZoom({DOM, children$, attrs$}).DOM;

  return {
    DOM: svg$
  };
}

export default App;
