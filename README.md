# automate-mapleTA
## This will automate the process of linking a MapleTA assignment to Canvas 

## Rough idea of process
 
The lead instructor will provide CSV files for courseIDs and the assignments
prompt for:
 
1. login credentials
2. CSV with courseID
3. CSV with Canvas LTI Assignments
 
Login to Puppeteer

Start Course Loop
 
- Setup Course Homepage Link?
 
Start Assignment Loop

## Canvas api
+ Make LTI assignment  
    + Place in module
+ Get AssignmentID 
    + Whole Object

## Puppeteer 
- Go to Maple TA url in Canvas
- use assignmentID and courseID

Copy the Course

Make course selector value map

Make assignment selector value map

- Check to see if we have what is needed
- If not report the problem

Select course

Select Assignment

Click the link button

Report Success

When all assignments are done
- end assignment loop

When all courses are done 
- end course loop

YAY!!!