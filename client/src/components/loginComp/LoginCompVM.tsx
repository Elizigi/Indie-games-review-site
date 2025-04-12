import React from "react";

const LoginCompVM = () => {
  async function loginUser(email: string, password: string) {
    try {
      console.log(email,password)
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  email, password }),
      });
      console.log(response);

      if (response.ok) {
        console.log("logged in !");
      } else {
        alert("login error");

        console.error("Registration failed");
      }
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error("some error have occurred", error);
    }
  }
  function checkForm(e: React.FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    if (!email || !password) {
      return alert("email and password are required");
    }
    loginUser(email, password);
  }
  return { checkForm };
};

export default LoginCompVM;
