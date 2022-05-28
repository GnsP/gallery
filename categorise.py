# Run in ipython notebook

import os
os.chdir('../gallery')
print(os.getcwd())

import json
from IPython.display import Image, display
import shutil

counter = 173
files = ['./downloaded/'+x for x in os.listdir('./downloaded')]
availableTags = [
  'gimp',           'digitalart',
  'blender',        '3D',
  'hacker',         'oil',
  'canvas',         'collage',
  'newspaper',      'graphite',
  'pencil',         'sketchbook',
  'crayon',         'watercolor',
  'inkscape',       'pen',
  'ink',            'tempera',
  'postercolour',   'coloured',
  'watercolour',    'paper',
  'acrylic',        'colour',
  'charcoal',       'monochrome',
  'handmade paper', 'procreate'
]
output = []

for file in files:
    display(Image(filename=file, format='jpg'))
    accpt = input('Should accept ?').lower()
    if accpt == 'n':
        continue
    if accpt == 'q':
        break
    newFilename = 'store__/'+str(counter)+'.jpg'
    shutil.copy(file, newFilename)
    name = input('Name: ')
    year = input('Year: ')
    print(list(enumerate(availableTags)))
    tags = [availableTags[int(i)] for i in input('Tags: ').split(',')]
    output.append({'file': newFilename, 'name': name, 'year': year, 'tags': tags })
    print(output[-1])
    counter += 1

print(json.dumps(output))
open('addToGallery.json', 'w').write(json.dumps(output))
