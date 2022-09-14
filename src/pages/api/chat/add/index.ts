import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcryptjs";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const userId = String(req.query.userId);

  return res.json({
    ok: false,
  });
}

export default withHandler({
  methods: ["GET"],
  handler,
});
