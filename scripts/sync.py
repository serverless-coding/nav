import requests
from bs4 import BeautifulSoup
import json

# 访问网页
url = "https://aishenqi.net"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

# 提取信息（假设工具信息在一个特定的标签中）
links = []
for card in soup.find_all('div', class_='url-card'):
    link_info = card.find('a', class_='card')
    name = link_info.get('title')
    url = link_info.get('data-url')
    description = card.find('p', class_='overflowClip_1 m-0 text-muted text-xs').text.strip()

    links.append({
        "name": name,
        "url": url,
        "description": description
    })
try:
# 保存到 links.json
  with open('./site.json', 'w', encoding='utf-8') as f:
      json.dump(links, f, ensure_ascii=False, indent=4)
except Exception as e:
    print(f"写入文件时出错: {e}")
