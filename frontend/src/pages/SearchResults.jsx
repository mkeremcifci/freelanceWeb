import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Table, Card, Typography } from 'antd';

const { Title, Text } = Typography;

function SearchResults() {

  const location = useLocation();
  const navigate = useNavigate();
  const keyword = location.state?.Keyword || undefined;
  const results = location.state?.Results || [];
  useEffect(() => {
    if(!keyword){
      navigate("/")
    }
  })
  const columns = [
    {
      title: "Başlık",
      dataIndex: "name",
      key: "title",
    },
    {
      title: "Kalan Gün",
      dataIndex: "remainingDays",
      key: "remaining",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #FFDEE9, #B5FFFC)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 1000,
          borderRadius: 12,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          padding: 24,
          backgroundColor: "#ffffff",
        }}
      >
        <div style={{ marginBottom: 24, textAlign: "center" }}>
          <Title level={3} style={{ marginBottom: 0 }}>
            Arama Sonuçları
          </Title>
          <Text type="secondary">Anahtar kelime: <b>{keyword}</b></Text>
        </div>

        <Table
          dataSource={results}
          columns={columns}
          rowKey={(record, index) => index}
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
}

export default SearchResults;
