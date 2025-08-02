#!/usr/bin/env python3
"""
Rasa Server Startup Script for Maninfini Intelligent Chatbot
This script starts the Rasa server with proper configuration for web integration.
"""

import os
import sys
import subprocess
import json
from pathlib import Path

def check_dependencies():
    """Check if required dependencies are installed."""
    try:
        import rasa
        import spacy
        print("✅ Rasa and spaCy are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing dependency: {e}")
        print("Please install dependencies with: pip install -r requirements.txt")
        return False

def download_spacy_model():
    """Download spaCy English model if not present."""
    try:
        import spacy
        nlp = spacy.load("en_core_web_sm")
        print("✅ spaCy English model is available")
    except OSError:
        print("📥 Downloading spaCy English model...")
        subprocess.run([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
        print("✅ spaCy English model downloaded")

def train_model():
    """Train the Rasa model."""
    print("🤖 Training Rasa model...")
    result = subprocess.run(["rasa", "train"], capture_output=True, text=True)
    
    if result.returncode == 0:
        print("✅ Model training completed successfully")
        return True
    else:
        print(f"❌ Model training failed: {result.stderr}")
        return False

def start_server():
    """Start the Rasa server with proper configuration."""
    print("🚀 Starting Rasa server...")
    
    # Create credentials.yml for REST API
    credentials_config = {
        "rest": {
            "webhook_url": "http://localhost:5005/webhooks/rest/webhook"
        }
    }
    
    with open("credentials.yml", "w") as f:
        import yaml
        yaml.dump(credentials_config, f)
    
    # Start Rasa server with CORS support
    cmd = [
        "rasa", "run",
        "--enable-api",
        "--cors", "*",
        "--port", "5005",
        "--host", "0.0.0.0",
        "--debug"
    ]
    
    print(f"Starting server with command: {' '.join(cmd)}")
    subprocess.run(cmd)

def main():
    """Main function to orchestrate the startup process."""
    print("🤖 Maninfini Intelligent Chatbot - Rasa Server")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not Path("domain.yml").exists():
        print("❌ Please run this script from the rasa-backend directory")
        sys.exit(1)
    
    # Check dependencies
    if not check_dependencies():
        sys.exit(1)
    
    # Download spaCy model
    download_spacy_model()
    
    # Train model
    if not train_model():
        print("❌ Failed to train model. Please check the configuration.")
        sys.exit(1)
    
    # Start server
    try:
        start_server()
    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Failed to start server: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 