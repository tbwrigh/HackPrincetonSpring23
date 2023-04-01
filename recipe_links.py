import bs4 as bs
import urllib.request
source = urllib.request.urlopen('https://www.allrecipes.com/cuisine-a-z-6740455').read()
soup = bs.BeautifulSoup(source,'lxml')
links = []
for url in soup.find_all('a'):
    #print(url.get('href'))
    if 'world-cuisine' in str(url.get('href')) or 'us-recipes' in str(url.get('href')):
        links.append(str(url.get('href')))
    #print(links)

childs = {i:[] for i in links}
for link in links:
    source = urllib.request.urlopen(link).read()
    soup = bs.BeautifulSoup(source,'lxml')
    for url in soup.find_all('a'):
        #print(url.get('href'))
        if 'recipe/' in str(url.get('href')):
            childs[link].append(str(url.get('href')))
#print(childs)