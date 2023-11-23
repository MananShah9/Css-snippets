Certainly! You can use the `psutil` library to check the storage usage and `os` library to check the folder size in Python. Here's an example code:

```python
import psutil
import os
import requests

def check_c_drive_storage():
    c_drive = psutil.disk_usage('/')
    available_space_gb = c_drive.free / (2**30)  # Convert bytes to gigabytes

    if available_space_gb < 20:
        # Make a call to the first REST API
        response = requests.get('your_first_rest_api_url')
        # Handle the response as needed

def check_folder_file_size(folder_path):
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            file_path = os.path.join(root, file)
            file_size_mb = os.path.getsize(file_path) / (2**20)  # Convert bytes to megabytes

            if file_size_mb > 60:
                # Make a call to the second REST API
                response = requests.get('your_second_rest_api_url')
                # Handle the response as needed

# Example usage:
check_c_drive_storage()
check_folder_file_size('/path/to/your/folder')
```

Make sure to replace `'your_first_rest_api_url'` and `'your_second_rest_api_url'` with the actual URLs of your REST APIs. Additionally, replace `'/path/to/your/folder'` with the path to the folder you want to monitor.
