from bs4 import BeautifulSoup
import requests
import csv

f=open("comred.txt","a+")

L=["wallpaper","iphonexwallpapers","phonewallpapers","iWallpaper","Wallpaperdump","Wallpaperengine","iphonewallpaper","wallpapers"]
for i in L:
    html_text = requests.get('https://www.reddit.com/r/'+i+'/hot/?feedViewType=compactView').text
    soup= BeautifulSoup(html_text, 'lxml')
    st= soup.find_all('div', class_="media-lightbox-img max-h-[100vw] h-full w-full object-contain overflow-hidden relative bg-black")
    for i in st:
        stn=i.find('img')
        print ('---------')
        try:
            print (stn['src'])
            f.write(stn['src']+'\n')
        except:
            print("err")

f.close()

