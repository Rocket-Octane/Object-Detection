status = "";
objects = [];

function preload(){
    img = loadImage("tv-console.jpg");
}

function setup(){
    canvas = createCanvas(750, 450);
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
    image(img, 0, 0, 750, 450);

    if(status != ""){
        fill("red");
        percent = floor(objects[0].confidence*100);
        text(objects[0].label + " " + percent + "%", objects[0].x - 345, objects[0].y - 15);
        noFill();
        stroke("red");
        rect(objects[0].x - 350, objects[0].y - 30, objects[0].width - 200, objects[0].height - 125);
        document.getElementById("status").innerHTML = "Objects Detected";
        document.getElementById("num_of_obj_detected").innerHTML = "There are 2 big objects in this image and only 2 was detected.";
        fill("red");
        percent = floor(objects[1].confidence*100);
        text(objects[1].label + " " + percent + "%", objects[1].x, objects[1].y - 185);
        noFill();
        stroke("red");
        rect(objects[1].x - 5, objects[1].y - 200, objects[1].width - 150, objects[1].height - 138);
        document.getElementById("status").innerHTML = "Objects Detected";
        document.getElementById("num_of_obj_detected").innerHTML = "There are 3 big objects in this image and only 2 was detected.";
    }
}