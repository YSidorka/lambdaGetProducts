import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  ScanCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
    sslEnabled: false
});

const dynamo = DynamoDBDocumentClient.from(client);
const tableName = process.env.TABLE;

export const handler = async(event) => {
    const params = { TableName: tableName };

    console.log(params);

    const data = await dynamo.send(new ScanCommand(params));
    const result = data?.Items || []; 
    const response = {
        statusCode: 200,
        body: result
    };
    return response;
};
