var app = app || {};
var job = {};

var Job = function (data) {
  this.name = m.prop(data.name);
	this.rate = m.prop(data.rate);
	this.tolerability = m.prop(data.tolerability);
	this.
};

job.vm = (function () {
  var vm = {};
  vm.init = function () {
    vm.description = m.prop("");
		vm.work = function () {
			return 
		}
  };
  return vm
}());

job.controller = function () {
  todo.vm.init();
};

job.view = function () {
  return m("html", [
      m("body", [
        m("input", {
          onchange: m.withAttr("value", todo.vm.description),
          value: todo.vm.description()
        }),
        m("button", {
					onclick: todo.vm.add,
					style: {
						"height": "50px",
						"width": "50px",
						"border-radius": "50px",
						"border": "1px solid #000"
					}
				}, "Work"),
        m("table", [
          todo.vm.list.map(function (task, index) {
            return m("tr", [
              m("td", [
                m("input[type=checkbox]", {
                  onclick: m.withAttr("checked", task.done),
                  checked: task.done()
                })
              ]),
              m("td", {
                style: {
                  textDecoration: task.done() ? "line-through" : "none"
                }
              },
              task.description()),
            ]);
          })
        ])
      ])
    ]);
};
