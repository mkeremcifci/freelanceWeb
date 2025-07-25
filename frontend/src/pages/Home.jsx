import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Typography, Card, Form, Space, Spin } from "antd";
import axios from "axios";

const { Title, Text } = Typography;

function Home() {
  const [keywordValue, setKeywordValue] = useState("");
  const [loading, setLoading] = useState(false)


  const navigate = useNavigate();

  async function handleClick(keyword) {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/search", 
        { keyword },
        { withCredentials:true }
      );

      const { data } = response.data;
      navigate("/results", {state:{Keyword:keyword, Results:data}});
    } 
    catch (error) {
      console.error(error);
    }
    finally{
      setLoading(false);
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
        <Spin spinning={loading} tip="Yükleniyor.." size='large'>
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
                disabled={loading}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block size="large" style={{ borderRadius: 6 }} loading={loading} disabled={loading}>
                Ara
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
}

export default Home;
