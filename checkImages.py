#!/usr/bin/env python
'''
  Silly script to check that ./images/ contains 
  200 image files in the expected format: 
    (1.jpg -- 200.jpg)
'''
import os,sys
imgKey = { };
images = os.popen("ls -1 ./images/").readlines();
maxI = -1; minI = -1;
for i in images:
  ii =  i.strip()
  try:
    if( ii[-4:]=='.jpg' ):
      iii =  ii[:-4]
      iiii = int(iii);
      imgKey[ iiii] = True;
      if( iiii>=0):
        if(maxI<0): mmaxI = iiii;
        if(minI<0): minI=iiii;
        if(maxI<iiii):  maxI = iiii;
        if(iiii<minI):  minI = iiii;
  except: pass

nImage = 200;
for i in range(1,nImage+1):
  if( not( int(i) in imgKey.keys())):
    print("Error: "+str(i)+".jpg not found.");
    sys.exit(1);
print("Images 1.jpg--200.jpg were all found.");

