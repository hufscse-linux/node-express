var page = require('webpage').create();

page.open(
    'http://localhost:3000/signin',
    function(status) {
      console.log("access to signin page(status: " + status + ")");
      if(status !== 'success') {
        console.log("fail to access to signin page");
        phantom.exit(1);
        return;  
      }

      page.evaluate(function(){
        $("input[name=username]").val("test") ;
        $("input[name=password]").val("test") ;
        $("input[type=submit]").click() ;
      });

      setTimeout(function() {
        page.open("http://localhost:3000", function(status) {
          console.log("access to home page(status: " + status + ")");
          if(status !== 'success') {
            console.log("fail to access to home page");
            phantom.exit(1);
            return;  
          }
          var username = page.evaluate(function() {
            return $("span#username").text();
          });
          if('test' !== username) {
            console.log("fail to signin!!!");
            phantom.exit(1);
            return;
          }
          phantom.exit();
        });
      }, 1000);


    });
