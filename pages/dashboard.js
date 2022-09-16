import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const router = useRouter();

  async function getProfile() {
    const response = await axios.get("/api/profile");
    console.log(response);
    setUser(response.data);
  }
  async function logout() {
    try {
      const response = await axios.post("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error(error);
      router.push("/login");
    }
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={getProfile}>get profile</button>
      <button onClick={logout}>log out</button>
    </div>
  );
}
