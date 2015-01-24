var app = app || {};

app.Event = function (data) {
  this.name = m.prop(data.name);
	this.description = m.prop(data.description);
  this.effect = m.prop(data.effect);
};
