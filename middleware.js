import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(request) {
  //TODO se ejecuta antes de llegar a las páginas
  const jwt = request.cookies.get("myTokenName");
  //TODO extraemos el token de la cookie
  //if (request.nextUrl.pathname.includes("/dashboard")) {
  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
    //TODO si no hay token redireccionamos a login
  }
  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode("secret")
    );
    //TODO si hay token verificamos que sea valido

    console.log(payload);
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL("/login", request.url));
  } /*
  }
  return NextResponse.next();*/
  //TODO si no es la ruta dashboard dejamos pasar la petición
}
export const config = {
  matcher: ["/dashboard", "/"],
};
