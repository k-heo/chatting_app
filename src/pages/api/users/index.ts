import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { joinData } = req.body.params;

  const profile = await client.user.findUnique({
    where: {
      userId: joinData?.userId,
    },
  });

  if (!profile) {
    await client.user.create({
      data: {
        name: joinData?.username,
        userId: joinData?.userId,
        password: await hash(joinData?.password, 12),
      },
    });
  }
  return res.json({
    ok: true,
  });
}

export default withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false,
});
