var app = app || {};

app.view = function (ctrl) {
  var user = app.user;
  return m("html", [
    m("head", [
      m("link", {
        href: "bootstrap/dist/css/bootstrap.min.css",
        rel: "stylesheet"
      }),
      m("link", {
        href: "css/style.css",
        rel: "stylesheet"
      })
    ]),
    m("body", [
      m("div", {class: "container"}, [
        m("div", {class: "row"}, [
          m("h2", "Amazon"),
          m("table", {class: "table"}, [
            m("tr", [
              app.items.map(function (item, i) {
                return m("td", {onclick: ctrl.buyItem.bind(ctrl, item.id())},
                  m("div", [
                    m("h3", item.name()),
                    m("p", m("img", {src: item.image()})),
                    m("strong", "$" + item.cost())
                  ])
                );
              })
            ])
          ])
        ]),
        m("hr"),
        m("div", {class: "row"}, [
          m("div", {class: "col-md-4"}, [
            m("h2", "Stats"),
            m("table", {class: "table"}, [
              m("tr", [m("td", "Name"), m("td", user.name())]),
              m("tr", [m("td", "Job"), m("td", user.job().name())]),
              m("tr", [m("td", "Health"), m("td", user.health())]),
              m("tr", [m("td", "Money"), m("td", user.money())]),
              m("tr", [m("td", "Energy"), m("td", user.energy())])
            ])
          ]),
          m("div", {class: "col-md-4"}, [
            m("h2", "Job"),
            m("button", {
              onclick: ctrl.work,
              class: "work",
              style: {
                "background-color": (user.energy() > 0) ? "#fff" : "#d9534f"
              }
            }, "Work")
          ]),
          m("div", {class: "col-md-4"}, [
            m("h2", "Stuff"),
            m("table", {class: "table"}, [
              app.user.items().chunk(5).map(function (items, row) {
                return m("tr", [
                  items.map(function (item, i) {
                    return m("td", {onclick: ctrl.buyItem.bind(ctrl, item.id())},
                      m("div", [
                        m("h4", item.name()),
                        m("p", m("img", {
                          class: "smaller",
                          src: item.image()
                        })),
                        m("button", {class: "btn btn-default"}, "Sell")
                      ])
                    );
                  })
                ]);
              })
            ])
          ])
        ]),
      ])
    ])
  ]);
};

Array.prototype.chunk = function (size) {
  return _.values(_.groupBy(this, function (a, i) { return Math.floor(i / Math.round(size)); }));
};
