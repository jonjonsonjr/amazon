var app = app || {};

app.Item = function (data) {
  this.id = m.prop(data.id || 0);
  this.name = m.prop(data.name);
	this.cost = m.prop(data.cost);
  this.description = m.prop(data.description || "This is a default description");
  this.image = m.prop(data.image);
	this.health_mod = m.prop(data.health_mod);
};

app.ItemList = Array;
