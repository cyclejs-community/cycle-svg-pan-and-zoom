import {h} from '@cycle/dom';
import xs from 'xstream';
import Vector from './vector';

function mousePositionFromEvent (event) {
  return Vector({
    x: event.clientX,
    y: event.clientY
  });
}

function panReducer (pan) {
  return function _panReducer (state) {
    const scaledPan = pan.times(state.zoom);

    return {
      ...state,

      pan: state.pan.minus(scaledPan)
    };
  };
}

function translateZoom (zoom, pan, width, height) {
  return {
    x: -(zoom - 1) * width / 2 + pan.x,
    y: -(zoom - 1) * height / 2 + pan.y,
    width: width * zoom,
    height: height * zoom
  };
}

function svgPanAndZoom ({DOM, children$}) {
  function view ([state, children]) {
    const width = innerWidth * 0.99;
    const height = innerHeight * 0.99;
    const zoomedDimensions = translateZoom(state.zoom, state.pan, width, height);

    return (
      h(
        'svg',
        {
          attrs: {
            width,
            height,
            viewBox: `${zoomedDimensions.x} ${zoomedDimensions.y} ${zoomedDimensions.width} ${zoomedDimensions.height}`
          }
        },
        children
      )
    );
  }

  const initialState = {
    pan: Vector.zero,
    zoom: 1
  };

  const mouseWheel$ = DOM
    .select('document')
    .events('mousewheel');

  const zoomOut$ = mouseWheel$
    .filter(ev => ev.wheelDelta < 0)
    .map(ev => (state) => ({
      ...state,
      zoom: state.zoom * 1.02
    }));

  const zoomIn$ = mouseWheel$
    .filter(ev => ev.wheelDelta > 0)
    .map(ev => (state) => ({
      ...state,
      zoom: state.zoom * 0.98
    }));

  const svgMousedown$ = DOM
    .select('svg')
    .events('mousedown');

  const svgMouseup$ = DOM
    .select('document')
    .events('mouseup');

  const mousePosition$ = DOM
    .select('document')
    .events('mousemove')
    .map(mousePositionFromEvent)
    .startWith(Vector.zero);

  const mousePositionChange$ = mousePosition$
    .fold(({lastPosition}, position) => ({
      lastPosition: position,
      delta: position.minus(lastPosition)
    }), {lastPosition: Vector.zero})
    .drop(1)
    .map(({delta}) => delta);

  const panning$ = xs.merge(
    svgMousedown$.mapTo(true),
    svgMouseup$.mapTo(false)
  ).startWith(false);

  const pan$ = panning$
    .map(panning => mousePositionChange$.filter(() => panning))
    .flatten();

  const reducer$ = xs.merge(
    zoomOut$,
    zoomIn$,
    pan$.map(panReducer)
  );

  const state$ = reducer$.fold((state, reducer) => reducer(state), initialState);

  return {
    DOM: xs.combine(state$, children$).map(view)
  };
}

export default svgPanAndZoom;
