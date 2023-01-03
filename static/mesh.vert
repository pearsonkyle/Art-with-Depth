// our vertex data
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// we need our texcoords again
varying vec2 vTexCoord;

// inputs from the fragment shader
uniform sampler2D depthTex;
uniform float depthScale;
uniform float angle; 

// variables
vec4 depth, positionVec4;
mat4 projection, rotation;

void main() {
  vTexCoord = aTexCoord; // uv

  // sample depth map
  depth = texture2D(depthTex, vec2(-1.0,1.0)*(vec2(0.0,1.0)-vTexCoord) );

  // copy the position data into a vec4, using 1.0 as the w component
  positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  positionVec4.z = 4.0*depth.z*depthScale;

  // create interpolation between orthograthic and perspective 
  projection[0] = vec4(1.0, 0.0, 0.0, 0.0);
  projection[1] = vec4(0.0, 1.0, 0.0, 0.0);
  projection[2] = vec4(0.0, 0.0, 1.0, 1.0*depthScale);
  projection[3] = vec4(0.0, 0.0, -1.0*depthScale, 1.0-depthScale);
  // change to 1.0 and make depth scale go between 0-0.5?

  // rotate the mesh
  rotation[0] = vec4( cos(angle),		0,		sin(angle),	0);
  rotation[1] = vec4(0,		1.0,			 0,	0);
  rotation[2] = vec4(-sin(angle),	0,		cos(angle),	0);
  rotation[3] = vec4(0, 		0,				0,	1);

  gl_Position = projection * rotation * positionVec4;
}