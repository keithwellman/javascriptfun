var images8 = ["image001.gif", "image002.gif",
                "image003.gif", "image004.gif",
                "image005.gif", "image006.gif",
                "image007.gif", "image008.gif"];
var images10 = ["image001.gif", "image002.gif",
                "image003.gif", "image004.gif",
                "image005.gif", "image006.gif",
                "image007.gif", "image008.gif",
                "image009.jpg", "image010.png"];
var images12 = ["image001.gif", "image002.gif",
                "image003.gif", "image004.gif",
                "image005.gif", "image006.gif",
                "image007.gif", "image008.gif",
                "image009.jpg", "image010.png",
                "image011.gif", "image012.gif"];
var numbers = ["img001.gif", "img002.gif",
                "img003.gif", "img004.gif",
                "img005.gif", "img006.gif",
                "img007.gif", "img008.gif",
                "img009.gif", "img010.gif",
                "img011.gif", "img012.gif",
                "img013.gif", "img014.gif",
                "img015.gif", "img016.gif",
                "img017.gif", "img018.gif",
                "img019.gif", "img020.gif",
                "img021.gif", "img022.gif",
                "img023.gif", "img024.gif"];
var diff;
var memorizeTimer;
var interval;
var timerText;
var seconds;
var second;
var showing = 1;
var matches = 0;
var boardSize;
var boardSizeTime;
function drawBoard(x) {

  document.getElementById("tablearea").style.display = "none";
  if (x == 8) {
    boardSize = 16;
    boardSizeTime = 120;
    var pictures = randomImages(images8);
    document.getElementById('tablearea').innerHTML = "";
    document.getElementById('tablearea').appendChild(createTable(null, 4, 4, pictures));
  }
  else if (x == 10) {
    boardSize = 20;
    boardSizeTime = 150;
    var pictures = randomImages(images10);
    document.getElementById('tablearea').innerHTML = "";
    document.getElementById('tablearea').appendChild(createTable(null, 5, 4, pictures));
  }
  else if (x == 12) {
    boardSize = 24;
    boardSizeTime = 180;
    var pictures = randomImages(images12);
    document.getElementById('tablearea').innerHTML = "";
    document.getElementById('tablearea').appendChild(createTable(null, 6, 4, pictures));
  }
}

function difficulty(i) {
  diff = i;
}

function start() {
  document.getElementById("tablearea").style.display = "block";
  memorizeTimer = setTimeout(memTimer, diff*1000);
}

function createTable(table, rows, cells, pictures) {
  if (!table) table = document.createElement('table');
  var imageCounter = 0;
  for (var i = 0; i < rows; ++i) {
    var row = document.createElement('tr');
    for (var j = 0; j < cells; ++j) {
      var tableCell = document.createElement('td');
      var tableContents = document.createElement('img');
      tableContents.setAttribute('id', 'showPicture' + imageCounter);
      tableContents.src = "images/" + pictures[imageCounter];
      var hiddenNumbers = document.createElement('img');
      hiddenNumbers.setAttribute('id', 'hidePicture' + imageCounter);
      hiddenNumbers.src = "images/" + numbers[imageCounter];

      //using a closure to keep the value of id for each image
      (function () {
        var showPic = tableContents.id;
        var hidePic = hiddenNumbers.id;
        tableContents.addEventListener("click", function() { reveal(showPic, hidePic); });
        hiddenNumbers.addEventListener("click", function() { reveal(hidePic, showPic); showing++;});
      }());

      hiddenNumbers.style.display = "none";
      tableCell.appendChild(tableContents);
      tableCell.appendChild(hiddenNumbers);
      row.appendChild(tableCell);
      imageCounter++;
    }
    table.appendChild(row);
  }
  return table;
}

function randomImages(pictures) {
  pictures = pictures.concat(pictures);
  pictures = shuffle(pictures);
  return pictures;
}

function shuffle(array) {
  var index = array.length;
  var tempValue;
  var randomIndex;
  while (0 !== index) {
    randIndex = Math.floor(Math.random() * index);
    index -= 1;
    tempValue = array[index];
    array[index] = array[randIndex];
    array[randIndex] = tempValue;
  }
  return array;
}

function memTimer() {
    document.getElementById("memorize").innerHTML = "Good Luck!";
    for (var i = 0; i < boardSize; i++) {
      document.getElementById("showPicture"+i).style.display = "none";
      document.getElementById("hidePicture"+i).style.display = "block";

    }
    timerText = document.getElementById("timer");
    seconds = boardSizeTime;
    second = 0;
    interval = setInterval(gameTimer, 1000);
}
function reveal(imageIda, imageIdb) {
  document.getElementById(imageIda).style.display = "none"; // hide the number
  document.getElementById(imageIdb).style.display = "block"; // show the image

  if (showing % 2 === 0 && showing > 0) {
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  var showingId = [];

  for (var i = 0; i < boardSize; i++) {
    if(document.getElementById("showPicture"+i).style.display === "block" && !document.getElementById("showPicture"+i).classList.contains('match')) {
      showingId.push("showPicture"+i); // put all pictures showing into array

    }
  }
  // check if last 2 in array are a match
  if (document.getElementById(showingId[showingId.length-2]).src === document.getElementById(showingId[showingId.length-1]).src) {
    document.getElementById(showingId[showingId.length-2]).className = "match";
    // somehow prevent the image from being clicked again
    document.getElementById(showingId[showingId.length-1]).className = "match";
    // somehow prevent the image from being clicked again
    matches++;
  }

  // if images dont have match class, hide them
  for (var i = 0; i < boardSize; i++) {
    if( !document.getElementById("showPicture"+i).classList.contains('match') ) {
      document.getElementById("showPicture"+i).style.display = "none";
      document.getElementById("hidePicture"+i).style.display = "block";
    }
  }
  if (matches == 8 && boardSize == 16) {
    alert("You win!");
    window.location.reload();
  }
  else if (matches == 10 && boardSize == 20) {
    alert("You win!");
    window.location.reload();
  }
  else if (matches == 12 && boardSize == 24) {
    alert("You win!");
    window.location.reload();
  }

}

function gameTimer() {
  timerText.innerHTML = seconds - second;
  if (second >= seconds) {
    clearInterval(interval);
    alert("You lose!");
    window.location.reload();
  }
  second++;
}
