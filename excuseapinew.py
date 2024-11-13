import requests
# json is built into Python, no need to import it separately

# Fetch data from a subreddit
L=["Animewallpaper","WallpapersDoA","wallpaper","phonewallpapers","iWallpaper","Wallpaperdump","Wallpaperengine","wallpapers"]
P=[]
for i in L:
    try:
        response = requests.get(
            'https://www.reddit.com/r/' + i + '/new.json',
            headers={'User-agent': 'Mozilla/5.0'},
            timeout=30
        )
        response.raise_for_status()  # Raise an error for bad status codes
        print(response.status_code)
        
        # Use response.json() directly instead of manual decoding
        data = response.json()
        
        # Move file opening outside the loop
        if not P:  # Only open file once at start
            f=open("excuseapi.txt","w+")
            
        # Extract image URLs
        for post in data['data']['children']:
            url = post['data']['url']
            if url.endswith(('jpg', 'jpeg', 'png', 'gif')):
                print(url)  # Print or process the image URL
                P.append(url)
                
    except requests.RequestException as e:
        print(f"Error fetching data from r/{i}: {e}")
        continue

for x in P:
    f.write(x+"\n")
f.close()