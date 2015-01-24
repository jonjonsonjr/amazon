var app = app || {};

app.Job = function (data) {
  this.id = m.prop(data.id || 0);
  this.name = m.prop(data.name);
	this.pay = m.prop(data.pay);
	this.difficulty = m.prop(data.difficulty);
};
