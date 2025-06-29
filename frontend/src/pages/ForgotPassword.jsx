import React from "react";
import { Typography, Form, Input, Button, Card, message } from "antd";
import { MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

function ForgotPassword() {
  const onFinish = async (values) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/reset-password", {
        email: values.email,
      });

      message.success(response.data.message || "E-posta gönderildi!");
    } catch (error) {
      console.error(error);
      message.error("Bir hata oluştu. Lütfen tekrar deneyin.");
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
        style={{ width: 360, borderRadius: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3}>Şifre Sıfırlama</Title>
          <Text type="secondary">
            Kayıtlı e-posta adresinizi girin, size sıfırlama bağlantısı gönderelim.
          </Text>
        </div>

        <Form name="forgot_password" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="E-posta"
            name="email"
            rules={[
              { required: true, message: "E-posta adresinizi giriniz!" },
              { type: "email", message: "Geçerli bir e-posta adresi giriniz!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="E-posta adresi" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ borderRadius: 6 }}>
              Gönder
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center" }}>
            <Link to="/login">Giriş ekranına dön</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default ForgotPassword;
