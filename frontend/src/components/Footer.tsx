import React from 'react';
import { Layout, Typography, Space } from 'antd';
import {
  GithubOutlined,
  MailOutlined,
  LinkedinOutlined
} from '@ant-design/icons';

const { Footer } = Layout;
const { Text, Link } = Typography;

const FooterComponent: React.FC = () => {
  return (
    <Footer style={{
      background: 'white',
      color: '#f5f5f5',
      padding: '40px 50px',
      textAlign: 'center'
    }}>
      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Text style={{ background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', color: '#f5f5f5', fontSize: 14 }}>
          Need help? Reach out to us:
        </Text>
        <Space size="large">
          <Link href="mailto:nagillaganesh45@gmail.com" style={{ background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', }}>
            <MailOutlined style={{ fontSize: 18 }} />
          </Link>
          <Link href="https://github.com/ganeshnagilla/LostAndFound" target="_blank" style={{ background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', }}>
            <GithubOutlined style={{ fontSize: 18 }} />
          </Link>
          <Link href="https://linkedin.com/in/" target="_blank" style={{ background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', }}>
            <LinkedinOutlined style={{ fontSize: 18 }} />
          </Link>
        </Space>
        <Text style={{ background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 12 }}>
          Copyright:© {new Date().getFullYear()} Lost & Found. All rights reserved.
        </Text>
      </Space>
    </Footer>
  );
};

export default FooterComponent;
