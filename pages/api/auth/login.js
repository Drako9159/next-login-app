import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default function loginHandler(req, res) {
  const { email, password } = req.body;
  if (email === "admin@local.local" && password === "admin") {
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        email: "admin@local.local",
        username: "drako",
      },
      "secret"
    );
    const serialized = serialize("myTokenName", token, {
      //TODO para serializar la cookie
      httpOnly: true,
      //TODO para que solo se pueda acceder a la cookie desde el servidor
      secure: process.env.NODE_ENV === "production",
      //TODO en production necesitamos SSL para que funcione
      sameSite: "strict",
      //TODO para backEnd externo poner en "none"
      //TODO para que la cookie solo se pueda enviar en peticiones de la misma pagina
      maxAge: 60 * 60 * 24 * 30,
      //TODO para que la cookie expire en 30 dias
      path: "/",
      //TODOO para que la cookie este disponible en toda la pagina
    });
    res.setHeader("Set-Cookie", serialized);

    return res.json("login Succesfully");
  }
  return res.status(401).json("Invalid Credentials");
}
