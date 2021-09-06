import requests
import json


def getToken(url='https://www.kiotmpec.xyz/api/v1', id=24):
    body = {
    "password": "quy123456","username": "ducquy"
    }
    headers = {'content-type': 'application/json'}
    login = requests.post(url+'/public/user/login', data=json.dumps(body), headers=headers) 
    login_Json = login.json()
    token=login_Json['data']

    headers = {'content-type': 'application/json','Authorization':token}
    r = requests.put(url + '/admin/nguoi-dung-ca-lam-viec/check?nguoi-dung-id='+str(id),headers=headers)
 




 