var guess = function() {

    var $remaining = $('span.remaining'),
        $user_number = $('input.game-input'),
        $temp_img = $('div.current_status img');

    var remaing_number = 5;

    var random,
        temp;

    var temp_images = {
        hot: ['http://i.giphy.com/PCxzeSqlWt05O.gif', 'http://i.giphy.com/CnPj5PVSJHVzG.gif', 'http://i.giphy.com/AXk4V1KZBdCO4.gif'],
        cold: ['http://i.giphy.com/10PrLKmZzVcK9a.gif', 'http://i.giphy.com/nUA07lc5wis5a.gif', 'http://i.giphy.com/PEKztVNo5AMyk.gif']
    }

    var _load = {
        init: function() {
            _store.random_num = _load.random_number();
            _load.number_remaining(remaing_number);
        },
        random_number: function() {
            var random = Math.floor(Math.random() * 100 + 1);
            return random;
        },
        number_remaining: function(num) {
            $remaining.text(num);
            _store.remainder = num;
        }
    }

    var _check = {
        register: function() {
            var number_guess = $user_number.val(),
                minus_one = $remaining.text();

            _check.hot_or_cold(number_guess);
            _check.check_int(number_guess, minus_one);
        },
        check_int: function(user_guess, guess_left) {
            if(user_guess % 1 === 0) {
                _check.minus_one(guess_left);
            } else {
                check.minus_one(guess_left);
                _set.not_a_number();
            }
        },
        minus_one: function(left) {
            var left_over = parseInt(left);

            if(left_over === 0) {
                _set.you_lose();
            } else {
                _load.number_remaining(left_over - 1);
            }
        },
        hot_or_cold: function(user_number) {
            if(user_number > _store.random_num) {
                _set.tempature('hot');
            } else if(user_number < _store.random_num) {
                _set.tempature('cold');
            } else if(user_number === _store.random_num) {
                _set.winner();
            }
        }
    }

    var _set = {
        you_lose: function() {
            console.log('loser');
        },
        not_a_number: function() {

        },
        play_again: function() {
            _load.init();
        },
        tempature: function(temp) {
            var image_number = _set.random_temp();

            if(temp === 'hot') {
                $temp_img.attr('src', temp_images.hot[image_number]);
            } else if(temp === 'cold') {
                $temp_img.attr('src', temp_images.cold[image_number]);
            }
        },
        winner: function() {

        },
        random_temp: function() {
            return Math.random() * (0 - 2) + 0;
        }
    }

    var _store = {
        random_num: random,
        guess_total: 0,
        remainder: remaing_number,
        guesses: {}
    }

    return {
        load: _load.init,
        store: _store,
        set: _set,
        check: _check.register
    }
}();