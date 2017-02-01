/* global _, $, firebase*/
/* eslint-disable no-var */
$(function () {

	var first = [];
	var second = [];

	function getWordsFromDB(cb) {
		firebase.database().ref('words').once('value', function (snapshot) {
			cb(snapshot.val());
		});
	}

	function setWords(words) {
		first = _.values(words.first);
		second = _.values(words.second);
	}

	function generateCouple() {
		var couple = {
			first: _.sample(first),
			second: _.sample(second)
		};

		$('.first, .second').fadeOut('fast', function () {
			$('.first').html(couple.first);
			$('.second').html(couple.second);

			$('.first, .second').fadeIn('fast');
		});
	}

	function transitionIntoView() {
		$('#loading')
			.fadeOut(100, function () {
				$('#contentWrapper').fadeIn(300);
			});
	}

	function init() {
		getWordsFromDB(function (words) {
			setWords(words);
			generateCouple();

			$('.generate-button').on('click', generateCouple);

			transitionIntoView();
		});
	}

	init();
});
