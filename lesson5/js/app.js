(function(Apigee){

  var client = new Apigee.Client({
    orgName: "gabriel", // Your Apigee.com username for App Services
    appName: "sandbox" // Your Apigee App Services app name
  });

  // Reading data
  var books = new Apigee.Collection({
    "client": client,
    "type":"books"
  });

  var renderBooks = function() {
    $("#itemsList").empty();
    books.fetch(function(err, data) { // Success
      if (err) {
        $("#itemsList").append("read failed");
      } else {
        while(books.hasNextEntity()) {
          var book = books.getNextEntity(-1);
          var title = book.get("title");
          var author = book.get("author");
          // Output the books
          $("#itemsList").prepend("<li><h3>"+title+"</h3><p>"+author+"</p></li>");
        }
      }
      // Refresh list to apply jQuery Mobile styles
      $("#itemsList").listview("refresh");
    });
  };
  var getTitle = function() {
    var title = $("input#title").val();
    if(title) return title;
  };
  var getAuthor = function() {
    var author = $("input#author").val();
    if(author) return author;
  };
  var addBook = function() {
    var newTitle = getTitle();
    var newAuthor = getAuthor();
    var book = {
      "title": newTitle,
      "author": newAuthor
    };
    books.addEntity(book, function (error, response) {
      if (error) {
        console.log(error);
      } else {
        console.log("write succeeded");
      }
    });
  };
  $(document).ready(function(){
    $("#btnAddBook").bind("click", function(){
      addBook();
      $("#addForm").trigger("reset");
      $("#booksAdd").dialog("close");
    });
  });

  $(document).on("pageshow", "#booksList", function(){
    renderBooks();
  });

})(Apigee);
