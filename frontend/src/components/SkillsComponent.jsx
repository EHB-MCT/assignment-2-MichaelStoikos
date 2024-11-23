// src/components/SkillList.js
import React, { useEffect, useState } from "react";
import { fetchSkills } from "../api/api";

const SkillList = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getSkills = async () => {
      try {
        const data = await fetchSkills();
        setSkills(data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching skills");
        setLoading(false);
      }
    };
    getSkills();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Available Skills</h2>
      <ul>
        {skills.map((skill) => (
          <h2 key={skill.id}>{skill.name}</h2>
        ))}
      </ul>
    </div>
  );
};

export default SkillList;
