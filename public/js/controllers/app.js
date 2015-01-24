var app = app || {};

app.controller = function () {
  this.work = function () {
    var user = app.user;
    var job = user.job();

    user.money(user.money() + job.pay());

    if (user.energy() > 0) {
      user.energy(user.energy() - job.difficulty());
    } else {
      user.health(user.health() - job.difficulty());

      if (user.health() <= 0) {
        this.die();
      }
    }
  }.bind(this);

  this.buyItem = function (item_id) {
    console.log("Buying: " + item_id);
    var item = _.find(app.items, function (item) { return item.id() === item_id; });

    if (!item) return console.log("Can't find item");

    var user = app.user;
    user.items().push(item);
    user.money(user.money() - item.cost());
  }

  this.die = function () {
    console.log('You died :(');
    clearInterval(app.interval);
  };
};
