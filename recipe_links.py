import bs4 as bs
import urllib.request
source = urllib.request.urlopen('https://www.allrecipes.com/cuisine-a-z-6740455').read()
soup = bs.BeautifulSoup(source,'lxml')
links = soup.find_all('a')
for url in links:
    #print(url.get('href'))
    if 'world-cuisine' in str(url.get("href")) or 'us-recipes' in str(url.get("href")):
        source = urllib.request.urlopen(str(url.get("href"))).read()
        soup = bs.BeautifulSoup(source,'lxml')
        for url in soup.find_all('a'):
            if 'recipe/' in str(url.get('href')):
                print(str(url.get('href')))