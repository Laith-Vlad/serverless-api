
import { handleGetAll } from './index.js'; // Import the Lambda function
import { mockClient, mockSend } from '@aws-sdk/lib-dynamodb'; // Import AWS SDK mocking utilities

jest.mock('@aws-sdk/lib-dynamodb'); // Mock the AWS SDK

describe('handleGetAll', () => {
  it('should return an array of items from DynamoDB', async () => {
    const mockItems = [{ id: '1', name: 'John' }, { id: '2', name: 'Jane' }];

    // Mock the send method to return the desired data
    mockSend.mockResolvedValue({ Items: mockItems });

    // Call the Lambda function
    const response = await handleGetAll();

    // Assertions
    expect(mockSend).toHaveBeenCalledWith(expect.any(ScanCommand));
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual(mockItems);
  });

  it('should handle DynamoDB error', async () => {
    const errorMessage = 'DynamoDB error';

    // Mock the send method to throw an error
    mockSend.mockRejectedValue(new Error(errorMessage));

    // Call the Lambda function
    const response = await handleGetAll();

    // Assertions
    expect(mockSend).toHaveBeenCalledWith(expect.any(ScanCommand));
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body)).toEqual(errorMessage);
  });
});