import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Spin, Typography, Image } from 'antd';
import axios from 'axios';
import defaultUserIcon from "../assets/defaultUserImage.png"

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
          setImage(defaultUserIcon);
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
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/update/${userId}`, values);
      localStorage.setItem("userName", values.firstname);
      message.success('User information updated successfully!');
      setMsg(true);
    } catch (error) {
      message.error('Failed to update user information.');
    }
  };

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
          rules={[
            { required: true, message: 'Please input your first name!' },
            {
              validator(_, value) {
                if (!value || value.trim() === '') {
                  return Promise.reject('This field cannot be empty or just spaces');
                }
                if (!/^[a-zA-Z ]+$/.test(value)) {
                  return Promise.reject('Only letters and spaces are allowed');
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastname"
          rules={[
            { required: true, message: 'Please input your last name!' },
            {
              validator(_, value) {
                if (!value || value.trim() === '') {
                  return Promise.reject('This field cannot be empty or just spaces');
                }
                if (!/^[a-zA-Z ]+$/.test(value)) {
                  return Promise.reject('Only letters and spaces are allowed');
                }
                return Promise.resolve();
              }
            }
          ]}
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
          <Button type="primary" htmlType="submit">
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
