import requests
import time
import concurrent.futures

# API Endpoint URL
API_URL = "http://127.0.0.1:8000/generate-question"

# Request Payload (Change this to test different inputs)
payload = {
    "subject": "Mathematics",
    "difficulty": "medium",
    "topic": "Algebra"
}

# Number of concurrent requests
NUM_REQUESTS = 100  # Adjust this to simulate more/less traffic

def send_request():
    """Function to send a request to the API."""
    try:
        response = requests.post(API_URL, json=payload, timeout=10)
        return response.status_code, response.elapsed.total_seconds()
    except requests.exceptions.RequestException as e:
        return "Failed", str(e)

# Run concurrent requests
start_time = time.time()
with concurrent.futures.ThreadPoolExecutor(max_workers=20) as executor:  # Adjust max_workers for higher load
    results = list(executor.map(lambda _: send_request(), range(NUM_REQUESTS)))

end_time = time.time()

# Calculate statistics
success_count = sum(1 for status, _ in results if status == 200)
failure_count = NUM_REQUESTS - success_count
avg_response_time = sum(time for _, time in results if isinstance(time, float)) / success_count if success_count else 0

# Display results
print(f"Total Requests Sent: {NUM_REQUESTS}")
print(f"Successful Responses: {success_count}")
print(f"Failed Responses: {failure_count}")
print(f"Average Response Time: {avg_response_time:.3f} seconds")
print(f"Total Time Taken: {end_time - start_time:.2f} seconds")
