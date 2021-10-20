
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
  const titan = new TITAN.Core();
  const ready = await titan.initialize(canvas);

  if(!ready) {
    console.log('oops!');
    return;
  }

  const positionBuffer = titan.buffer.create(new Float32Array(position), GPUBufferUsage.VERTEX);
  const colorBuffer = titan.buffer.create(new Float32Array(color), GPUBufferUsage.VERTEX);
  const indexBuffer = titan.buffer.create(new Uint16Array(indices), GPUBufferUsage.INDEX);

  const vsModule = titan.shaderModule.create(vsSource);
  const fsModule = titan.shaderModule.create(fsSource);

  const positionAttribute = TITAN.Layout.vertexAttribute('float32x3', 0);
  const colorAttribute = TITAN.Layout.vertexAttribute('float32x3', 1);
  const positionBufferLayout = TITAN.Layout.vertexBufferLayout(
    4 * 3, // float x 3
    [positionAttribute],
    'vertex',
  );
  const colorBufferLayout = TITAN.Layout.vertexBufferLayout(
    4 * 3, // float x 3
    [colorAttribute],
    'vertex',
  );
  const vertexShader = TITAN.State.vertexState(vsModule, 'main', [positionBufferLayout, colorBufferLayout]);
  const colorState = TITAN.State.colorTargetState('bgra8unorm');
  const fragmentShader = TITAN.State.fragmentState(fsModule, 'main', [colorState]);

  const depthStencilState = TITAN.State.depthStencilState('depth24plus-stencil8', true, 'less');
  const pipelineLayout = titan.createPipelineLayout(TITAN.Descriptor.pipelineLayoutDescriptor([]));
  const primitiveState = TITAN.State.primitiveState('triangle-list');
  const multisampleState = TITAN.State.multisampleState();

  const renderPipelineDescriptor = TITAN.Descriptor.renderPipelineDescriptor(
    vertexShader,
    fragmentShader,
    depthStencilState,
    primitiveState,
    multisampleState,
  );
  const renderPipeline = titan.createRenderPipeline(renderPipelineDescriptor);
}, false);
