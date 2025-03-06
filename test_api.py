import os
from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Get the API Key
api_key = os.getenv("OPENAI_API_KEY")

if api_key:
    print("API Key Loaded:", api_key[:5] + "..." + api_key[-5:])
else:
    print("API Key not found. Check your .env file!")
