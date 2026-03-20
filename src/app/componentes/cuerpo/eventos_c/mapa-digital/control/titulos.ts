import { Control, ControlPosition, DomUtil, Util } from "leaflet";

const Titulo_subtitulo = Control.extend({

    //inicializacion
    initialize: function(options:{
        position:ControlPosition, title:string, subtitle:string
    }){
        Util.setOptions(this, options)
    },
    //opciones
    options:{
        position:'bottomright',
        title:"JEMOP",
        subtitle:"COE"
    },
    //Añadir la informacion 
    onAdd: function(){
        const  control_div = DomUtil.create('span', 'title-subtitle');
        control_div.innerHTML = `<h6>${this.options.title}</h6><span>${this.options.subtitle}</span>`;

        control_div.style.background = "white";
        control_div.style.textAlign = "center";
        control_div.style.padding = "3px";
        control_div.style.borderRadius = "6px";
        control_div.style.fontWeight ="700"

        return control_div;

    }

});
export const titulo_subtitulo = ( options?:{
    position? :ControlPosition, title?: string, subtitle?:string
}) => new Titulo_subtitulo(options);