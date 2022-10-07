status = "";
objects = [];

function preload(){
    img = loadImage("library.jpg");
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
        fill("red");
        percent = floor(objects[0].confidence*100);
        text(objects[0].label + " " + percent + "%", objects[0].x - 1230, objects[0].y - 500);
        noFill();
        stroke("red");
        rect(objects[0].x - 1235, objects[0].y - 515, objects[0].width + 80, objects[0].height - 150);
        document.getElementById("status").innerHTML = "Objects Detected";
        document.getElementById("num_of_obj_detected").innerHTML = "There are 2 big objects in this image and both were detected.";

        percent = floor(objects[1].confidence*100);
        text(objects[1].label + "s " + percent + "%", objects[1].x - 165, objects[1].y - 240);
        noFill();
        stroke("red");
        rect(objects[1].x - 170, objects[1].y - 255, objects[1].width - 700, objects[1].height - 150);
        document.getElementById("status").innerHTML = "Objects Detected";
        document.getElementById("num_of_obj_detected").innerHTML = "There are 2 big objects in this image and both were detected.";
    }
}