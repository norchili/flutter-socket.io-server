const Band = require("./band");


class Bands {

    constructor(){
        this.bands =[];
    }

    addBand(band = new Band ){
        this.bands.push(band);
    }

    getBands(){
        return this.bands;
    }

    deleteBand(id = ''){
        //Filtra y te devuelve las bandas que no tienen el id recivido
        // Es como si se eliminara solo ese id recibido
        this.bands = this.bands.filter(band => band.id !== id);
        return this.bands;
    }

    voteBand(id = ''){

        this.bands = this.bands.map(band =>{

            if( band.id === id){
                band.votes++;
                return band;
            } else{
                return band;
            }

        });
    }
}

module.exports = Bands;