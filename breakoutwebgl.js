let app = new PIXI.Application({width: 256, height: 256});
document.body.appendChild(app.view);
app.renderer.backgroundColor = 0x061639;

//PIXI.loader.crossOrigin = true;
PIXI.loader.add("images/cat.png").on("progress", loadProgressHandler).load(setup);

function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url); 

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%"); 

  //If you gave your files names as the first argument 
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
}

function setup() {
  //let cat = new PIXI.Sprite(PIXI.loader.resources["images/cat.png"].texture);
  let cat = new PIXI.Sprite(PIXI.Texture.from("images/cat.png"));
  app.stage.addChild(cat);
}