const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { log } = require('console');
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // 您的客户端地址
        methods: ['GET', 'POST'],
        credentials: true
    }
});
const port = 3000;


let conversations = {
    'conversationId1': {
        id: 'conversationId1',
        participants: ['userId3', 'userId2'],
        messages: [
            { id: 'messageId1', sender: 'userId3', content: 'Hello!', timestamp: 1627738339574 },
            { id: 'messageId2', sender: 'userId2', content: 'Hi, how are you?', timestamp: 1627738359574 },
        ],
    },
    'conversationId2': {
        id: 'conversationId2',
        participants: ['userId3', 'userId1'],
        messages: [
            { id: 'messageId1', sender: 'userId3', content: 'Hi!', timestamp: 1627738339574 },
            { id: 'messageId2', sender: 'userId1', content: 'Manba Out!', timestamp: 1627738359574 },
        ],
    },
    'conversationId3': {
        id: 'conversationId3',
        participants: ['userId3', 'userId1', 'userId2'],
        messages: [
            { id: 'messageId1', sender: 'userId3', content: 'Hi!', timestamp: 1627738339574 },
            { id: 'messageId2', sender: 'userId1', content: '别叫', timestamp: 1627738359574 },
            { id: 'messageId2', sender: 'userId1', content: 'fuck', timestamp: 1627738359574 },
            { id: 'messageId2', sender: 'userId2', content: 'What Can i say', timestamp: 1627738359574 },
            { id: 'messageId2', sender: 'userId3', content: 'shut up', timestamp: 1627738359574 },
            { id: 'messageId2', sender: 'userId2', content: '急了', timestamp: 1627738359574 },
        ],
    },
};
app.use(cors())
app.use(express.static('public'));

function isParticipant(conversationId, userId) {
    return conversations[conversationId].participants.includes(userId);
}

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinConversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`User joined conversation ${conversationId}`);
    });

    socket.on('sendMessage', (conversationId, message) => {
        if (!isParticipant(conversationId, message.sender)) {
            console.error(`User ${message.sender} is not a participant of conversation ${conversationId}`);
            return;
        }
        const newMessage = {
            id: `messageId${Date.now()}`,
            sender: message.sender,
            content: message.content,
            timestamp: Date.now(),
        };

        conversations[conversationId].messages.push(newMessage);
        io.to(conversationId).emit('newMessage', newMessage);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Server is running on http://192.168.137.1:${port}`);
});