var app = app || {};

app.controller = function () {
  this.work = function () {
    var user = app.user;
    var job = user.job();

    if (user.energy() >= job.difficulty()) {
      user.energy(user.energy() - job.difficulty());
    } else if (user.health() <= job.difficulty()) {
      user.health(0);
      user.die();
    } else {
      user.health(user.health() - job.difficulty());
    }

    var paycheck = user.money() + job.pay();
    user.money(paycheck);
  }.bind(this);

  this.buyItem = function (item_id) {
    var user = app.user;
    var item_data = _.extend({}, _.findWhere(app.items, {id: item_id}));

    if (item_data.cost > user.money()) return console.log("Insufficient funds for " + item_data.name);

    var health_mod = new app.Event(item_data.health_mod);
    item_data.health_mod = health_mod;
    var item = new app.Item(item_data);

    if (!item) return console.log("Can't find item");

    user.items().push(item);
    user.money(user.money() - item.cost());
  };

  // Selling it gets you a random amount back based on how old it is
  this.sellItem = function (index) {
    var item = app.user.items().splice(index, 1)[0];

    if (!item) return console.log("Can't find item");

    var mod = item.health_mod();
    var remaining_time = (mod.length() - mod.ticks()) / mod.length();
    var value = 1 + ((mod.length() === Infinity)
                  ? 0
                  : Math.floor(item.cost() * remaining_time * Math.random()));

    app.user.money(app.user.money() + value);
  };
};
