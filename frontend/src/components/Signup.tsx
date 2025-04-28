import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { LockOutlined, LoginOutlined, MailOutlined, UploadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Spin, Typography } from 'antd';
const { Title } = Typography;
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Flex } from 'antd';
import signupImage from "../assets/signup.jpg"
import { useAuth } from '../context/authContext';


const boxStyle: React.CSSProperties = {
  width: 800,
  height: '100%',
  padding: 150,
  marginTop: -90
};

const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    marginLeft: 150,
    marginTop: 30,
  };

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 400,
  height: 300,
  marginRight: -120,
  paddingBottom: 20
};

const handleAlphabeticChange = (onChange: (...event: any[]) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const reg = /^[a-zA-Z ]*$/;
      if (reg.test(inputValue)) {
        if (inputValue.trim() !== '') {
          onChange(inputValue);
        } else {
          onChange('');
        }
      }
  };
  
  

const Signup: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [fileCount, setFileCount] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)

    const { control, handleSubmit } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (formValues: any) => {
        setLoading(true);
        const formData = new FormData();

        Object.entries(formValues).forEach(([key, value]) => {
                    formData.append(key, value !== undefined && value !== null ? String(value) : "");
                });

       if(image) {
            formData.append("image", image);
       }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const token = response.data.token;
            const userId = response.data.userId;
            const userName = response.data.userName;
            const userImage = response.data.userImage;
            localStorage.setItem("authToken", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);
            localStorage.setItem("userImage", userImage);
            login(userImage, userName);
            navigate('/');
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
              alert("User already exists. Please use a different email.");
            } else {
              console.error('Signup failed:', error);
              alert("Signup failed. Please try again.");
            }
            setLoading(false);
        }
          
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.files && event.target.files[0]) {
                setImage(event.target.files[0]);
                setFileCount(event.target.files.length);
            }
    };

    if (loading) return <Spin style={{ marginLeft: 600, marginTop: 200, alignItems: 'center' }} size='large' />;


    return (
        <>
        <Title style={{marginLeft: "45%", background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', textAlign: 'center', marginBottom: -90, marginTop: 40}} level={2}>Sign Up Form</Title>
        <Flex style={boxStyle} justify='space-evenly'>
        <Flex style={containerStyle}>
            <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 360 }}>
                <div style={{ marginBottom: 16 }}>
                    <Controller
                        name="firstname"
                        control={control}
                        rules={{ 
                            required: 'First name is required in alphabetic characters only(a-z, A-Z)',
                            pattern: {
                            value: /^[a-zA-Z ]+$/,
                            message: 'Only letters and spaces are allowed',
                            },
                            validate: (value) => value.trim() !== '' || 'Only spaces are not allowed'
                        }}
                        render={({ field, fieldState }) => (
                            <>
                            <Input 
                                {...field} 
                                prefix={<UserOutlined />}  
                                allowClear 
                                placeholder="First Name"
                                onChange={handleAlphabeticChange(field.onChange)} 
                            />
                            {fieldState.error && (
                                <span style={{ color: 'red', fontSize: '12px', marginLeft: '5px', fontFamily:"'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" }}>{fieldState.error.message}</span>
                            )}
                            </>
                        )}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Controller
                        name="lastname"
                        control={control}
                        rules={{ 
                            required: 'Last name is required in alphabetic characters only(a-z, A-Z)',
                            pattern: {
                            value: /^[a-zA-Z ]+$/,
                            message: 'Only letters and spaces are allowed',
                            },
                            validate: (value) => value.trim() !== '' || 'Only spaces are not allowed'
                        }}
                        render={({ field, fieldState }) => (
                            <>
                            <Input 
                                {...field} 
                                prefix={<UserOutlined />}  
                                allowClear 
                                placeholder="Last Name"
                                onChange={handleAlphabeticChange(field.onChange)} 
                            />
                            {fieldState.error && (
                                <span style={{ color: 'red', fontSize: '12px', marginLeft: '5px', fontFamily:"'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" }}>{fieldState.error.message}</span>
                            )}
                            </>
                        )}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input {...field} prefix={<MailOutlined />} allowClear placeholder="Email" type="email" />
                        )}
                    />
                </div>
                <div style={{ marginBottom: 16 }}>
                    <Controller
                        name="password"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input.Password {...field} allowClear prefix={<LockOutlined />} placeholder="Password" />
                        )}
                    />
                </div>

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
                >
                    Upload Image <UploadOutlined />
                </label>

                {fileCount > 0 && (
                    <p style={{ fontSize: '12px', marginTop: "2px", color: "green",  fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",}}>
                    Image uploaded.
                    </p>
                )}

            </div>

                <Button style={{background: "linear-gradient(135deg,green, #04befe)"}} block type="primary" htmlType="submit" icon={<LoginOutlined />}>
                    Sign Up
                </Button>
                <Typography style={{marginTop: 12}}> Already have an account?  <Link to="/signin"> Login now!</Link> </Typography>
            </form>
        </Flex>
        <img style={imgStyle} src={signupImage} />
      </Flex>
        </>
    );
};

export default Signup;
