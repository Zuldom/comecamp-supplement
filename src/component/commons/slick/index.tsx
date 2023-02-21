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
  background: lightgray;
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
          <Img src="https://post-phinf.pstatic.net/MjAxODExMTlfOCAg/MDAxNTQyNjIzODMwNjAx.IhZUT2K9rG2r9r4vaKxcwDNc_D1XAqU2DPvMYJs0YNQg.8EDzF-0t82RbWsqxUGfJp5n7S4bGkB3K4a8Pxh1SVm4g.PNG/New-Balance-Black-Logo1972.png?type=w1200" />
        </SlickImg>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </SliderWrapper>
    </div>
  );
}
