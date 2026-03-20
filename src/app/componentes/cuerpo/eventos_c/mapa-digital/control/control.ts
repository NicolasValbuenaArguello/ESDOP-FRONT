import { style } from "@angular/animations";
import { Control, ControlPosition, DomUtil, Util } from "leaflet";

const Watermark = Control.extend({

    options: {
        position: "bottomleft",
        img: '../../../../assets/logos/logo.png',
        border: true
    },

    initialize: function( options:{
        position :ControlPosition, img: string, border:boolean
    }) {

        Util.setOptions(this, options);
    }, 
    onAdd: function() {
        const img = DomUtil.create('img');

        img.src = this.options.img;
        img.style.width = '45px';

        if(this.options.border){
            img.style.border = "2px solid gray"
            img.style.borderRadius ="5px"
        }

        return img;
    },

    // onRemove: function(map) {
    //     // Nothing to do here
    // }
});

export const watermark = ( options?:{
    position? :ControlPosition, img?: string, border?:boolean
}) => new Watermark(options);