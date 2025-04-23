import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  EnvironmentOutlined,
  FileTextOutlined,
  InboxOutlined,
  PhoneOutlined,
} from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Input,
  Typography,
  Flex,
  Select,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import postItemImage from '../assets/postitem.jpg';
const { Title } = Typography;
import dayjs from "dayjs";
import { Box } from '@mui/material';


const boxStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  padding: 150,
  marginTop: -110
};

const containerStyle: React.CSSProperties = {
  width: '20%',
  height: '100%',
  marginLeft: 10,
  marginTop: 0,
};

const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 350,
  height: 250,
  marginRight: 200,
  paddingBottom: 20,
  marginTop: 40
};

const PostItem: React.FC = () => {
  const [images, setImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [fileCount, setFileCount] = useState(0);

  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();


  const onSubmit = async (formValues: any) => {
    const userId = localStorage.getItem("userId");
    const formData = new FormData();

    Object.entries(formValues).forEach(([key, value]) => {
      if (dayjs.isDayjs(value)) {
        formData.append(key, value.format("YYYY-MM-DD"));
      } else {
        formData.append(key, value !== undefined && value !== null ? String(value) : "");
      }
    });

    if (userId) {
      formData.append("userId", userId);
    }

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
      if (images.length > 5) {
        alert("You can upload up to 5 images only.");
        return;
      }      
    }
  

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/item/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      navigate('/mylistings');
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
        const selectedFiles = event.target.files;
        setImages(selectedFiles);

        const previews = Array.from(selectedFiles).map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    }
};


  return (
    <>
      <Title style={{ marginLeft: "45%", marginBottom: -120, marginTop: 20, background: 'linear-gradient(75deg,rgb(8, 103, 176),rgb(44, 158, 88))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }} level={2}>
        Item Details
      </Title>
      <Flex style={boxStyle} justify="space-evenly">
        <Flex style={containerStyle}>
          <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 360 }}>

            <div style={{ marginBottom: 16 }}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input {...field} prefix={<InboxOutlined />} placeholder="Item Name" />
                )}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <Controller
                name="type"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    onChange={(value) => field.onChange(value)}
                    style={{ width: 120 }}
                    placeholder="Type"
                    options={[
                      { value: 'Lost', label: 'Lost' },
                      { value: 'Found', label: 'Found' },
                    ]}
                  />
                )}
              />

            </div>

            <div style={{ marginBottom: 16 }}>
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input {...field} prefix={<FileTextOutlined />} placeholder="Description" />
                )}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <Controller
                name="date"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    format="YYYY-MM-DD"
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />



            </div>

            <div style={{ marginBottom: 16 }}>
              <Controller
                name="location"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input {...field} prefix={<EnvironmentOutlined />} placeholder="Location" />
                )}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <Controller
                name="number"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Input {...field} prefix={<PhoneOutlined />} placeholder="Contact" />
                )}
              />
            </div>

            <div style={{ width: "80%" }}>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                id="fileInput"
                style={{ display: "none" }}
              />

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
                {imagePreviews.map((src, idx) => (
                    <img key={idx} src={src} alt={`preview-${idx}`} width="100" height="100" style={{ fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'", objectFit: 'cover', borderRadius: '8px' }} />
                ))}
            </Box>


              <label
                htmlFor="fileInput"
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  marginTop: "20px",
                  background: "linear-gradient(115deg, blue, rgb(24, 173, 91))",
                  borderRadius: "10px",
                  color: "#fff",
                  cursor: "pointer",
                  fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
                  transition: "background .2s ease-in-out",
                }}
              >
                Choose Files
              </label>

              {fileCount > 0 && (
                <p style={{ marginTop: "10px", color: "green", fontFamily: "'Chinese Quote', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'", }}>
                  {fileCount} file{fileCount > 1 ? "s" : ""} uploaded.
                </p>
              )}
            </div>

            <Button
              style={{ background: 'linear-gradient(135deg,green, #04befe)', marginTop: 16 }}
              block
              type="primary"
              htmlType="submit"
            >
              Create Post
            </Button>
          </form>
        </Flex>
        <img style={imgStyle} src={postItemImage} />
      </Flex>
    </>
  );
};

export default PostItem;
