var app = app || {};

(function () {
  var job = new app.Job({
    name: "Depressing Job",
    pay: 1,
    difficulty: 5
  });

  var items = new app.ItemList();

  // Create a catalogue
  [1, 2, 3, 4].forEach(function (i) {
    var item = new app.Item({
      id: i,
      name: "Item " + i,
      cost: i * 3,
      image: "http://placehold.it/100x100",
      health_mod: new app.Event({
        name: "Health Mod " + i,
        description: "This does something",
        length: 60,
        effect: function (ticks) {
          app.user.health(app.user.health() + i);
        }
      })
    });
    items.push(item);
  });

  app.items = items;

  app.user = new app.User({
    name: "Jon",
    job: job,
    health: 100,
    money: 100,
  });

  app.user.energy_mods().push(new app.Event({
    name: "Normal Recovery",
    description: "Default energy regeneration of 1 per tick",
    effect: function (ticks) {
      app.user.energy(app.user.energy() + 1);
    }
  }));

  // Each tick is one second
  app.interval = setInterval(function () {
    var user = app.user;

    // Checks
    if (user.health() <= 0) {
      app.controller.die();
      return;
    }

    // Handle item behavior
    user.items().forEach(function (item, i) {
      var health_mod = item.health_mod();
      var ticks = health_mod.ticks();

      console.log(ticks);

      // TODO: Remove; the effect function should make this obsolete (maybe)
      if (ticks === health_mod.length()) return;

      health_mod.effect()(ticks);
      health_mod.ticks(ticks + 1);
    });

    // Handle energy mods
    user.energy_mods().forEach(function (mod, i) {
      mod.effect()(mod.ticks());
    });

    m.redraw();
  }, 1000);
}());
