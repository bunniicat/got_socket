const sock = io();

sock.on('playerObject', ({name, age, status}) => {
    console.log(name);
})