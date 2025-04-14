import { useState } from "react";

interface GameFormData {
  game_name: string;
  game_developer: string;
  game_release_date: string;
  game_genre: string;
  game_description: string;
  game_main_img_url: string;
  game_rating_combined?: number;
  game_rating_users?: number;
}

export function useAddGameVM() {
  const [formData, setFormData] = useState<GameFormData>({
    game_name: "",
    game_developer: "",
    game_release_date: "",
    game_genre: "",
    game_description: "",
    game_main_img_url: "",
    game_rating_combined: undefined,
    game_rating_users: undefined,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: name.includes("rating") ? (value === "" ? undefined : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3000/api/games/add-game", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Something went wrong.");
      } else {
        setMessage("Game added successfully!");
        setFormData({
          game_name: "",
          game_developer: "",
          game_release_date: "",
          game_genre: "",
          game_description: "",
          game_main_img_url: "",
          game_rating_combined: undefined,
          game_rating_users: undefined,
        });
      }
    } catch (err: any) {
      setMessage("Failed to submit: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    message,
    loading,
  };
}
