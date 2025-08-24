import React, { useEffect, useState } from "react";
import { Form, Button, Card, Typography, Checkbox, Spin } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

const ProfileProfessions = () => {
  const [form] = Form.useForm();
  const [feedback, setFeedback] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:3000/profile", {
          withCredentials: true,
        });
        setSearchHistory(response.data.data.searchHistory || []);
      } catch (error) {
        console.error(error);
        setFeedback({
          text: "Meslek geçmişi alınamadı.",
          type: "error",
        });
      } finally {
        setFetching(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (values) => {
    if (!values.professions || values.professions.length === 0) {
      setFeedback({
        text: "Lütfen en az bir meslek seçin.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setFeedback({ text: "", type: "" });

    try {
      const response = await axios.put(
        "http://localhost:3000/profile/update",
        { professions: values.professions },
        { withCredentials: true }
      );
      console.log(response);
      setFeedback({
        text: "Meslek tercihleri başarıyla güncellendi.",
        type: "success",
      });
      form.resetFields();
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Meslek tercihleri kaydedilemedi.";
      setFeedback({ text: errMsg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin tip="Yükleniyor..." size="large" />
      </div>
    );
  }

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
        <Title level={3}>Meslek Bildirim Tercihleri</Title>

        {feedback.text && (
          <Text
            type={feedback.type === "error" ? "danger" : "success"}
            style={{ display: "block", marginBottom: 16, fontWeight: 500 }}
          >
            {feedback.text}
          </Text>
        )}

        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="professions" label="Meslekler">
            <Checkbox.Group
              style={{ width: "100%", textAlign: "left" }}
              options={searchHistory.map((item) => ({
                label: item,
                value: item,
              }))}
            />
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
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProfileProfessions;
