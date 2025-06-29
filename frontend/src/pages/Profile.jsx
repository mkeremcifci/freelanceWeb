import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Card, Typography, Spin } from "antd";

const { Title, Text } = Typography;

function Profile(){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try{
                const response = await axios.get("http://localhost:3000/profile", {
                    withCredentials: true,
                });
                
                setUser(response.data.data);
            } 
            catch(error){
                console.error(error);
            }
            finally{
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <Spin fullscreen />

    return (
        <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
          <Card style={{ width: 400 }}>
            <Title level={3}>Profil</Title>
            {user ? (
              <>
                <Text><b>Kullanıcı Adı:</b> {user.username}</Text><br />
              </>
            ) : (
              <Text>Profil bilgisi bulunamadı.</Text>
            )}
          </Card>
        </div>
      );
}

export default Profile;