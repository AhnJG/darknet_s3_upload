const fs = require('fs');
const AWS = require('aws-sdk');

// Enter copied or downloaded access ID and secret key here
const ID = '';
const SECRET = '';

// The name of the bucket that you have created
const BUCKET_NAME = 'flxr-yolo';
const s3 = new AWS.S3();
// const s3 = new AWS.S3({
//     accessKeyId: ID,
//     secretAccessKey: SECRET
// });

var moment = require('moment');
require('date-utils')
const uploadFile = (filePath, fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(filePath);

    var newDate = new Date();
    var time = newDate.toFormat('YYYYMMDD');
    fileName = 'darknet/atv/'+ time + '/' + fileName

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);
    });
};

module.exports = uploadFile;

