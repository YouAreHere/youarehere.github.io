$('body').on('mouseenter','#navbar-hover',function(){
    $('#navbar-hover').animate({
        right: '150px'
    },250);
    $('#navbar-main').animate({
        right: '0px'
    },250);
});



$('body').on('mouseleave','#navbar-wrapper',function(){
    $('#navbar-hover').animate({
        right: '0px'
    },250);
    $('#navbar-main').animate({
        right: '-150px'
    },250);
});