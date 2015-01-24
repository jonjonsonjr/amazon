var app = app || {};

app.items = [{
    name: "Pants",
    cost: 6,
    image: "img/items/pants.jpg",
    health_mod: {
      length: Infinity,
      effect: function (ticks, length) {
        if (ticks > 24) return;
        var user = app.user;
        var change = ticks % 2 === 0 | 0;
        user.health(user.health() + change);
        console.log(this.name() + ": " + change + " happiness");
      }
    }
  }, {
    name: "Shoes",
    cost: 1,
    image: "img/items/shoes.jpg",
    health_mod: {
      name: "Health Mod",
      description: "Last a couple months",
      length: Infinity,
      effect: function (ticks, length) {
        if (ticks > 24) return;
        var user = app.user;
        var change = 1;
        user.health(user.health() + change);
        console.log(this.name() + ": " + change + " happiness");
      }
    }
  }, {
    name: "Shirt",
    cost: 5,
    image: "img/items/shirt.jpg",
    health_mod: {
      length: Infinity,
      effect: function (ticks, length) {
        if (ticks > 24) return;
        var user = app.user;
        var change = 1;
        user.health(user.health() + change);
        console.log(this.name() + ": " + change + " happiness");
      }
    }
  }, {
    name: "Caffeine Pills",
    cost: 5,
    image: "img/items/caffeine_pills.jpg",
    health_mod: {
      length: 5,
      effect: function (ticks, length) {
        var user = app.user;
        var change = length - ticks;
        user.energy(user.energy() + change);
        console.log(this.name() + ": " + change + " energy");
      }
    }
  }, {
    name: "Candy",
    cost: 10,
    image: "img/items/candy.jpg",
    health_mod: {
      length: 6,
      effect: function (ticks, length) {
        var user = app.user;
        var change = Math.round((15 - (ticks * ticks)));
        user.health(user.health() + change);
        console.log(this.name() + ": " + change + " happiness");
      }
    }
  }, {
    name: "Headphones",
    cost: 25,
    image: "img/items/headphones.jpg",
    health_mod: {
      length: Infinity,
      effect: function (ticks, length) {
        var user = app.user;
        var change = Math.round(Math.max(0, Math.sqrt((-1 * ticks) + 72) - Math.sqrt(72) + 4));

        if (change <= 0 || isNaN(change)) return;

        user.health(user.health() + change);
        console.log(this.name() + ": " + change + " happiness");
      }
    }
  }, {
    name: "Bed",
    cost: 200,
    image: "img/items/bed.jpg",
    health_mod: {
      length: Infinity,
      effect: function (ticks, length) {
        // Wake up at 6
        if (app.time.hour() !== 6) return;

        var user = app.user;
        var change = 50;
        user.energy(user.energy() + change);
        console.log(this.name() + ": " + change + " energy");
      }
    }
  }, {
    name: "The Game",
    cost: 20,
    image: "img/items/the_game.jpg",
    health_mod: {
      length: 24,
      effect: function (ticks, length) {
        var user = app.user;
        var change = 5;
        user.health(user.health() + change);
        console.log(this.name() + ": " + change + " happiness");
      }
    }
  }, {
    name: "The Ring",
    cost: 10000,
    image: "img/items/engagement_ring.jpg",
    health_mod: {
      length: Infinity,
      effect: function (ticks, length) {
        var user = app.user;
        var change = 15;
        user.health(user.health() + change);
        console.log(this.name() + ": " + change + " happiness");
      }
    }
  }
];

// TODO: Not thing... hacky
app.items.forEach(function (item, i) {
  item.id = i;
});
