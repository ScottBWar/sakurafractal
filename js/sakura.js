CURRENT_BRANCHES = 0;
MAX_BRANCHES = 350;
COLORS = [
    "#2484c1", "#65a620", "#7b6888", "#a05d56", "#961a1a", "#d8d23a", "#e98125", "#d0743c", "#635222", "#6ada6a",
    "#0c6197", "#7d9058", "#207f33", "#44b9b0", "#bca44a", "#e4a14b", "#a3acb2", "#8cc3e9", "#69a6f9", "#5b388f",
    "#546e91", "#8bde95", "#d2ab58", "#273c71", "#98bf6e", "#4daa4b", "#98abc5", "#cc1010", "#31383b", "#006391",
    "#c2643f", "#b0a474", "#a5a39c", "#a9c2bc", "#22af8c", "#7fcecf", "#987ac6", "#3d3b87", "#b77b1c", "#c9c2b6",
    "#807ece", "#8db27c", "#be66a2", "#9ed3c6", "#00644b", "#005064", "#77979f", "#77e079", "#9c73ab", "#1f79a7"
];

function Sakura(node, canvas) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    this.ctx = canvas.getContext('2d');
    this.node = node;
    this.trunk = new Branch(0, 4, 1, '#49311C');
    this.trunk.blossoms = [];
    this.tick = this.tick.bind(this);
    if (CURRENT_BRANCHES < MAX_BRANCHES) {
        this.tick(); // start animating
        this.toString();
    }
    this.trunk.parentPosition = [400, 800];
    this.trunk.turtle = new Turtle();
    this.trunk.turtle.pos = [400, 700];
}

Sakura.prototype.tick = function() {
    requestAnimationFrame(this.tick);
    this.trunk.tick();
    // this.trunk.blossoms = [];
    this.trunk.draw();
};

Sakura.prototype.toString = function() {
    var stringified = "Trunk of cherry tree : " + String(this.trunk) + " tick" + String(this.tick) + '\n';
    return stringified;
};

Sakura.prototype.debugPrint = function() {
    this.node.textContent = this.toString();
};

Sakura.prototype.draw = function() {
    // this.ctx.clearRect(0, 0, canvas.width, canvas.height);
};

function Branch(length, thickness, angle, color) {
    if (CURRENT_BRANCHES < MAX_BRANCHES) {
        CURRENT_BRANCHES += 1;
        this.length = length;
        this.thickness = thickness;
        this.angle = angle;
        this.children = [];
        this.tree = Sakura;
        this.color = color;
        this.parentPosition = [400, 800];
        this.turtle = new Turtle();
        this.turtle.pos = [400, 700];
        this.blossoms = [];

    }
}

Branch.prototype.tick = function() {
    // console.log(this.blossoms);
    if (CURRENT_BRANCHES < MAX_BRANCHES) {
        this.length += Math.random();
        this.thickness += (Math.random() - 0.4);
        this.draw();
    }

    for (var a = this.children.length - 1; a >= 0; a--) {
        this.children[a].tick();
    }

    if (CURRENT_BRANCHES < MAX_BRANCHES && Math.random() < 0.05) {


        if (this.children.length < 2) {
            var branch = new Branch(Math.floor((Math.random() * 100) + 10), Math.floor((Math.random() * 1) + 1), Math.floor((Math.random() * 31) + 1), '#49311C');
            this.children.push(branch);
        }

        for (var i = this.children.length - 1; i >= 0; i--) {
            //Where the new turtle is created
            this.children[i].parentPosition = [this.turtle.pos[0], this.turtle.pos[1]];
            this.children[i].turtle = this.turtle.spawn();
            if (Math.random() < 0.5) {
                this.children[i].turtle.turnRight(this.angle);
            } else {
                this.children[i].turtle.turnLeft(this.angle);
            }
            this.children[i].turtle.fwd(this.length);
        }
        if (branch) {
            branch.draw();
        }
    }
    this.draw();

    if ( CURRENT_BRANCHES > 100 && this.blossoms.length < 3 && Math.random() < 0.09) {
        var blossom = new Blossom(this.parentPosition[0], this.parentPosition[1], this.turtle.pos[0], this.turtle.pos[1]);
        // console.log(blossom)
        this.blossoms.push(blossom);
        for (var b = 0; b < this.blossoms.length; b++) {
            this.blossoms[b].draw();
        }
    }




};

Branch.prototype.toString = function() {
    var stringified = "length : " + String(this.length) + " thickness :  " + String(this.thickness) + " angle :  " + String(this.angle) + " children : " + String(this.children) + '\n';
    for (var i = 0; i < this.children.length; i++) {
        stringified += (" " + this.children[i].toString());
    }
    return stringified;
};

Branch.prototype.draw = function() {
    var c = document.getElementById("canvas");
    this.ctx = c;
    this.ctx = c.getContext('2d');
    this.ctx.beginPath();
    this.ctx.moveTo(this.parentPosition[0], this.parentPosition[1]);
    this.ctx.lineTo(this.turtle.pos[0], this.turtle.pos[1]);
    this.ctx.lineWidth = this.thickness;
    this.ctx.strokeStyle = this.color;
    // this.ctx.quadraticCurveTo(this.parentPosition[0], this.parentPosition[1]-Math.floor(Math.random()*10+1), this.turtle.pos[0], this.turtle.pos[1]);
    this.ctx.stroke();
};

function Blossom(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
}

Blossom.prototype.draw = function() {
    var c = document.getElementById("canvas");
    this.ctx = c;
    this.ctx = c.getContext('2d');
    this.ctx.beginPath();
    rPoint = randomPoint(this.x1, this.y1, this.x2, this.y2);
    this.ctx.arc(rPoint[0], rPoint[1], 6, 0, 2 * Math.PI, false);
    this.ctx.fillStyle = '#ff849c';
    this.ctx.fill();
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'white';
    this.ctx.stroke();
};

var randomPoint = function(x1, y1, x2, y2) {
    var randFloat = Math.random();
    var xPoint = x1 + (x2 - x1) * randFloat;
    var yPoint = y1 + (y2 - y1) * randFloat;
    return [xPoint, yPoint];
};