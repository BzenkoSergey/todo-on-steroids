var express = require('express'),
    path = require('path'),
    app = express();

app.use("/", express.static(path.join(__dirname, 'dist')));
app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));

app.get('/api', function(req, res) {
    res.send('API is running');
});

app.listen(1337, function(){
    console.log('Express server listening on port 1337');
});
