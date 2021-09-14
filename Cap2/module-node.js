const area = require("./lib/area.js");
const book = require("./lib/book.js");

console.log(area.circleArea(2))
console.log(area.squareArea(2))

const myBook = new book.Book('teste')
myBook.x();