var AWS = require("aws-sdk");
AWS.config.update({region:'ap-northeast-2'});

var docClient = new AWS.DynamoDB.DocumentClient();

const darknet_query = (filename, res) => {
    console.log("Querying for darknet from image name");

    var params = {
        TableName : "flxr",
        KeyConditionExpression: "filename = :filename",
        ExpressionAttributeValues: {
            ":filename": filename
        }
    };

    var result;
    docClient.query(params, function(err, data) {
        if (err) {
            console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
        } else {
            console.log("Query succeeded.");
            data.Items.forEach(function(item) {
                console.log(" -", item.filename + ": " + item.predicts);
                result = item;
            });
        }
        res.json(result);
        console.log(result);
    });

    
}

module.exports = darknet_query;