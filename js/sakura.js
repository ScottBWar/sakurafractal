CURRENT_BRANCHES = 0;
MAX_BRANCHES = 100;

function Sakura(node) {
    console.log("cherry tree planted");
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
};

Sakura.prototype.toString = function() {
    var stringified = "Trunk of cherry tree : " + String(this.trunk) + " tick" + String(this.tick);
    // console.log(stringified);
    return stringified;
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
    this.length += Math.random();
    if (CURRENT_BRANCHES < MAX_BRANCHES && Math.random() < 0.2) {
        var b = new Branch(Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 10) + 1))
        this.children.push(b);
        for (var i = this.children.length - 1; i >= 0; i--) {
            this.children[i].tick();
        }
        b.toString();
    }
};

Branch.prototype.toString = function() {
    var stringified = "length : " + String(this.length) + " thickness :  " + String(this.thickness) + " angle :  " + String(this.angle) + " children : " + String(this.children);
    for (var i = 0; i < this.children.length; i++) {
        stringified += (" " + this.children[i].toString());
    }
    console.log(stringified);
    return stringified;
};