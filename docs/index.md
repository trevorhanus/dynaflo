WTF was AWS doing when they wrote the node SDK for DynamoDB? Working with it feels like stepping back in time 10 years. Dynanode is how AWS should have built their SDK. It was built by JavaScript Developer's for JavaScipt Developer's. It's api will feel much more natural to those who are used to lightweight and intuitive libraries.

Dynanode is a wrapper for the [AWS DynamoDB DocumentClient SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html) for node. Dynanode's goal is to make it easier to work with DynamoDB in node.

One simple way Dynanode makes things easier is that all methods return Promises instead of using callbacks.

**Useful Links**

[AWS DynamoDB Docs](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/)

[DynamoDB API](http://docs.aws.amazon.com/amazondynamodb/latest/APIReference/Welcome.html)