
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

  // buffer
  const positionBufferOption = {
    typedArray: position,
    shaderLocation: 0,
  };
  const positionBuffer = new TITAN.VertexBuffer(positionBufferOption);
  const colorBufferOption = {
    typedArray: color,
    shaderLocation: 1,
  };
  const colorBuffer = new TITAN.VertexBuffer(colorBufferOption);
  const indexBufferOption = {
    typedArray: indices,
  };
  const indexBuffer = new TITAN.IndexBuffer(indexBufferOption);

  // material
  const materialOption = {
    vertexShaderSource: vsSource,
    fragmentShaderSource: fsSource,
  };
  const material = new TITAN.Material(materialOption);

  const render = () => {
    requestAnimationFrame(render);
    titan.render(material, positionBuffer, colorBuffer, indexBuffer);
  };

  render();
}, false);
