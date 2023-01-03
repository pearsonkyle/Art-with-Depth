let uniformsShader;
let colorImg;
let depthImg;
let touchIcon;
let xt, yt; // starting touch positions
let aspect; 
let windowSize; 
let directions;

let theta;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function preload(){
  uniformsShader = loadShader('static/mesh.vert', 'static/mesh.frag');

  // Get a random number 
  rand = getRandomInt(1,6);
  
  // Load the images
  touchIcon = loadImage("static/images/touch_icon.png");
  colorImg = loadImage("static/images/image_"+rand+".png");
  depthImg = loadImage("static/images/image_"+rand+"_depth.png");
  theta = 0;
}
function newpage() {
  window.location = "./";
}
function setup() {
  windowSize = Math.min(windowHeight, windowWidth);

  createCanvas(windowWidth, windowHeight, WEBGL);
  aspect = colorImg['height'] / colorImg['width'];

  button = createButton('New');
  button.position(windowWidth * 0.45, windowHeight * 0.9);
  button.mousePressed(newpage);
  button.style('padding', Math.round(windowSize * 0.01).toString() + 'px ' + Math.round(windowSize * 0.02).toString() + 'px');
  button.style('font-size', Math.round(windowSize*0.05).toString()+'px');
  button.style('border-radius','25%');
  button.style('opacity','75%');

  
  direction = createButton('Touch to Move');
  direction.position(windowWidth * 0.45, windowSize * 0.75);
  direction.style('padding', Math.round(windowSize * 0.01).toString() + 'px ' + Math.round(windowSize * 0.02).toString() + 'px');
  direction.style('font-size', Math.round(windowSize * 0.05).toString() + 'px');
  direction.style('border-radius', '25%');
  direction.style('opacity', '75%');
  

  if (windowWidth * aspect > windowHeight) {
    aspect = colorImg['width'] / colorImg['height'];
    resizeCanvas(windowHeight * aspect, windowHeight);
  }
  else {
    aspect = colorImg['height'] / colorImg['width'];
    resizeCanvas(windowWidth, windowWidth * aspect);
  }
}

function touchStarted() {
  xt = mouseX;
  yt = mouseY;
}

function draw() {
  clear();
  // shader() sets the active shader with our shader
  shader(uniformsShader);
  uniformsShader.setUniform('colorTex', colorImg);
  uniformsShader.setUniform('depthTex', depthImg);

  if (mouseIsPressed) {
    uniformsShader.setUniform('depthScale', 0.5*(yt - mouseY) / windowHeight);
    uniformsShader.setUniform('angle', (xt - mouseX) / windowWidth);
    try{
      direction.remove();
    }
    finally{

    }
  }
  else {
    // use sin to make the depth scale oscillate
    uniformsShader.setUniform('depthScale', sin(millis()*0.001) * 0.1 + 0.05);
    uniformsShader.setUniform('angle', sin(millis()*0.0005)*0.1-0.05);
  }

  rect(0, 0, windowWidth, windowWidth * aspect);
}

function windowResized() {
  if (windowWidth * aspect > windowHeight) {
    resizeCanvas(windowWidth, windowWidth * aspect);
  }
  else {
    aspect = colorImg['width'] / colorImg['height'];
    resizeCanvas(windowHeight * aspect, windowHeight);

  }

  button.position(windowWidth * 0.5 - 16, windowHeight * 0.85);

}