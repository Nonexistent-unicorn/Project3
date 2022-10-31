/*Pollock Splatter Zen by kwertyops
    Basic code for paint splatters
-this is my main terminal, I am experimenting in another terminal and adding what works here

To Do:
  more control for colors
  Click funtion for brush strokes (only paint when clicked)
  */
let colorPicker;
let colors = [];
let brush = { x:0, y:0, px:0, py:0}
let seed;

function setup() {
	createCanvas(windowWidth, windowHeight);
  colorPicker = createColorPicker('#000000')
  colorPicker2 = createColorPicker('#000000')
  colorPicker3 = createColorPicker('#000000')
  colorPicker4 = createColorPicker('#000000')
  colorPicker5 = createColorPicker('#000000')
  noCursor()
	noStroke();
	seed = random(1000);
	colors = [
  color(251,248,204), 
	color(253,228,207), 
	color(255,207,210), 
	color(241,192,232), 
	color(207,186,240), 
	color(163,196,243), 
  color(144,219,244),
  color(142,236,245),
  color(152,245,225),
  color(185,251,192),
 ]
	let base = floor(random(colors.length));
	background(colors[base]);
	colors.splice(base,1);
}

function draw() {
  
	brush.x+=(mouseX-brush.x)/12;
	brush.y+=(mouseY-brush.y)/12;
	if(frameCount>40){
		drizzle();
	}
	brush.px=brush.x;
 	brush.py=brush.y;
}

function mouseMoved(){
	if(frameCount%7==0){
		splatter(mouseX, mouseY);
		//splatter(width-mouseY, height-mouseX);
		stipple(mouseX, mouseY, colorPicker.color());
		//stipple(width-mouseX, height-mouseY, 255);
	}
}

function drizzle(){
	let s = 1+30/dist(brush.px, brush.py, brush.x, brush.y);
	s=min(20,s);
	strokeWeight(s);
	stroke(colorPicker2.color());
	line(brush.px, brush.py, brush.x, brush.y);
	stroke(colorPicker3.color());
	//line(width-brush.px, height-brush.py, width-brush.x, height-brush.y);
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

function keyPressed(){
	if(keyCode==32){
		background(180);
	}
}