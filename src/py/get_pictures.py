#!/usr/bin/env python3

import sys
import os

def get_pictures(id):
    pictures = []
    for pic in os.listdir(f"../../public/media/locations"):
        if pic.startswith(id):
            pictures.append(pic)

    return pictures

def main():
    print(get_pictures(sys.argv[1]))

if __name__ == "__main__":
    main()
