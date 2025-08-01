import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined, LoginOutlined } from "@ant-design/icons";
import { useNavigate, useLocation } from "react-router-dom";

const { Header, Content } = Layout;

function Navbar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "0 40px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            fontWeight: "700",
            fontSize: 22,
            color: "#1890ff",
            cursor: "pointer",
            marginRight: 40,
            userSelect: "none",
          }}
          onClick={() => navigate("/")}
        >
          MyApp
        </div>

        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: "Anasayfa",
            },
            {
              key: "/profile",
              icon: <UserOutlined />,
              label: "Profil",
            },
            {
              key: "/login",
              icon: <LoginOutlined />,
              label: "Giriş Yap",
            },
            {
              key: "/register",
              icon: <LoginOutlined />,
              label: "Kayıt Ol",
            },
          ]}
          style={{ flex: 1 }}
        />
      </Header>

      <Content
        style={{
          padding: "50px",
          backgroundColor: "#f0f2f5",
          flex: 1,
          minHeight: 0,
        }}
      >
        {children}
      </Content>
    </Layout>
  );
}

export default Navbar;
