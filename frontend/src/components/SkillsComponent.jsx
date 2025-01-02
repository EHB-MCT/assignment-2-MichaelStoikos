import React, { useEffect, useState } from "react";
import { fetchSkills, incrementSkillClick } from "../api/api";
import { useNavigate } from "react-router-dom";

const SkillList = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getSkills = async () => {
      try {
        const data = await fetchSkills();
        setSkills(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching skills");
        setLoading(false);

        if (error.response?.status === 401) {
          navigate("/");
        }
      }
    };

    getSkills();
  }, [navigate]);

  const handleSkillClick = async (skillId) => {
    try {
      await incrementSkillClick(skillId); // Call API to increment click count
      // Optional: Update the view count in the local state
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === skillId
            ? { ...skill, views: skill.views + 1 } // Increment views locally
            : skill
        )
      );
    } catch (error) {
      console.error("Failed to increment skill click:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="skillList">
      <ul>
        {skills.map((skill) => (
          <li key={skill.id}>
            <button onClick={() => handleSkillClick(skill.id)}>
              {skill.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillList;
