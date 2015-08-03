var test = require('tape');
var getActivitiesFromHTML = require('../lib/get-activities-from-html');
var fs = require('fs');
var jsonfile = require('jsonfile');

var userActivityHTML = fs.readFileSync(
  __dirname + '/fixtures/user-activity.html',
  {
    encoding: 'utf8'
  }
);

var expectedActivities = jsonfile.readFileSync(
  __dirname + '/fixtures/expected-user-activity.json'
);

expectedActivities = expectedActivities.map(restoreDate);

test('Parse test', function parseTest(t) {
  t.plan(expectedActivities.length);
  var activities = getActivitiesFromHTML(userActivityHTML);

  activities.forEach(checkActivity);

  function checkActivity(activity, i) {
    t.deepEqual(activity, expectedActivities[i], 'Parses activity correctly.');
  }
});

function restoreDate(activity) {
  return {
    html: activity.html,
    stamp: new Date(activity.stamp)
  };
}
