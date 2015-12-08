'use strict'

function handleReady($) {
	var $canvasContainer = $('#maze')
	var $solveButton = $('#solve')

    // Couldn't get this done within 3 hours
	function solveMap() {
        // TODO
        alert('todo');
	}

	function generateMap(selecter, mazeArray, cellSize, start, end) {

        // Doing canvas maniplation in memory vs DOM is much faster
        var $canvas = document.createElement('canvas')
        var x = mazeArray[0].length
		var y = mazeArray.length
        var dimension = x * cellSize

        // Setting dimensions to fix blurry issue
        $canvas.setAttribute('width', dimension)
        $canvas.setAttribute('height', dimension)

        function _generateCell(selecter, x, y, cellSize, color) {
			var ctx = selecter.getContext('2d')
			ctx.fillStyle = color
			ctx.fillRect(x, y, cellSize, cellSize)
		}

        // Loop through array and generate cells
        mazeArray.forEach(function(row, rowIndex, rowArray){
            row.forEach(function(value, index){
                if(value === true){
                    _generateCell($canvas, index * cellSize, rowIndex  * cellSize, cellSize, 'black')
                } else {
                    _generateCell($canvas, index * cellSize, rowIndex  * cellSize, cellSize, 'white')
                }
            })
        })
        _generateCell($canvas, start.x * cellSize, start.y  * cellSize, cellSize, 'green')
        _generateCell($canvas, end.x * cellSize, end.y  * cellSize, cellSize, 'red')

        selecter.append($canvas)
	}

	function fetchData(url) {
		return $.get(url)
	}

	fetchData('https://s3-us-west-1.amazonaws.com/circleup-challenge/maze.json')
		.done(function handleResponse(response) {
			var mazeArray = response.maze
            var start = response.start
            var end = response.end

			generateMap($canvasContainer, mazeArray, 10, start, end)

		})
		.fail(function handleError(error) {
			throw new Error(error)
		})


	$solveButton.on('click', function(event) {
		solveMap()
	})

}

jQuery(document).ready(handleReady)
