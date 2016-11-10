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

      $("#first, #second").fadeOut(50, function () {
        $("#first").html(couple.first);
        $("#second").html(couple.second);

        $("#first, #second").fadeIn(200);
      })
    }

    function transitionIntoView() {
      $("#loading")
        .fadeOut(100, function () {
          $("#contentWrapper").fadeIn(300);
        })
    }

    function init() {
      getWordsFromDB(function (words) {
          setWords(words);
          generateCouple();

          $("#generate").on('click', generateCouple);

          transitionIntoView();
      });
    }

    init();
});
