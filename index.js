
//const express = rqeuire('express');
import express from 'express';
import Datastore from 'nedb';
import path from 'path'
import fetch from 'node-fetch'
import {fileURLToPath} from 'url';
import DomParser from 'dom-parser';
import parser from 'xml-parser';
import strinfify from 'xml-stringify';

//var parser = new DomParser();
const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);

// 👇️ "/home/borislav/Desktop/javascript/dist/index.html"
console.log(path.join(__dirname, '/dist', 'index.html'));

const app = express();

app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));

//app.use(express.static(path.join('public', 'public')));
//app.use(express.static('RecommendationSite'));

app.use(express.json({limit: '1mb'}));


const router = express.Router();
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/views/index.html');
});

app.get('/public/views/index2.html', function(request, response) {
  response.sendFile(__dirname + '/public/views/index2.html');
});

app.get('/public/views/index.html', function(request, response) {
  response.sendFile(__dirname + '/public/views/index.html');
});
///RecommendationSite/HotgamesSite/index.html
app.get('/public/views/index3.html', function(request, response) {
  response.sendFile(__dirname + '/public/views/index3.html');
});



const database = new Datastore('database.db');
database.loadDatabase();
/*
app.get('/api', (request, respone)=> {
database.find({}, (err, data) => {
        if (err) {
            respone.end();
            return;
        }
        app.use(express.static('RecommendationSite'));

        console.log(data)
        respone.json(data);
    });
});

*/
app.post('/api', (request, response)=> {
    console.log('i got a request')
    //console.log(request.body);
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);

    console.log(data);
    response.json(data);
    /*
    response.json({
        status: 'success',
        username: data.username,
        timestamp: timestamp
    })
    */
})

let todo = {
  userId: 123,
  title: "loren impsum doloris",
  completed: false
};

app.get('/hotgames',(request, respone) => {
  fetch('https://boardgamegeek.com/xmlapi2/hot?type=boardgame', {
  method: 'GET',
  //body: xml.stringify(todo),
  //headers: { 'Content-Type': 'application/json' }
}).then(res => res.text())
.then(json => {
      //console.log(json)
    //console.log(json.length)
    //console.log(request)
    //console.log(respone)
    //respone = json;
    respone.json(json)
    //console.log(respone)
});
});

app.get('/boardgames',(request, respone) => {
  fetch('https://boardgamegeek.com/xmlapi2/search?query= &type=boardgame', {
  method: 'GET',
  //body: xml.stringify(todo),
  //headers: { 'Content-Type': 'application/json' }
}).then(res => res.text())
.then(json => {
      //console.log(json)
    //console.log(json.length)
    //console.log(request)
    //console.log(respone)
    //respone = json;
    respone.json(json)
    //console.log(respone)
});
});


app.get('/collection/:name',(request, respone) => {
  const name = request.params.name;
  console.log(name)
  fetch('https://boardgamegeek.com/xmlapi2/collection?username='+name, {
  method: 'GET',
}).then(res => res.text())
.then(json => {
    respone.json(json)
});
});


app.get('/ExpansionsAndImplementation/:id',(request, respone) => {
  //console.log(request)
  const id = request.params.id;
  console.log(id)

  fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${id}`, {
  method: 'GET',
  //body: xml.stringify(todo),
  //headers: { 'Content-Type': 'application/json' }
}).then(res => res.text())
.then(json => {
      //console.log(json)
    //console.log(json.length)
    //console.log(request)
    //console.log(respone)
    //respone = json;
    respone.json(json)
    //console.log(respone)
});
});
//CategoryMechanic
app.get('/CategoryMechanic/:id',(request, respone) => {
  //console.log(request)
  const id = request.params.id;
  //console.log(id)

  fetch(`https://boardgamegeek.com/xmlapi2/thing?id=${id}`, {
  method: 'GET',
  //body: xml.stringify(todo),
  //headers: { 'Content-Type': 'application/json' }
}).then(res => res.text())
.then(json => {
      //console.log(json)
    //console.log(json.length)
    //console.log(request)
    //console.log(respone)
    //respone = json;
    respone.json(json)
    //console.log(respone)
});
});

/*
app.get('/search/:domain', async(request, response) => {
  // or rquest.params['domain']
  console.log("ddddddddddddddddddddddddd")
  console.log(request.params);
  const dom = request.params.domain;
  console.log(dom);
  // if there is tow parameters in domain then =>
  // const x = domain[0];
  // const y = domain[1];

  const api_url = `https://boardgamegeek.com/xmlapi2/search?query= &type=${domain}`;
  const fetch_response = await fetch(api_url);
  const json = await fetch_response.json();
  response.json(json);
});
*/

