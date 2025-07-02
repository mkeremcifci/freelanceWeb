import React, { useState } from "react";
import { Typography, Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";

const { Title, Text } = Typography;

function Register() {
  const [feedback, setFeedback] = useState({ text: "", type: "" });

  const onFinish = async (values) => {
    setFeedback({ text: "", type: "" });

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      const { message } = response.data;
      setFeedback({ text: message || "Kayıt başarılı!", type: "success" });
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Kayıt başarısız. Lütfen tekrar deneyin.";
      setFeedback({ text: errorMsg, type: "error" });
      console.error(error);
    }
  };

  const validatePasswordConfirm = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Şifreler eşleşmiyor!"));
    },
  });

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
          width: 400,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3}>Kayıt Ol</Title>
          <Text type="secondary">Yeni bir hesap oluşturun.</Text>
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
          name="register_form"
          onFinish={onFinish}
          layout="vertical"
          scrollToFirstError
        >
          <Form.Item
            label="Kullanıcı Adı"
            name="username"
            rules={[{ required: true, message: "Kullanıcı adınızı giriniz!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Kullanıcı adı" />
          </Form.Item>

          <Form.Item
            label="E-posta"
            name="email"
            rules={[
              { required: true, message: "E-posta adresinizi giriniz!" },
              { type: "email", message: "Geçerli bir e-posta adresi giriniz!" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="E-posta" />
          </Form.Item>

          <Form.Item
            label="Şifre"
            name="password"
            rules={[{ required: true, message: "Şifrenizi giriniz!" }]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Şifre" />
          </Form.Item>

          <Form.Item
            label="Şifre (Tekrar)"
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              { required: true, message: "Lütfen şifrenizi tekrar giriniz!" },
              validatePasswordConfirm,
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Şifreyi tekrar girin"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              style={{ borderRadius: 6 }}
            >
              Kayıt Ol
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Register;
