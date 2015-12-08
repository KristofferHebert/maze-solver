'use strict'

function handleReady($) {
    var $canvas = $('#maze')
    var $solve = $('#solve')

    function solveMap(){

    }

    function generateMap(selecter, mazeArray, cellSize){
        function _fillRect(x, y, cellSize){
            var ctx = selecter[0].getContext('2d')
            ctx.fillStyle = 'black'
        }

        var y = mazeArray.length
        var x = mazeArray[0].length

        console.log(x, y)
        var index = cellSize * -1
         while(index+= cellSize < x){
            _fillRect(0, index, cellSize)
        }
    }

    function fetchData(url){
        return $.get(url)
    }

    fetchData('https://s3-us-west-1.amazonaws.com/circleup-challenge/maze.json')
    .done(function handleResponse(response){
        var mazeArray = response.maze
        generateMap($canvas, mazeArray, 10)

    })
    .fail(function handleError(error){
        throw new Error(error)
    })


    $solve.on('click', function(event){
        alert('event')
    })

}


jQuery(document).ready(handleReady)
