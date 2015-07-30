CURRENT_BRANCHES = 0;
MAX_BRANCHES = 100;

function Sakura(node, canvas) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    this.ctx = canvas.getContext('2d');
    console.log(this.ctx);
    this.node = node;
    this.trunk = new Branch(1, 1, 1);
    this.tick = this.tick.bind(this);
        if (CURRENT_BRANCHES < MAX_BRANCHES) {
        this.tick(); // start animating
        this.toString();
        }
}

Sakura.prototype.tick = function() {
    requestAnimationFrame(this.tick);
    this.trunk.tick();
    this.debugPrint();
    this.draw();
};

Sakura.prototype.toString = function() {
    var stringified = "Trunk of cherry tree : " + String(this.trunk) + " tick" + String(this.tick) + '\n';
    // console.log(stringified);
    return stringified;
};

Sakura.prototype.debugPrint = function(){
    this.node.textContent = this.toString();
    console.log(this.node.textContent);
};

Sakura.prototype.draw = function(){
    document.body.innerHTML = "";

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
        var b = new Branch(Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 10) + 1));
        this.children.push(b);
        for (var i = this.children.length - 1; i >= 0; i--) {
            this.children[i].tick();
        }
        b.toString();
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
 
};