import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { Component } from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";

const SliderWrapper = styled(Slider)`
  .slick-prev:before,
  .slick-next:before {
    color: black;
    opacity: 1;
    font-size: 30px;
  }
  .slick-prev {
    left: 30px;
    z-index: 9;
  }
  .slick-next {
    right: 30px;
    z-index: 9;
  }
  .slick-slide img {
    margin: 0 auto;
  }
`;
const SlickImg = styled.div`
  height: 750px;
  background: red;
`;
const SlickImg2 = styled.div`
  height: 750px;
  background: green;
`;
const SlickImg3 = styled.div`
  height: 750px;
  background: yellow;
`;
const SlickImg4 = styled.div`
  height: 750px;
  background: skyblue;
`;
const Img = styled.img``;

export default function Slick() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div>
      <SliderWrapper {...settings}>
        <SlickImg>
          <h3>1</h3>
        </SlickImg>
        <SlickImg2>
          <h3>2</h3>
        </SlickImg2>
        <SlickImg3>
          <h3>3</h3>
        </SlickImg3>
        <SlickImg4>
          <h3>4</h3>
        </SlickImg4>
      </SliderWrapper>
    </div>
  );
}
