import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export default function logoutHandler(req, res) {
  const { myTokenName } = req.cookies;
  if (!myTokenName) {
    return res.status(401).json("no Token");
  }
  try {
    verify(myTokenName, "secret");
    const serialized = serialize("myTokenName", null, {
      //TODO para serializar la cookie
      httpOnly: true,
      //TODO para que solo se pueda acceder a la cookie desde el servidor
      secure: process.env.NODE_ENV === "production",
      //TODO en production necesitamos SSL para que funcione
      sameSite: "strict",
      //TODO para backEnd externo poner en "none"
      //TODO para que la cookie solo se pueda enviar en peticiones de la misma pagina
      maxAge: 0,
      //TODO para que la cookie expire en 30 dias
      path: "/",
      //TODOO para que la cookie este disponible en toda la pagina
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(200).json("logout Succesfully");
  } catch (error) {
    return res.status(401).json("Invalid Token");
  }
}
