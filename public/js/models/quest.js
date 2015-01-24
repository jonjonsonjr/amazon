var app = app || {};

app.Quest = function (data) {
  this.name = m.prop(data.name);
  this.description = m.prop(data.description);
  this.predicate = m.prop(data.predicate);
  this.reward = m.prop(data.reward);
};
