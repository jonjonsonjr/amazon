var app = app || {};

// Some static things
var css = ["vendor/bootstrap/dist/css/bootstrap.min.css", "css/style.css"].map(function (url) {
  return m("link", {
    href: url,
    rel: "stylesheet"
  });
});

var kill_screen = [
  m("div.container", [
    m("div.jumbotron", {style: {marginTop: "200px"}}, [
      m("h1", "You Died :(")
    ])
  ])
];

app.view = function (ctrl) {
  var user = app.user;

  return m("html", [
    m("head", [css]),
    m("body", (user.health() <= 0) ? kill_screen : [
      m("div.container", [
        m("div.row", [
          m("h2", "Amazon"),
          m("table.table", [
            m("tr", [
              app.items.filter(function (item, i) {
                return i < 5;
              })
              .map(function (item) {
                return m("td",
                  m("div", [
                    m("h4", item.name),
                    m("p", m("img.item", {onclick: ctrl.buyItem.bind(ctrl, item.id), src: item.image})),
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
        m("div.row", [
          m("div.col-md-4", [
            m("h2", "Stats"),
            m("table.table", [
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
          m("div.col-md-2", [
            m("h2", "Job"),
            m("button.work", {
              onclick: ctrl.work,
              style: {
                backgroundColor: (user.energy() < user.job().difficulty()) ? "#d9534f" : "#fff"
              }
            }, "Work")
          ]),
          m("div.col-md-6", [
            m("h2", "Quests"),
            m("table.table", [
              app.user.quests().map(function (quest, i) {
                return m("tr", [
                  m("td", m("strong", quest.name())),
                  m("td", quest.description())
                ]);
              })
            ])
          ])
        ]),
        m("div.row", [
          m("div.col-md-6", [
            m("h2", "My Stuff"),
            m("table.table", [
              app.user.items().map(function (item, i) {
                return m("tr", {onclick: ctrl.sellItem.bind(ctrl, i)}, [
                  m("td", m("img.smaller", {src: item.image()})),
                  m("td", m("strong", item.name())),
                  m("td", m("button.btn.btn-default", "Sell"))
                ]);
              })
            ])
          ]),
          m("div.col-md-6", [
            m("h2", "Logs"),
            m("table.table", [
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
