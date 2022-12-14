status = "";
objects = [];

function preload(){
    img = loadImage("bedroom.avif");
}

function setup(){
    canvas = createCanvas(425, 425);
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
    image(img, 0, 0, 425, 425);

    if(status != ""){
        for(i = 0; i < objects.length; i++){
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x - 70, objects[i].y - 585);
            noFill();
            stroke("red");
            rect(objects[i].x -75, objects[i].y - 600, objects[i].width - 825, objects[i].height - 300);
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("num_of_obj_detected").innerHTML = "There are 2 big objects in this image and only 1 was detected.";
        }
    }
}