var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function(err, db) {
  if(err) console.error("Database Connection Failed");
  console.log("Connection Established...");

  var data = db.collection('students');
  var cur = data.find( { "scores.type":"homework" });
  var counter = 0;
  cur.each(function(err,doc){
    if(err) console.error("Cursor gave an error");
    if(doc === null) return db.close();
    // console.dir(counter);
    doc.scores[2].score > doc.scores[3].score ? doc.scores.pop() : doc.scores.splice(2, 1);
    data.save(doc, function(err,saved) {
      if(err) throw err;
      // console.dir("Successfully saved " + saved);
    });
    counter++;
  })
})
