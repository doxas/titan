
import vsSource from './main.vert.wgsl';
import fsSource from './main.frag.wgsl';
import { TITAN } from '../../titan';
import { IMaterial } from '../../Common/Material';

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
  const materialOption: IMaterial = {
    vertexShaderSource: vsSource,
    fragmentShaderSource: fsSource,
    primitiveState: {topology: 'triangle-list'},
  };
  const material = new TITAN.Material(materialOption);
  // pipeline
  const pipeline = await titan.createPipeline(material);
  // node
  const node = new TITAN.Node3D(pipeline, geometry);
  // scene
  const scene = new TITAN.Scene();
  scene.add(node);
  // rendering
  const startTime = Date.now();
  const render = () => {
    requestAnimationFrame(render);
    titan.render(scene);
  };
  render();
}, false);
