$( document ).ready(function() {
    $(".logo").addClass("animated fadeInDown visible");
    setTimeout(function(){
        $(".title").addClass("animated fadeInDown visible");
    }, 500);
    setTimeout(function(){
        $(".product").addClass("animated fadeInDown visible");
    }, 1000);
});