import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcryptjs";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { loginData } = req.body.params;

  const profile = await client.user.findUnique({
    where: {
      userId: loginData?.userId,
    },
  });

  if (profile) {
    if (await compare(loginData.password, profile?.password)) {
      const loginData = {
        userId: profile?.userId,
        name: profile?.name,
        id: profile?.id,
      };
      return res.json({
        ok: true,
        loginData,
      });
    } else {
      return res.json({
        ok: false,
      });
    }
  } else {
    return res.json({
      ok: false,
    });
  }
}

export default withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false,
});
