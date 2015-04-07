jQuery(function($){
    guess.load();
});

$('button.guess-btn').click(function(){
    guess.check();
    return false;
});

$('button.play-again-btn').click(function(){
    guess.set.play_again();
});