// Each tick is one second or 1 hour in game time
app.interval = setInterval(function () {
  var user = app.user;

  // Checks
  if (user.health() <= 0) {
    user.die();
    return;
  }

  // Handle item behavior
  user.items().forEach(function (item, i) {
    var health_mod = item.health_mod();
    var ticks = health_mod.ticks();
    var length = health_mod.length();

    if (ticks === length) {
      user.items().splice(i, 1);
      //app.logs.add(new app.Log(item.name() + " effects have worn off"));
      return;
    }

    health_mod.effect().call(item, ticks, length);
    health_mod.ticks(ticks + 1);
  });

  // Handle mods
  var mods = _.flatten([user.health_mods(), user.energy_mods()]);
  mods.forEach(function (mod, i) {
    mod.effect().call(mod, mod.ticks(), mod.length());
  });

  // Sanity Checks
  app.user.health(Math.min(user.health(), user.max_health()));
  app.user.energy(Math.min(user.energy(), user.max_energy()));

  // Handle quests
  user.quests().forEach(function (quest, i) {
    var satisfied = quest.predicate();
    if (satisfied()) {
      quest.reward()();
      user.quests().splice(i, 1);
    }
  });

  app.clock++;
  app.day = 1 + Math.floor(app.clock / 24);
  app.time.add(60, "minutes");

  if (app.clock % 24 === 0) {
    app.items.push(app.items.shift());
  }

  m.redraw();
}, 1000);
