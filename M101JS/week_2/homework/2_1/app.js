var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function(err, db) {
  if(err) throw err;

  var data = db.collection('data');
  var options = {
    'skip': 0,
    'sort': [['State', 1], ['Temperature', -1]]
  };
  var cursor = data.find({}, {}, options);
  var states = [];
  cursor.each(function(err, doc) {
    if(err) throw err;
    if(doc === null) { return db.close(); }
    if(states.indexOf(doc.State) == -1) {
      doc['month_high'] = true;
      data.save(doc,function(err, saved) {
        if(err) throw err;
        console.dir("Successfully saved " + saved);
        // db.close();
      });
      states.push(doc.State);
    }
  });
  // return db.close();
});
