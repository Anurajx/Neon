import requests
import time
import random

# Fetch data from a subreddit
L=["Animewallpaper","WallpapersDoA","wallpaper","phonewallpapers","iWallpaper","Wallpaperdump","Wallpaperengine","wallpapers"]
P=[]
# Open file before the loop to avoid NameError
f = open("excuseapi.txt", "w+")

for i in L:
    try:
        # Randomized browser fingerprint to avoid detection
        browsers = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edge/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1.2 Mobile/15E148 Safari/604.1'
        ]
        
        platforms = ['Windows', 'Linux', 'Macintosh', 'Android', 'iPhone']
        browsers_ver = ['Chrome', 'Firefox', 'Safari', 'Edge']
        
        headers = {
            'User-Agent': random.choice(browsers),
            'Accept': random.choice([
                'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            ]),
            'Accept-Language': f'en-US,en;q=0.{random.randint(5,9)},fr;q=0.{random.randint(1,4)}',
            'Accept-Encoding': random.choice(['gzip, deflate, br', 'gzip, deflate', 'br']),
            'Connection': random.choice(['keep-alive', 'close']),
            'Cache-Control': random.choice(['max-age=0', 'no-cache', 'no-store']),
            'Sec-Ch-Ua': f'"{random.choice(browsers_ver)}";v="{random.randint(100,120)}"',
            'Sec-Ch-Ua-Mobile': random.choice(['?0', '?1']),
            'Sec-Ch-Ua-Platform': f'"{random.choice(platforms)}"',
            'Sec-Fetch-Dest': random.choice(['document', 'empty']),
            'Sec-Fetch-Mode': random.choice(['navigate', 'cors']),
            'Sec-Fetch-Site': random.choice(['none', 'same-origin']),
            'Sec-Fetch-User': random.choice(['?0', '?1']),
            'Upgrade-Insecure-Requests': random.choice(['0', '1']),
            'Pragma': random.choice(['no-cache', '']),
            'DNT': random.choice(['0', '1'])
        }
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