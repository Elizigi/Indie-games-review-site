import { useState } from "react";

export const useAddPostVM = (gameId: number, onClose: (close:boolean) => void) => {
  const [formData, setFormData] = useState({ text: "",title: "" });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, text: e.target.value });  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData,title:e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
       const res= await fetch("http://localhost:3000/api/posts/add-post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              game_id: gameId,
              post_title: formData.title,
              post_description: formData.text,

            }),
          });

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message ?? "Something went wrong");
      } else {
        setMessage("Post added!");
        onClose(false); 
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage("Error: " + err.message);
      } else {
        setMessage("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, handleSubmit,handleTitleChange, message, loading };
};
