import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Typography, Input, Carousel, Space, Spin } from 'antd';
import CustomArrow from './CustomArrow';
import { DeleteOutlined } from '@mui/icons-material';
const { Meta } = Card;
const { Search } = Input;
const { Title } = Typography;

const MyListings: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  const getUserId = () => {
    return localStorage.getItem("userId");
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/item`);
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const toggleDetails = (index: number) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getUserName = () => {
    return localStorage.getItem("userName");
  }

  let title: string = `Hi ${getUserName()}👋, Here are your listings!`;
  let emptyTitle: string = `Hi ${getUserName()}👋, You haven't posted anything yet!`;

  const filteredItems = items.filter(
    item =>
      item.userId === getUserId() &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/item/delete/${id}`);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  if (loading) return <Spin style={{ marginLeft: 600, marginTop: 200, alignItems: 'center' }} size='large' />;
  

  return (
    <>
      {filteredItems.length === 0 ? (
        <>
          <Title level={3} style={{ background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', marginTop: 16, marginLeft: 380 }}>
            {emptyTitle}
          </Title>
          <Space direction="vertical" style={{ marginBottom: 28, marginTop: 16, marginLeft: 440, width: '30%' }}>
            <Search
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              enterButton
              allowClear
            />
          </Space>
        </>
      ) : (
        <>
          <Title level={3} style={{ background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', marginTop: 16, marginLeft: 440 }}>
            {title}
          </Title>
          <Space direction="vertical" style={{ marginBottom: 28, marginTop: 16, marginLeft: 440, width: '30%' }}>
            <Search
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              enterButton
              allowClear
            />
          </Space>
        </>
      )}


      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {filteredItems
          .map((item, index) => {
            const userImages = item.img || [];

            return (
              <Card
                key={index}
                hoverable
                style={{ width: 240 }}
                cover={
                  userImages.length > 1 ? (
                    <Carousel arrows
                      prevArrow={<CustomArrow />}
                      nextArrow={<CustomArrow />}
                    >
                      {userImages.map((img: string, i: number) => (
                        <img
                          key={i}
                          alt="item"
                          src={`http://localhost:5000/uploads/${img}`}
                          style={{ width: "100%", height: "200px", objectFit: "cover" }}
                        />
                      ))}
                    </Carousel>
                  ) : userImages.length > 0 ? (
                    <img
                      alt="item"
                      src={`http://localhost:5000/uploads/${userImages[0]}`}
                      style={{ width: "100%", height: "200px", objectFit: "cover" }}
                    />
                  ) : (
                    <div>No image</div>
                  )
                }
              >
                <Meta title={item.name} description={item.date} />

                {expandedItems[index] && (
                  <div style={{ marginTop: '10px' }}>
                    <Meta description={item.description} />
                    <Meta description={`Location: ${item.location}`} />
                  </div>
                )}

                <div>
                  <Button
                    type="link"
                    onClick={() => toggleDetails(index)}
                    style={{ paddingLeft: 0, marginTop: 8 }}
                  >
                    {expandedItems[index] ? <> Show Less <a onClick={() => handleDeleteItem(item._id)}><DeleteOutlined style={{ color: 'red', marginBottom: -6, marginLeft: 80 }} /></a></> : 'More Details'}
                  </Button>

                </div>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default MyListings;
