import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { promises as fs } from 'fs';

interface ApiRequest {
  query?: string;
  body?: Record<string, any>;
  endpoint: string;
  method: 'GET' | 'POST';
  expectedStatusRange: { min: number; max: number };
}

async function readApiRequestsFromFile(filePath: string): Promise<ApiRequest[]> {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const apiRequests: ApiRequest[] = JSON.parse(fileContent);
    return apiRequests;
  } catch (error) {
    console.error('Error reading JSON file:', error.message);
    throw error;
  }
}

async function delay(seconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function sendApiRequest(request: AxiosRequestConfig, expectedStatusRange: { min: number; max: number }): Promise<void> {
  try {
    const response: AxiosResponse = await axios(request);

    if (response.status < expectedStatusRange.min || response.status > expectedStatusRange.max) {
      console.error(`Error: Request to ${request.url} returned unexpected status code ${response.status}`);
    } else {
      console.log(`Request to ${request.url} successful with status code ${response.status}`);
    }
  } catch (error) {
    console.error(`Error sending request to ${request.url}:`, error.message);
  }
}

async function executeApiRequests(apiRequests: ApiRequest[], delayBetweenRequests: number): Promise<void> {
  for (const request of apiRequests) {
    const axiosConfig: AxiosRequestConfig = {
      method: request.method,
      url: request.endpoint,
      params: request.query,
      data: request.body,
    };

    await sendApiRequest(axiosConfig, request.expectedStatusRange);
    await delay(delayBetweenRequests);
  }
}

// Sample input
const filePath = 'path/to/your/json/file.json';
const delayBetweenRequestsInSeconds = 2;

// Main execution
(async () => {
  try {
    const apiRequests = await readApiRequestsFromFile(filePath);
    await executeApiRequests(apiRequests, delayBetweenRequestsInSeconds);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
})();
