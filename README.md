
[![Generic badge](https://img.shields.io/badge/Code-JavaScript-yellow.svg)](https://shields.io/)&nbsp;
[![Generic badge](https://img.shields.io/badge/Code-React-blue.svg)](https://shields.io/)&nbsp;  
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/MarioR9/MarsRovers)&nbsp; 
![GitHub repo size](https://img.shields.io/github/repo-size/MarioR9/MarsRovers?color=g&label=Repo%20Size)&nbsp; 
![GitHub last commit](https://img.shields.io/github/last-commit/MarioR9/MarsRovers)
## MarsRovers

[![Generic badge](https://img.shields.io/badge/Demo-Web-blue.svg)](https://marsrovers-7f6d9.web.app/)&nbsp;

## Table of contents
* [General info](#general-info)
* [Input](#input)
* [Output](#output)
* [Test input](#test-input)
* [Expected Output](#expected-output)
* [Technologies](#technologies)
* [images](#images)

## General Info 

NASA intends to land robotic rovers on Mars to explore a particularly curious-looking plateau. The rovers must  navigate this rectangular plateau in a way so that their on board cameras can get a complete image of the  surrounding terrain to send back to Earth.  
A simple two-dimensional coordinate grid is mapped to the plateau to aid in rover navigation. Each point on the  grid is represented by a pair of numbers X Y which correspond to the number of points East or North, respectively,  from the origin. The origin of the grid is represented by 0 0 which corresponds to the southwest corner of the  plateau. 0 1 is the point directly north of 0 0, 1 1 is the point immediately east of 0 1, etc. A rover’s current  position and heading are represented by a triple X Y Z consisting of its current grid position X Y plus a letter Z corresponding to one of the four cardinal compass points, N E S W. For example, 0 0 N indicates that the rover is  in the very southwest corner of the plateau, facing north. 
NASA remotely controls rovers via instructions consisting of strings of letters. Possible instruction letters are L,  R, and M. L and R instruct the rover to turn 90 degrees left or right, respectively (without moving from its current  spot), while M instructs the rover to move forward one grid point along its current heading. 
Your task is write an application that takes the test input (instructions from NASA) and provides the expected  output (the feedback from the rovers to NASA). Each rover will move in series, i.e. the next rover will not start  moving until the one preceding it finishes.  

## Input 
Assume the southwest corner of the grid is 0,0 (the origin). The first  line of input establishes the exploration grid bounds by indicating  the coordinates corresponding to the northeast corner of the  plateau. 
Next, each rover is given its instructions in turn. Each rover’s  instructions consists of two lines of strings. The first string confirms  the rover’s current position and heading. The second string consists  of turn / move instructions.  

## Output 
Once each rover has received and completely executed its given  instructions, it transmits its updated position and heading to NASA.


## Test Input 
5 5  
1 2 N  
LMLMLMLMM
******
3 3 E  
MMRMMRMRRM  

## Expected Output 
1 3 N  
******
5 1 E 

## Technologies

Project is created with:
* React 
* HTML
* CSS
* BootstrapUI


## Images

##### Mars Info 
<img src="ReadmeImages/mars info.png" width="300"> 

##### Output 
<img src="ReadmeImages/output.png" width="300"> 


