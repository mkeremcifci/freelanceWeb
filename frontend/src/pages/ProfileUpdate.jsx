import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const ProfileUpdate = () => {
  const [form] = Form.useForm();
  const [feedback, setFeedback] = useState({ text: '', type: '' });

  const handleSubmit = async (values) => {
    const cleanedValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== undefined && v !== '')
    );

    if (Object.keys(cleanedValues).length === 0) {
      setFeedback({ text: 'Lütfen en az bir alanı doldurun.', type: 'error' });
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:3000/profile/update',
        { ...cleanedValues },
        { withCredentials: true }
      );
      console.log(response);
      setFeedback({ text: 'Profil başarıyla güncellendi.', type: 'success' });
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Güncelleme başarısız.';
      setFeedback({ text: errMsg, type: 'error' });
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Profil Bilgilerini Güncelle</h2>

      {feedback.text && (
        <div
          style={{
            marginBottom: 16,
            color: feedback.type === 'error' ? 'red' : 'green',
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          {feedback.text}
        </div>
      )}

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="username" label="Kullanıcı Adı">
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: 'email', message: 'Geçerli bir email girin' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProfileUpdate;
