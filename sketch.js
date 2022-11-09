let colorPicker;
let colors = [];
let brush = { x:0, y:0, px:0, py:0}
let seed;

function setup() {
	createCanvas(windowWidth, windowHeight);

  colorPicker = createColorPicker('#000000') //stipple
  colorPicker.position(0,0)
  colorPicker2 = createColorPicker('#000000') //stroke
  colorPicker2.position(0,30)
  //colorPicker3 = createColorPicker('#000000') extra

  //noCursor()
	noStroke();	

	seed = random(500);
	colors = [
  color(251,248,204), 
  color(255, 0, 0),
	color(253,228,207), 
  color(255, 135, 0),
	color(255,207,210), 
	color(241,192,232), 
  color(255, 211, 0),
	color(207,186,240),
  color(222, 255, 10),
	color(163,196,243),
  color(161, 255, 10),
  color(144,219,244),
  color(10, 255, 153),
  color(142,236,245),
  color(10, 239, 255),
  color(152,245,225),
  color(20, 125, 245),
  color(185,251,192),
  color(88, 10, 255),
  color(190, 10, 255),
 ]

	let base = floor(random(colors.length));
  background(colors[base]);
	colors.splice(base,1);
}

function draw() {
	
  brush.x+=(mouseX-brush.x)/12;
	brush.y+=(mouseY-brush.y)/12;
	if(mouseIsPressed){
		drizzle();
    
	}
  
	brush.px=brush.x;
 	brush.py=brush.y;

}

function mouseMoved(){
	if(frameCount%7==0){
		splatter(mouseX, mouseY);
		stipple(mouseX, mouseY, colorPicker.color());
	
	}
}

function drizzle(){
	let s = 1+30/dist(brush.px, brush.py, brush.x, brush.y);
	s=min(20,s);
	strokeWeight(s);
	stroke(colorPicker2.color());
	line(brush.px, brush.py, brush.x, brush.y);
	stroke(0);
}

function splatter(bx,by){
	let c = colors[floor(random(colors.length))];
	bx += random(-15,200);
	by += random(-15,200);
	let mx = 50*movedX;
	let my = 50*movedY;
	for(let i=0; i<80; i++){
		seed+=.01;
		let x = bx+mx*(0.5-noise(seed+i));
		let y = by+my*(0.5-noise(seed+2*i));
		let s = 150/dist(bx, by, x, y);
		if(s>20) s=20;
		let a = 255-s*5;
		noStroke();
		c.setAlpha(a);
		fill(c);
		ellipse(x,y,s);
		seed+=.01;
	}
}

function stipple(bx, by, c){
	noStroke();
	fill(c);
	let radius = random(3, 12);
	ellipse(bx+random(-30,30), by+random(30,-30), radius);
	radius = random(3, 12);
	ellipse(bx+random(-30,30), by+random(30,-30), radius);
}