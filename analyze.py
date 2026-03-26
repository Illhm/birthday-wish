import re
import json

with open('Chat WhatsApp dengan Ansa Punya Ku.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()

messages = []
current_msg = None

# Format: DD/MM/YY HH:MM - Sender: Message
pattern = re.compile(r'^(\d{2}/\d{2}/\d{2} \d{2}:\d{2})\s+-\s+(.*?):\s+(.*)')

for line in lines:
    match = pattern.match(line)
    if match:
        date, sender, text = match.groups()
        if sender == 'Ansa Punya Ku':
            current_msg = {'date': date, 'text': text}
            messages.append(current_msg)
        else:
            current_msg = None
    else:
        if current_msg:
            current_msg['text'] += '\n' + line.strip()

# Clean up messages
cleaned = []
for m in messages:
    text = m['text']
    if '<Media tidak disertakan>' in text: continue
    if len(text.split()) < 10: continue

    # Exclude AI/Bot/Wiki-like text
    if any(bot_phrase in text.lower() for bot_phrase in [
        'haha,', 'adalah film', 'adalah novel', 'menyentuh tema', 'menggambarkan',
        'perlu diingat', 'contoh:', 'kamu mau coba', 'kamu punya kebiasaan',
        'menurutku,', 'kalau kamu', 'kamu mau tahu', 'sebenarnya zat',
        '[', ']'
    ]): continue

    cleaned.append(m)

# Find highly emotional/romantic messages using a scoring system based on deep context
keywords = [
    'nemani', 'neminin', 'bareng', 'sayang', 'kangen', 'maaf', 'makasih', 'sedih', 'seneng', 'takut',
    'nyaman', 'jujur', 'nangis', 'peluk', 'beruntung', 'makasi', 'kepikiran', 'serius', 'janji',
    'waktu', 'sama kamu', 'buat aku', 'selalu', 'coba', 'aku tu', 'aku tuh', 'perasaan',
    'cinta', 'sayang banget', 'ngertiin', 'bantu', 'sempurna', 'ngehargai', 'percaya', 'bohong',
    'masalalu', 'kecewa', 'ortu'
]

def score_message(text):
    text_lower = text.lower()
    score = 0

    # Exact keyword matches
    for kw in keywords:
        score += text_lower.count(kw) * 2

    # Reward long, vulnerable paragraphs
    words = len(text.split())
    if words > 40: score += 10
    elif words > 20: score += 5

    # Specific profound statements
    if 'nemani' in text_lower or 'nemenin' in text_lower: score += 5
    if 'bareng' in text_lower: score += 3
    if 'sempurna' in text_lower: score += 3
    if 'nyaman' in text_lower: score += 5

    return score

cleaned.sort(key=lambda x: score_message(x['text']), reverse=True)

# Select top messages ensuring variety
final_selection = []
seen_texts = set()

for m in cleaned:
    # simple dedup
    if m['text'] in seen_texts: continue
    seen_texts.add(m['text'])

    final_selection.append(m)
    if len(final_selection) >= 20:
        break

# Output top 20 to review manually before choosing 10
for i, m in enumerate(final_selection):
    print(f"--- {i} ---")
    print(m['date'])
    print(m['text'])
    print()
