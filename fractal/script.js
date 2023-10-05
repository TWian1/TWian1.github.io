document.getElementById("canvas");
document.getElementById("zoom");
document.getElementById("zoomtxt");
document.getElementById("fractal");
const ctx = canvas.getContext("2d");
var iterationsc = 2000;
var yoff = 100000;
var ftype = 0;
var az = true;
function generate(zoom){
  let xoff = 1.785;
  let size = 500;
  let lists = [[]];
  let l = 4/size;
  for (let a = 0; a < size; a++){
    for (let b = 0; b<size;b++){
      let c = ((a*l)+(-2));
      let d = ((b*l)+(-2))
      let itlen = 0;
      if (yoff >= 1000000){
        itlen = inorout(c*(1/zoom)-xoff, d*(1/zoom));
      }
      else{
        itlen = inorout(c*(1/zoom)-xoff, d*(1/zoom)+(10/yoff));
      }
      let r = 0;
      let g = 0;
      let b2 = 0;
      if (itlen > 0){
        if (ftype == 1){
        r = (10*(itlen+4));
        g = (10*(itlen+1));
        b2 = (10*(itlen+8));
        }
        else{
          r = (10*(itlen+4))%255;
          g = (10*(itlen+1))%255;
          b2 = (10*(itlen+8))%255;
        }
      }
      lists[((b*size)+a)*4] = r
      lists[((b*size)+a)*4+1] = g
      lists[((b*size)+a)*4+2] = b2
      lists[((b*size)+a)*4+3] = 255
    }
  }
  var idata = ctx.createImageData(size, size);

// set our buffer as source
idata.data.set(lists);

// update canvas with new data
ctx.putImageData(idata, 0, 0);
}
generate(1)
zoom.oninput = function() {
  if (az == false){
  if (typeof this.value != 'undefined'){
    generate((this.value)/50);
  }
  }
}
var couneter = 0.5;
let c2 = 0;
function update(){
  if (az){
  c2 += 1
  
  requestAnimationFrame(update);
  if (c2 > 2){
    if (yoff < 1000000){
      yoff = yoff*1.02
    }
    couneter = couneter*1.06
    iterationsc = iterationsc
    c2 = 0
    zoomtxt.innerHTML = ("zoom: "+couneter)
    generate(couneter);
  }
  }
}





function autozoom(){
  if (az){
    az = false;
    yoff = 100000;
    couneter = 0.5;
    generate(0.5)
  }
  else{
    az = true;
    yoff = 100000;
    couneter = 0.5;
    update()
  }
}

function inorout(x, y){
  var realComponentOfResult = x;
var imaginaryComponentOfResult = y;
for(var i = 0; i < Math.round(iterationsc); i++) {
  if (ftype == 0){
    var tempRealComponent = realComponentOfResult * realComponentOfResult
                             - imaginaryComponentOfResult * imaginaryComponentOfResult
                             + x;

     var tempImaginaryComponent = 2 * realComponentOfResult* 
imaginaryComponentOfResult
                             + y;

     realComponentOfResult = tempRealComponent;
     imaginaryComponentOfResult = tempImaginaryComponent;
  }
  else if (ftype == 1){
     var tempRealComponent = Math.abs(realComponentOfResult) * Math.abs(realComponentOfResult)
                             - Math.abs(imaginaryComponentOfResult) * Math.abs(imaginaryComponentOfResult)
                             + x;

     var tempImaginaryComponent = 2 * Math.abs(realComponentOfResult)* 
Math.abs(imaginaryComponentOfResult)
                             + y;

     realComponentOfResult = tempRealComponent;
     imaginaryComponentOfResult = tempImaginaryComponent;
  }

if (realComponentOfResult * imaginaryComponentOfResult > 1){
    return i+1;
}
}
return 0;
}
function fractaltype(){
  yoff = 100000;
  couneter = 0.5;
  if (ftype == 0){
    ftype = 1;
  }
  else{
    ftype = 0;
  }
}
//var anchor = document.createElement("a");
//anchor.href = canvas.toDataURL("image/png");
//anchor.download = "IMAGE.PNG";
//anchor.click();
update()
