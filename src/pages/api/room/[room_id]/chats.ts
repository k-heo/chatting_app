import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "types/next";
import { prisma } from "../../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  const room_id = String(req.query.room_id);

  if (req.method === "GET") {
    const response = await prisma.chat.findMany({
      where: {
        room_id,
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
      orderBy: {
        createdAt: "asc",
      },
    });

    res.json(response);
  } else {
    // block if method is not supported
    return res.status(405).end();
  }
};
