var app = app || {};

app.view = function (ctrl) {
  var user = app.user;
  return m("html", [
    m("body", [
      m("table", [
        m("tr", [m("td", "Name"), m("td", user.name())]),
        m("tr", [m("td", "Job"), m("td", user.job().name())]),
        m("tr", [m("td", "Health"), m("td", user.health())]),
        m("tr", [m("td", "Money"), m("td", user.money())]),
        m("tr", [m("td", "Energy"), m("td", user.energy())])
      ]),
      m("button", {
        onclick: ctrl.work,
        style: {
          "height": "100px",
          "width": "100px",
          "border-radius": "50px",
          "border": "1px solid #000",
          "background-color": (user.energy() > 0) ? "#fff" : "#f44336"
        }
      }, "Work")
    ])
  ]);
};
