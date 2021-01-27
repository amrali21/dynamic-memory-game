console.log("test")
function countDown(secs, elem) {
	var element = document.getElementById(elem);
	element.innerHTML = "Time remaining: " + secs + " seconds";
	if (secs < 1) {
		clearTimeout(timer); //stop timer function
		element.innerHTML = '<b style="display:inline";>Time Out</b>';
        //var secs=0;
        window.alert("You lose");
        var ask1=prompt("Type'yes'then press ok to play again");
        if (ask1=="yes"){
        location.reload();
           }
	}
	secs--;
	var timer = setTimeout('countDown(' + secs +' , "'+elem+'")',1000); //1000ms to wait before executing the code =1 second
}
     // end of timer code
      function restart()
      {
      location.reload();
      }


do{
       var rowLength = prompt("Please enter number of rows (must not exceed 6) \n NOTE THAT : the multiplier of row and columns must be even number for the game to work");
       var colLength = prompt("Please enter number of columns (must not exceed 6) \n NOTE THAT : the multiplier of row and columns must be even number for the game to work");
       var gamesize = rowLength*colLength;
       var height= 570/rowLength;
       var width = 900/colLength;
       countDown(gamesize*8, "timer");
      }
    while (isNaN(gamesize) || gamesize %2 !==0  || gamesize<1 || rowLength>6 || colLength>6)
        {
            code();
        }
      function code(){
var temp = []
var waiting = {value: false};
var image = ['./views/resources/GwentGame/1.jpg','./views/resources/GwentGame/2.jpg','./views/resources/GwentGame/3.jpg','./views/resources/GwentGame/4.jpg','./views/resources/GwentGame/5.jpg','./views/resources/GwentGame/6.jpg','./views/resources/GwentGame/7.jpg','./views/resources/GwentGame/8.jpg','./views/resources/GwentGame/9.jpg','./views/resources/GwentGame/10.jpg','./views/resources/GwentGame/11.jpg','./views/resources/GwentGame/12.jpg','./views/resources/GwentGame/13.jpg','./views/resources/GwentGame/14.jpg','./views/resources/GwentGame/15.jpg','./views/resources/GwentGame/16.jpg','./views/resources/GwentGame/17.jpg','./views/resources/GwentGame/18.jpg']
var D1Data = [];                          // D1Data has duplicated image objects.
var D2Data = [];
var count=0;
for(var x = 0; x < gamesize/2; x++){
  D1Data.push( {src: image[x], clicked: false} );
  D1Data.push( {src: image[x], clicked: false} );
}

for(var x = 0; x < D1Data.length; x++){
  console.log('index: ' + x + ' ' + D1Data[x].src)
}

// fill D2Data 2D array. (2D array is a group 1D arrays)
    for(var y = 0; y<rowLength; y++){ // 2 times
        var temp = [];
        var x = 0;

        while(x < colLength)   // 4 times
        {
          var rand = Math.floor(Math.random() * D1Data.length );

          temp.push(D1Data[rand]);
          temp[x].y = x;
          temp[x].x = y;

          console.log('iteration: ' + y +' removed at index: ' + rand);
          D1Data.splice(rand, 1)
          x++;
        }
        D2Data.push(temp)
      }

// functions and variables
var faceUp = 0;
var clickedCards = [];
var bg = './views/resources/GwentGame/bg.jpg'

function genTable(rowLength, colLength, imageData2D)
{
    var table = document.createElement("TABLE");
    table.id = 'tbl';
    var myTableDiv = document.getElementById("mytable");

    for (var i = 0; i < rowLength; i++)
        {
            var tr = document.createElement("TR");
            table.appendChild(tr);
    for (var j = 0; j < colLength; j++)
        {
            var td = document.createElement("TD");
            tr.appendChild(td);
            var img = document.createElement("img");
            img.src = './views/resources/GwentGame/bg.jpg';
            img.height=height;
            img.width=width;
            td.appendChild(img);

        }
        }
        myTableDiv.appendChild(table);

}

genTable(rowLength, colLength, D2Data); // generate table..


  var list = document.getElementsByTagName("img");
  for(var i =0; i< list.length; i++){
    list[i].onclick= function(){               // THE ONCLICK EVENT FOR ALL IMAGES.


    var row = this.parentElement.parentElement.rowIndex;
    var column = this.parentElement.cellIndex;

          if(!D2Data[row][column].clicked && !waiting.value) {
          if(clickedCards.length == 0){            // if it is the only card, add it to clickedCards, set clicked to true, set background
            this.src = D2Data[row][column].src;
              this.height=height;
              this.width=width;
            D2Data[row][column].clicked = true;
            clickedCards.push(D2Data[row][column]);
          }

          else{        // compare card to one in the list..
            console.log('comparing to one in the lisst')

            if(D2Data[row][column].src === clickedCards[0].src){    // if it matches..
            console.log('match')
            this.src = D2Data[row][column].src
            D2Data[row][column].clicked = true;
            clickedCards = [];  // empty the matrix.
                count+=2;
                console.log(count);
                if(count==gamesize)
                    {
                        window.alert("WoW! You Won");
                        var ask=prompt("Type'yes'then press ok to play again");
                        if (ask=="yes"){
                        restart();
                        }
                     }
            }
            else{             // not a match.

            //this.src = bg;
            this.src = D2Data[row][column].src; // show picture of card u just clicked
            D2Data[row][column].clicked = true; // new
            waiting.value = true; //
            setTimeout(flipback , 700, row, column, this, clickedCards,waiting, D2Data)
            }
          }

      }

    }
  }
  function flipback(row, column, This, clickedCards,waiting, D2Data){  // flip both cards back to facedown

  This.src = bg;   // flip this to bg
  document.getElementById('tbl').rows[clickedCards[0].x].cells[clickedCards[0].y].firstElementChild.src = bg;   // flip the one in clickedCards

  // clicked is false in both.
  clickedCards[0].clicked = false;
  D2Data[row][column].clicked = false;

  waiting.value = false;
  clickedCards.splice(0,1);

}

      }
