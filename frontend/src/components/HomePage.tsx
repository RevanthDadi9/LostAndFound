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

const landingPageStyle: React.CSSProperties = {
  padding: 100,
  width: 1056,
  height: 318,
  backgroundImage: `url(${BackgroundImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  overflow: 'hidden',
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 203,
  marginTop: 40
};

const HomePage: React.FC = () => {

  const { styles } = useStyle();

  const getUserId = () => {
    return localStorage.getItem("userId");
  }

  const navigate = useNavigate();
  let isUserLoggedIn: boolean = false

  getUserId() ? isUserLoggedIn = true : isUserLoggedIn = false;

  const handleGetStarted = () => {
    isUserLoggedIn ? navigate("/postitem") : navigate("/signup");
  }

  return (
    <div style={landingPageStyle}>
      <Flex justify="space-between">
        <img
          alt="avatar"
          src={LostAndFoundImage}
          style={imgStyle}
        />
        <Flex vertical align="flex-end" justify="space-between" style={{ marginTop: 40, padding: 32 }}>

          <Typography style={{ background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', fontSize: '25px', fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" }}>
            “Find what you've lost. Help others find what they're missing.
            <br />
            One post can bring something valuable back home.”
          </Typography>
          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            <Space>
              <Button style={{ marginRight: 320 }} type="primary" onClick={handleGetStarted} size="large" icon={<ArrowRightOutlined />} >
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

