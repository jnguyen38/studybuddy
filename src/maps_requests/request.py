#!/usr/bin/env python3
import requests
import sys
import json

key = "AIzaSyAT1Fh-IXMLOqzp6tWekPy-0FpplWtITaY" # API key
encodings = {" ": "%20", ",": "%2C"}
study_spots = {"DeBartolo Hall", "Duncan Student Center", "LaFortune Student Center",
                "Fitzpatrick Hall of Engineering", "Hesburgh Library", "Jenkins Nanovic Halls",
                }

units = "imperial"
mode = "walking"

def one_distance(origin, destination):
    '''
    for i, letter in enumerate(origin):
        if letter in encodings:
            origin = origin[:i] + encodings[letter] + origin[i + 1:]

    for i, letter in enumerate(destination):
        if letter in encodings:
            destination = destination[:i] + encodings[letter] + destination[i + 1:]
    '''

    print(origin, destination)

    url = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={destination}&units={units}&mode={mode}&key={key}"

    print(url)
    payload = {}
    headers = {}

    response = requests.get(url, headers=headers)

    print(response.text)

def meeting_spot(loc1, loc2):
    min1_time = 0
    min2_time = 0
    min_time = sys.maxsize
    closest_spot = ""
    max1_time = 0
    max2_time = 0
    max_time = 0
    farthest_spot = ""
    headers = {}

    for spot in study_spots:
        url1 = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={loc1}&destinations={spot}&units={units}&mode={mode}&key={key}"
        #print(requests.get(url1, headers=headers).json()["rows"][0]["elements"][0]["duration"]["text"].split()[0])
        loc1_time = int(requests.get(url1, headers=headers).json()["rows"][0]["elements"][0]["duration"]["text"].split()[0])
        url2 = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={loc2}&destinations={spot}&units={units}&mode={mode}&key={key}"
        loc2_time = int(requests.get(url2, headers=headers).json()["rows"][0]["elements"][0]["duration"]["text"].split()[0])
        if max(loc1_time, loc2_time) < min_time:
            min_time = max(loc1_time, loc2_time)
            closest_spot = spot
            min1_time = loc1_time
            min2_time = loc2_time
        if max(loc1_time, loc2_time) > max_time:
            max_time = max(loc1_time, loc2_time)
            farthest_spot = spot
            max1_time = loc1_time
            max2_time = loc2_time

    print(f"The best spot to meet is {closest_spot}. It is {min1_time} minutes from {loc1} and {min2_time} minutes from {loc2}.")
    print(f"The worst spot to meet is {farthest_spot}. It is {max1_time} minutes from {loc1} and {max2_time} minutes from {loc2}.")



def main():
    meeting_spot(sys.argv[1], sys.argv[2])
    #one_distance(sys.argv[1], sys.argv[2])

if __name__ == "__main__":
    main()
