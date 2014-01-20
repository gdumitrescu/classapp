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

  $(document).on("pageshow", "#booksList", function() {
    $("#itemsList").empty();
    books.fetch(function(err, data) { // Success
      if (err) {
        $("#itemsList").append("read failed");
      } else {
        while(books.hasNextEntity()) {
          var book = books.getNextEntity();
          var title = book.get("title");
          var author = book.get("author");
          // Output the books
          $("#itemsList").append("<li><h3>"+title+"</h3><p>"+author+"</p></li>");
        }
      }
      // Refresh list to apply jQuery Mobile styles
      $("#itemsList").listview("refresh");
    });
  });

})(Apigee);
