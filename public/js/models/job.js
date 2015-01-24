var app = app || {};

app.Job = function (data) {
  this.name = m.prop(data.name);
	this.pay = m.prop(data.pay); // pay
	this.difficulty = m.prop(data.difficulty); // rate of fatigue
};
