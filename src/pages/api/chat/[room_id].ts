import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "types/next";
import { prisma } from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method !== "POST") return res.status(405).end();

  const { user_id, message } = req.body;
  const { room_id }: any = req.query;
  const data = await prisma.chat.create({
    data: {
      user: {
        connect: {
          id: user_id,
        },
      },
      room: {
        connect: {
          id: String(room_id),
        },
      },
      message,
    },
    select: {
      id: true,
      room_id: true,
      user_id: true,
      message: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  res?.socket?.server?.io?.to(room_id)?.emit("message", data);

  res.status(201).json(data);
};
