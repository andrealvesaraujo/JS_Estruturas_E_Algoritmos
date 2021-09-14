class Book {
    constructor(title) {
      this.t = title;
    }
  
    x() {
      console.log(this.t);
    }
  
  }
  
  module.exports= {Book: Book};