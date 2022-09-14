import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcryptjs";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const userId = String(req.query.userId);

  const profile = await client.user.findMany({
    where: {
      NOT: {
        userId: userId,
      },
    },
    select: {
      userId: true,
      name: true,
      id: true,
    },
  });

  return res.json({
    ok: false,
    profile,
  });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
