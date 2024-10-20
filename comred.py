from bs4 import BeautifulSoup
import requests
import csv

html_text = requests.get('https://www.reddit.com/r/wallpaper/hot/?feedViewType=compactView').text


f=open("comred.txt","a+")
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

