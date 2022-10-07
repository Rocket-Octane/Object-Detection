status = "";
objects = [];

function preload(){
    img = loadImage("gaming setup.jpg");
}

function setup(){
    canvas = createCanvas(500, 400);
    //canvas.position(300, 200);
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
    image(img, 0, 0, 500, 400);

    if(status != ""){
        fill("red");
        percent = floor(objects[1].confidence*100);
        text(objects[1].label + " " + percent + "%", objects[1].x - 145, objects[1].y - 200);
        noFill();
        stroke("red");
        rect(objects[1].x - 150, objects[1].y - 215, objects[1].width - 50, objects[1].height - 100);

        fill("red");
        percent = floor(objects[0].confidence*100);
        text(objects[0].label + " " + percent + "%", objects[0].x -270, objects[0].y - 85);
        noFill();
        stroke("red");
        rect(objects[0].x - 275, objects[0].y - 100, objects[0].width - 185, objects[0].height - 150);
        document.getElementById("status").innerHTML = "Objects Detected";
        document.getElementById("num_of_obj_detected").innerHTML = "There are 2 main objects in this image and both were detected.";
    }
}
//95
//385
//100
//400