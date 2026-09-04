import pathlib
import urllib.request

urls = [
    ('http://localhost:8000/index.html', ['Home', 'Privacy Policy', 'Terms & Conditions', 'Google Play']),
    ('http://localhost:8000/privacy.html', ['Privacy Policy', 'Last Updated: September 4, 2026', 'bingo25sprt@gmail.com', 'Account Deletion']),
    ('http://localhost:8000/terms.html', ['Terms & Conditions', 'Last Updated: September 4, 2026', 'bingo25sprt@gmail.com', 'Fair Play'])
]

for url, checks in urls:
    body = urllib.request.urlopen(url, timeout=10).read().decode('utf-8', 'replace')
    print(url)
    print('all_checks_passed=', all(c in body for c in checks))
    for c in checks:
        print(' ', repr(c), c in body)
    print('---')

for p in ['index.html', 'privacy.html', 'terms.html']:
    text = pathlib.Path(p).read_text(encoding='utf-8')
    print(p, 'placeholder=', '[Last Updated Date]' in text, 'legacy_anchor=', '#legal' in text)
