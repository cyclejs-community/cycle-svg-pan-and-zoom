import {h} from '@cycle/dom';
import xs from 'xstream';
import SvgPanAndZoom from '../src/svg-pan-and-zoom';

const cycleLogo = `
<linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="186.7628" y1="637.3832" x2="553.4463" y2="2.2687">
  <stop  offset="0.4147" style="stop-color:#51D3D9"/>
  <stop  offset="1" style="stop-color:#C8FF8C"/>
</linearGradient>
<path fill="url(#SVGID_1_)" d="M639.9,495.8c-0.3,6.5-2.1,12.9-5.4,18.7l-60.6,105c-7.3,12.7-20.8,20.5-35.4,20.5H202.2
  c-14.6,0-28.1-7.8-35.4-20.4L5.5,340.5C1.8,334.1,0,327.1,0,320c0-7.1,1.4-14.5,5.7-21.7L166.9,20.4C174.2,7.8,187.7,0,202.2,0
  h336.3c14.6,0,28.1,7.8,35.4,20.4c0,0,58.3,95.5,62.5,102.3s3.5,15.4,3.5,22.4c0,6-1.7,14.2-3.3,20.7
  c-1.6,6.5-50.4,204.3-50.4,204.3L479.7,143.6H261.4L159.2,320l102.2,176.4h218.2L639.9,495.8z"/>
<linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="534.3859" y1="527.9686" x2="631.4118" y2="359.9149">
  <stop  offset="0.4147" style="stop-color:#51D3D9"/>
  <stop  offset="1" style="stop-color:#5A919B"/>
</linearGradient>
<path fill="url(#SVGID_2_)" d="M562.1,319.9l74,156.9c5.7,12.1,5.1,26.2-1.6,37.8l-154.8-18.1L562.1,319.9z"/>
`;

function App ({DOM}) {
  const children$ = xs.periodic(3000).map(i =>
    [
      h('g', {props: {innerHTML: cycleLogo}}),
      h('text', {attrs: {x: 320, y: 320, fill: 'black'}}, 'hello world ' + i)
    ]
  );

  const attrs$ = xs.of({
    width: innerWidth,
    height: innerHeight
  });

  const svg$ = SvgPanAndZoom({DOM, children$, attrs$}).DOM;

  return {
    DOM: svg$
  };
}

export default App;
