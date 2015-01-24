var app = app || {};

(function () {
  var job = new app.Job({
    name: "Shitty Job",
    pay: 1,
    difficulty: 1
  });

  app.user = new app.User({
    name: "Jon",
    job: job,
    health: 100,
    health_mods: [],
    money: 100,
    money_mods: []
  });
}());
