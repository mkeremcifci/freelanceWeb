import React, { useState } from "react";
import { Button, Input, Typography, Card, Form, Space } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

function Home() {
  const [keywordValue, setKeywordValue] = useState("");

  async function handleClick(keyword) {
    try {
      const response = await axios.post("http://localhost:3000/search", {
        keyword: keyword,
      });

      const { message } = response.data;
      console.log(message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to right, #FFDEE9, #B5FFFC)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: 400,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          padding: 24,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3}>Arama Yap</Title>
          <Text type="secondary">Bir anahtar kelime girerek arama yapabilirsiniz.</Text>
        </div>

        <Form onFinish={() => handleClick(keywordValue)} layout="vertical">
          <Form.Item
            label="Anahtar Kelime"
            rules={[{ required: true, message: "Lütfen bir kelime girin!" }]}
          >
            <Input
              placeholder="örn: Yazılım, İş, Teknoloji..."
              value={keywordValue}
              onChange={(e) => setKeywordValue(e.target.value)}
              size="large"
              allowClear
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large" style={{ borderRadius: 6 }}>
              Ara
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Home;
