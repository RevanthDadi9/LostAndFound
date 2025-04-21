import React from 'react';
import { Flex, Typography } from 'antd';
import aboutPageImage from "../assets/lostandfound2.png"
import { Link } from 'react-router';
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

const landingPageStyle: React.CSSProperties = {
  padding: 100,
  width: 1056,
  height: 310,
  overflow: 'hidden',
  background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))',
  paddingBottom: 200
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 320,
  height: 220,
  marginBottom: -90,
  marginTop: 70,
  borderRadius: 20
};

const AboutPage: React.FC = () => {

  const { styles } = useStyle();

  const getUserId = () => {
    return localStorage.getItem("userId");
  }

  let isUserLoggedIn: boolean = false

  getUserId() ? isUserLoggedIn = true : isUserLoggedIn = false;

  const getRoute = (basePath: string) => isUserLoggedIn ? `/${basePath}` : "/signup";

  return (
    <div style={landingPageStyle}>
      <Title style={{ marginTop: -20, marginLeft: "45%", color: '#f5f5f5' }} level={1}>About Us</Title>
      <Flex justify="space-between">
        <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>

          <Typography style={{ fontSize: '25px', fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'" }}>
            <Title style={{ color: '#f5f5f5', }} level={3}>“Lost something? Found something? Let's bring it back where it belongs.”</Title>
            <Paragraph>
              <Text type="secondary" style={{ color: '#f5f5f5', fontSize: 15 }}>This platform is built to reconnect people with their lost belongings and to thank those who lend a helping hand. Whether you’ve misplaced something important or found an item someone’s surely missing, your action here could make someone’s day.</Text>
            </Paragraph>
            <Paragraph>
              <Text strong style={{ color: '#f5f5f5', fontSize: 15 }}>“One post can bring something valuable back home.”</Text>
            </Paragraph>
          </Typography>
          <ConfigProvider
            button={{
              className: styles.linearGradientButton,
            }}
          >
            <div style={{ marginRight: 90, marginTop: 20 }}>
              <Link to={getRoute('lostitems')}>
                <Button style={{ alignItems: 'center', marginRight: 20 }} type="primary" size='middle' icon={<SearchOutlined />} >
                  Lost Something?
                </Button>
              </Link>
              <Link to={getRoute('postitem')}>
                <Button style={{ alignItems: 'center', marginRight: 20 }} type="primary" size='middle' icon={<SmileOutlined />} >
                  Found Something?
                </Button>
              </Link>
              <Link to={getRoute('postitem')}>
                <Button style={{ alignItems: 'center', marginRight: 20 }} type="primary" size='middle' icon={<PlusCircleOutlined />} >
                  Post Item
                </Button>
              </Link>

            </div>
          </ConfigProvider>
        </Flex>
        <img
          alt="avatar"
          src={aboutPageImage}
          style={imgStyle}
        />
      </Flex>
    </div>
  );

};

export default AboutPage;
