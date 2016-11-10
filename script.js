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

    function generateCouple() {
      var couple = {
        first: _.sample(first),
        second: _.sample(second)
      };

      $("#first").html(couple.first);
      $("#second").html(couple.second);
    }

    function transitionIntoView() {
      $("#loading")
        .fadeOut(100, function () {
          $("#contentWrapper").fadeIn(300);
        })
    }

    function init() {
      $("#generate").on('click', generateCouple);

      getWordsFromDB(function (words) {
          setWords(words);
          generateCouple();

          transitionIntoView();
      });
    }

    init();
});
