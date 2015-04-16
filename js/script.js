var guess = function() {

    var $remaining = $('span.remaining'),
        $user_number = $('input.game-input'),
        $current_status = $('div.current-status h2'),
        $guess_list = $('ul.guess-list'),
        $hint = $('div.hint'),
        $loser_modal = $('#loser-modal'),
        $winner_modal = $('#winner-modal'),
        $first_time_modal = $('#first-time-modal'),
        $modal = $('.modal');

    var remaing_number = 5;

    var random,
        temp;

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

            _check.hot_or_cold(parseInt(number_guess));
            _check.check_int(number_guess, minus_one);
        },
        check_int: function(user_guess, guess_left) {
            if($.isNumeric(user_guess)) {
                _check.minus_one(guess_left);
                _set.guess_list(user_guess);
            } else {
                _check.minus_one(guess_left);
                _set.guess_list(0);
                _set.not_a_number();
            }
        },
        minus_one: function(left) {
            var left_over = parseInt(left);

            if(left_over === 1) {
                _set.you_lose();
                _load.number_remaining(left_over - 1);
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
            $loser_modal.modal('show');
        },
        not_a_number: function() {
            console.log('that is not a number');
        },
        play_again: function() {
            _load.init();
            _set.reset();
            $modal.modal('hide');
        },
        tempature: function(temp) {
            var image_number = _set.random_temp();

            if(temp === 'hot') {
                $current_status.text('HOT!');
            } else if(temp === 'cold') {
                $current_status.text('COLD!');
            }
        },
        winner: function() {
            if($guess_list.children('li').length === 0) {
                $first_time_modal.modal('show');
            } else {
                $winner_modal.modal('show');
            }
        },
        random_temp: function() {
            return Math.floor(Math.random() * 3) + 1
        },
        guess_list: function(user_guess) {
            $guess_list.append('<li class="guess">' + user_guess + '</li>');
        },
        reset: function() {
            $user_number.val('');
            $guess_list.html('');
            $hint.html('');
            $current_status.text('');
        }
    }

    var _hint = {
        give: function() {
            var between = _hint.find_between();

            _check.minus_one(_store.remainder);

            $hint.children('h2').text(between);
        },
        find_between: function() {
            var low = _store.random_num - 10,
                high = _store.random_num + 10;

            if(low <= 0) {
                low = 0
            }
            if(high >= 100) {
                high = 100;
            }

            return 'The number is between ' + low + ' and ' + high;
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
        check: _check.register,
        hint: _hint
    }
}();