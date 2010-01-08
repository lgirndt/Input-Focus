var ShortcutStore = Class.create({
    initialize : function(){

    },

    store : function(){
        var o = this.extractOptions('focus');
        this.storeShortcut('focusShortcut',o);
    },

    storeShortcut : function(id,options){
        var json = Object.toJSON(options);
        localStorage[id] = json;     
    },

    restore : function(){
        var o = this.loadShortcut('focusShortcut');
        o = o || this.getDefaultShortcut();

        if(o){
            this.applyOptions('focus',o);
        }
    },

    loadShortcut : function(id){
        try {
            var o = localStorage[id];
            if(o){
                return o.evalJSON();
            }
        }
        catch(e){
            console.log("Exception during loading. " + e);
        }
        return null;
    },

    convertOptionsToString : function(options){

        var str = options.key;
        if(options.hasShift == true){
            str += "+Shift";
        }
        if(options.hasCtrl == true){
            str += "+Ctrl";
        }
        if(options.hasAlt == true){
            str += "+Alt";
        }
        if(options.hasMeta == true){
            str += "+Meta";
        }
        return str;
    },

    extractOptions : function(prefix){
        var o = {
            key : $(prefix + '_key').value,
            hasShift : $(prefix + "_hasShift").checked,
            hasCtrl : $(prefix + "_hasCtrl").checked,
            hasAlt : $(prefix + "_hasAlt").checked,
            hasMeta : $(prefix + "_hasMeta").checked
        }
        return o;
    },

    applyOptions : function(prefix,options){
        $(prefix + '_key').value = options.key;
        $(prefix + '_hasShift').checked = options.hasShift;
        $(prefix + '_hasCtrl').checked = options.hasCtrl;
        $(prefix + '_hasAlt').checked = options.hasAlt;
        $(prefix + '_hasMeta').checked = options.hasMeta;
    },

    getDefaultShortcut : function(){
        if(clientInformation.platform == "MacIntel"){
          return {key:'L',hasAlt:true,hasMeta:true}
      }
      else {
          return {key:'L',hasAlt:true,hasCtrl:true};
      }
    },

    updateShortcutInfo : function(prefix,shortcutId){
        var options = this.extractOptions(prefix);
        $(shortcutId).innerHTML = this.convertOptionsToString(options);
    }
})