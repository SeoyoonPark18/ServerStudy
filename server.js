const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

const MongoClient = require('mongodb').MongoClient;
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

//어떤 사람이 /add 경로로 POST 요청을 하면...
//??를 해주세요~

app.post('/add', function(요청, 응답){
    응답.send('전송완료');
    db.collection('post').insertOne({제목: 요청.body.title, 날짜: 요청.body.date}, function(){
        console.log('저장완료');
    });
});

//어떤 사람이 /add라는 경로로 post 요청을 하면,
//데이터 2개(날짜, 제목)을 보내주는데,
//이 때 'post'라는 이름을 가진 collection에 2개 데이터 저장하기
//{제목: '어쩌구, 날짜: '어쩌구'}