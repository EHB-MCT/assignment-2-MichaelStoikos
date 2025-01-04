import React, { useEffect, useState } from "react";
import { fetchSkills, incrementSkillClick } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

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
      await incrementSkillClick(skillId);
      setSkills((prevSkills) =>
        prevSkills.map((skill) =>
          skill.id === skillId
            ? { ...skill, views: skill.views + 1 }
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
    <div className="skills-container">
      <div className="skills-list">
        {skills.map((skill) => (
          <Link to="/jobs"><button
            key={skill.id}
            className="skill-button"
            onClick={() => handleSkillClick(skill.id)}
          >
            {skill.name}
          </button></Link>
        ))}
      </div>
    </div>
  );
};

export default SkillList;
