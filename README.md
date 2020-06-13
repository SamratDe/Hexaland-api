# Project Title
Hexaland API

## Getting Started
* Clone the repository to local machine
* Run npm install to install all the dependencies
* Run npm start
* Run the API in postman

## Running Test
* __giving input__ : localhost:3000/api/hexaland/input (POST request)

input should be JSON data of type:

```
{
	"nameOne": "ax",
	"cPtOne": 2,
	"nameTwo": "nx",
	"cPtTwo": 5
}
```
here, nameOne is the already existing grid and nameTwo is the name of new grid to be added. cPtOne and cPtTwo are the connecting sides of nameOne and nameTwo respectively.

* __Removing a grid__ : localhost:3000/api/hexaland/remove (POST request)

input should be JSON data of type:

```
{
	"name": "ax",
}
```
here, name is the name of the grid you want to remove.

* __Information about a grid__ : localhost:3000/api/hexaland/info (GET request)