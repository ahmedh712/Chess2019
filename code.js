//Tile Colors
var tileColorBlack=rgb(60,60,60);
var tileColorWhite=rgb(240,240,240);
var tileColorActive=rgb(255,0,0,.1);
var tileColorMoves=rgb(0,255,0,.4);
var promoCounter=1;
var promo1;
var promo2;
var promo3;
var captureblack=20;
var capturewhite=20;
if (capturewhite==80)
capturewhite=120;
capturewhite=120;
createCanvas("canvas",320,450)
//variables
var activeTile=0;
var Movetiles=0;
var turn="white";
var danger=0;
//grid
    var grid=[8];
    for(var i=1;i<=8;i++){
      grid[i]=[];
      for(var j=1;j<=8;j++){
        grid[i][j]={x:0,y:0,taken:false,value:0}
        grid[i][j].x=(i*40)-40;
        grid[i][j].y=30+(40*j)
      }
    }

function setup(){
  //Background
  image("Wood","assets/Wood-Background-Wallpaper.jpg");
  setPosition("Wood",-32,50,380,360);
  createboard();
  
}


setup();

//Piece Constructors
function Pawn(x,y,color,id){
  grid[x][y].taken=true;
  this.captured=false;
  this.x=x;
  this.y=y;
  this.id=id;
  this.lastRow = 2;
  var clicked=false;
  this.color=color;
  this.imageid=color+"pawn"+x;
  this.icon= function(){
      image(this.imageid,"assets/"+"Pawn "+color+".png");
       setPosition(this.imageid,grid[x][y].x,grid[x][y].y,40,40);
  };
  this.icon();
  this.update= function(){
    grid[x][y].taken=false;
    x=this.x;
    y=this.y
    this.lastRow = y;
     setPosition(this.imageid,grid[x][y].x,grid[x][y].y,40,40);
     grid[x][y].taken=true;
     this.promotion(x,y);
  }
  this.capture= function(){
    this.captured=true;
    this.x=0;
    this.y=450;
    x=this.x;
    y=this.y
     setPosition(this.imageid,this.x,this.y,20,20);
    image(color+"pawn"+id+"c","assets/"+"Pawn "+color+".png")
    var deathX="capture"+color;
    if(color=="black"){
    setPosition(color+"pawn"+id+"c",window["capture"+color],420,20,20);
    }
    else{
    setPosition(color+"pawn"+id+"c",window["capture"+color],15,20,20);
    }
    window["capture"+color]=window["capture"+color]+20;
  }
  this.promotion= function(x,y){
  if(this.y==1 || this.y==8){
     var promoted
    setScreen("screen2")
    onEvent("Bishop","click",function(){
      promoted= "bishop"+id
      window["promo"+promoCounter]=promoted;
      setScreen("screen1")
      console.log(promoted)
window[promoted] = new Bishop(x,y,color,id)
promoCounter=promoCounter+1
    })
    onEvent("Queen","click",function(){
      promoted= "queen"+id
       window["promo"+promoCounter]=promoted;
       setScreen("screen1")
       console.log(promoted)
window[promoted] = new Queen(x,y,color,id)
promoCounter=promoCounter+1
    })
    onEvent("Rook","click",function(){
      promoted= "rook"+id
       window["promo"+promoCounter]=promoted;
       setScreen("screen1")
       console.log(promoted)
window[promoted] = new Rook(x,y,color,id)
promoCounter=promoCounter+1
    })
    onEvent("button5","click",function(){
      promoted= "horsey"+id
       window["promo"+promoCounter]=promoted;
       setScreen("screen1")
       console.log(promoted)
window[promoted] = new Horsey(x,y,color,id)
promoCounter=promoCounter+1
    })
    eval("pawn"+id).capture();
    
  }
}

this.possibleMoves= function(){
  if(this.captured==false){
  if(color=="white"){
    if (y==7){
      grid[x][5].value=grid[x][5].value*17;
    }
    if(y!=1)
    grid[x][y-1].value=grid[x][y-1].value*17;
  }
  if(color=="black"){
    if (y==2){
      grid[x][4].value=grid[x][3].value*19;
    }
    if(y!=8)
    grid[x][y+1].value=grid[x][y+1].value*19;
  }
}
}
  
if(color=="white"){
  
  onEvent(this.imageid,"click",function(){
    if(color==turn){
      if(Movetiles>0){
      clearPossibleMoves(Movetiles-1)
      }
      else{
        activeTile="pawn"+id;
        if (y==7){
            for(var i=-1;i>=-2;i--){
              possibleMoveTile(x,y,0,i)
            }
        }
        else{
          if(x!=8)
          if(grid[x+1][y-1].taken==true){
            possibleMoveTile(x,y,1,-1);
          }
          if(x!=1)
          if(grid[x-1][y-1].taken==true){
            possibleMoveTile(x,y,-1,-1);
          }
          if(grid[x-1][y].taken == true && y == 4 && x!=1){
              possibleMoveTile(x,y,-1,0);
          }
          if(grid[x+1][y].taken == true && y == 4 && x!=8){
            possibleMoveTile(x,y,1,0);
        }
          if(grid[x][y-1].taken==false){
              possibleMoveTile(x,y,0,-1)
          }
        }
      }
    }
    })
}
  if(color=="black"){
  onEvent(this.imageid,"click",function(){
    if(color==turn){
      if(Movetiles>0){
      clearPossibleMoves(Movetiles-1)
      }
      else{
        activeTile="pawn"+id;
        if (y==2){
            for(var i=1;i<=2;i++){
              possibleMoveTile(x,y,0,i)
            }
        }
        else{
          if(x!=8)
          if(grid[x+1][y+1].taken==true){
            possibleMoveTile(x,y,1,1);
          }
          if(x!=1)
          if(grid[x-1][y+1].taken==true){
            possibleMoveTile(x,y,-1,1);
          }
          if(grid[x][y+1].taken==false){
              possibleMoveTile(x,y,0,1)
          }
        }
      }
    }
  })
}
  
}
function Horsey(x,y,color,id){
  grid[x][y].taken=true;
  this.id=id;
  this.captured=false;
  this.x=x;
  this.y=y;
  var clicked=false;
  this.color=color;
  this.imageid=color+"horsey"+x;
  this.icon= function(){
      image(this.imageid,"assets/"+"Horsey "+color+".png");
       setPosition(this.imageid,grid[x][y].x,grid[x][y].y,40,40);
  };
  this.icon();
  this.update= function(){
    grid[x][y].taken=false;
    x=this.x;
    y=this.y
     setPosition(this.imageid,grid[x][y].x,grid[x][y].y,40,40);
     grid[x][y].taken=true;
  }
  this.capture= function(){
    this.captured=true;
    grid[x][y].taken=false;
    this.x=0;
    this.y=450;
    x=this.x;
    y=this.y
     setPosition(this.imageid,this.x,this.y,20,20);
     image(color+"horsey"+id+"c","assets/"+"Horsey "+color+".png")
    var deathX="capture"+color;
    if(color=="black"){
    setPosition(color+"horsey"+id+"c",window["capture"+color],420,20,20);
    }
    else{
    setPosition(color+"horsey"+id+"c",window["capture"+color],15,20,20);
    }
    window["capture"+color]=window["capture"+color]+20;
  }
  
this.possibleMoves= function(){
if(this.captured==false){
  if(color=="black"){
    if((x+1)<=8 && (y+2)<=8){
      if(grid[x+1][y+2].taken==false)
      grid[x+1][y+2].value=grid[x+1][y+2].value*19;
    }
    if((x+2)<=8 && (y+1)<=8){
      if(grid[x+2][y+1].taken==false)
      grid[x+2][y+1].value=grid[x+2][y+1].value*19;
    }
    if((x-1)>=1 && (y+2)<=8){
      if(grid[x-1][y+2].taken==false)
      grid[x-1][y+2].value=grid[x-1][y+2].value*19;
    }
    if((x-2)>=1 && (y+1)<=8){
      if(grid[x-2][y+1].taken==false)
      grid[x-2][y+1].value=grid[x-2][y+1].value*19;
    }
    if((x+2)<=8 && (y-1)>=1){
      if(grid[x+2][y-1].taken==false)
      grid[x+2][y-1].value=grid[x+2][y-1].value*19;
    }
    if((x+1)<=8 && (y-2)>=1){
      if(grid[x+1][y-2].taken==false)
      grid[x+1][y-2].value=grid[x+1][y-2].value*19;
    }
    if((x-1)>=1 && (y-2)>=1){
      if(grid[x-1][y-2].taken==false)
      grid[x-1][y-2].value=grid[x-1][y-2].value*19;
    }
    if((x-2)>=1 && (y-1)>=1){
      if(grid[x-2][y-1].taken==false)
      grid[x-2][y-1].value=grid[x-2][y-1].value*19;
    }
    
    
  }
  if(color=="white"){
    if((x+1)<=8 && (y+2)<=8){
      if(grid[x+1][y+2].taken==false)
      grid[x+1][y+2].value=grid[x+1][y+2].value*17;
    }
    if((x+2)<=8 && (y+1)<=8){
      if(grid[x+2][y+1].taken==false)
      grid[x+2][y+1].value=grid[x+2][y+1].value*17;
    }
    if((x-1)>=1 && (y+2)<=8){
      if(grid[x-1][y+2].taken==false)
      grid[x-1][y+2].value=grid[x-1][y+2].value*17;
    }
    if((x-2)>=1 && (y+1)<=8){
      if(grid[x-2][y+1].taken==false)
      grid[x-2][y+1].value=grid[x-2][y+1].value*17;
    }
    if((x+2)<=8 && (y-1)>=1){
      if(grid[x+2][y-1].taken==false)
      grid[x+2][y-1].value=grid[x+2][y-1].value*17;
    }
    if((x+1)<=8 && (y-2)>=1){
      if(grid[x+1][y-2].taken==false)
      grid[x+1][y-2].value=grid[x+1][y-2].value*17;
    }
    if((x-1)>=1 && (y-2)>=1){
      if(grid[x-1][y-2].taken==false)
      grid[x-1][y-2].value=grid[x-1][y-2].value*17;
    }
    if((x-2)>=1 && (y-1)>=1){
      if(grid[x-2][y-1].taken==false)
      grid[x-2][y-1].value=grid[x-2][y-1].value*17;
    }

  
  }
  }
}
  onEvent(this.imageid,"click",function(){
    if(color==turn){
    if(Movetiles>0){
    
    clearPossibleMoves(Movetiles-1)
    }
    else{
           activeTile="horsey"+id;
           possibleMoveTile(x,y,1,2)
           possibleMoveTile(x,y,-1,2)
           possibleMoveTile(x,y,1,-2)
           possibleMoveTile(x,y,-1,-2)
           possibleMoveTile(x,y,2,1)
           possibleMoveTile(x,y,-2,1)
           possibleMoveTile(x,y,2,-1)
           possibleMoveTile(x,y,-2,-1)

    }
    }
  })
}
function Rook(x,y,color,id){
  this.id=id;
  this.captured=false;
  grid[x][y].taken=true;
  this.x=x;
  this.y=y;
  var clicked=false;
  this.color=color;
  this.imageid=color+"rook"+x;
  this.icon= function(){
      image(this.imageid,"assets/"+"Rook "+color+".png");
       setPosition(this.imageid,grid[x][y].x,grid[x][y].y,40,40);
  };
  this.icon();
  this.update= function(){
    grid[x][y].taken=false;
    x=this.x;
    y=this.y
     setPosition(this.imageid,grid[x][y].x,grid[x][y].y,40,40);
     grid[x][y].taken=true;
  }
  this.capture= function(){
    this.captured=true;
    grid[x][y].taken=false;
    this.x=0;
    this.y=450;
    x=this.x;
    y=this.y
     setPosition(this.imageid,this.x,this.y,20,20);
  image(color+"rook"+id+"c","assets/"+"Rook "+color+".png")
    var deathX="capture"+color;
    if(color=="black"){
    setPosition(color+"rook"+id+"c",deathX,420,20,20);
    }
    else{
    setPosition(color+"rook"+id+"c",deathX,15,20,20);
    }
    window["capture"+color]=window["capture"+color]+20;
  }
  
  this.possibleMoves= function(){
  if(this.captured==false){
          if (color=="white"){
             num=17;
          }
          else ifnum=19;
          var loop=0;
          var loop2=1;
           while (loop==0 && (loop2+x)>0 && (loop2+x)<=8){
             if(grid[x+loop2][y].taken==false){
             grid[x+loop2][y].value=grid[x+loop2][y].value*num;
             }
             if(grid[x+loop2][y].taken==true){
              break;
             }
             
             loop2++
           }
           loop2=-1;
           while (loop==0 && (loop2+x)>0 && (loop2+x)<=8){
             if(grid[x+loop2][y].taken==false){
             grid[x+loop2][y].value=grid[x+loop2][y].value*num;
             }
             if(grid[x+loop2][y].taken==true){
             break;
             }
             loop2--
            
           }
           loop2=1
           while (loop==0 && (loop2+y)>0 && (loop2+y)<=8){
             if(grid[x][y+loop2].taken==false){
             grid[x][y+loop2].value=grid[x][y+loop2].value*num;
             }
             if(grid[x][y+loop2].taken==true){
             break;
             }
             loop2++
            
           }
           loop2=-1;
           while (loop==0 && (loop2+y)>0 && (loop2+y)<=8){
             if(grid[x][y+loop2].taken==false){
             grid[x][y+loop2].value=grid[x][y+loop2].value*num;
             }
             if(grid[x][y+loop2].taken==true){
             break;
             }
            
             loop2--
           }
  
  }
}

  onEvent(this.imageid,"click",function(){
    if(color==turn){
    if(Movetiles>0){
    clearPossibleMoves(Movetiles-1)
    }
    else{
           activeTile="rook"+id;
           var loop=0;
           var loop2=1;
           while (loop==0 && (loop2+x)>0 && (loop2+x)<=8){
             possibleMoveTile(x,y,loop2,0)
             if(grid[x+loop2][y].taken==true){
             break;
             }
             
             loop2++
           }
           loop2=-1;
           while (loop==0 && (loop2+x)>0 && (loop2+x)<=8){
             possibleMoveTile(x,y,loop2,0)
             if(grid[x+loop2][y].taken==true){
               break;
             }
             
             loop2--
            
           }
           loop2=1
           while (loop==0 && (loop2+y)>0 && (loop2+y)<=8){
             possibleMoveTile(x,y,0,loop2)
             if(grid[x][y+loop2].taken==true){
             break;
             }
             
             loop2++
            
           }
           loop2=-1;
           while (loop==0 && (loop2+y)>0 && (loop2+y)<=8){
              possibleMoveTile(x,y,0,loop2)
             if(grid[x][y+loop2].taken==true){
             break;
             }
            
             loop2--
           }
           
    }
    }
  })
}
function Bishop(x,y,color,id){
  grid[x][y].taken=true;
  this.x=x;
  this.captured=false;
  this.id=id;
  this.y=y;
  var clicked=false;
  this.color=color;
  this.imageid=color+"bishop"+x;
  this.icon= function(){
      image(this.imageid,"assets/"+"Bishop "+color+".png");
       setPosition(this.imageid,grid[x][y].x,grid[x][y].y,40,40);
  };
  this.icon();
  this.update= function(){
    grid[x][y].taken=false;
    x=this.x;
    y=this.y
     setPosition(this.imageid,grid[x][y].x,grid[x][y].y,40,40);
     grid[x][y].taken=true;
  }
  this.capture= function(){
    this.captured=true;
    grid[x][y].taken=false;
    this.x=0;
    this.y=450;
    x=this.x;
    y=this.y
     setPosition(this.imageid,this.x,this.y,20,20);
     image(color+"bishop"+id+"c","assets/"+"Bishop "+color+".png")
    var deathX="capture"+color;
    if(color=="black"){
    setPosition(color+"bishop"+id+"c",window["capture"+color],420,20,20);
    }
    else{
    setPosition(color+"pawn"+id+"c",window["capture"+color],15,20,20);
    }
    window["capture"+color]=window["capture"+color]+20;
  bishop
    
  }
  this.possibleMoves= function(){
  if(this.captured==false){
          if (color=="white"){
             num=17;
          }
          else num=19;
          var loop=0;
          
        while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (loop2+y)>0 && (loop2+y)<=8){
             if(grid[x+loop2][y+loop2].taken==true){
               break;
             }grid[x+loop2][y+loop2].value=grid[x+loop2][y+loop2].value*num;
             loop2++
           }
           var loop2=-1;
            while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (loop2+y)>0 && (loop2+y)<=8){
              if(grid[x+loop2][y+loop2].taken==true){
               break;
             }
             grid[x+loop2][y+loop2].value=grid[x+loop2][y+loop2].value*num;
             loop2--
           }
            var loop2=1;
            while (loop==0 && (x-loop2)>0 && (x-loop2)<=8 && (loop2+y)>0 && (loop2+y)<=8){
             if(grid[x-loop2][y+loop2].taken==true){
               break;
             }
             grid[x-loop2][y+loop2].value=grid[x-loop2][y+loop2].value*num;
             loop2++
           }
           var loop2=1;
            while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (y-loop2)>0 && (y-loop2)<=8){
             if(grid[x+loop2][y-loop2].taken==true){
               break;
             }
             grid[x+loop2][y-loop2].value=grid[x+loop2][y-loop2].value*num;
             
             loop2++
           }
           
  }
  }
  onEvent(this.imageid,"click",function(){
    if(color==turn){
    if(Movetiles>0){
    clearPossibleMoves(Movetiles-1)
    }
    else{
           activeTile="bishop"+id;
           var loop=0;
           var loop2=1;
           
           while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (loop2+y)>0 && (loop2+y)<=8){
             possibleMoveTile(x,y,loop2,loop2)
             if(grid[x+loop2][y+loop2].taken==true){
               break;
             }
             loop2++
           }
           var loop2=-1;
            while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (loop2+y)>0 && (loop2+y)<=8){
             possibleMoveTile(x,y,loop2,loop2)
             if(grid[x+loop2][y+loop2].taken==true){
               break;
             }
             loop2--
           }
            var loop2=1;
            while (loop==0 && (x-loop2)>0 && (x-loop2)<=8 && (loop2+y)>0 && (loop2+y)<=8){
             possibleMoveTile(x,y,-loop2,loop2)
             if(grid[x-loop2][y+loop2].taken==true){
               break;
             }
             loop2++
           }
           var loop2=1;
            while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (y-loop2)>0 && (y-loop2)<=8){
             possibleMoveTile(x,y,loop2,-loop2)
             if(grid[x+loop2][y-loop2].taken==true){
               break;
             }
             loop2++
           }
           
           
    }
    }
  })
}
function Queen(x,y,color,id){
  this.id=id;

this.x=x;
this.y=y;
var clicked=false;
this.color=color;
this.imageid=color+"queen"+x;
this.icon= function(){
    image(this.imageid,"assets/"+"Queen "+color+".png");
     setPosition(this.imageid,grid[x][y].x,grid[x][y].y,40,40);
};
this.icon();
grid[x][y].taken=true;
this.update= function(){
  
  grid[x][y].taken=false;
  x=this.x;
  y=this.y
   setPosition(this.imageid,grid[x][y].x,grid[x][y].y,40,40);
   grid[x][y].taken=true;
}
this.capture= function(){
  this.captured=true;
  grid[x][y].taken=false;
  this.x=0;
  this.y=450;
  x=this.x;
  y=this.y
   setPosition(this.imageid,this.x,this.y,20,20);
   image(color+"queen"+id+"c","assets/"+"Queen "+color+".png")
    var deathX="capture"+color;
    if(color=="black"){
    setPosition(color+"queen"+id+"c",window["capture"+color],420,20,20);
    }
    else{
    setPosition(color+"queen"+id+"c",window["capture"+color],15,20,20);
    }
    window["capture"+color]=window["capture"+color]+20;
  
}
 this.possibleMoves= function(){
   if(this.captured==false){
        if (color=="white"){
           num=17;
        }
        else num=19;
        var loop=0;
        var loop2=1;
      while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (loop2+y)>0 && (loop2+y)<=8){
           if(grid[x+loop2][y+loop2].taken==true){
             break;
           }grid[x+loop2][y+loop2].value=grid[x+loop2][y+loop2].value*num;
           loop2++
         }
          loop2=-1;
          while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (loop2+y)>0 && (loop2+y)<=8){
            if(grid[x+loop2][y+loop2].taken==true){
             break;
           }
           grid[x+loop2][y+loop2].value=grid[x+loop2][y+loop2].value*num;
           loop2--
         }
           loop2=1;
          while (loop==0 && (x-loop2)>0 && (x-loop2)<=8 && (loop2+y)>0 && (loop2+y)<=8){
           if(grid[x-loop2][y+loop2].taken==true){
             break;
           }
           grid[x-loop2][y+loop2].value=grid[x-loop2][y+loop2].value*num;
           loop2++
         }
          loop2=1;
          while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (y-loop2)>0 && (y-loop2)<=8){
           if(grid[x+loop2][y-loop2].taken==true){
             break;
           }
           grid[x+loop2][y-loop2].value=grid[x+loop2][y-loop2].value*num;
           
           loop2++
         }
         if (color=="white"){
             num=17;
          }
          else ifnum=19;
          var loop=0;
          var loop2=1;
           while (loop==0 && (loop2+x)>0 && (loop2+x)<=8){
             if(grid[x+loop2][y].taken==false){
             grid[x+loop2][y].value=grid[x+loop2][y].value*num;
             }
             if(grid[x+loop2][y].taken==true){
              break;
             }
             
             loop2++
           }
           loop2=-1;
           while (loop==0 && (loop2+x)>0 && (loop2+x)<=8){
             if(grid[x+loop2][y].taken==false){
             grid[x+loop2][y].value=grid[x+loop2][y].value*num;
             }
             if(grid[x+loop2][y].taken==true){
             break;
             }
             loop2--
            
           }
           loop2=1
           while (loop==0 && (loop2+y)>0 && (loop2+y)<=8){
             if(grid[x][y+loop2].taken==false){
             grid[x][y+loop2].value=grid[x][y+loop2].value*num;
             }
             if(grid[x][y+loop2].taken==true){
             break;
             }
             loop2++
            
           }
           loop2=-1;
           while (loop==0 && (loop2+y)>0 && (loop2+y)<=8){
             if(grid[x][y+loop2].taken==false){
             grid[x][y+loop2].value=grid[x][y+loop2].value*num;
             }
             if(grid[x][y+loop2].taken==true){
             break;
             }
            
             loop2--
           }
  
  
   }
}
onEvent(this.imageid,"click",function(){
  if(color==turn){
  if(Movetiles>0){
  clearPossibleMoves(Movetiles-1)
  }
  else{
         activeTile="queen"+id;
         var loop=0;
         var loop2=1;
         
         while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (loop2+y)>0 && (loop2+y)<=8){
           possibleMoveTile(x,y,loop2,loop2)
           if(grid[x+loop2][y+loop2].taken==true){
             break;
           }
           loop2++
         }
         var loop2=-1;
          while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (loop2+y)>0 && (loop2+y)<=8){
           possibleMoveTile(x,y,loop2,loop2)
           if(grid[x+loop2][y+loop2].taken==true){
             break;
           }
           loop2--
         }
          var loop2=1;
          while (loop==0 && (x-loop2)>0 && (x-loop2)<=8 && (loop2+y)>0 && (loop2+y)<=8){
           possibleMoveTile(x,y,-loop2,loop2)
           if(grid[x-loop2][y+loop2].taken==true){
             break;
           }
           loop2++
         }
         var loop2=1;
          while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (y-loop2)>0 && (y-loop2)<=8){
           possibleMoveTile(x,y,loop2,-loop2)
           if(grid[x+loop2][y-loop2].taken==true){
             break;
           }
           loop2++
         }
         loop2=1;
         while (loop==0 && (loop2+x)>0 && (loop2+x)<=8){
             possibleMoveTile(x,y,loop2,0)
             if(grid[x+loop2][y].taken==true){
             break;
             }
             
             loop2++
           }
           loop2=-1;
           while (loop==0 && (loop2+x)>0 && (loop2+x)<=8){
             possibleMoveTile(x,y,loop2,0)
             if(grid[x+loop2][y].taken==true){
               break;
             }
             
             loop2--
            
           }
           loop2=1
           while (loop==0 && (loop2+y)>0 && (loop2+y)<=8){
             possibleMoveTile(x,y,0,loop2)
             if(grid[x][y+loop2].taken==true){
             break;
             }
             loop2++
            
           }
           loop2=-1;
           while (loop==0 && (loop2+y)>0 && (loop2+y)<=8){
              possibleMoveTile(x,y,0,loop2)
             if(grid[x][y+loop2].taken==true){
             break;
             }
            
             loop2--
           }
         
         
  }
  }
})
}
function King(x,y,color,id){
this.id=id;
this.interceptable=false;
grid[x][y].taken=true;
this.inCheck=false;
this.captured=false;
this.x=x;
this.y=y;
var clicked=false;
this.color=color;
this.imageid=color+"king"+x;
this.icon= function(){
    image(this.imageid,"assets/"+"King "+color+".png");
     setPosition(this.imageid,grid[x][y].x,grid[x][y].y,40,40);
};
this.icon();
this.update= function(){
  grid[x][y].taken=false;
  x=this.x;
  y=this.y
   setPosition(this.imageid,grid[x][y].x,grid[x][y].y,40,40);
   grid[x][y].taken=true;
}
this.capture= function(){
  grid[x][y].taken=false;
  this.x=0;
  this.y=450;
  x=this.x;
  y=this.y
   setPosition(this.imageid,this.x,this.y,20,20);
}
this.check= function(){
  this.inCheck=false;
  this.interceptable=false;
  var loop=0;
  var t,num,val;
  if(color=="white"){
    t="b"
    num=17;
  }
  else if (color=="black"){
    t="w"
    num=19;
  }
  
  val=0
  loop2=1;
  while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (loop2+y)>0 && (loop2+y)<=8){
    if(grid[x+loop2][y+loop2].value%num==0){
      val=1
    }
   if(grid[x+loop2][y+loop2].taken==true){
     if(eval(findOccupancy(x+loop2,y+loop2)).id==("4"+t) || eval(findOccupancy(x+loop2,y+loop2)).id==("3"+t) || eval(findOccupancy(x+loop2,y+loop2)).id==("6"+t)){
       this.inCheck=true;
       if (val==loop2){
         this.interceptable=true;
       }
     }
     break;
  }
  loop2++;  
  }
  loop2=-1;
  val=0;
  while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (loop2+y)>0 && (loop2+y)<=8){
    if(grid[x+loop2][y+loop2].value%num==0){
      val=1
    }
    if(grid[x+loop2][y+loop2].taken==true){
      if(eval(findOccupancy(x+loop2,y+loop2)).id==("4"+t) || eval(findOccupancy(x+loop2,y+loop2)).id==("3"+t) || eval(findOccupancy(x+loop2,y+loop2)).id==("6"+t)){
        this.inCheck=true;
          if (val==1){
            this.interceptable=true;
          }
        }
        break;
    }
    loop2--
  }
    loop2=1;
    val=0
    while (loop==0 && (x-loop2)>0 && (x-loop2)<=8 && (loop2+y)>0 && (loop2+y)<=8){
    if(grid[x-loop2][y+loop2].value%num==0){
     val=1
    }
     if(grid[x-loop2][y+loop2].taken==true){
      if(eval(findOccupancy(x-loop2,y+loop2)).id==("4"+t) || eval(findOccupancy(x-loop2,y+loop2)).id==("3"+t) || eval(findOccupancy(x-loop2,y+loop2)).id==("6"+t)){
         this.inCheck=true;
         if (val==1){
           this.interceptable=true;
         }
       }
       break;
       
   }
    loop2++
   }
         var loop2=1;
          val=0
          while (loop==0 && (loop2+x)>0 && (loop2+x)<=8 && (y-loop2)>0 && (y-loop2)<=8){
            if(grid[x+loop2][y-loop2].value%num==0){
             val=1
           }
           if(grid[x+loop2][y-loop2].taken==true){
             if(eval(findOccupancy(x+loop2,y-loop2)).id==("4"+t) || eval(findOccupancy(x+loop2,y-loop2)).id==("3"+t) || eval(findOccupancy(x+loop2,y-loop2)).id==("6"+t)){
               this.inCheck=true;
               if (val==1){
                 this.interceptable=true;
               }
             }
             break;
             
         }
           loop2++
         }
         
          var loop2=1;
          val=0
           while (loop==0 && (loop2+x)>0 && (loop2+x)<=8){
             if(grid[x+loop2][y].value%num==0){
             val=1
           }
             if(grid[x+loop2][y].taken==true){
             if(eval(findOccupancy(x+loop2,y)).id=="4"+t || eval(findOccupancy(x+loop2,y)).id=="1"+t || eval(findOccupancy(x+loop2,y)).id=="8"+t){
               this.inCheck=true;
               if (val==1){
                 this.interceptable=true;
               }
             }
             break;
             
         }
             
             loop2++
           }
           loop2=-1;
           val=0
           while (loop==0 && (loop2+x)>0 && (loop2+x)<=8){
             if(grid[x+loop2][y].value%num==0){
             val=1
           }
             if(grid[x+loop2][y].taken==true){
             if(eval(findOccupancy(x+loop2,y)).id=="4"+t || eval(findOccupancy(x+loop2,y)).id=="1"+t || eval(findOccupancy(x+loop2,y)).id=="8"+t){
               this.inCheck=true;
               if (val==1){
                 this.interceptable=true;
               }
             }
             break;
             
         }
             loop2--
            
           }
           loop2=1
          val=0
           while (loop==0 && (loop2+y)>0 && (loop2+y)<=8){
             if(grid[x][y+loop2].value%num==0){
             val=1
           }
             if(grid[x][y+loop2].taken==true){
              
             if(eval(findOccupancy(x,y+loop2)).id=="4"+t || eval(findOccupancy(x,y+loop2)).id=="1"+t || eval(findOccupancy(x,y+loop2)).id=="8"+t){
               this.inCheck=true;
               if (val==1){
                 
                 this.interceptable=true;
               }
             }
             break;
             
         }
             loop2++
            
           }
           loop2=-1;
          val=0
           while (loop==0 && (loop2+y)>0 && (loop2+y)<=8){
             if(grid[x][y+loop2].value%num==0){
             val=1
           }
             
             if(grid[x][y+loop2].taken==true){
               
             if(eval(findOccupancy(x,y+loop2)).id=="4"+t || eval(findOccupancy(x,y+loop2)).id=="1"+t || eval(findOccupancy(x,y+loop2)).id=="8"+t){
               this.inCheck=true;
               if (val==1){
                 this.interceptable=true;
               }
             }
             break;
             
         }
            
             loop2--
           }
  
}
this.castle= function(){
  if(color=="black"){
    if(grid[1][1].taken==true && grid[2][1].taken==false && grid[3][1].taken==false && grid[4][1].taken==false && this.x==5 && this.y==1){
     if(findOccupancy(1,1)=="rook1b")
     {
       button("possibleMove"+Movetiles," ");
       var meh=Movetiles;
          setProperty("possibleMove"+Movetiles,"background-color",tileColorMoves);
          setPosition("possibleMove"+Movetiles,grid[1][1].x,grid[1][1].y,40,40);
          Movetiles=Movetiles+1;
        onEvent("possibleMove"+meh,"click",function(){
          rook1b.x=5;
          rook1b.y=1;
          rook1b.update();
          king5b.x=1;
          king5b.y=1;
          king5b.update();
          clearPossibleMoves(Movetiles-1)
        })
     }
    }
    if(grid[8][1].taken==true && grid[7][1].taken==false && grid[6][1].taken==false&& this.x==5 && this.y==1){
     if(findOccupancy(8,1)=="rook8b")
     {
       button("possibleMove"+Movetiles," ");
       var meh=Movetiles;
          setProperty("possibleMove"+Movetiles,"background-color",tileColorMoves);
          setPosition("possibleMove"+Movetiles,grid[8][1].x,grid[8][1].y,40,40);
          Movetiles=Movetiles+1;
        onEvent("possibleMove"+meh,"click",function(){
          rook8b.x=5;
          rook8b.y=1;
          rook8b.update();
          king5b.x=8;
          king5b.y=1;
          king5b.update();
          clearPossibleMoves(Movetiles-1)
        })
     }
    }
  }
  if(color=="white"){
    if(grid[1][8].taken==true && grid[2][8].taken==false && grid[3][8].taken==false && grid[4][8].taken==false && this.x==5 && this.y==8){
     if(findOccupancy(1,8)=="rook1w")
     {
       button("possibleMove"+Movetiles," ");
       var meh=Movetiles;
          setProperty("possibleMove"+Movetiles,"background-color",tileColorMoves);
          setPosition("possibleMove"+Movetiles,grid[1][8].x,grid[1][8].y,40,40);
          Movetiles=Movetiles+1;
        onEvent("possibleMove"+meh,"click",function(){
          rook1w.x=4;
          rook1w.y=8;
          rook1w.update();
          king5w.x=3;
          king5w.y=8;
          king5w.update();
          clearPossibleMoves(Movetiles-1)
        })
     }
    }
    if(grid[8][8].taken==true && grid[7][8].taken==false && grid[6][8].taken==false&& this.x==5 && this.y==8){
     if(findOccupancy(8,8)=="rook8w")
     {
       button("possibleMove"+Movetiles," ");
       var meh=Movetiles;
          setProperty("possibleMove"+Movetiles,"background-color",tileColorMoves);
          setPosition("possibleMove"+Movetiles,grid[8][8].x,grid[8][8].y,40,40);
          Movetiles=Movetiles+1;
        onEvent("possibleMove"+meh,"click",function(){
          rook8w.x=7;
          rook8w.y=8;
          rook8w.update();
          king5w.x=6;
          king5w.y=8;
          king5w.update();
          clearPossibleMoves(Movetiles-1)
        })
     }
    }
  }
}
onEvent(this.imageid,"click",function(){
  if(color==turn){
  if(Movetiles>0){
  clearPossibleMoves(Movetiles-1)
  }
  else{
         activeTile="king"+id;
         var loop=0;
         var loop2=1;
         king5b.castle();
          king5w.castle();
         possibleMoveTile(x,y,1,0)
         possibleMoveTile(x,y,1,1)
         possibleMoveTile(x,y,-1,1)
         possibleMoveTile(x,y,0,1)
         possibleMoveTile(x,y,-1,0)
         possibleMoveTile(x,y,-1,-1)
         possibleMoveTile(x,y,1,-1)
         possibleMoveTile(x,y,0,-1)
         
  }
  }
})
}
//Engine Functions
function findOccupancy(x,y){
  for(var i=1;i<=8;i++){
    if(eval("pawn"+i+"b").x==x && eval("pawn"+i+"b").y==y){
      return(("pawn"+i+"b"))
      break;
    }
    if(eval("pawn"+i+"w").x==x && eval("pawn"+i+"w").y==y){
      return(("pawn"+i+"w"))
      break;
    }
  }
    //horses
    if(eval("horsey"+2+"w").x==x && eval("horsey"+2+"w").y==y){
      return(("horsey"+2+"w"))
    }
    if(eval("horsey"+7+"w").x==x && eval("horsey"+7+"w").y==y){
      return(("horsey"+7+"w"))
    }
    if(eval("horsey"+2+"b").x==x && eval("horsey"+2+"b").y==y){
      return(("horsey"+2+"b"))
    }
    if(eval("horsey"+7+"b").x==x && eval("horsey"+7+"b").y==y){
      return(("horsey"+7+"b"))
    }
    //rooks
    if(eval("rook"+1+"w").x==x && eval("rook"+1+"w").y==y){
      return(("rook"+1+"w"))
    }
    if(eval("rook"+8+"w").x==x && eval("rook"+8+"w").y==y){
      return(("rook"+8+"w"))
    }
    if(eval("rook"+1+"b").x==x && eval("rook"+1+"b").y==y){
      return(("rook"+1+"b"))
    }
    if(eval("rook"+8+"b").x==x && eval("rook"+8+"b").y==y){
      return(("rook"+8+"b"))
    }
    //bishops
    if(eval("bishop"+3+"w").x==x && eval("bishop"+3+"w").y==y){
      return(("bishop"+3+"w"))
    }
    if(eval("bishop"+6+"w").x==x && eval("bishop"+6+"w").y==y){
      return(("bishop"+6+"w"))
    }
    if(eval("bishop"+3+"b").x==x && eval("bishop"+3+"b").y==y){
      return(("bishop"+3+"b"))
    }
    if(eval("bishop"+6+"b").x==x && eval("bishop"+6+"b").y==y){
      return(("bishop"+6+"b"))
    }
        //queen
    if(eval("queen"+4+"b").x==x && eval("queen"+4+"b").y==y){
      return(("queen"+4+"b"))
    }
    if(eval("queen"+4+"w").x==x && eval("queen"+4+"w").y==y){
      return(("queen"+4+"w"))
    }
    //king
    if(eval("king"+5+"w").x==x && eval("king"+5+"w").y==y){
      return(("king"+5+"w"))
    }
    if(eval("king"+5+"b").x==x && eval("king"+5+"b").y==y){
      return(("king"+5+"b"))
    }
    if(promoCounter>1){
      if(eval(promo1).x==x && eval(promo1).y==y){
      return((promo1))
    }
    }
    if(promoCounter>2){
      if(eval(promo2).x==x && eval(promo2).y==y){
      return((promo2))
    }
    }
    if(promoCounter>3){
      if(eval(promo3).x==x && eval(promo3).y==y){
      return((promo3))
    }
    }
  
} //needs to be editted with each new piece
function clearPossibleMoves(){
  Movetiles-=1;
  for (var i=Movetiles; i>=0;i--){
    deleteElement("possibleMove"+i);
  }
  Movetiles=0;
}
function possibleMoveTile(x,y,i,j,num){
var occupied= findOccupancy(x+i,y+j)
  if((x+i)<=8 && x+i>=1 && y+j<=8 && y+j>=1){
    
      Movetiles=Movetiles+1
      button("possibleMove"+Movetiles," ");
        if(grid[x+i][y+j].taken==false){
          setProperty("possibleMove"+Movetiles,"background-color",tileColorMoves);
          setPosition("possibleMove"+Movetiles,grid[x+i][y+j].x,grid[x+i][y+j].y,40,40);
          onEvent("possibleMove"+Movetiles,"click",function(){
            eval(activeTile).x=x+i;
            eval(activeTile).y=y+j;
            eval(activeTile).update()
            switchTurn();
             clearPossibleMoves(Movetiles)
          })
           Movetiles=Movetiles+1
    }
  else if(eval(occupied).color!=eval(activeTile).color){
    setProperty("possibleMove"+Movetiles,"background-color",tileColorActive);
    setPosition("possibleMove"+Movetiles,grid[x+i][y+j].x,grid[x+i][y+j].y,40,40);
      onEvent("possibleMove"+Movetiles,"click",function(){
        eval(occupied).capture();
        eval(activeTile).x=x+i
        eval(activeTile).y=y+j;
        eval(activeTile).update()
        switchTurn();
        clearPossibleMoves(Movetiles)
      })
      Movetiles=Movetiles+1;
    }
    else{
      deleteElement("possibleMove"+Movetiles)
      Movetiles=Movetiles-1
    }
  }
}
function Tile(x,y,color){
  this.x=x;
  this.y=y;
  this.color=color;
  this.draw= function(){
  button(x+","+y," ");
  setProperty((x+","+y),"background-color",color);
  setPosition((x+","+y),grid[x][y].x,grid[x][y].y,40,40);
  };
  this.draw();
}
function createboard(){
  for(var i=1;i<=8;i++){
     for(var j=1;j<=8;j++){
      if(j%2==0){
        if(i%2==0){
         var tile= new Tile(i,j,tileColorWhite);
        }
        else
        var tile= new Tile(i,j,tileColorBlack)
      }
      else{
        if(i%2==0){
          var tile= new Tile(i,j,tileColorBlack)
        }
        else
        var tile= new Tile(i,j,tileColorWhite);
      }
     }
  }
}
function switchTurn(){
  if(turn=="black"){
    turn="white"
    setPosition("TurnIndictator",110,412)
    resetValues();
    createValues();
    checkCheck();
  }
  else if(turn=="white"){
    turn="black"
    setPosition("TurnIndictator",110,7)
     resetValues();
     createValues();
     checkCheck();
  }
}
function resetValues(){
  for (var i=1;i <=8;i++){
    for (var j=1;j<=8;j++){
      grid[i][j].value=1;
    }
  }
}
function createValues(){
  
  for(var i=1;i<=8;i++){
    eval("pawn"+i+"b").possibleMoves();
    eval("pawn"+i+"w").possibleMoves();
    }
    eval("horsey"+2+"b").possibleMoves();
    eval("horsey"+7+"b").possibleMoves();
    eval("horsey"+2+"w").possibleMoves();
    eval("horsey"+7+"w").possibleMoves();
    
    rook1b.possibleMoves();
    rook8b.possibleMoves();
    rook1w.possibleMoves();
    rook8w.possibleMoves();
    
    bishop6w.possibleMoves();
    bishop3w.possibleMoves();
    bishop6b.possibleMoves();
    bishop3b.possibleMoves();
    
    queen4b.possibleMoves();
    queen4w.possibleMoves();
    
  
  
}
function checkCheck(){
  king5b.check();
  if(king5b.inCheck==true){
    console.log("black King in check")
    console.log(king5w.interceptable)
    checkMate();
  }
  king5w.check();
  if(king5w.inCheck==true){
    console.log("white King in check")
    console.log(king5w.interceptable)
  }
}
function checkMate(){
  if(king5b.inCheck==true && king5b.interceptable==false){
    var moves=0;
    if(king5b.x==8 ){
      moves=moves+1;
    }
    else if ( grid[king5b.x+1][king5b.y].taken==true || grid[king5b.x+1][king5b.y].value%17==0){
          moves=moves+1;
        
    }
    if(king5b.x==8 || king5b.y==8){
      moves=moves+1;
    }
    else if (grid[king5b.x+1][king5b.y+1].taken==true || grid[king5b.x+1][king5b.y+1].value%17==0 ){
          moves=moves+1;
    }
    if(king5b.x==8|| king5b.y==1 ){
      moves=moves+1;
    }
    else if ( grid[king5b.x+1][king5b.y-1].taken==true || grid[king5b.x+1][king5b.y-1].value%17==0 ){
          moves=moves+1;
    }
    if(king5b.y==8){
      moves=moves+1;
    }
    else if (grid[king5b.x][king5b.y+1].taken==true || grid[king5b.x][king5b.y+1].value%17==0 ){
          moves=moves+1;
    }
    if(king5b.y==1 ){
      moves=moves+1;
    }
      else if( grid[king5b.x][king5b.y-1].taken==true || grid[king5b.x][king5b.y-1].value%17==0){
          moves=moves+1;
    }
    if(king5b.x==1 ){
      moves=moves+1;
    }
    else if (grid[king5b.x-1][king5b.y].taken==true || grid[king5b.x-1][king5b.y].value%17==0){
        moves=moves+1;
      }
    
     if(king5b.x==1 || king5b.y==8){   
       moves=moves+1;
     }
    else if ( grid[king5b.x-1][king5b.y+1].taken==true || grid[king5b.x-1][king5b.y+1].value%17==0){
          moves=moves+1;
        
     }
     if(king5b.x==1 || king5b.y==1 ){
       moves=moves+1;
     }
    else if ( grid[king5b.x-1][king5b.y-1].taken==true || grid[king5b.x-1][king5b.y-1].value%17==0 ){
          moves=moves+1;
    
  }
  if(moves==8){
   showElement("Checkmate");
  }
}
if(king5w.inCheck==true && king5w.interceptable==false){
    var moves=0;
    if(king5w.x==8 ){
      moves=moves+1;
    }
    else if ( grid[king5w.x+1][king5w.y].taken==true || grid[king5w.x+1][king5w.y].value%17==0){
          moves=moves+1;
        
    }
    if(king5w.x==8 || king5w.y==8){
      moves=moves+1;
    }
    else if (grid[king5w.x+1][king5w.y+1].taken==true || grid[king5w.x+1][king5w.y+1].value%17==0 ){
          moves=moves+1;
    }
    if(king5w.x==8|| king5w.y==1 ){
      moves=moves+1;
    }
    else if ( grid[king5w.x+1][king5w.y-1].taken==true || grid[king5w.x+1][king5w.y-1].value%17==0 ){
          moves=moves+1;
    }
    if(king5w.y==8){
      moves=moves+1;
    }
    else if (grid[king5w.x][king5w.y+1].taken==true || grid[king5w.x][king5w.y+1].value%17==0 ){
          moves=moves+1;
    }
    if(king5w.y==1 ){
      moves=moves+1;
    }
      else if( grid[king5w.x][king5w.y-1].taken==true || grid[king5w.x][king5w.y-1].value%17==0){
          moves=moves+1;
    }
    if(king5w.x==1 ){
      moves=moves+1;
    }
    else if (grid[king5w.x-1][king5w.y].taken==true || grid[king5w.x-1][king5w.y].value%17==0){
        moves=moves+1;
      }
    
     if(king5w.x==1 || king5w.y==8){   
       moves=moves+1;
     }
    else if ( grid[king5w.x-1][king5w.y+1].taken==true || grid[king5w.x-1][king5w.y+1].value%17==0){
          moves=moves+1;
        
     }
     if(king5w.x==1 || king5w.y==1 ){
       moves=moves+1;
     }
    else if ( grid[king5w.x-1][king5w.y-1].taken==true || grid[king5w.x-1][king5w.y-1].value%17==0 ){
          moves=moves+1;
    
  }
  if(moves==8){
    console.log("Checkmate");
  }
}
}
//debugging tool
function consoleGrid(array,value){
  console.log("__________")
  for(var i=1;i<=8;i++){
    
    console.log("|" +array[1][i].value + "|" +array[2][i].value+"|"
    +array[3][i].value+"|"+array[4][i].value+"|"+array[5][i].value
    +"|"+array[6][i].value+"|"+array[7][i].value+"|"+array[8][i].value+"|");
    
  }
  console.log("__________")
}

 //black
 var pawn1b = new Pawn(1,2,"black","1b");
 var pawn2b = new Pawn(2,2,"black","2b");
 var pawn3b = new Pawn(3,2,"black","3b");
 var pawn4b = new Pawn(4,2,"black","4b");
 var pawn5b = new Pawn(5,2,"black","5b");
 var pawn6b = new Pawn(6,2,"black","6b");
 var pawn7b = new Pawn(7,2,"black","7b");
 var pawn8b = new Pawn(8,2,"black","8b");
 var horsey2b=new Horsey(2,1,"black","2b");
 var horsey7b=new Horsey(7,1,"black","7b");
 var rook1b=new Rook(1,1,"black","1b");
 var rook8b=new Rook(8,1,"black","8b");
 var bishop3b=new Bishop(3,1,"black","3b");
 var bishop6b=new Bishop(6,1,"black","6b");
 var queen4b= new Queen(4,1,"black","4b");
 var king5b= new King(5,1,"black","5b");
  //whitepawns
 var pawn1w = new Pawn(1,7,"white","1w");
 var pawn2w = new Pawn(2,7,"white","2w");
 var pawn3w = new Pawn(3,7,"white","3w");
 var pawn4w = new Pawn(4,7,"white","4w");
 var pawn5w = new Pawn(5,7,"white","5w");
 var pawn6w = new Pawn(6,7,"white","6w");
 var pawn7w = new Pawn(7,7,"white","7w");
 var pawn8w = new Pawn(8,7,"white","8w");
 var horsey2w=new Horsey(2,8,"white","2w");
 var horsey7w=new Horsey(7,8,"white","7w");
 var rook1w=new Rook(1,8,"white","1w");
 var rook8w=new Rook(8,8,"white","8w");
 var bishop3w=new Bishop(3,8,"white","3w");
 var bishop6w=new Bishop(6,8,"white","6w");
 var queen4w= new Queen(4,8,"white","4w");
 var king5w= new King(5,8,"white","5w");

setScreen("grid");
for(var i=1; i<=8; i++){
  for(var j=1; j<=8; j++){
    textLabel("box"+i+j,grid[i][j].value)
    setPosition("box"+i+j,grid[i][j].x, grid[i][j].y,40,40)
  }
}
setScreen("screen1");



