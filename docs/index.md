Dynanode is a wrapper around the AWS DynamoDB SDK for node. There are 
similar libraries out there, but they all seem to attempt to make DynamoDB
do something it wasn't built to do. Dynanode's goal is to make it easier to 
work with the AWS SDK while staying true to the DynamoDB way of doing things. It uses
the termonology set forth by AWS. For every method, we will show you how to do it with 
the sdk, and then how you can do it with dynanode.

All Dynanode methods return Promises instead of using callbacks.

Here is a link to the related [AWS SDK Docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)

[AWS DynamoDB Docs](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/)

[DynamoDB API](http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/Welcome.html)