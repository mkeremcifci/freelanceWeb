import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, Spin, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          withCredentials: true,
        });
        setUser(response.data.data);
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading)
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
          zIndex: 9999,
        }}
      >
        <Spin tip="Yükleniyor..." size="large" />
      </div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Card
        style={{
          width: 400,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          padding: 24,
          textAlign: "center",
        }}
      >
        <Title level={3}>Profil</Title>

        {user ? (
          <>
            <Text strong>Kullanıcı Adı:</Text> <Text>{user.username}</Text>
            <br />
            <Text strong>E-posta:</Text> <Text>{user.email}</Text>
            <br />
            <Text strong>Önceki Aramalar:</Text>
            <br />
            <Text type="secondary" style={{ wordBreak: "break-word" }}>
              {user.searchHistory && user.searchHistory.length > 0
                ? user.searchHistory.join(", ")
                : "Henüz arama yapılmadı."}
            </Text>

            <Button
              type="primary"
              block
              size="large"
              style={{ marginTop: 24, borderRadius: 6 }}
              onClick={() => navigate("/update-profile")}
            >
              Profili Güncelle
            </Button>

            <Button
              type="default"
              block
              size="large"
              style={{ marginTop: 12, borderRadius: 6 }}
              onClick={() => navigate("/select-professions")}
            >
              Bildirim Almak İstediğim Meslekleri Seç
            </Button>
          </>
        ) : (
          <Text type="danger">Profil bilgisi bulunamadı.</Text>
        )}
      </Card>
    </div>
  );
}

export default Profile;
