var app = app || {};

app.view = function (ctrl) {
  var user = app.user;
  return m("html", [
    m("head", [
      m("link", {
        href: "vendor/bootstrap/dist/css/bootstrap.min.css",
        rel: "stylesheet"
      }),
      m("link", {
        href: "css/style.css",
        rel: "stylesheet"
      })
    ]),
    m("body", (user.health() <= 0) ? [
      m("div", {class: "container"}, [
        m("div", {class: "jumbotron", style: {"margin-top": "200px"}}, [
          m("h1", "You Died :(")
        ])
      ])
    ] : [
      m("div", {class: "container"}, [
        m("div", {class: "row"}, [
          m("h2", "Amazon"),
          m("table", {class: "table"}, [
            m("tr", [
              app.items.filter(function (item, i) {
                return i < 5;
              })
              .map(function (item) {
                return m("td",
                  m("div", [
                    m("h4", item.name),
                    m("p", m("img", {onclick: ctrl.buyItem.bind(ctrl, item.id), class: "item", src: item.image})),
                    m("strong", {
                      style: {
                        color: item.cost > user.money() ? "#d9534f" : "#000"
                      }
                    }, "$" + item.cost)
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
              m("tr", [m("td", "Money"), m("td", "$" + user.money())]),
              m("tr", [m("td", "Happiness"), m("td", user.health() + " / " + user.max_health())]),
              m("tr", [m("td", "Energy"), m("td", user.energy() + " / " + user.max_energy())]),
              m("tr", [m("td", m.trust("&nbsp")), m("td", m.trust("&nbsp"))]),
              m("tr", [m("td", "Day"), m("td", app.day)]),
              m("tr", [m("td", "Time"), m("td", {"id": "clock"}, app.time.format("h:mm a"))])
            ])
          ]),
          m("div", {class: "col-md-2"}, [
            m("h2", "Job"),
            m("button", {
              onclick: ctrl.work,
              class: "work",
              style: {
                "background-color": (user.energy() < user.job().difficulty()) ? "#d9534f" : "#fff"
              }
            }, "Work")
          ]),
          m("div", {class: "col-md-6"}, [
            m("h2", "Quests"),
            m("table", {class: "table"}, [
              app.user.quests().map(function (quest, i) {
                return m("tr", [
                  m("td", m("strong", quest.name())),
                  m("td", quest.description())
                ]);
              })
            ])
          ])
        ]),
        m("div", {class: "row"}, [
          m("div", {class: "col-md-6"}, [
            m("h2", "My Stuff"),
            m("table", {class: "table"}, [
              app.user.items().map(function (item, i) {
                return m("tr", {onclick: ctrl.sellItem.bind(ctrl, i)}, [
                  m("td", m("img", {class: "smaller", src: item.image()})),
                  m("td", m("strong", item.name())),
                  m("td", m("button", {class: "btn btn-default"}, "Sell"))
                ]);
              })
            ])
          ]),
          m("div", {class: "col-md-6"}, [
            m("h2", "Logs"),
            m("table", {class: "table"}, [
              app.logs.map(function (log, i) {
                return m("tr", [
                  m("td", "Day " + log.day),
                  m("td", log.time),
                  m("td", m.trust(log.message()))
                ]);
              })
            ])
          ])
        ]),
      ])
    ])
  ]);
};
