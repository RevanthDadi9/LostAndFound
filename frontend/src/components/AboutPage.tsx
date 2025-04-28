import React from 'react';
import { Flex, Typography } from 'antd';
import aboutPageImage from "../assets/lostandfound2.png"
import { Link } from 'react-router-dom';
import { PlusCircleOutlined, SearchOutlined, SmileOutlined } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';
import { createStyles } from 'antd-style';
const { Title, Paragraph, Text } = Typography;

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
        opacity: 0;
      }
    }
  `,
}));

const AboutPage: React.FC = () => {
  const { styles } = useStyle();

  const getUserId = () => {
    return localStorage.getItem("userId");
  }

  let isUserLoggedIn: boolean = !!getUserId();

  const getRoute = (basePath: string) => isUserLoggedIn ? `/${basePath}` : "/signup";

  return (
    <div style={{
      padding: '2rem',
      width: '95%',
      minHeight:  window.innerWidth < 768 ? 'calc(100vh - 64px)': 'calc(100vh - 64px)',
      overflow: 'hidden',
      background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Title style={{ 
        color: '#f5f5f5', 
        textAlign: 'center',
        marginBottom: window.innerWidth < 768 ? 30 : 50,
        marginTop: window.innerWidth < 768 ? 0 : -60,
        fontSize: 'clamp(1.8rem, 3vw, 2.5rem)'
      }}>
        About Us
      </Title>
      <Flex 
        justify="space-between" 
        align="center"
        style={{ 
          width: '100%',
          maxWidth: '1200px',
          flexDirection: window.innerWidth < 768 ? 'column-reverse' : 'row',
          gap: '2rem'
        }}
      >
        <Flex 
          vertical 
          align='center'
          justify="space-between" 
          style={{ 
            padding: '1rem',
            textAlign: 'left',
            marginLeft: window.innerWidth < 768 ? 0 : 80
          }}
        >
          <Typography style={{ 
            fontSize: 'clamp(1rem, 1.5vw, 1.25rem)', 
            fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'"
          }}>
            <Title style={{ marginTop: -6, color: '#f5f5f5', fontSize: 'clamp(1.25rem, 1.8vw, 1.75rem)' }} level={3}>
              “Lost something? Found something? 
              Let's bring it back where it belongs.”
            </Title>
            <Paragraph>
              <Text type="secondary" style={{ color: '#f5f5f5', fontSize: 'clamp(0.875rem, 1.2vw, 1rem)' }}>
                This platform is built to reconnect people with their lost belongings and to thank those who lend a helping hand. Whether you've misplaced something important or found an item someone's surely missing, your action here could make someone's day.
              </Text>
            </Paragraph>
            <Paragraph>
              <Text strong style={{ color: '#f5f5f5', fontSize: 'clamp(0.875rem, 1.4vw, 1rem)' }}>
                “One post can bring something valuable back home.”
              </Text>
            </Paragraph>
          </Typography>
          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            <div style={{ 
              marginTop: '2rem',
              display: 'flex',
              flexDirection: window.innerWidth < 768 ? 'column' : 'row',
              gap: '1rem',
              justifyContent: 'center'
            }}>
              <Link to={getRoute('lostitems')}>
                <Button 
                  style={{ alignItems: 'center' }} 
                  type="primary" 
                  size={window.innerWidth < 768 ? 'large' : 'middle'} 
                  icon={<SearchOutlined />}
                >
                  Lost Something?
                </Button>
              </Link>
              <Link to={getRoute('postitem')}>
                <Button 
                  style={{ alignItems: 'center' }} 
                  type="primary" 
                  size={window.innerWidth < 768 ? 'large' : 'middle'} 
                  icon={<SmileOutlined />}
                >
                  Found Something?
                </Button>
              </Link>
              <Link to={getRoute('postitem')}>
                <Button 
                  style={{ alignItems: 'center' }} 
                  type="primary" 
                  size={window.innerWidth < 768 ? 'large' : 'middle'} 
                  icon={<PlusCircleOutlined />}
                >
                  Post Item
                </Button>
              </Link>
            </div>
          </ConfigProvider>
        </Flex>
        <img
          alt="about illustration"
          src={aboutPageImage}
          style={{
            width: window.innerWidth < 768 ? 250 : 320,
            maxWidth: '400px',
            height: window.innerWidth < 768 ? 'auto' : 220,
            borderRadius: '20px',
            margin: window.innerWidth < 768 ? '0 auto 2rem' : '0 90px 0 10px'
          }}
        />
      </Flex>
    </div>
  );
};

export default AboutPage;