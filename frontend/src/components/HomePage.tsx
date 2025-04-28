import React from 'react';
import { Flex, Typography } from 'antd';
import LostAndFoundImage from "../assets/lostandfound.png"
import BackgroundImage from "../assets/backgroundimage.jpg"
import { useNavigate } from 'react-router';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg,green, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
      background: rgb(8, 103, 176);
        opacity: 0;
      }
    }
  `,
}));

const HomePage: React.FC = () => {
  const { styles } = useStyle();
  const navigate = useNavigate();

  const getUserId = () => {
    return localStorage.getItem("userId");
  };

  let isUserLoggedIn: boolean = !!getUserId();

  const handleGetStarted = () => {
    isUserLoggedIn ? navigate("/postitem") : navigate("/signup");
  }

  return (
    <div style={{
      padding: '2rem',
      width: '95%',
      minHeight:  window.innerWidth < 768 ? 'calc(100vh - 64px)': 'calc(85vh - 64px)',
      backgroundImage: `url(${BackgroundImage})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Flex 
        justify="space-between" 
        align="center"
        style={{ 
          width: '100%',
          marginLeft: window.innerWidth < 768 ? '' : 140,
          maxWidth: '1200px',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          gap: '2rem'
        }}
      >
        <img
          alt="logo"
          src={LostAndFoundImage}
          style={{ 
            width: 203,
            maxWidth: '300px',
            height: 'auto'
          }}
        />
        <Flex 
          vertical 
          align={window.innerWidth < 768 ? 'center' : 'flex-end'} 
          justify="space-between" 
          style={{ 
            padding: '1rem',
            marginRight: window.innerWidth < 768 ? '' : 140,
            textAlign: window.innerWidth < 768 ? 'center' : 'right'
          }}
        >
          <Typography style={{ 
            background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent', 
            display: 'inline-block', 
            fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
            fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
            lineHeight: '1.5'
          }}>
            “Find what you've lost. Help others find what they're missing.
            <br />
            One post can bring something valuable back home.”
          </Typography>
          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            <Space style={{ marginTop: '2rem' }}>
              <Button 
                type="primary" 
                onClick={handleGetStarted} 
                size="large" 
                icon={<ArrowRightOutlined />}
              >
                Get Started
              </Button>
            </Space>
          </ConfigProvider>
        </Flex>
      </Flex>
    </div>
  );
};

export default HomePage;