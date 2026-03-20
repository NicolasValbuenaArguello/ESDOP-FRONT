import { style } from "@angular/animations";
import { Control, ControlPosition, DomUtil, Util, Map } from "leaflet";
import { Component } from '@angular/core';
import { FunctionExpr } from "@angular/compiler";


const Watermark = Control.extend({

    options: {
        position: "topleft",
        img: '../../../../assets/logos/filter.svg',
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


        img.onclick = () => {
            //https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
            // alert("nicolas")
 


      
        };


        img.onmouseenter = () => img.style.backgroundColor = 'green'
        img.onmouseout = () => img.style.backgroundColor = 'transparent'
        return img;
    },


     onRemove: function(map:Map) {

    }
});

export const imprimir = ( options?:{
    position? :ControlPosition, img?: string, border?:boolean, map:Map
}) => new Watermark(options);