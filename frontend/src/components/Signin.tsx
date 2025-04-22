import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { LockOutlined, LoginOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Input, Spin, Typography } from 'antd';
const { Title } = Typography;
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Flex } from 'antd';
import signinImage from "../assets/signin.avif"
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
    marginLeft: 200,
    marginTop: 90,
};

const imgStyle: React.CSSProperties = {
    display: 'block',
    width: 400,
    height: 400,
    marginRight: -120,
    marginTop: -30
};


const Signin: React.FC = () => {
    const { login } = useAuth();
    const { control, handleSubmit } = useForm();
    const[loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = React.useState('');

    const onSubmit = async (data: any) => {
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signin`, data);
            const token = response.data.token;
            const userId = response.data.userId;
            const userName = response.data.userName;
            const userImage = response.data.userImage;

            if (!token || !userId || !userName) {
                setErrorMessage("Incorrect details, try again.");
                return;
            }

            localStorage.setItem("authToken", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("userName", userName);
            localStorage.setItem("userImage", userImage);
            login();
            navigate('/');
        } catch (error) {
            console.error('Signin failed:', error);
        }
    };

    if (loading) return <Spin style={{ marginLeft: 600, marginTop: 200, alignItems: 'center' }} size='large' />;

    return (
        <>
            <Title style={{ marginLeft: "45%", background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', textAlign: 'center', marginBottom: -90, marginTop: 40 }} level={2}>
                Welcome Back!
            </Title>
            <Flex style={boxStyle} justify='space-evenly'>
                <Flex style={containerStyle}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 360 }}>
                        <div style={{ marginBottom: 16 }}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Input {...field} prefix={<MailOutlined />} placeholder="Email" type="email" />
                                )}
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Input.Password {...field} prefix={<LockOutlined />} placeholder="Password" />
                                )}
                            />
                        </div>
                        {errorMessage && (
                            <Typography style={{ color: 'red', marginBottom: 12 }}>{errorMessage}</Typography>
                        )}

                        <Button
                            className="custom-signin-btn"
                            block
                            type="primary"
                            htmlType="submit"
                            icon={<LoginOutlined />}
                        >
                            Sign In
                        </Button>

                        <Typography style={{ marginTop: 12 }}> or  <Link to="/signup"> Register?</Link> </Typography>
                    </form>
                </Flex>
                <img style={imgStyle} src={signinImage} />
            </Flex>
        </>
    );
};

export default Signin;
