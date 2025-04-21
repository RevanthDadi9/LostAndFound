import React, { useState } from 'react';
import { Card, Button, Typography, Input, Space, Carousel, Spin } from 'antd';
import axios from 'axios';
import CustomArrow from './CustomArrow';


const { Meta } = Card;
const { Paragraph } = Typography;
const { Search } = Input;
const { Title } = Typography;
const LostItems: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');


  React.useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/item');
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

  let title: string = `Hi ${getUserName()}!👋, Here you can find the Lost items!`;
  let emptyTitle: string = `Hi ${getUserName()}👋, This list is currently empty!`;


  const filteredItems = items.filter(
    item =>
      item.type === 'Lost' &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  if (loading) return <Spin style={{ marginLeft: 600, marginTop: 200, alignItems: 'center' }} size='large' />;

  return (
    <>
      {filteredItems.length === 0 && items.length === 0 ? (
        <Title level={3} style={{ background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', marginTop: 16, marginLeft: 420 }}>
          {emptyTitle}
        </Title>
      ) : (
        <>
          <Title level={3} style={{ background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block', marginTop: 16, marginLeft: 380 }}>
            {title}
          </Title>
          <Space direction="vertical" style={{ marginBottom: 28, marginTop: 16, marginLeft: 440, width: '30%' }}>
            <Search
              placeholder="Search lost items..."
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
                    <Paragraph copyable>{item.number}</Paragraph>
                  </div>
                )}

                <Button
                  type="link"
                  onClick={() => toggleDetails(index)}
                  style={{ paddingLeft: 0, marginTop: 8 }}
                >
                  {expandedItems[index] ? 'Show Less' : 'More Details'}
                </Button>
              </Card>
            );
          })}
      </div>
    </>
  );
};

export default LostItems;
