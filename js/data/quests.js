var app = app || {};

app.quests = [
	(function () {
		return new app.Quest({
      name: "Dress The Part",
      description: "Get a new outfit to land a better job",
      predicate: function () {
				return checkItems([0, 1, 2]);
      },
      reward: function () {
				getBetterJob();
				nextQuest();
			}
    });
	}),
	(function () {
		return new app.Quest({
      name: "Wired For Wally World",
      description: "Max out your energy level",
      predicate: function () {
        return app.user.energy() === app.user.max_energy();
      },
      reward: function () {
				getBetterJob();
				nextQuest();
			}
		});
	}),
	(function () {
		return new app.Quest({
      name: "Sleep Better",
      description: "Acquire a bed",
      predicate: function () {
				return checkItems([6]);
      },
      reward: function () {
				app.user.max_energy(app.user.max_energy() + 50);
				app.logs.add(new app.Log("Quest complete. +50 max energy"));
				nextQuest();
			}
		});
	}),
	(function () {
		return new app.Quest({
      name: "The Loneliest Number",
      description: "Figure out how to acquire a lady friend",
      predicate: function () {
				return checkItems([7]);
      },
      reward: function () {
				app.user.max_health(app.user.max_health() + 100);
				app.user.health(app.user.max_health());
				app.logs.add(new app.Log("Quest complete. Girlfriend acquired"));
				nextQuest();
			}
		});
	}),
	(function () {
		return new app.Quest({
      name: "Seal The Deal",
      description: "Put a ring on it",
      predicate: function () {
				return checkItems([8]);
      },
      reward: function () {
				app.user.max_energy(app.user.max_energy() + 50);
				app.logs.add(new app.Log("Quest complete. Poor guy"));
			}
		});
	})
];

function checkItems(reqs) {
	var ids = app.user.items().map(function (item) {
		return item.id();
	});

	return _.intersection(reqs, ids).length === reqs.length;
}

function getBetterJob() {
	var old_job = app.user.job();
	var new_id = old_job.id() + 1;
	var new_job = new app.Job(_.extend({id: new_id}, app.jobs[new_id]));
	app.user.job(new_job);
	app.logs.add(new app.Log("Quest complete. Upgraded from <strong>" + old_job.name() + "</strong> to <strong>" + new_job.name() + "</strong>"));
}

function nextQuest() {
	app.user.quests().push(app.quests.shift()());
}
