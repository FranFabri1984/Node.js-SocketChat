const { io } = require('../server');
const { Users } = require('../models/users');
const { createMassage } = require('../utils/util');

const users = new Users();

io.on('connection', (client) => {
   
    client.on('enterChat', (data , callback) => {
        if (!data.name || !data.room) {
            return callback({
              error: true,
              msg:'Required name'
            });
        }
       
       client.join(data.room);
       users.addPerson(client.id, data.name, data.room);
       client.broadcast.to(data.room).emit('listPeople', users.getPeopelByRoom(data.room));
       client.broadcast.to(data.room).emit('createMsg', createMassage('Admin', `${data.name} is join` ));
       callback(users.getPeopelByRoom(data.room));
    });

    client.on('createMsg', (data, callback) => {
      let person = users.getPerson(client.id);
      let msg = createMassage(person.name, data.message);
      client.broadcast.to(person.room).emit('createMsg', msg);
      callback(msg)
    });

    client.on('disconnect', () => {
      let delPerson =  users.deletePerson(client.id);
      client.broadcast.to(delPerson.room).emit('createMsg', createMassage('Admin', `${delPerson.name} left` ));
      client.broadcast.to(delPerson.room).emit('listPeople', users.getPeopelByRoom(delPerson));
    });

    client.on('msgPrivate', data => {
      let person = users.getPerson(client.id);
      client.broadcast.to(data.to).emit('msgPrivate', createMassage(person.name, data.message));
    });

});