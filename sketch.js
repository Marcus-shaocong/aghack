function setup() {
  // put setup code here
  createCanvas(800, 300);

  let table = createSprite(90, height/2, 100, 100);
  let bins = new Group();
  for (let i = 0; i < 4; i++) {
    let bin = createSprite(300 + i * 120, 200, 100, 100);
    bins.add(bin);
  }

  let piece = createSprite(90, height/2, 50, 50);

}

function draw() {
  // put drawing code here
  background(255, 255, 255);

  drawSprites();
}