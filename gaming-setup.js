status = "";
objects = [];

function preload(){
    img = loadImage("tv-console.jpg");
}

function setup(){
    canvas = createCanvas(450, 500);
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
    image(img, 0, 0, 450, 500);

    if(status != ""){
        for(i = 0; i < objects.length; i++){
            fill("red");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("num_of_obj_detected").innerHTML = "There are 5 objects in this image and only 1 was detected.";
        }
    }
}
//95
//385
//100
//400