status = "";
objects = [];

function preload(){
    img = loadImage("garage.jpg");
}

function setup(){
    canvas = createCanvas(775, 400);
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
    image(img, 0, 0, 775, 400);

    if(status != ""){
        for(i = 0; i < objects.length; i++){
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x - 445, objects[i].y - 185);
            noFill();
            stroke("red");
            rect(objects[i].x - 450, objects[i].y - 200, objects[i].width - 300, objects[i].height - 150);
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("num_of_obj_detected").innerHTML = "There are 3 main objects in this image and 1 was detected.";
        }
    }
}