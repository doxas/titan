
import vsSource from './main.vert.wgsl';
import fsSource from './main.frag.wgsl';
import { TITAN } from '../../titan';

const position = [
   0.0,  0.5,  0.0,
   0.5, -0.5,  0.0,
  -0.5, -0.5,  0.0,
];
const color = [
  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
];
const indices = [0, 1, 2];

window.addEventListener('DOMContentLoaded', async () => {
  const canvas = document.querySelector<HTMLCanvasElement>('#webgpu');
  const devicePixelRatio = window.devicePixelRatio;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const titan = new TITAN.Core();
  const ready = await titan.initialize({
    canvas,
    devicePixelRatio,
    width,
    height,
  });

  if (!ready) {
    console.log('oops!');
    return;
  }

  const geometryOption = {
    vertexBufferSource: [position, color],
    indexBufferSource: indices,
  };
  const geometry = new TITAN.Geometry(geometryOption);

  // material
  const materialOption = {
    vertexShaderSource: vsSource,
    fragmentShaderSource: fsSource,
  };
  const material = new TITAN.Material(materialOption);
  const pipeline = await titan.createPipeline(material);

  const render = () => {
    requestAnimationFrame(render);
    // temporary arguments...
    titan.render(pipeline, geometry);
  };

  render();
}, false);
