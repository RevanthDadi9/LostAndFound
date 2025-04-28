import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, message, Spin, Typography, Image } from 'antd';
import axios from 'axios';
import defaultUserIcon from "../assets/defaultUserImage.png"
import { UploadOutlined } from '@ant-design/icons';
import { useAuth } from '../context/authContext';

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
  const [image, setImage] = useState('');
  const [uploadImage, setUploadImage] = useState<File | null>(null);
  const [fileCount, setFileCount] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [msg, setMsg] = useState<boolean>(false);
  const [uploadMsg, setUploadMsg] = useState<boolean>(false);
  const userId = localStorage.getItem("userId");

  const { setUserImage } = useAuth();


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
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstname", values.firstname);
      formData.append("lastname", values.lastname);
      formData.append("email", values.email);
  
      if (uploadImage) {
        formData.append("image", uploadImage);
      }
  
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/user/update/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (response.data.userImage) {
        setImage(response.data.userImage);
        setUserImage(response.data.userImage)
      }
      
      localStorage.setItem("userName", values.firstname);
      localStorage.setItem("userImage", response.data.userImage);
      setUserImage(response.data.userImage);
      setLoading(false);
      message.success("User information updated successfully!");
      setMsg(true);
    } catch (error) {
      setLoading(false);
      message.error("Failed to update user information.");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadImage(event.target.files[0]);
      setFileCount(event.target.files.length);
      setUploadMsg(true);
    }
  };

  if (loading || !user) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;

  return (
    <>
      <Image
        style={{ display: 'block', marginLeft: 500, marginTop: 40, borderRadius: 200 }}
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
                    setMsg(false);
                    setUploadMsg(false);
                    return Promise.reject('This field cannot be empty or just spaces');
                  }
                  if (!/^[a-zA-Z ]+$/.test(value)) {
                    setMsg(false);
                    setUploadMsg(false);
                    return Promise.reject('Only letters and spaces are allowed');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input onFocus={() => {
              setMsg(false);
              setUploadMsg(false);
              }} />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastname"
            rules={[
              { required: true, message: 'Please input your last name!' },
              {
                validator(_, value) {
                  if (!value || value.trim() === '') {
                    setMsg(false);
                    setUploadMsg(false);
                    return Promise.reject('This field cannot be empty or just spaces');
                  }
                  if (!/^[a-zA-Z ]+$/.test(value)) {
                    setMsg(false);
                    setUploadMsg(false);
                    return Promise.reject('Only letters and spaces are allowed');
                  }
                  return Promise.resolve();
                }
              }
            ]}
          >
            <Input onFocus={() => setMsg(false)} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item>
            <div style={{ width: "80%" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="fileInput"
                style={{ display: "none" }}
              />

              <label
                htmlFor="fileInput"
                style={{
                  display: "inline-block",
                  padding: "6px 10px",
                  fontSize: '12px',
                  marginBottom: '12px',
                  background: "linear-gradient(115deg, blue, rgb(24, 173, 91))",
                  borderRadius: "10px",
                  color: "#fff",
                  cursor: "pointer",
                  fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                  transition: "background .2s ease-in-out",
                }}
                onClick={() => {
                  setMsg(false);
                  setUploadMsg(false);
                }}
              >
                Upload Image <UploadOutlined />
              </label>

              {fileCount > 0 && uploadMsg && (
                <p style={{ fontSize: '12px', marginTop: "2px", color: "green", fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" }}>
                  Image uploaded.
                </p>
              )}
            </div>
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
