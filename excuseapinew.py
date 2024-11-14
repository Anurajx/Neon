import requests
import time
import random
import urllib.request

# Create custom URL opener with full browser user agent
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'en-US,en;q=0.5',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Client-ID': 'Sbd6rbN5GdmpD7HyLxR83Q',  # Add Reddit API client ID
    'Authorization': 'W10CzTls8Mfh6A6Tdl-4FsUUvw_CKw'  # Add valid OAuth token
}

# Fetch data from a subreddit
L=["Animewallpaper","WallpapersDoA","wallpaper","phonewallpapers","iWallpaper","Wallpaperdump","Wallpaperengine","wallpapers"]
P=[]
# Open file before the loop to avoid NameError  
f = open("excuseapi.txt", "w+")

for i in L:
    try:
        # Create session to maintain cookies and headers
        session = requests.Session()
        session.headers.update(headers)
        #-----------------------------------
        response = requests.get(
            f'https://www.reddit.com/r/{i}/new.json',
            headers=headers,
            timeout=30
        )
        response.raise_for_status()
        print(f"Status code for r/{i}: {response.status_code}")
        
        data = response.json()
        
        # Extract image URLs
        for post in data['data']['children']:
            url = post['data']['url']
            if url.endswith(('jpg', 'jpeg', 'png', 'gif')):
                print(f"Found image URL: {url}")
                P.append(url)
                
    except requests.RequestException as e:
        print(f"Error fetching data from r/{i}: {e}")
        continue
    except (KeyError, ValueError) as e:
        print(f"Error parsing data from r/{i}: {e}")
        continue
    # Add delay between requests to avoid rate limiting
    time.sleep(2)  # This delay is needed even with workflow scheduling to avoid Reddit API rate limits

for x in P:
    f.write(x+"\n")
f.close()