import requests

# Fetch data from a subreddit
L=["Animewallpaper","WallpapersDoA","wallpaper","phonewallpapers","iWallpaper","Wallpaperdump","Wallpaperengine","wallpapers"]
P=[]
for i in L:
    response = requests.get('https://www.reddit.com/r/' + i + '/new.json', headers={'User-agent': 'Mozilla/5.0'})
    data = response.json()
    f=open("excuseapi.txt","w+")
    # Extract image URLs
    for post in data['data']['children']:
        url = post['data']['url']
        if url.endswith(('jpg', 'jpeg', 'png', 'gif')):
            print(url)  # Print or process the image URL
            P.append(url)


for x in P:
    f.write(x+"\n")
f.close()