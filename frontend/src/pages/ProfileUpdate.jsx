import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const ProfileUpdate = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const cleanedValues = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v !== undefined && v !== '')
    );

    if (Object.keys(cleanedValues).length === 0) {
      return;
    }
  
    try {
      const response = await axios.put('http://localhost:3000/profile/update', 
        { cleanedValues },
        { withCredentials: true });
      console.log(response)
      message.success('Profil güncellendi');

    } catch (error) {
      message.error(error);
    }
  };
  

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="username"
        label="Kullanıcı Adı"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="Email"
        rules={[
          { type: 'email', message: 'Geçerli bir email girin' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Güncelle
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileUpdate;
