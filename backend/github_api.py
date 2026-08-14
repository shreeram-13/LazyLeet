import os
import base64
import requests
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
GITHUB_USERNAME = os.getenv("GITHUB_USERNAME")
GITHUB_REPO = os.getenv("GITHUB_REPO")


def upload_file(file_path, content):
    url = f"https://api.github.com/repos/{GITHUB_USERNAME}/{GITHUB_REPO}/contents/{file_path}"

    encoded_content = base64.b64encode(
        content.encode("utf-8")
    ).decode("utf-8")

    headers = {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json"
    }

    data = {
        "message": f"Add {file_path}",
        "content": encoded_content
    }

    response = requests.put(
        url,
        headers=headers,
        json=data
    )

    return response



# # temp adding to check
# if __name__ == "__main__":
#     response = upload_file(
#         "test.txt",
#         "Hello from LazyLeet!"
#     )
#
#     print(response.status_code)
#     print(response.json())