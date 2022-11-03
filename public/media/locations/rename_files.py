#!/usr/bin/env python3
import sys
import os

for file in os.listdir("."):
    if file.startswith("06"):
        new_name = "07" + file[2:]
        os.rename(file, new_name)
