import requests
import time
import random
from requests.auth import HTTPBasicAuth
# Removed cloudscraper import since it's not being used
# json is built into Python, no need to import it separately

# Fetch data from a subreddit
L = ["wallpaper", "phonewallpapers", "iWallpaper", "Wallpaperdump", "Wallpaperengine", "wallpapers","WallpapersDoA", "Animewallpaper"]
P=[]
# Open file before the loop to avoid NameError
f = open("excuseapi.txt", "w+")

client_id = 'Sbd6rbN5GdmpD7HyLxR83Q'         # Replace with your actual client ID
client_secret = 'W10CzTls8Mfh6A6Tdl-4FsUUvw_CKw' # Replace with your actual client secret
auth = HTTPBasicAuth(client_id, client_secret)
headers = {'User-Agent': 'Neon by AstralTesseract'}
data = {'grant_type': 'client_credentials'}
response = requests.post(
    'https://www.reddit.com/api/v1/access_token',
    auth=auth,
    data=data,
    headers=headers
)
print(response.status_code)
#print(response.json())
access_token = response.json().get('access_token')

for i in L:
    try:
        # Add delay before each request to avoid rate limiting
        time.sleep(2)  
        
        # Randomize User-Agent to appear less bot-like
        user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0'
        ]
        
        # Enhanced headers with randomized User-Agent and additional Reddit-specific headers
        # Added more headers to mimic browser behavior for Reddit API
        headers = {
            'User-Agent': random.choice(user_agents),
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'client-id': 'Sbd6rbN5GdmpD7HyLxR83Q',
            # Added Reddit-specific headers
            'Origin': 'https://www.reddit.com',  # Reddit requires origin header
            'Referer': 'https://www.reddit.com', # Referer to look like we came from Reddit
            'DNT': '1',  # Do Not Track header commonly sent by browsers
            'Sec-Fetch-Dest': 'empty',  # Modern security headers
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Authorization': access_token,
        }
        response = requests.get(
            f'https://www.reddit.com/r/{i}/new.json',
            headers=headers,
            timeout=30
        )
        response.raise_for_status()
        data = response.json()
        
        # Extract image URLs
        for post in data['data']['children']:
            url = post['data']['url']
            if url.endswith(('jpg', 'jpeg', 'png', 'gif')):
                P.append(url)
                
    except requests.RequestException as e:
        print(f"Error fetching data from r/{i}: {e}")
        continue
    except (KeyError, ValueError) as e:
        print(f"Error parsing data from r/{i}: {e}")
        continue
    # Add delay between requests to avoid rate limiting
    time.sleep(2)  # This delay is needed even with workflow scheduling to avoid Reddit API rate limits
print("saving images")
for x in P:
    f.write(x+"\n")
f.close()
print("done ;)")