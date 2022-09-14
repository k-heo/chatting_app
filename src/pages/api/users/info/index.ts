import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const userId = req.body.params.userId;

  const profile = await client.user.findUnique({
    where: {
      userId: userId,
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
  methods: ["POST"],
  handler,
  isPrivate: false,
});
