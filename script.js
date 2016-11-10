$(function () {

  var first = [];
  var second = [];

  function getWordsFromDB(cb) {
    firebase.database().ref('data').once('value', function (snapshot) {
        cb(snapshot.val())
    });
  }

  function setWords(words) {
    first = words.first;
    second = words.second;
  }

    // var first = [
    //   'בצל',
    //   'נוף',
    //   'בקתת',
    //   'למרגלות',
    //   'אחוזת',
    //   'נופי',
    //   'לאור',
    //   'סוד',
    //   'דרך',
    //   'קסם',
    //   'סוויטת',
    //   'פנינת',
    //   'זריחת'
    // ];
    // var second = [
    //   'האלון',
    //   'הכנרת',
    //   'האוהבים',
    //   'החורש',
    //   'התבור',
    //   'הגולן',
    //   'השלווה',
    //   'האקליפטוס',
    //   'הקסם',
    //   'בראשית',
    //   'הצוק',
    //   'התמר'
    // ];

    function generateCouple() {
      var couple = {
        first: _.sample(first),
        second: _.sample(second)
      };

      $("#first").html(couple.first);
      $("#second").html(couple.second);
    }

    function init() {
      $("#generate").on('click', generateCouple);
      
      getWordsFromDB(function (words) {
          setWords(words);
          generateCouple();
      });
    }

    init();
});
