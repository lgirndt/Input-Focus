/**
 *
 */
var FocusSwitcher = Class.create({

    initialize : function() {
        this.isShortcut = clientInformation.platform == "MacIntel" ? this.isMacShortcut : this.isWinLinuxShortcut;
        this.bindShortcut();
        this.lastFocused = -1;
    },

    bindShortcut : function() {
        Event.observe(document,"keydown",this.handleKeyEvent.bind(this))
    },

    /**
     * Examines the key event and calls our handling method, if we are interested in the
     * particular key event.
     * @param evt
     */
    handleKeyEvent : function(evt){
        if(this.isShortcut(evt)){
            this.moveFocus();
            Event.stop(evt);                  
        }
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
    },

    /**
     * Determines if we are interested in the shortcut
     * @param evt
     */
    isWinLinuxShortcut : function(evt){
        return evt.keyCode == 76 && evt.ctrlKey && evt.altKey;
    },

    isMacShortcut : function(evt){
        return evt.keyCode == 76 && evt.metaKey && evt.altKey;
    }
});

var focusSwitcher = new FocusSwitcher();
