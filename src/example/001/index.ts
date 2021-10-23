
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

  // shader
  const vsModule = titan.createShaderModule(vsSource);
  const vsModuleLog = await titan.getShaderInfo(vsModule);
  if (vsModuleLog.messages.length > 0) {
    vsModuleLog.messages.forEach((v) => {
      console.log(v.message);
    });
    return;
  }
  const fsModule = titan.createShaderModule(fsSource);
  const fsModuleLog = await titan.getShaderInfo(fsModule);
  if (fsModuleLog.messages.length > 0) {
    fsModuleLog.messages.forEach((v) => {
      console.log(v.message);
    });
    return;
  }

  // pipeline
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

  const positionBuffer = titan.createVertexBuffer(position);
  const colorBuffer = titan.createVertexBuffer(color);
  const indexBuffer = titan.createIndexBuffer(indices);

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

  const render = () => {
    requestAnimationFrame(render);

    const colorTexture = titan.context.getCurrentTexture();
    const colorTextureView = colorTexture.createView();

    const loadValue = {r: 0.0, g: 0.0, b: 0.0, a: 1.0};
    const colorAttachment = TITAN.Layout.renderPassColorAttachment(colorTextureView, loadValue, 'store');
    const depthStencilAttachment = TITAN.Layout.renderPassDepthStencilAttachment(
      titan.depthTextureView, 1, 'store', false, 'load', 'store', false,
    );
    const renderPassDescriptor = TITAN.Descriptor.renderPassDescriptor([colorAttachment], depthStencilAttachment);

    const commandEncoder = titan.device.createCommandEncoder();
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(renderPipeline);
    passEncoder.setViewport(0, 0, titan.canvas.width, titan.canvas.height, 0, 1);
    passEncoder.setScissorRect(0, 0, titan.canvas.width, titan.canvas.height);

    passEncoder.setVertexBuffer(0, positionBuffer);
    passEncoder.setVertexBuffer(1, colorBuffer);
    passEncoder.setIndexBuffer(indexBuffer, 'uint16');
    passEncoder.drawIndexed(3, 1);
    passEncoder.endPass();

    titan.queue.submit([commandEncoder.finish()]);
  };

  render();
}, false);
