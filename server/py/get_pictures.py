#!/usr/bin/env python3

import sys
import os

def get_pictures(id):
    pictures = []
    for pic in os.listdir(f"public/media/locationsSD"):
        if pic.startswith(id):
            pictures.append(pic)

    print(",".join(pictures), end='')

def main():
    get_pictures(sys.argv[1])

if __name__ == "__main__":
    main()
