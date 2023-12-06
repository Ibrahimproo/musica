cancion = "";

function preload(){
    cancion = loadSound("Queen.mp3");
}

scoreDerecha = 0;
scoreIzquierda = 0;

derechaX = 0;
derechaY = 0;

izquierdaX = 0;
izquierdaY = 0;

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose, gotPoses');
}

function reproducir(){
    cancion.play();
    cancion.setVolume(1);
    cancion.rate(1);
}

function modelLoaded(){
    console.log('PoseNete esta inicializado.');
}

function gotPoses(){
    if(results.length > 0){
        scoreDerecha = results[0].pose.keypoints[10].score;
        scoreIzquierda = results[0].pose.keypoints[9].score;

        derechaX = results[0].pose.rightWrist.x;
        derechaY = results[0].pose.rightWrist.y;

        console.log8("scoreDerecha =" +scoreDerecha);

        izquierdaX = results[0].pose.leftWrist.x;
        izquierdaY = results[0].pose.leftWrist.y;
        console.log("derechaX =" +derechaX);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");

    if(scoreDerecha > 0.2){
        circle(derechaX, derechaY, 20);
    }
    if(derechaY > 0 && derechaY <=100){
        document.getElementById("velocidad").innerHTML = "Velocidad = 0.5x";
        cancion.rate(0.5);
    } else if(derechaY > 100 && derechaY <=200){
        document.getElementById("velocidad").innerHTML = "Velocidad = 1x";
        cancion.rate(1);
    } else if(derechaY > 200 && derechaY <=300){
        document.getElementById("velocidad").innerHTML = "Velocidad = 1.5x";
        cancion.rate(1.5);}
        else if(derechaY > 300 && derechaY <=300){
            document.getElementById("velocidad").innerHTML = "Velocidad = 2x";
            cancion.rate(2);
        }
        else if(derechaY > 400){
            document.getElementById("velocidad").innerHTML = "Velocidad = 2.5x";
            cancion.rate(2.5);
        }
    }
