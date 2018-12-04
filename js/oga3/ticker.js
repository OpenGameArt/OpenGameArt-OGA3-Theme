;(function($){
  $('.marquee').marquee({
    //speed of the marquee
    speed: 10,
    //gap in pixels between the tickers
    gap: 0,
    //time in milliseconds before the marquee will start animating
    delayBeforeStart: 3000,
    //'left' or 'right'
    direction: 'left',
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: true,

    pauseOnHover: true,
    
    startVisible: true,
  });
})(jQuery);
