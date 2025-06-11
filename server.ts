import { createServer } from 'http';
import { Server } from 'socket.io';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer((req, res) => {
        handle(req, res);
    });

    const io = new Server(httpServer, {
        cors: {
            origin: '*', // In production, replace with your frontend URL
        },
    });

    io.on('connection', (socket) => {
        console.log('🔌 New client connected:', socket.id);

        socket.on('joinRoom', (roomId) => {
            socket.join(roomId);
            console.log(`${socket.id} joined room ${roomId}`);
        });

        socket.on('sendMessage', ({ roomId, message }) => {
            console.log(`📩 Message in ${roomId}: ${message}`);
            io.to(roomId).emit('receiveMessage', { message, senderId: socket.id });
        });

        socket.on('disconnect', () => {
            console.log('❌ Client disconnected:', socket.id);
        });
    });

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
