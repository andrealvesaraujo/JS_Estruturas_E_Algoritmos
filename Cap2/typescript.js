var John = /** @class */ (function () {
    function John() {
        this.name = "string";
        this.age = 10;
    }
    John.prototype.printName = function (n, a) {
        return this.name + " is " + a + " && " + this.age + " is " + n;
    };
    return John;
}());
var g = new John();
console.log(g.printName(15, "LOL"));
