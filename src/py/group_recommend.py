#!python3

import requests
import sys
import json
import pprint
import pandas as pd

key = "AIzaSyBYmmmLt6AxjNqDP4DW-uGZ8UHTPGqkgRE" # API key
encodings = {" ": "%20", ",": "%2C"}

units = "imperial"
mode = "walking"

def one_distance(origin, destination):

    origin = origin + ", Notre Dame, IN"
    destination = destination + ", Notre Dame, IN"
    #print(origin, destination)

    url = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={destination}&units={units}&mode={mode}&key={key}"

    #print(url)
    payload = {}
    headers = {}

    response = requests.get(url, headers=headers)
    #print(response.json())

    return int(response.json()["rows"][0]["elements"][0]["duration"]["text"].split()[0])

def meeting_spot(study_spots, locs):
    #print(study_spots)
    num_locs = len(locs)

    #df = pd.read_csv("../csvs/test_distances.csv", index_col=0, dtype={"spot_id": str})
    df = pd.DataFrame().assign(spot_id=study_spots["spot_id"])
    #df = df.set_index("spot_id")
    # Filter by if building is open
    #print(study_spots[study_spots["spot_id"] == "000100"]["max_group_size"].squeeze())
    #df = df.loc(num_locs > study_spots[study_spots["spot_id"] == ["spot_id"]]["max_group_size"].squeeze())
    #print(df)

    for i, loc in enumerate(locs, 1):
        distances = {} # Dictionary of distances from location to different buildings
        # Check if locations are in database before calling API
        for building in study_spots["building"].unique():
            distances[building] = one_distance(loc, building)
        df[f"dist{i}"] = df["spot_id"].apply(lambda x: distances[study_spots[study_spots["spot_id"] == x]["building"].squeeze()])

    df["max_dist"] = df.max(axis="columns")

def main():
    print(requests.get(f"https://maps.googleapis.com/maps/api/distancematrix/json?origins=Knott Hall, Notre Dame, IN | Keough Hall, Notre Dame, IN&destinations=Mendoza College of Business&units={units}&mode={mode}&key={key}").json())
    #meeting_spot(pd.read_csv(sys.argv[1], dtype={"spot_id": str}), sys.argv[2:])
    #one_distance(sys.argv[1], sys.argv[2])

if __name__ == "__main__":
    main()