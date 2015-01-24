var app = app || {};

app.Log = function (data) {
	this.day = app.day;
	this.time = app.time.format("h:mm a");
	this.message = m.prop(data);
};

app.LogList = Array;
app.LogList.prototype.add = function (log) {
	this.unshift(log);
};
