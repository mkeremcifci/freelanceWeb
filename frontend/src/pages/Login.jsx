import React, { useState } from "react";
import { Typography, Form, Input, Button, Card } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();

  const [feedback, setFeedback] = useState({ text: "", type: "" });

  const onFinish = async (values) => {
    setFeedback({ text: "", type: "" }); 

    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username: values.username,
        password: values.password,
      }, {
        withCredentials: true
      });

      const successMsg = response.data.message || "Giriş başarılı!";
      setFeedback({ text: successMsg, type: "success" });

      setTimeout(() => {
        navigate("/profile");
      }, 1500); // 1.5 saniye sonra yönlendir
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Giriş başarısız. Bilgilerinizi kontrol edin.";
      setFeedback({ text: errorMsg, type: "error" });
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: 360,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3}>Giriş Yap</Title>
          <Text type="secondary">Hoş geldiniz! Lütfen bilgilerinizi girin.</Text>
        </div>

        {feedback.text && (
          <div
            style={{
              marginBottom: 16,
              color: feedback.type === "error" ? "red" : "green",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            {feedback.text}
          </div>
        )}

        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label="Kullanıcı Adı"
            name="username"
            rules={[{ required: true, message: "Kullanıcı adınızı giriniz!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Kullanıcı adı" />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Şifrenizi giriniz!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Şifre" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ borderRadius: 6 }}
            >
              Giriş Yap
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Link to="/forgot-password">Şifremi unuttum?</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
