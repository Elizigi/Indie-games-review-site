import React from "react";

const RegisterCompVM = () => {
  async function registerUser(
    username: string,
    email: string,
    password: string
  ) {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        console.log("registered !");
      } else {
        alert("register error");

        console.error("Registration failed");
      }
    
    } catch (error) {
      console.error("some error have occurred", error);
    }
  }
  function checkForm(e: React.FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const username = form.get("username") as string;

    const email = form.get("email") as string;
    const password = form.get("password") as string;
    if (!email || !password) {
      return alert("email and password are required");
    }
    registerUser(username, email, password);
  }
  return { checkForm };
};

export default RegisterCompVM;
