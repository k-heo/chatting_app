import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "types/next";
import { prisma } from "../../../lib/prisma";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "GET") {
    const user_id = String(req.query.user_id);

    const response = await prisma.room.findMany({
      where: {
        users: {
          some: {
            user_id,
          },
        },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        users: {
          select: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(response);
  } else if (req.method === "POST") {
    const { user_id, title, other_id } = req.body.params;

    const chkRoom = await prisma.usersOnRoom.findMany({
      where: {
        user_id,
      },
      select: {
        room_id: true,
      },
    });
    const chkRoom2 = await prisma.usersOnRoom.findMany({
      where: {
        user_id: other_id,
      },
      select: {
        room_id: true,
      },
    });

    let chkArr1: any = [];
    if (chkRoom) {
      chkRoom.forEach((key, value) => {
        console.log(value);
        chkArr1[value] = key["room_id"];
      });
    }
    let chkArr2: any = [];
    if (chkRoom2) {
      chkRoom2.forEach((key, value) => {
        chkArr2[value] = key["room_id"];
      });
    }
    const result = chkArr1.filter((x: any) => chkArr2.includes(x));
    if (result[0]) {
      const response = await prisma.room.findUnique({
        where: {
          id: result[0],
        },
      });
      return res.status(201).json(response);
    } else {
      const response = await prisma.usersOnRoom.create({
        data: {
          user: {
            connect: {
              id: user_id,
            },
          },
          room: {
            create: {
              title: title || "sample_room",
            },
          },
        },
      });

      // if (response) {
      //   await prisma.usersOnRoom.create({
      //     data: {
      //       user: {
      //         connect: {
      //           id: other_id,
      //         },
      //       },
      //       room: {
      //         connect: {
      //           id: response?.room_id,
      //         },
      //       },
      //     },
      //   });
      // }
      return res.status(201).json(response);
    }
  } else {
    return res.status(405).end();
  }
};
