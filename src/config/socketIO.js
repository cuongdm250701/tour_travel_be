const SocketIO = require('socket.io');
const Sequelize = require('sequelize');

const { Op } = Sequelize;

let io = null;

const setup = (server) => {
  io = SocketIO(server, {
    cors: {
      allowedHeaders: ['token'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS'],
      origin: '*',
      preflightContinue: false,
      optionsSuccessStatus: 200,
    },
  });
  io.on('connection', (socket) => {
    console.log('socket', 'connection', socket.id);
  });
  io.on('user', (data) => {
    console.log(data);
  });
};

const emitNoti = ({ user_id, metaData }) => {
  console.log('emitNoti', metaData);
  try {
    if (user_id) {
      console.log('user_id', user_id);
      io.emit(`user_${user_id}`, metaData);
    } else {
      console.log('không có userid');
      io.emit('user_admin', metaData);
    }
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  setup,
  emitNoti,
};
