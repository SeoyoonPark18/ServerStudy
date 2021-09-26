const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');



var db;
MongoClient.connect('mongodb+srv://tjdbs118:zhzhdk118@cluster0.b56ue.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
 function(에러, client){

    if(에러) {return console.log(에러)}

    db = client.db('todoapp');
    //db.collection('post').insertOne({이름: 'John', _id: 18}, function(에러,결과){
    //    console.log('저장완료');
    //});


    app.listen(8080, function(){
        console.log('listening on 8080')
    });
})



//누군가가 /pet 을 방문을 하면..
//pet 관련된 안내문을 띄워주자

app.get('/', function(요청, 응답){
    응답.sendFile(__dirname + '/index.html')
});

app.get('/write', function(요청, 응답){
    응답.sendFile(__dirname + '/write.html')
});

app.post('/add', function(요청, 응답){
    응답.send('전송완료');
    db.collection('post').insertOne({제목: 요청.body.title, 날짜: 요청.body.date}, function(){
        console.log('저장완료');
    });

});

app.get('/list', function(요청, 응답){

    db.collection('post').find().toArray(function(에러, 결과){
        console.log(결과);
        응답.render('list.ejs', {posts : 결과 });
    }); //모든데이터 가져오기

    

});
