const fs = require('fs');
const AWS = require('aws-sdk');

// The name of the bucket that you have created
const BUCKET_NAME = 'flxr-yolo';
const s3 = new AWS.S3();

require('date-utils')
const uploadFile = (filePath, fileName) => {
    // Read content from the file
    const fileContent = fs.readFileSync(filePath);

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

