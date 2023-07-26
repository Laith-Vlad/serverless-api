"use strict";
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const dynamo = new DynamoDBDocumentClient();
let tableName = 'emperor';

export const handlePost = async (event) => {
    let body;
    let statusCode = 200;
    let headers = {
        'Content-Type': 'application/json'
    };

    try {
        const newPerson = JSON.parse(event.body);
        await dynamo.send(
            new PutCommand({
                TableName: tableName,
                Item: {
                    id: newPerson.id,
                    name: newPerson.name,
                    age: newPerson.age
                }
            })
        );
        body = `Created new emp with id: ${newPerson.id}`;
        statusCode = 201;
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
