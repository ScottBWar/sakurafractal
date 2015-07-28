CURRENT_BRANCHES = 0;
MAX_BRANCHES = 100;

function Sakura(node) {
    console.log("cherry tree planted");
    this.trunk = new Branch(1, 1, 1);
    this.tick = this.tick.bind(this);

    if (CURRENT_BRANCHES < MAX_BRANCHES) {
        this.tick(); // start animating
        this.stringify();
    }
}

Sakura.prototype.tick = function() {
    requestAnimationFrame(this.tick);
    this.trunk.tick();
};

Sakura.prototype.stringify = function() {
    var stringified = "Trunk of cherry tree = " + String(this.trunk) + " tick" + String(this.tick);
    console.log(stringified);
    return stringified;
};

function Branch(length, thickness, angle) {
    if (CURRENT_BRANCHES < MAX_BRANCHES) {
        console.log("the" + CURRENT_BRANCHES + " instance of a branch is growing and the maximum is" + MAX_BRANCHES)
        CURRENT_BRANCHES += 1;
        this.length = length;
        this.thickness = thickness;
        this.angle = angle;
        this.children = [];
        this.tree = Sakura;
    } else {
        console.log("too many branches can't make more");
    }
}

Branch.prototype.tick = function() {
    this.length += Math.random();
    if (CURRENT_BRANCHES < MAX_BRANCHES && Math.random() < 0.2) {
        console.log(CURRENT_BRANCHES + " ticked, branch growing and maxiumum is " + MAX_BRANCHES);

        var b = new Branch(Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 10) + 1), Math.floor((Math.random() * 10) + 1))
        console.log(b);
        this.children.push(b);
        console.log(this);
        for (var i = this.children.length - 1; i >= 0; i--) {
            console.log("this is a child branch");
            console.log(this.children);
            this.children[i].tick();
        }
        b.stringify();
    }
};

Branch.prototype.stringify = function() {
    var stringified = "length = " + String(this.length) + " thickness =  " + String(this.thickness) + " angle =  " + String(this.angle) + " children = " + String(this.children);
    console.log(stringified);
    return stringified;
};