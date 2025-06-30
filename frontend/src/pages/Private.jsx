import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Private({ children }){
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    useEffect(() => {
        axios.get("https://freelanceweb-scv9.onrender.com/profile", {
            withCredentials: true
        })
        .then(() => setIsAuthenticated(true))
        .catch(() => setIsAuthenticated(false));
    }, []);
    if (isAuthenticated == null) return <div>Yükleniyor</div>
    return isAuthenticated ? children : <Navigate to="/login" />
}

export default Private