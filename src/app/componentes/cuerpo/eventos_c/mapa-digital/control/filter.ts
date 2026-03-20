import { style } from "@angular/animations";
import { Control, ControlPosition, DomUtil, Util } from "leaflet";


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
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen
            // alert("nicolas")
            var contenedor_oculto = document.getElementById("control_mapa")
            contenedor_oculto?.classList.toggle("contenedor_oculto")

            // if (!document.fullscreenElement) {
            //     document.getElementById('map')?.requestFullscreen().catch((err) => {
            //         img.title = "Salir de Pantalla completa"
            //     });
            //   } else {
            //     document.exitFullscreen();
            //     img.title = "Var Pantalla completa"
            //   }
            
        };

        img.onmouseenter = () => img.style.backgroundColor = 'green'
        img.onmouseout = () => img.style.backgroundColor = 'transparent'
        return img;
    },


    // onRemove: function(map) {
    //     // Nothing to do here
    // }
});

export const filter = ( options?:{
    position? :ControlPosition, img?: string, border?:boolean
}) => new Watermark(options);