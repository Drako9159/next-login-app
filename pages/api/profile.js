import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(401).json("no Token");
  }
  try {
    const user = verify(myTokenName, "secret");
    //TODO extraemos el usuario de la cookie

    return res.json({ email: user.email, username: user.username });
  } catch (e) {
    res.status(401).json("Invalid Token");
    console.log(e);
  }
}
