(function(root){
  'use strict';
  var HexicGame = function (options) {
    this.game = document.getElementById('hexic-game');
    this.createGrid(17, 5);
    
  };
  
  HexicGame.prototype.createGrid = function (col, row) {
    var posX = 0;
    var posY = 50;
    var len = col * row;
    for(var i=1; i< len+1; i++) {
      var pon = this.createHexagon(i);
      pon.style.marginLeft = posX+'px';
      pon.style.marginTop = posY+'px';
      posX += 92;
      if(i % row == 0){
        posX = 92 / 2;
        posY += 26; 
        if(i % 2 == 0) {
          posX = 0;
        }
      }
    }
  };

  HexicGame.prototype.createHexagon = function (id) {
    var pon = document.createElement('DIV');
    pon.setAttribute('class', 'hex');
    pon.setAttribute('id', id);
    this.game.appendChild(pon); 
    return pon;
  };

  root.HexicGame = HexicGame;
}(window));
