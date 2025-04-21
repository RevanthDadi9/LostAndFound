import { CSSProperties } from "react";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface ArrowProps {
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const CustomArrow = ({ className, style, onClick }: ArrowProps) => {
  const isLeft = className?.includes('slick-prev');

  return (
    <div
      className={`custom-arrow ${isLeft ? 'left' : 'right'}`}
      onClick={onClick}
      style={{ ...style }}
    >
      {isLeft ? <LeftOutlined /> : <RightOutlined />}
    </div>
  );
};

export default CustomArrow;

