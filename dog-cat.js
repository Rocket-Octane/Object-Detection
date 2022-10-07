status = "";
objects = [];

function preload(){
    img = loadImage("dog-cat.png");
}

function setup(){
    canvas = createCanvas(650, 430);
    canvas.position(300, 200);
    canvas.center();

    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded(){
    console.log("Model is initialized");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(img, 0, 0, 650, 430);

    if(status != ""){
        for(i = 0; i < objects.length; i++){
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 5, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("num_of_obj_detected").innerHTML = "There are 3 big objects in this image and all 3 were detected.";
        }
    }
}