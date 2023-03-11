// Initialize WebGL context
var cube_canvas = document.getElementById("cube");
var gl = cube_canvas.getContext("webgl");

// Define vertex and color data for cube
var vertices = [
  // Front face
  -1.0, -1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, 1.0, 1.0,
  -1.0, 1.0, 1.0,

  // Back face
  -1.0, -1.0, -1.0,
  -1.0, 1.0, -1.0,
  1.0, 1.0, -1.0,
  1.0, -1.0, -1.0,

  // Top face
  -1.0, 1.0, -1.0,
  -1.0, 1.0, 1.0,
  1.0, 1.0, 1.0,
  1.0, 1.0, -1.0,

  // Bottom face
  -1.0, -1.0, -1.0,
  1.0, -1.0, -1.0,
  1.0, -1.0, 1.0,
  -1.0, -1.0, 1.0,

  // Right face
  1.0, -1.0, -1.0,
  1.0, 1.0, -1.0,
  1.0, 1.0, 1.0,
  1.0, -1.0, 1.0,

  // Left face
  -1.0, -1.0, -1.0,
  -1.0, -1.0, 1.0,
  -1.0, 1.0, 1.0,
  -1.0, 1.0, -1.0,
];

var colors = [
  // Front face
  1.0, 0.0, 0.0, 1.0,
  0.0, 1.0, 0.0, 1.0,
  0.0, 0.0, 1.0, 1.0,
  1.0, 1.0, 1.0, 1.0,

  // Back face
  1.0, 1.0, 0.0, 1.0,
  1.0, 0.0, 1.0, 1.0,
  0.0, 1.0, 1.0, 1.0,
  0.0, 0.0, 0.0, 1.0,

   // Top face
   0.0, 1.0, 0.0, 1.0,
   0.0, 1.0, 1.0, 1.0,
   1.0, 1.0, 1.0, 1.0,
   1.0, 1.0, 0.0, 1.0,
 
   // Bottom face
   1.0, 0.0, 1.0, 1.0,
   0.0, 1.0, 1.0, 1.0,
   0.0, 1.0, 0.0, 1.0,
   1.0, 0.0, 0.0, 1.0,
 
   // Right face
   1.0, 0.0, 0.0, 1.0,
   1.0, 1.0, 0.0, 1.0,
   1.0, 1.0, 1.0, 1.0,
   1.0, 0.0, 1.0, 1.0,
 
   // Left face
   0.0, 0.0, 1.0, 1.0,
   1.0, 0.0, 1.0, 1.0,
   1.0, 1.0, 1.0, 1.0,
   0.0, 1.0, 1.0, 1.0,
 ];
 
 // Define indices for cube triangles
 var indices = [
   0, 1, 2, 0, 2, 3,    // Front face
   4, 5, 6, 4, 6, 7,    // Back face
   8, 9, 10, 8, 10, 11,  // Top face
   12, 13, 14, 12, 14, 15, // Bottom face
   16, 17, 18, 16, 18, 19, // Right face
   20, 21, 22, 20, 22, 23  // Left face
 ];
 
 // Create buffer objects for vertices and colors
 var vertex_buffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
 
 var color_buffer = gl.createBuffer();
 gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
 gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
 
 // Create element buffer object for indices
 var index_buffer = gl.createBuffer();
 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);
 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
 
 // Set up vertex and color attribute pointers
 var vertex_position_attribute = gl.getAttribLocation(program, "vertex_position");
 gl.enableVertexAttribArray(vertex_position_attribute);
 gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
 gl.vertexAttribPointer(vertex_position_attribute, 3, gl.FLOAT, false, 0, 0);
 
 var vertex_color_attribute = gl.getAttribLocation(program, "vertex_color");
 gl.enableVertexAttribArray(vertex_color_attribute);
 gl.bindBuffer(gl.ARRAY_BUFFER, color_buffer);
 gl.vertexAttribPointer(vertex_color_attribute, 4, gl.FLOAT, false, 0, 0);
 
// Set up perspective projection
var aspect_ratio = gl.canvas.clientWidth / gl.canvas.clientHeight;
var projection_matrix = mat4.create();
mat4.perspective(projection_matrix, Math.PI / 4, aspect_ratio, 0.1, 100.0);

// Set up initial position and rotation of cube
var model_matrix = mat4.create();
mat4.translate(model_matrix, model_matrix, [0.0, 0.0, -7.0]);
var rotation_angle = 0.0;

// Define function to draw and animate cube
function draw_cube() {
  // Update rotation angle and model matrix
  rotation_angle += 0.01;
  mat4.rotate(model_matrix, model_matrix, rotation_angle, [1.0, 1.0, 1.0]);

  // Set up model-view-projection matrix
  var mvp_matrix = mat4.create();
  mat4.multiply(mvp_matrix, projection_matrix, model_matrix);

  // Set up uniforms
  var mvp_uniform = gl.getUniformLocation(program, "mvp_matrix");
  gl.uniformMatrix4fv(mvp_uniform, false, mvp_matrix);

  // Draw cube
  gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);

  // Request animation frame for next draw
  requestAnimationFrame(draw_cube);
}

// Start drawing and animating the cube
draw_cube();

