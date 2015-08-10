CURRENT_BRANCHES = 0;
MAX_BRANCHES = 1000;

function Sakura(node, canvas) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    this.ctx = canvas.getContext('2d');
    // console.log(this.ctx);
    this.node = node;
    this.trunk = new Branch(1, 1, 1);
    this.tick = this.tick.bind(this);
        if (CURRENT_BRANCHES < MAX_BRANCHES) {
        this.tick(); // start animating
        this.toString();
        }
        this.trunk.parentPosition = [50,50];
    this.trunk.turtle = new Turtle();
    this.trunk.turtle.pos = [100, 100];
}

Sakura.prototype.tick = function() {
    requestAnimationFrame(this.tick);
    this.trunk.tick();
    // this.debugPrint();
    this.draw();
};

Sakura.prototype.toString = function() {
    var stringified = "Trunk of cherry tree : " + String(this.trunk) + " tick" + String(this.tick) + '\n';
    // console.log(stringified);
    return stringified;
};

Sakura.prototype.debugPrint = function(){
    this.node.textContent = this.toString();
    // console.log(this.node.textContent);
};

Sakura.prototype.draw = function(){
    // this.ctx.clearRect(0, 0, canvas.width, canvas.height);

};

function Branch(length, thickness, angle) {
    if (CURRENT_BRANCHES < MAX_BRANCHES) {
        CURRENT_BRANCHES += 1;
        this.length = length;
        this.thickness = thickness;
        this.angle = angle;
        this.children = [];
        this.tree = Sakura;

    } else {}
}

Branch.prototype.tick = function() {
    if (CURRENT_BRANCHES < MAX_BRANCHES && Math.random() < 0.2) {
        this.length += Math.random();
        var b = new Branch(Math.floor((Math.random() * 100) + 1), Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 100) + 1));
        this.children.push(b);
        for (var i = this.children.length - 1; i >= 0; i--) {
            //Where the new turtle is created
            console.log(this.turtle.pos);
            this.children[i].parentPosition = [this.turtle.pos[0], this.turtle.pos[1]];
            this.children[i].turtle  = this.turtle.spawn();
            this.children[i].turtle.turnRight(this.angle);
            this.children[i].turtle.fwd(this.length);
            console.log(this.turtle.pos);
            //
            this.children[i].tick();

        }
        b.toString();
        b.draw();
    }
};

Branch.prototype.toString = function() {
    var stringified = "length : " + String(this.length) + " thickness :  " + String(this.thickness) + " angle :  " + String(this.angle) + " children : " + String(this.children) + '\n';
    for (var i = 0; i < this.children.length; i++) {
        stringified += (" " + this.children[i].toString());
    }
    return stringified;
};

Branch.prototype.draw = function(){
    var c = document.getElementById("canvas");
    this.ctx = c;
    this.ctx = c.getContext('2d');
    console.log(this.ctx);
    this.ctx.beginPath();
    this.ctx.moveTo(this.parentPosition[0], this.parentPosition[1]);
    this.ctx.lineTo(this.turtle.pos[0], this.turtle.pos[1]);
    this.ctx.lineWidth = this.thickness;
    this.ctx.stroke();
};

var c=document.getElementById("canvas2");
var ctx = c.getContext('2d');
ctx.beginPath();
ctx.moveTo(0,0);
ctx.lineTo(300,150);
ctx.lineWidth = 10;
ctx.stroke();