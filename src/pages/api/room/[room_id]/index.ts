import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "types/next";
import { prisma } from "../../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  const { room_id, user_id } = req.query;

  const chk_room_id: any = room_id;

  const roomDataChk = await prisma.room.findFirst({
    where: {
      id: chk_room_id,
    },
  });

  if (!roomDataChk) {
    return res.status(405).end();
  }

  if (req.method === "GET") {
    const { _count: row } = await prisma.usersOnRoom.aggregate({
      where: {
        room_id: String(room_id),
        user_id: String(user_id),
      },
      _count: true,
    });
    // create usersOnRoom row
    if (row === 0) {
      await prisma.usersOnRoom.create({
        data: {
          room_id: String(room_id),
          user_id: String(user_id),
        },
      });
    }

    res.socket.server.io.once("connection", (socket: any) => {
      console.log(`client ${socket.id} has connected`);

      // do not make duplicate join chat-room
      if (!socket.rooms.has(String(room_id))) {
        console.log(`client ${socket.id} has joined ${room_id}`);
        socket.join(room_id);
      }

      // handle disconnect
      socket.on("disconnect", (reason: any) => {
        console.log(`client ${socket.id} has disconnected ${reason}`);
        socket.leave(String(room_id));
      });
    });

    res.end();
  } else if (req.method === "POST") {
  } else {
    return res.status(405).end();
  }
};
