var Input = function() {
        
    this.keyLeft = keyboard(37);
    this.keyRight = keyboard(39);
    this.keyUp = keyboard(38);
    this.keyDown = keyboard(40);
    this.keyCTRL = keyboard(17);
    
    function keyboard(keyCode) {
        var key = {};
        key.code = keyCode;
        key.isDown = false;
        key.isUp = true;
        key.press = undefined;
        key.release = undefined;
        
        key.downHandler = function(event) {
          if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
          }
          //event.preventDefault();
        };

        key.upHandler = function(event) {
          if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
          }
          //event.preventDefault();
        };

        window.addEventListener("keydown", key.downHandler.bind(key), false);
        window.addEventListener("keyup", key.upHandler.bind(key), false);
        return key;
      }
};