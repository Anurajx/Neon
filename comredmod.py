from bs4 import BeautifulSoup
import requests
import csv

html_text = requests.get('https://www.reddit.com/r/wallpaper/hot/?feedViewType=compactView').text


f=open("comredmod.txt","w+")
soup= BeautifulSoup(html_text, 'lxml')
st= soup.find_all('article', class_="w-full m-0")
for i in st:
    stn=i.find('a')
    print ('---------')
    try:
        print (stn['href'])
        f.write(stn['href']+'\n')
    except:
        print("err")

f.close()

