import React, { useState } from "react";
import { Form, Input, Button, Card, Typography } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const ProfileUpdate = () => {
  const [form] = Form.useForm();
  const [feedback, setFeedback] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    const cleanedValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== undefined && v !== "")
    );

    if (Object.keys(cleanedValues).length === 0) {
      setFeedback({ text: "Lütfen en az bir alanı doldurun.", type: "error" });
      return;
    }

    setLoading(true);
    setFeedback({ text: "", type: "" });

    try {
      const response = await axios.put(
        "http://localhost:3000/profile/update",
        { ...cleanedValues },
        { withCredentials: true }
      );
      console.log(response);
      setFeedback({ text: "Profil başarıyla güncellendi.", type: "success" });
      form.resetFields();
    } catch (error) {
      const errMsg = error.response?.data?.message || "Güncelleme başarısız.";
      setFeedback({ text: errMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

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
        <Title level={3}>Profil Bilgilerini Güncelle</Title>

        {feedback.text && (
          <Text
            type={feedback.type === "error" ? "danger" : "success"}
            style={{ display: "block", marginBottom: 16, fontWeight: 500 }}
          >
            {feedback.text}
          </Text>
        )}

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="username" label="Kullanıcı Adı">
            <Input size="large" disabled={loading} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", message: "Geçerli bir email girin" }]}
          >
            <Input size="large" disabled={loading} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loading}
              style={{ borderRadius: 6 }}
            >
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProfileUpdate;
