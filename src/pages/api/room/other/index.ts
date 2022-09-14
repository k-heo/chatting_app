import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "types/next";
import { prisma } from "../../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const { room_id, title, other_id } = req.body.params;

    const chkData = await prisma.usersOnRoom.findFirst({
      where: {
        room_id: room_id,
        user_id: other_id,
      },
    });
    if (chkData) {
      return res.status(201).json(chkData);
    } else {
      const response = await prisma.usersOnRoom.create({
        data: {
          user: {
            connect: {
              id: other_id,
            },
          },
          room: {
            connect: {
              id: room_id,
            },
          },
        },
      });

      return res.status(201).json(response);
    }
  } else {
    return res.status(405).end();
  }
};
