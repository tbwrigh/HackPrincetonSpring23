import bs4 as bs
import urllib.request
source = urllib.request.urlopen('https://www.allrecipes.com/cuisine-a-z-6740455').read()
soup = bs.BeautifulSoup(source,'lxml')
links = []
for url in soup.find_all('a'):
    print(url.get('href'))
    if 'world-cuisine' in str(url.get('href')) or 'us-recipes' in str(url.get('href')):
        links.append(str(url.get('href')))
    print(links)