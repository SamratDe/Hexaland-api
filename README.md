# Hexaland API

## Getting Started
* Clone the repository to local machine
* Run npm install to install all the dependencies
* Run npm start to start the server
* Run the API in postman

## Running Test
* __giving input__ : POST request

```
localhost:3000/api/hexaland/input
```

input should be JSON data of type:

```
To connect grids ax and bx

{
	"nameOne": "ax",
	"cPtOne": 1,
	"nameTwo": "bx",
	"cPtTwo": 4
}


To add grid dx to the cluster

{
	"nameOne": "bx",
	"cPtOne": 2,
	"nameTwo": "dx",
	"cPtTwo": 5
}

```

***Important :***
here, *nameOne is the already existing grid(except at first when there is not cluster) and nameTwo is the name of new grid to be added. cPtOne and cPtTwo are the connecting sides of nameOne and nameTwo respectively.*

* __Removing a grid__ : POST request

```
localhost:3000/api/hexaland/remove
```

input should be JSON data of type:

```
{
	"name": "ax"
}
```
here, name is the name of the grid you want to remove.

* __Information about a grid__ : GET request

```
localhost:3000/api/hexaland/info
```

input should be JSON data of type:

```
{
	"name": "ax"
}
```
here, name is the name of the grid you want information about.