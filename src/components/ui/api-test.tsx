import React from 'react';
import { unifiedApi } from '@/services/unifiedApi';
import { Button } from './button';
import { Card } from './card';

export function ApiTest() {
  const [testResults, setTestResults] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testGeminiConnection = async () => {
    setIsLoading(true);
    addResult('Testing Gemini API connection...');
    
    try {
      const isConnected = await unifiedApi.getModelStatus();
      addResult(`Gemini API connection: ${isConnected ? 'SUCCESS' : 'FAILED'}`);
    } catch (error) {
      addResult(`Gemini API connection error: ${error}`);
    }
    
    setIsLoading(false);
  };

  const testFallbackResponse = async () => {
    setIsLoading(true);
    addResult('Testing fallback response...');
    
    try {
      const response = await unifiedApi.sendMessage('Hello, what services do you offer?');
      addResult(`Fallback response received: ${response[0]?.text?.substring(0, 100)}...`);
    } catch (error) {
      addResult(`Fallback response error: ${error}`);
    }
    
    setIsLoading(false);
  };

  const testIntentDetection = async () => {
    setIsLoading(true);
    addResult('Testing intent detection...');
    
    try {
      const { intent, confidence } = await unifiedApi.getIntentConfidence('How much do your services cost?');
      addResult(`Intent detected: ${intent} (confidence: ${(confidence * 100).toFixed(1)}%)`);
    } catch (error) {
      addResult(`Intent detection error: ${error}`);
    }
    
    setIsLoading(false);
  };

  const testSentimentAnalysis = async () => {
    setIsLoading(true);
    addResult('Testing sentiment analysis...');
    
    try {
      const sentiment = await unifiedApi.analyzeSentiment('I love your services!');
      addResult(`Sentiment analysis: ${sentiment}`);
    } catch (error) {
      addResult(`Sentiment analysis error: ${error}`);
    }
    
    setIsLoading(false);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">API Test Component</h2>
      
      <div className="flex gap-2 mb-4 flex-wrap">
        <Button 
          onClick={testGeminiConnection} 
          disabled={isLoading}
          variant="outline"
        >
          Test Gemini Connection
        </Button>
        
        <Button 
          onClick={testFallbackResponse} 
          disabled={isLoading}
          variant="outline"
        >
          Test Fallback Response
        </Button>
        
        <Button 
          onClick={testIntentDetection} 
          disabled={isLoading}
          variant="outline"
        >
          Test Intent Detection
        </Button>
        
        <Button 
          onClick={testSentimentAnalysis} 
          disabled={isLoading}
          variant="outline"
        >
          Test Sentiment Analysis
        </Button>
        
        <Button 
          onClick={clearResults} 
          variant="destructive"
        >
          Clear Results
        </Button>
      </div>
      
      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg max-h-96 overflow-y-auto">
        <h3 className="font-semibold mb-2">Test Results:</h3>
        {testResults.length === 0 ? (
          <p className="text-gray-500">No test results yet. Run a test to see results here.</p>
        ) : (
          <div className="space-y-1">
            {testResults.map((result, index) => (
              <div key={index} className="text-sm font-mono">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {isLoading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
          <span className="ml-2">Testing...</span>
        </div>
      )}
    </Card>
  );
} 