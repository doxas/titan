struct VSOut {
  [[builtin(position)]] Position: vec4<f32>;
  [[location(0)]] color: vec4<f32>;
};

[[block]] struct UBO {
  globalColor: vec4<f32>;
};
[[binding(0), group(0)]] var<uniform> uniforms: UBO;

[[stage(vertex)]]
fn main([[location(0)]] inPos: vec3<f32>,
        [[location(1)]] inColor: vec4<f32>) -> VSOut {
  var vsOut: VSOut;
  vsOut.Position = vec4<f32>(inPos, 1.0);
  vsOut.color = inColor * uniforms.globalColor;
  return vsOut;
}
