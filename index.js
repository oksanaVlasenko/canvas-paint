var canv = document.getElementById('canvas');
var ctx = canv.getContext('2d');
var isMouseDown = false;
var coords = [];

canv.width = window.innerWidth;
canv.height = window.innerHeight;

ctx.font = "20px Verdana";
ctx.fillText("Press the key C for clear the field", 20, 40);
ctx.fillText("Press the key S for save the field", 40, 80);
ctx.fillText("Press the key R for replay the field", 60, 120);

canv.addEventListener('mousedown', function(){
    isMouseDown = true;
});

canv.addEventListener('mouseup', function(){
    isMouseDown = false;
    ctx.beginPath();
    coords.push('mouseup');
});

ctx.lineWidth = 20;
canv.addEventListener('mousemove', function(e){

    if(isMouseDown){
        coords.push([e.clientX, e.clientY]);

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
});

function save(){
    localStorage.setItem('coords', JSON.stringify(coords));
}

function clear(){
    ctx.fillStyle = '#fdfd3c';
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillText("Press the key C for clear the field", 20, 40);
    ctx.fillText("Press the key S for save the field", 40, 80);
    ctx.fillText("Press the key R for replay the field", 60, 120);
}

function replay(){
    var timer = setInterval(function(){
        if(!coords.length){
            clearInterval(timer);
            ctx.beginPath();
            return;
        }

        var crd = coords.shift();
        var e = {
            clientX: crd["0"],
            clientY: crd["1"]
        };

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);

    }, 30);
}

document.addEventListener('keydown', function(e){
    if(e.keyCode == 83){
        //save
        save();
        console.log('Saved');
    }

    if(e.keyCode == 82){
        //replay
        console.log('Replaying...');

        coords = JSON.parse(localStorage.getItem('coords'));
        clear();
        replay();
    }

    if(e.keyCode == 67){
        //clear
        clear();
        console.log('Cleared');
    }
})