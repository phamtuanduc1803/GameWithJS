var canvas= document.getElementById('gamezone');
var context= canvas.getContext('2d');
var scoreshow= document.getElementById('score');

var birdimg= new Image();
var background= new Image();
var ongtren= new Image();
var ongduoi= new Image();

birdimg.src="image/bird.png";
background.src="image/nenchinh.png";
ongtren.src="image/ongtren.png";
ongduoi.src="image/ongduoi.png";

var score=0;
var khoangCachHaiOng=140;
var khoangCachDenOngDuoi;

var bird={
    x: background.width/5,
    y: background.height/2
}

var ong=[]
ong[0]={
    x: canvas.width,
    y:0
}

function run(){
    context.drawImage(background,0,0);
    context.drawImage(birdimg,bird.x,bird.y);
    

    for(var i=0;i<ong.length;i++){
        khoangCachDenOngDuoi=ongtren.height+khoangCachHaiOng;
        context.drawImage(ongtren,ong[i].x,ong[i].y);
        context.drawImage(ongduoi,ong[i].x,ong[i].y+khoangCachDenOngDuoi);
        ong[i].x-=5;
        if(ong[i].x==canvas.width/2){
            ong.push({
                x:canvas.width,
                y:Math.floor(Math.random()*ongtren.height)-ongtren.height
            })
        }
        if(ong[i].x==0){
            ong.splice(0,1);
        }
        if(ong[i].x==bird.x) score++;
        if(bird.y+birdimg.height==canvas.height||
            bird.x+birdimg.width >= ong[i].x && bird.x <= ong[i].x+ongtren.width && (bird.y <= ong[i].y + ongtren.height|| bird.y+birdimg.height >= ong[i].y + khoangCachDenOngDuoi)){
                return;
            }
    }
    scoreshow.innerHTML="score: "+score;
    bird.y+=3;
    requestAnimationFrame(run);
}
document.addEventListener("keyup",function(){
    bird.y-=80;
})

run();