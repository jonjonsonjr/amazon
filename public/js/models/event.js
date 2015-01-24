var app = app || {};

app.Event = function (data) {
  this.name = m.prop(data.name);
	this.description = m.prop(data.description);
  this.length = m.prop(data.length || Infinity);
  this.ticks = m.prop(data.ticks || 0);
  this.effect = m.prop(data.effect);
};
