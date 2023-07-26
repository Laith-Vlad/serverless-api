"use strict";
import { DynamoDBDocumentClient, ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';


const dynamo = DynamoDBDocumentClient.from(client);
let tableName = 'emperor';



export const handleGetAll = async () => {
    let body;
    let statusCode = 200;
    let headers = {
        'Content-Type': 'application/json'
    };

    try {
        body = await dynamo.send(
            new ScanCommand({ TableName: tableName })
        );
        body = body.Items;
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

export const handleGetById = async (event) => {
    let body;
    let statusCode = 200;
    let headers = {
        'Content-Type': 'application/json'
    };

    try {
        body = await dynamo.send(
            new GetCommand({
                TableName: tableName,
                Key: {
                    id: event.pathParameters.id
                }
            })
        );
        body = body.Item;
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
