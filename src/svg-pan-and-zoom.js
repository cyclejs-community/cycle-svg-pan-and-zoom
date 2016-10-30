import {h} from '@cycle/dom';
import isolate from '@cycle/isolate';
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

function view ([state, children]) {
  const {width, height} = state.attrs;
  const zoomedDimensions = translateZoom(state.zoom, state.pan, width, height);

  return (
    h(
      'svg',
      {
        attrs: {
          ...state.attrs,

          viewBox: [
            zoomedDimensions.x,
            zoomedDimensions.y,
            zoomedDimensions.width,
            zoomedDimensions.height
          ].join(' ')
        }
      },
      children
    )
  );
}

function SvgPanAndZoom ({DOM, children$, attrs$}) {
  const initialState = {
    pan: Vector.zero,
    zoom: 1,

    attrs: {
      width: 640,
      height: 480
    }
  };

  attrs$ = attrs$ || xs.empty();

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

  const applyAttrs$ = attrs$.map(attrs => (state) => ({...state, attrs}));

  const reducer$ = xs.merge(
    zoomOut$,
    zoomIn$,
    pan$.map(panReducer),
    applyAttrs$
  );

  const state$ = reducer$.fold((state, reducer) => reducer(state), initialState);

  return {
    DOM: xs.combine(state$, children$).map(view)
  };
}

export default isolate(SvgPanAndZoom);
