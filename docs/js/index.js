/* global _, $, firebase*/
/* eslint-disable no-var */
(function () {

	var first = ['בקתת', 'שקיעת', 'נוף', 'ריח', 'חאן', 'בוטיק', 'למרגלות', 'אחוזת', 'נופי', 'לאור', 'סוד', 'דרך', 'קסם', 'סוויטת', 'פנינת', 'זריחת', 'שואת', 'שביל', 'מערת', 'פיסת', 'פינת', 'חלום', 'שירת', 'בית', 'כרם', 'ורד', 'נרקיס', 'בוסתן', 'בלקון', 'חוות', 'מעלה', 'ערוגות', 'בצל', 'ניצני', 'טירת', 'ענני', 'הר', 'אירוס', 'שחר', 'צור', 'צוק', 'צליל', 'משעול', 'מצפה', 'תלם'];
	var second = ['האלון', 'הים התיכון', 'הרקפת', 'הכנרת', 'האוהבים', 'החורש', 'התבור', 'הגולן', 'השלווה', 'האקליפטוס', 'הקסם', 'בראשית', 'הצוק', 'התמר', 'הירוק', 'הגליל', 'האינסוף', 'המשי', 'הורד', 'האיכר', 'הבריאה', 'הכרם', 'ההרים', 'הבושם', 'הטבע', 'הנחל', 'הירח', 'הפרדס', 'האביב', 'הצפון', 'אלישבע', 'רנסנס', 'המדבר', 'הקשת', 'התקווה', 'הברבור', 'האירוסים', 'הצור', 'השחר', 'הארזים', 'הבשן', 'הבשור', 'התות', 'העמק', 'התאנה', 'הגלבוע', 'האלה', 'הארץ'];

	function fetchWords(cb) {
		firebase.database().ref('words').once('value', function (snapshot) {
			cb(snapshot.val());
		});
	}

	function setWords(words) {
		first = _.values(words.first);
		second = _.values(words.second);
	}

	function setCoupleHtml(couple) {
		$('.first').html(couple.first);
		$('.second').html(couple.second);
	}

	function generateCouple(withAnimation) {
		var couple = {
			first: _.sample(first),
			second: _.sample(second)
		};

		if (withAnimation) {
			$('.first, .second').fadeOut('fast', function () {
				setCoupleHtml(couple);
				$('.first, .second').fadeIn('fast');
			});
		} else {
			setCoupleHtml(couple);
		}
	}

	function init() {
		generateCouple();
		$('.generate-button').on('click', generateCouple);

		fetchWords(setWords);
	}

	init();
})();
