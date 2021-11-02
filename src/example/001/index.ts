
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

  // material
  const materialOption = {
    vertexShaderSource: vsSource,
    fragmentShaderSource: fsSource,
  };
  const material = new TITAN.Material(materialOption);

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
