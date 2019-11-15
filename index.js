var express = require('express');
var multer = require('multer');
var s3_upload = require('./upload.js')
var db_query = require('./db_query.js')
var app = express();
var bodyParser = require('body-parser')
require('date-utils')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const PORT = 3000;

app.listen(PORT, function () {
  console.log('Node.js server is running on port ' + PORT);
});

const crypto = require('crypto');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
    },
    filename: function (req, file, cb) {
        // 랜덤 해쉬 생성 (난수 + timestamp)
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        hash_filename = crypto.createHash('sha1').update(current_date + random).digest('hex');
        
        cb(null, hash_filename + '.jpg') // cb 콜백함수를 통해 전송된 파일 이름 설정
    }
  })
var upload = multer({ storage: storage })

app.post('/upload', upload.single('userfile'), function(req, res){
    var newDate = new Date();
    var time = newDate.toFormat('YYYYMMDD');
    fileName = 'darknet/atv/'+ time + '/' + req.file.filename;

    res.send(fileName); // object를 리턴함
    console.log(fileName); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
    
    s3_upload(req.file.path, fileName);
  });

app.post('/result', function(req, res){
    db_query(req.body.file, res);
});
