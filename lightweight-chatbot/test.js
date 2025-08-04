const axios = require('axios');

async function testChatbot() {
  console.log('🧪 Testing Lightweight Chatbot...');
  
  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get('http://localhost:3001/api/health');
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test chat endpoint
    console.log('2. Testing chat endpoint...');
    const chatResponse = await axios.post('http://localhost:3001/api/chat', {
      message: 'Hello, what services do you offer?'
    });
    console.log('✅ Chat test passed:', chatResponse.data);
    
    // Test stats endpoint
    console.log('3. Testing stats endpoint...');
    const statsResponse = await axios.get('http://localhost:3001/api/stats');
    console.log('✅ Stats test passed:', statsResponse.data);
    
    console.log('\n🎉 All tests passed! Chatbot is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Make sure the chatbot server is running on port 3001');
      console.log('   Run: node server.js');
    }
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testChatbot();
}

module.exports = { testChatbot }; 