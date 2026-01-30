import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Protected({ children }) {
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setIsLogged(true);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!isLogged) {
    return null;
  }
  
  return <>{children}</>;
}

export default Protected;