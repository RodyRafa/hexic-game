(function(root){
  'use strict';
  var HexicGame = function (options) {
    this.prepare(options);
    this.initGame(options);
  };

  HexicGame.prototype.initGame = function (options) {
    this.createGrid(options.grid.col, options.grid.row);
  };

  HexicGame.prototype.prepare = function (options) {
    this.game = document.getElementById(options.game);
    this.arrPons = [];
    this.rowPair = [];
  };
  
  HexicGame.prototype.createGrid = function (row, col) {
    var posX = 0;
    var posY = 50;
    var len = col * row;
    var booAdd = true;
    for(var i=0; i< len; i++) {
      var pon = this.createHexagon(i);
      pon.style.marginLeft = posX+'px';
      pon.style.marginTop = posY+'px';
      posX += 92;
      if((i+1) % row == 0 && i != 0){
        posX = 92 / 2;
        posY += 26; 
        booAdd = !booAdd;
        if((i+1) % 2 == 0) {
          posX = 0;
        }
      }
      if(booAdd) {
        this.rowPair.push(i);
      }
      this.arrPons.push(pon);
    }
  };

  HexicGame.prototype.createHexagon = function (id) {
    var pon = document.createElement('DIV');
    pon.setAttribute('class', 'hex');
    pon.setAttribute('id', id);
    
    this.addEvent(pon, 'click', this.onClick.bind(this));
    this.game.appendChild(pon); 
    return pon;
  };

  HexicGame.prototype.addEvent = function (el, evnt, funct) {
    if(el.attachEvent) {
      return el.attachEvent('on'+evnt, funct);
    } else {
      return el.addEventListener(evnt, funct, false);
    }
  };

  HexicGame.prototype.onClick = function (event) {
    console.log(event.target.id);
    this.onHit(event.target.id);
  };

  HexicGame.prototype.checkPairRow = function (id) {
    for(var i = 0; i < this.rowPair.length; i++) {
      if(id == this.rowPair[i]) {
        return true;
      }
    }
    return false;
  };

  HexicGame.prototype.onHit = function (id) {
    id = Number(id);
    this.setColor(this.arrPons[id]);
    this.setColor(this.arrPons[this.getIdTop(id)]);
    this.setColor(this.arrPons[this.getIdBottom(id)]);
    this.setColor(this.arrPons[this.getIdTopLeft(id)]);
    this.setColor(this.arrPons[this.getIdTopRight(id)]);
    this.setColor(this.arrPons[this.getIdBotLeft(id)]);
    this.setColor(this.arrPons[this.getIdBotRight(id)]);
  };

  HexicGame.prototype.setColor = function (el) {
    if(el) {
      console.log(el);
      el.setAttribute('class', 'hex blue');
    }
  }

  HexicGame.prototype.getIdTop = function (id) {
    if(id < 4) return null;
    return id - 10 > -1 ? id - 10 : null;
  }

  HexicGame.prototype.getIdTopLeft = function (id) {
    if((id % 10) == 0) return null;
    if(id < 4) return null;
    var distId = 6;
    if(!this.checkPairRow(id) && (String(id).charAt(1) != "4") || (String(id).charAt(1) == '9')) {
      distId = 5;
    }
    return id - distId >= 0 ? id - distId : null;
  };

  HexicGame.prototype.getIdTopRight = function (id) {
    if(id < 4) return null;
    if(String(id).charAt(1) == '9')return null;
    var distId = 5;
    if(!this.checkPairRow(id) && (String(id).charAt(1) != "4")) {
      distId = 4;
    }
    return id - distId > 0 ? id - distId : null;
  };
  
  HexicGame.prototype.getIdBottom = function (id) {
    return id + 10 <= this.arrPons.length ? id + 10 : null;
  }

  HexicGame.prototype.getIdBotLeft = function (id) {
    if((id % 10) == 0 ) return null;
    var distId = 4;
    if(!this.checkPairRow(id) && (String(id).charAt(1) != "4")) {
      distId = 6;
    }
    if (String(id).charAt(1) == '9') {
      distId = 5;
    }
    return id + distId <= this.arrPons.length ? id + distId : null;
  };

  HexicGame.prototype.getIdBotRight = function (id) {
    if(String(id).charAt(1) == '9')return null;
    return id + 5 <= this.arrPons.length ? id + 5 : null;
  };

  root.HexicGame = HexicGame;
}(window));
