var page = require('webpage').create();

page.open(
    'http://localhost:3000/signin',
    function(status) {
        page.evaluate(function(){
            $("input[name=username]").val("test") ;
            $("input[name=password]").val("test") ;
            $("input[type=submit]").click() ;
        });
        setTimeout(function(){
            page.open(home, function(status){
                if (status !== "success") {
                    console.log('fail2');
                    phantom.exit(1);
                    return;
                }
                page.evaluate(function(){
                    $('body').css('border','1px solid red') ;
                });
                page.render('page.png');
                console.log('finished!');
                phantom.exit();
            });
        }, 500);
    });
