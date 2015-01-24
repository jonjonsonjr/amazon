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
    }
  };
};
