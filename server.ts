import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Define the ChatMessage interface (or import it if shared)
interface ChatMessage {
    type: "system" | "user" | "other";
    senderId?: string;
    content: string;
    timestamp: string;
}

app.prepare().then(() => {
    const httpServer = createServer((req, res) => {
        handle(req, res);
    });

    const io = new Server(httpServer, {
        cors: {
            origin: "*", // Replace with your frontend URL in production
        },
    });

    io.on("connection", (socket) => {
        console.log("🔌 New client connected:", socket.id);

        socket.on("joinRoom", (roomId: string) => {
            socket.join(roomId);
            console.log(`${socket.id} joined room ${roomId}`);

            const systemMessage: ChatMessage = {
                type: "system",
                content: `User ${socket.id} joined the room.`,
                timestamp: new Date().toISOString(),
            };

            io.to(roomId).emit("receiveMessage", systemMessage);
        });

        socket.on("sendMessage", ({ roomId, message }: { roomId: string; message: ChatMessage }) => {
            console.log(`📩 Message in ${roomId}: ${message.content}`);

            // Forward message to room with correct type
            const forwardedMessage: ChatMessage = {
                ...message,
                type: "other",
            };

            socket.to(roomId).emit("receiveMessage", forwardedMessage);
        });

        socket.on("disconnecting", () => {
            const rooms = Array.from(socket.rooms).filter((room) => room !== socket.id);
            rooms.forEach((roomId) => {
                const systemMessage: ChatMessage = {
                    type: "system",
                    content: `User ${socket.id} left the room.`,
                    timestamp: new Date().toISOString(),
                };
                socket.to(roomId).emit("receiveMessage", systemMessage);
            });

            console.log("❌ Client disconnected:", socket.id);
        });
    });

    const PORT = process.env.PORT || 3001;
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
});
