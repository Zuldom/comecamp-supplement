import { useRouter } from "next/router";
import { Content1, Title } from "../../typeFace";
import * as S from "./index.styles";
import { useMoveToPage } from "../../hooks/custom/useMoveToPage";
import { useLogoutUser } from "../../hooks/mutation/useLogoutUser";

interface IProps {
  infoUser: string;
}

export default function AccountHeader(props: IProps) {
  const router = useRouter();
  const { onClickMoveToPage } = useMoveToPage();
  const staticBrand = [
    {
      name: "BRAND",
      url: "/",
    },
    {
      name: "CATEGORY",
      url: "/",
    },
    {
      name: "LIFE",
      url: "/",
    },
    {
      name: "BEAUTY",
      url: "/",
    },
  ];

  const onClickMoveToStatic = (path: string) => () => {
    void router.push(path);
  };

  const dynamicProduct = [
    {
      name: "#STYLE",
      url: "/",
    },
    {
      name: "EVENT",
      url: "/",
    },
    {
      name: "BEST",
      url: "/",
    },
  ];

  return (
    <>
      <S.Wrapper>
        <S.NavWrapper>
          <S.ImgDiv onClick={onClickMoveToPage("/")}>
            <img src="/header/white-logo.png" alt="Logo" />
          </S.ImgDiv>
          <S.StaticWrapper>
            {staticBrand.map((el, idx) => (
              <S.NavName key={idx} onClick={onClickMoveToStatic(el.url)}>
                <Title style={{ cursor: "pointer" }}>{el.name}</Title>
              </S.NavName>
            ))}
            <Title>|</Title>
            {dynamicProduct.map((el, idx) => (
              <S.NavName key={idx} onClick={onClickMoveToStatic(el.url)}>
                <Title style={{ cursor: "pointer" }}>{el.name}</Title>
              </S.NavName>
            ))}
          </S.StaticWrapper>
          <S.UserInfoWrapper>
            <Content1
              onClick={
                router.pathname === "/join"
                  ? onClickMoveToPage("/login")
                  : onClickMoveToPage("/join")
              }
            >
              {router.pathname === "/join" ? "로그인" : "회원가입"}
            </Content1>
            <Content1>장바구니</Content1>
            <S.BasketWrapper>0</S.BasketWrapper>
          </S.UserInfoWrapper>
        </S.NavWrapper>
      </S.Wrapper>
    </>
  );
}
