import {div} from '@cycle/dom';
import xs from 'xstream';

function App ({DOM}) {
  return {
    DOM: xs.of(
      div('.hello-world', 'Hello world!')
    )
  };
}

export default App;
