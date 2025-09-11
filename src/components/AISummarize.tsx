import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, CheckCircle } from 'lucide-react';

interface AISummarizeProps {
  content: string;
  title: string;
  summary?: string;
}

const AISummarize: React.FC<AISummarizeProps> = ({ content, title, summary }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');

  // Pre-written summaries for different blog posts
  const getPreWrittenSummary = (postTitle: string): string => {
    const summaries: { [key: string]: string } = {
      "Jamming Attacks: The Silent Threat to Wireless Security": "This comprehensive guide explores jamming attacks, sophisticated wireless security threats that can silently disrupt critical communications. The article covers various attack types including constant, reactive, and deceptive jamming, along with advanced AI-powered techniques. It provides detailed detection methods, mitigation strategies, and real-world case studies from maritime operations, prison facilities, and corporate espionage. The content emphasizes the importance of multi-layered defense approaches combining technical countermeasures, operational procedures, and regulatory frameworks to protect against this growing threat to wireless infrastructure.",
      
      "The Future of LLMs: From GPT-4 to AGI - What's Next?": "This article examines the evolution of Large Language Models from GPT-4's breakthrough capabilities to the emerging path toward Artificial General Intelligence (AGI). It covers key innovations like multimodal understanding, enhanced reasoning, and creative capabilities, while addressing current challenges including hallucination problems and safety concerns. The piece explores emerging technologies like Chain-of-Thought reasoning and Retrieval-Augmented Generation, discusses industry applications in healthcare, education, and business, and provides a roadmap for the future development of AI systems that can truly understand, reason, and collaborate with humans.",
      
      "Quantum Computing: Revolutionizing AI and Cryptography": "This comprehensive analysis explores how quantum computing is transforming artificial intelligence and cryptography. It explains quantum principles like superposition and entanglement, examines quantum machine learning applications in drug discovery and financial modeling, and discusses the threats quantum computing poses to current cryptographic systems. The article covers quantum supremacy achievements, post-quantum cryptography solutions, and future applications in healthcare, climate science, and finance, while addressing the technical challenges and ethical considerations of this revolutionary technology.",
      
      "Voice TTS Revolution: From Text-to-Speech to Emotional AI Voices": "This article traces the evolution of Text-to-Speech technology from early robotic voices to modern emotionally intelligent AI systems. It covers breakthrough technologies like WaveNet, Tacotron, and Transformer TTS, explores emotional AI voice capabilities including emotion embeddings and style transfer, and discusses applications in accessibility, entertainment, and business. The piece examines technical challenges around quality, latency, and ethical considerations, while looking ahead to future developments in emotional intelligence, multimodal integration, and personalized voice experiences.",
      
      "AI in Healthcare: Revolutionizing Diagnosis and Treatment": "This comprehensive guide explores how artificial intelligence is transforming healthcare across multiple domains. It covers AI applications in medical imaging, diagnostic assistance, personalized medicine, and drug discovery, highlighting real-world implementations in radiology, genomics, and robotic surgery. The article discusses mental health applications, healthcare administration optimization, and addresses critical ethical considerations around privacy, bias, and regulatory compliance. It provides insights into future trends including quantum computing integration and the growing market for AI-powered healthcare solutions.",
      
      "The Rise of Edge AI: Computing at the Source": "This article examines the paradigm shift toward Edge AI, moving computation from centralized cloud servers to edge devices closer to data sources. It covers technical architecture, AI model optimization techniques, and applications across autonomous vehicles, industrial IoT, healthcare, and retail. The piece discusses privacy and security benefits, performance optimization strategies, and addresses implementation challenges while exploring future trends including 5G integration and human-AI collaboration. It provides a comprehensive overview of how Edge AI is enabling real-time processing and enhanced privacy in our connected world.",
      
      "Computer Vision: From Image Recognition to Visual Intelligence": "This comprehensive exploration traces the evolution of computer vision from basic image recognition to sophisticated visual intelligence. It covers core technologies including image classification, object detection, and semantic segmentation, while examining advanced capabilities like visual understanding, human analysis, and 3D vision. The article explores industry applications in autonomous vehicles, healthcare, retail, and security, discusses emerging technologies like multi-modal AI and few-shot learning, and addresses technical challenges around robustness, real-time performance, and interpretability. It provides insights into future directions and market trends shaping the computer vision landscape.",
      
      "The Future of Business Automation: AI Solutions That Transform Operations": "This comprehensive guide explores how AI-powered automation is revolutionizing business operations across industries. It covers intelligent process discovery, conversational AI, predictive analytics, computer vision applications, and autonomous decision-making systems. The article provides detailed implementation strategies, addresses common challenges, and examines industry-specific applications in healthcare, finance, manufacturing, and retail. It discusses future trends including generative AI integration and autonomous business operations, while offering best practices for successful AI automation implementation and ROI measurement."
    };
    
    return summaries[postTitle] || summary || "AI-generated summary not available for this article.";
  };

  const handleSummarize = async () => {
    setIsLoading(true);
    setShowSummary(false);
    
    // Simulate AI processing time with random delay between 2-4 seconds
    const delay = Math.random() * 2000 + 2000;
    
    setTimeout(() => {
      const summary = getPreWrittenSummary(title);
      setGeneratedSummary(summary);
      setIsLoading(false);
      setShowSummary(true);
    }, delay);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
    setGeneratedSummary('');
  };

  return (
    <div className="my-8">
      <div className="flex justify-center mb-6">
        <Button
          onClick={handleSummarize}
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              AI is analyzing...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              AI Summarize
            </>
          )}
        </Button>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>AI is reading and analyzing the content...</span>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      )}

      {showSummary && generatedSummary && (
        <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 shadow-lg">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                AI Summary
              </CardTitle>
              <Button
                onClick={handleCloseSummary}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed text-base">
                {generatedSummary}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-purple-200">
              <p className="text-sm text-gray-500 italic">
                🤖 This summary was generated by AI to help you quickly understand the key points of this article.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AISummarize;
