import requests


# status_code 200
response = requests.post(
    'http://127.0.0.1:8000/api-token-auth/',
    data={'username': 'django',
          'password': 'geekbrains'}
)

# status_code 400
# response = requests.post(
#     'http://127.0.0.1:8000/api-token-auth/',
#     data={'username': 'django10',
#           'password': '12345678'}
# )

print(response.status_code)
print(response.json())
