import {run} from '@cycle/xstream-run';
import {makeDOMDriver} from '@cycle/dom';
import App from './app';

const drivers = {
  DOM: makeDOMDriver('#app')
};

run(App, drivers);
