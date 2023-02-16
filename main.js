video = "";
status1 = "";
objects = [];
function setup()
{
    canvas = createCanvas(280, 280);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function draw()
{
    image(video, 0, 0, 280, 280);
    if(status1!="")
    {
        objectDetector.detect(video,gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("name_of_objects").innerHTML = "Number of objects detected are :"+ objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+ percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(object[i].label== objectname)
            {
              video.stop();
              objectDetector.detect(gotResult);
              document.getElementById("status").innerHTML = objectname +" found";

            }
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    objectname = document.getElementById("I1").value;
}

function modelLoaded()
{
    console.log("Model Loaded!");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results)
{
if (error)
{
    console.log(error);
}
console.log(results);
objects = results;
}