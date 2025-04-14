import React from "react";

const RegisterCompVM = () => {
  async function registerUser(
    username: string,
    email: string,
    password: string,
    user_role: string
  ) {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, user_role }),
      });
  
      if (response.ok) {
        console.log("registered!");
      } else {
        alert("Register error");
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Some error occurred", error);
    }
  }
  
  function checkForm(e: React.FormEvent) {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const username = form.get("username") as string;
    const email = form.get("email") as string;
    const password = form.get("password") as string;
  
    const isDeveloper = form.get("isDeveloper") === "on";
    const isAdmin = form.get("isAdmin") === "on";
  
    let user_role: "user" | "developer" | "admin" = "user";
    if (isAdmin) {
      user_role = "admin";
    } else if (isDeveloper) {
      user_role = "developer";
    }
  
    if (!email || !password) {
      return alert("Email and password are required");
    }
  
    registerUser(username, email, password, user_role);
  }  
  return { checkForm };
};

export default RegisterCompVM;
