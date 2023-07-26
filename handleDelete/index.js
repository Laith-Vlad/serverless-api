"use strict";

import { DynamoDBDocumentClient, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const dynamo = new DynamoDBDocumentClient();
let tableName = 'emperor';

export const handleDelete = async (event) => {
    let body;
    let statusCode = 200;
    let headers = {
        'Content-Type': 'application/json'
    };

    try {
        await dynamo.send(
            new DeleteCommand({
                TableName: tableName,
                Key: {
                    id: event.pathParameters.id
                }
            })
        );
        body = `Deleted people: ${event.pathParameters.id}`;
        statusCode = 204;
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
