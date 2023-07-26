"use strict";
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const dynamo = new DynamoDBDocumentClient();
let tableName = 'emperor';

export const handlePut = async (event) => {
    let body;
    let statusCode = 200;
    let headers = {
        'Content-Type': 'application/json'
    };

    try {
        const obj = JSON.parse(event.body);
        await dynamo.send(
            new PutCommand({
                TableName: tableName,
                Item: {
                    id: event.pathParameters.id,
                    name: obj.name,
                    age: obj.age
                }
            })
        );
        body = `Updated person with id: ${event.pathParameters.id}`;
    } catch (err) {
        statusCode = 400;
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers
    };
};

