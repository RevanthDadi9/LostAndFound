import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Spin, Typography, Image } from 'antd';
import axios from 'axios';

interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  img?: string;
}

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState<User | null>(null);
  const [image, setImage] = React.useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [msg, setMsg] = useState<boolean>(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<{ userData: User }>(`${import.meta.env.VITE_BACKEND_URL}/user/${userId}`);
        setUser(res.data.userData);
        if (res.data.userData.img) {
          setImage(res.data.userData.img);
        } else {
          setImage('No Image');
        }
        form.setFieldsValue(res.data.userData);
      } catch (err) {
        message.error('Failed to load user information');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId, form]);


  const handleUpdate = async (values: any) => {
    try {
      await axios.put(`http://localhost:5000/user/update/${userId}`, values);
      message.success('User information updated successfully!');
    } catch (error) {
      message.error('Failed to update user information.');
    }
  };

  const handleButtonClick = async () => {
    setMsg(true)
  }

  if (loading || !user) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;

  return (
    <>
    <Image
      style={{display: 'block', marginLeft: 500, marginTop: 40, borderRadius: 200}}
      width={200}
      src={image}
    />
    <Card title="User Profile" style={{ maxWidth: 400, margin: '50px auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleUpdate}
        initialValues={user}
      >
        <Form.Item
          label="First Name"
          name="firstname"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={handleButtonClick}>
            Update Info
          </Button>
        </Form.Item>

        {msg && (
          <Typography style={{ color: 'green', marginBottom: 12 }}>Details Updated Successfully!</Typography>
        )}
      </Form>
    </Card>
    </>
  );
};

export default ProfilePage;
