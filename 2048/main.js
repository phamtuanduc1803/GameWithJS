class game{
    constructor(){
        this.canvas=null;
        this.context=null;
        this.grid=[ [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0],
                    [0,0,0,0]];
        this.init();
        this.draw();
        this.handle();
        this.addNum();
        this.score;
    }

    init(){
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 400;
        this.score=0;
        document.body.appendChild(this.canvas);
    }

    draw(){
        this.context.clearRect(0,0,400,400);
        
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                this.context.beginPath();
                this.context.moveTo(i*100,0);
                this.context.lineTo(i*100,400);
                this.context.moveTo(0,i*100);
                this.context.lineTo(400,i*100);
                this.context.stroke();
            }
        }
        for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
                if(this.grid[i][j]==2){
                    this.context.fillStyle='#FFFFFF';
                    this.context.fillRect(j*100+1,i*100+1,98,98);
                }else if(this.grid[i][j]==4){
                    this.context.fillStyle='#FFFFCC';
                    this.context.fillRect(j*100+1,i*100+1,98,98);
                }else if(this.grid[i][j]==8){
                    this.context.fillStyle='#FFFF99';
                    this.context.fillRect(j*100+1,i*100+1,98,98);
                }else if(this.grid[i][j]==16){
                    this.context.fillStyle='#FFFF66';
                    this.context.fillRect(j*100+1,i*100+1,98,98);
                }else if(this.grid[i][j]==32){
                    this.context.fillStyle='#FFFF33';
                    this.context.fillRect(j*100+1,i*100+1,98,98);
                }else if(this.grid[i][j]==64){
                    this.context.fillStyle='#FFFF00';
                    this.context.fillRect(j*100+1,i*100+1,98,98);
                }else if(this.grid[i][j]==128){
                    this.context.fillStyle='#FF0000';
                    this.context.fillRect(j*100+1,i*100+1,98,98);
                }else if(this.grid[i][j]==256){
                    this.context.fillStyle='#990000';
                    this.context.fillRect(j*100+1,i*100+1,98,98);
                }else if(this.grid[i][j]==512){
                    this.context.fillStyle='#770000';
                    this.context.fillRect(j*100+1,i*100+1,98,98);
                }else if(this.grid[i][j]==1024){
                    this.context.fillStyle='#440000';
                    this.context.fillRect(j*100+1,i*100+1,98,98);
                }else if(this.grid[i][j]==2048){
                    this.context.fillStyle='#220000';
                    this.context.fillRect(j*100+1,i*100+1,98,98);
                }

                if(this.grid[i][j]!=0){
                    this.context.font = '50px time new roman';
                    this.context.fillStyle = 'black';
                    this.context.textAlign = 'center';
                    this.context.fillText(this.grid[i][j],j*100+50,i*100+70)
                }
            }
        }
    }

    addNum(){
        var arr=[];
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(this.grid[i][j]==0){
                    arr.push({x:i,y:j});
                }
            }
        }
        if(arr.length>0){
            var randomXY=arr[Math.random()*arr.length>>0];
            var num = Math.floor(Math.random()*4);
            if(num<3){
                this.grid[randomXY.x][randomXY.y]=2;
            }else{
                this.grid[randomXY.x][randomXY.y]=4;
            }
        }
    }

    slideLeft(row){
        var arr=[]
        for(var i=0;i<4;i++){
            if(row[i]!=0){
                arr.push(row[i]);
            }
        }

        for(var j=arr.length;j<4;j++){
            arr.push(0);
        }

        return arr;
    }

    slideRight(row){
        var arr=[]
        for(var i=0;i<4;i++){
            if(row[i]==0){
                arr.push(row[i]);
            }
        }

        for(var i=0;i<4;i++){
            if(row[i]!=0){
                arr.push(row[i]);
            }
        }

        return arr;
    }

    slideUp(col){
        var arr=[]
        for(var i=0;i<4;i++){
            if(col[i]!=0){
                arr.push(col[i]);
            }
        }

        for(var j=arr.length;j<4;j++){
            arr.push(0);
        }

        return arr;
    }

    slideDown(col){
        var arr=[]
        for(var i=0;i<4;i++){
            if(col[i]==0){
                arr.push(col[i]);
            }
        }

        for(var i=0;i<4;i++){
            if(col[i]!=0){
                arr.push(col[i]);
            }
        }

        return arr;
    }

    handle(){
        document.addEventListener("keydown", (e)=>{
            if(e.which == 37){
                for(var i=0;i<4;i++){
                    this.grid[i]=this.slideLeft(this.grid[i]);
                    for(var j=0;j<3;j++){
                        if(this.grid[i][j]==this.grid[i][j+1]){
                            this.score+=this.grid[i][j];
                            this.grid[i][j]*=2;
                            this.grid[i][j+1]=0
                        }
                    }
                    this.grid[i]=this.slideLeft(this.grid[i]);
                }
                this.addNum();
                this.draw();
            }else if(e.which == 39){
                for(var i=0;i<4;i++){
                    this.grid[i]=this.slideRight(this.grid[i]);
                    for(var j=3;j>0;j--){
                        if(this.grid[i][j]==this.grid[i][j-1]){
                            this.score+=this.grid[i][j];
                            this.grid[i][j]*=2;
                            this.grid[i][j-1]=0
                        }
                    }
                    this.grid[i]=this.slideRight(this.grid[i]);
                }
                this.addNum();
                this.draw();
            }else if(e.which == 38){
                for(var i=0;i<4;i++){
                    var col=[]
                    for(var j=0;j<4;j++){
                        col.push(this.grid[j][i]);
                    }
                    col=this.slideUp(col);
                    for(var j=0;j<3;j++){
                        if(col[j]==col[j+1]){
                            this.score+=col[j];
                            col[j]*=2;
                            col[j+1]=0;
                        }
                    }
                    col=this.slideUp(col);
                    for(var j=0;j<4;j++){
                        this.grid[j][i]=col[j];
                    }
                }
                this.addNum();
                this.draw();
            }else if(e.which ==40){
                for(var i=0;i<4;i++){
                    var col=[]
                    for(var j=0;j<4;j++){
                        col.push(this.grid[j][i]);
                    }
                    col=this.slideDown(col);
                    for(var j=3;j>0;j--){
                        if(col[j]==col[j-1]){
                            this.score+=col[j];
                            col[j]*=2;
                            col[j-1]=0;
                        }
                    }
                    col=this.slideDown(col);
                    for(var j=0;j<4;j++){
                        this.grid[j][i]=col[j];
                    }
                }
                this.addNum();
                this.draw();
            }
        })
    }
}

var g = new game();