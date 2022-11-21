#!python3

import requests
import sys
import json
import pprint

key = "AIzaSyAT1Fh-IXMLOqzp6tWekPy-0FpplWtITaY" # API key

units = "imperial"
mode = "walking"

def one_distance(origin, destination):

    print(origin, destination)

    url = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin + ', Notre Dame, IN'}&destinations={destination + ', Notre Dame, IN'}&units={units}&mode={mode}&key={key}"

    print(url)
    payload = {}
    headers = {}

    response = requests.get(url, headers=headers)
    print(response.json())


def main():
    one_distance(sys.argv[1], sys.argv[2])

if __name__ == "__main__":
    main()