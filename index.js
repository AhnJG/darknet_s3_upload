var express = require('express');
var multer = require('multer');
var s3_upload = require('./upload.js')

var app = express();
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
    res.send('Uploaded! : '+req.file); // object를 리턴함
    console.log(req.file); // 콘솔(터미널)을 통해서 req.file Object 내용 확인 가능.
    
    s3_upload(req.file.path, req.file.filename);
  });
