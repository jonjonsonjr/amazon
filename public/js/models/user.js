var app = app || {};

app.User = function (data) {
  this.name = m.prop(data.name);
	this.job = m.prop(data.job);
  this.items = m.prop(data.items || []);
  this.quests = m.prop(data.quests || []);
  this.health = m.prop(data.health || 100);
  this.max_health = m.prop(data.max_health || 100);
  this.health_mods = m.prop(data.health_mods || []);
  this.money = m.prop(data.money || 100);
  this.money_mods = m.prop(data.money_mods || []);
  this.energy = m.prop(data.energy || 100);
  this.max_energy = m.prop(data.max_energy || 100);
  this.energy_mods = m.prop(data.energy_mods || []);
};

app.User.prototype.die = function () {
  console.log('You died :(');
  clearInterval(app.interval);
  clearInterval(app.timeInterval);
};
