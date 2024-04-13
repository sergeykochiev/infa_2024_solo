import pathlib as PATH
import io
import pyperclip

api_url = 'https://api-os-takumi.mihoyo.com/common/gacha_record/api/getGachaLog'
gamedir = PATH.WindowsPath('C:\Program Files\Star Rail\Games\StarRail_Data')
url_key = 'e20211215gacha-v2'
    
webcachepath = gamedir / 'webCaches'
cacheverpathS = list(str(x).split('\\')[-1] for x in webcachepath.iterdir())
cacheverpath = webcachepath / max(cacheverpathS)
data2file = cacheverpath / 'Cache/Cache_Data/data_2'

with io.open(str(data2file), mode='r', encoding='latin-1') as data2:
    data2value = data2.read()
link_found = False
data2_splitted = data2value.split('1/0/')
prev_wish_url = ''
for item in data2_splitted:
    if url_key in item:
        index = item.index(url_key)
        wish_url = item[index-37:index+1123]
        prev_wish_url = wish_url
        link_found = True
    
if link_found:
    print("Link found, proceeding...")
else:
    raise RuntimeError("Link doesn't exist in the cache file! Reopen the wishing tab and try again.")

pyperclip.copy(wish_url)