var app = app || {};

(function () {
  app.clock = 0;
  app.day = 1;
  app.time = moment().hour(0).minute(0).second(0);

  app.logs = new app.LogList();

  // Create user
  app.user = new app.User({
    name: "Jon",
    health: 10,
    max_health: 100,
    energy: 10,
    max_energy: 100,
    money: 5,
    job: new app.Job({
      name: "Depressing Job",
      pay: 2,
      difficulty: 10
    })
  });

  app.user.health_mods().push(new app.Event({
    name: "Depression",
    description: "Life is hard, man.",
    effect: function (ticks) {
      var user = app.user;
      var change = -1 * app.day;
      user.health(user.health() + change);
      console.log(this.name() + ": " + change + " happiness");
    }
  }));

  app.user.energy_mods().push(new app.Event({
    name: "Normal Recovery",
    description: "Default energy regeneration of 1 per tick",
    effect: function (ticks) {
      var user = app.user;
      user.energy(user.energy() + 1);
    }
  }));

  app.user.quests().push(app.quests.shift()());
  app.logs.add(new app.Log("New quest: <strong>" + app.user.quests()[0].name() + "</strong>"));
}());
