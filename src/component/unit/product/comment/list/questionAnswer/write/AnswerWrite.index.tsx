import { WriteBtn } from "../../../write/CommentWrite.styles";
import * as S from "./AnswerWrite.styles";

export default function AnswerWrite(props) {
  return (
    <>
      <S.ReplyTextBox id={props.useditemQuestionId} answer={props.answer}>
        <S.ReplyTextarea placeholder="내용을 입력해주세요" />
        <S.ReplyBtnBox>
          <S.CancleBtn type="button">취소하기</S.CancleBtn>
          <WriteBtn>작성하기</WriteBtn>
        </S.ReplyBtnBox>
      </S.ReplyTextBox>
    </>
  );
}
