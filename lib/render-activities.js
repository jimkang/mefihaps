function createRenderActivities(createOpts) {
  var d3;
  var activityClass = 'activity';

  if (createOpts) {
    d3 = createOpts.d3;
    activityClass = createOpts.activityClass;
  }

  function renderActivities(opts) {
    var root;
    var activities;

    if (opts) {
      root = d3.select(opts.root);
      activities = opts.activities;
    }

    debugger;
    activities = activities.sort(activityAIsOlderThanActivityB);


    // TODO: Add ids for activities and use them as identifiers here.
    var update = root.selectAll('.' + activityClass).data(activities);

    update.enter()
      .append('div').classed(activityClass, true)
      .each(renderActivityContents);
  }

  function renderActivityContents(d) {
    d3.select(this).html(d.html);
  }

  return renderActivities;
}

function activityAIsOlderThanActivityB(a, b) {
  return a.stamp < b.stamp;
}

module.exports = createRenderActivities;