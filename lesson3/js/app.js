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

  $(document).on("pageshow", "#books", function() {
    $(".items-list").empty();
    books.fetch(function(err, data) { // Success
      if (err) {
        $(".items-list").append("read failed");
      } else {
        while(books.hasNextEntity()) {
          var book = books.getNextEntity();
          var title = book.get("title");
          var author = book.get("author");
          // Output the books
          $(".items-list").append("<li><h3>"+title+"</h3><p>"+author+"</p></li>");
        }
      }
      // Refresh list to apply jQuery Mobile styles
      $(".items-list").listview("refresh");
    });

  });

})(Apigee);
