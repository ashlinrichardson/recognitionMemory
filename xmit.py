#!/usr/bin/python
import cgi, cgitb; 
cgitb.enable(); 
dataPath='./data/';
form = cgi.FieldStorage() 
def printHTMLmsg(message): #&nbsp;&nbsp;<a href="pdf.py">return to URL</a><Br>
  print """\
Content-Type: text/html\n
<html>
<body>
<p>%s</p>
</body>
</html>
""" % (message)
  pass;

printHTMLmsg(str(form.keys()));


'''
Send a tuple to the server, or retrieve one. Data binary encoded (unless the spec doesn't allow that). 
If a value-less key is submitted, assume the request is to read-only. Otherwise request is to write. 
'''

#http://stackoverflow.com/questions/5979349/upload-a-binary-file-using-pure-javascript

#https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest

#print( str(form.keys()));
'''return;

if(False):
  textdata= form['comment'].value;#filename']

  existingTextFiles = os.popen("ls -1 "+dataPath+"*.txt").readlines();
  fnBases = [ ] 
  textFileIndex = -1; 
  for f in existingTextFiles:
    ff = os.path.basename(f.strip())
    fnBase = ff[:-4];  #remove extension from file name.
    fnBases.append( fnBase);
    if( int(fnBase) > textFileIndex):
      textFileIndex = int(fnBase);
  textFileIndex+=1;  #text file index to write to..

  outFileName = str(textFileIndex)+".txt"
  open(dataPath + outFileName, 'wb').write(textdata)
'''

'''
# Test if the file was uploaded
if fileitem.filename:
   # strip leading path from file name to avoid 
   # directory traversal attacks
   fn = os.path.basename(fileitem.filename)
   open('/home/ash/public_html/cgi-bin/tmp/' + fn, 'wb').write(fileitem.file.read())
   message = 'The file "' + fn + '" was uploaded successfully'  
else:
   message = 'No file was uploaded'
'''
'''
message = str([fnBases])+str(" ")+str(existingTextFiles)+" wrote data: "+str([textdata])+" to file: "+outFileName;

#surveyWebEnvironment.printHTMLmsg(message,"#instructions-consent");

'''
