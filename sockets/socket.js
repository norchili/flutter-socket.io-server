const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
console.log('Init Server...');

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Rolling Stones'));
bands.addBand(new Band('Volbeat'));
bands.addBand(new Band('Helloween'));

console.log(bands);

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    
    //Emite evento solo al cliente conectado por primera vez
    client.emit('activeBands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload);
        
        io.emit('mensaje', {admin:'Nuevo mensaje'});
    });

    client.on('emitir-mensaje', (payload) => {
        // io.emit('nuevo-mensaje', payload);  *Esto Emite a todos los clientes
        client.broadcast.emit('nuevo-mensaje', payload);
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        // Emite o envia el evento a todos los clientes que estan activos al Socket
        io.emit('activeBands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        console.log(payload.name);
        bands.addBand(new Band(payload.name));
        // Emite o envia el evento a todos los clientes que estan activos al Socket
        io.emit('activeBands', bands.getBands()); 
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        // Emite o envia el evento a todos los clientes que estan activos al Socket
        io.emit('activeBands', bands.getBands());
    });


  });