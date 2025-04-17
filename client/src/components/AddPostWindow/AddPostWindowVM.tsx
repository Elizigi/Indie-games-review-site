import { useState } from "react";

export const useAddPostVM = (gameId: number, onClose: () => void) => {
  const [formData, setFormData] = useState({ text: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ text: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
        fetch("http://localhost:3000/api/posts/add-post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              game_id: gameId,
              text: formData.text,
            }),
          });
              

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Something went wrong");
      } else {
        setMessage("Post added!");
        onClose(); 
      }
    } catch (err: any) {
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit, message, loading };
};
