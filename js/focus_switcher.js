/**
 *
 */
var FocusSwitcher = Class.create({

    initialize : function(options) {
        options = options || {};
        this.shortcut = options.shortcut || this.determineDefaultShortcut();
        this.lastFocused = -1;

        this.bindShortcut();        
    },

    determineDefaultShortcut : function() {
      if(clientInformation.platform == "MacIntel"){
          return "Meta+Alt+L";
      }
      else {
          return "Ctrl+Alt+L";
      }
    },

    bindShortcut : function() {
        // Event.observe(document,"keydown",this.handleKeyEvent.bind(this))
        shortcut.add(this.shortcut,this.moveFocus.bind(this));
        console.log('Added shortcut as ' + this.shortcut);
    },

    moveFocus : function(){
        var res = this.findNextInput(this.lastFocused + 1);
        if(!res){
            return null;
        }
        this.lastFocused = res.idx;
        res.input.focus();
    },

    isTextInput:function (input) {
        return input.type == "text" || !input.type;
    },

    findNextInput : function(startIdx){
        var inputs = document.getElementsByTagName('input');                
        var offset = startIdx < inputs.length ? startIdx : 0;

        for(var i = 0; i < inputs.length;i++){
            var pos = (offset + i) % inputs.length;            
            var input = inputs[pos];
            
            if(this.isTextInput(input)){
                return {idx:pos, input:input};
            }
        }
        return null;
    }
});

