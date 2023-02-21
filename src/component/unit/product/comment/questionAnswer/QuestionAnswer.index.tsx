import { useRouter } from "next/router";
import { useState } from "react";
import { getDate } from "../../../../../commons/library/util";
import { useFetchUseditemQuestionAnswers } from "../../../../commons/hooks/query/useFetchUseditemQuestionAnswers";
import { WriteBtn } from "../ProductComment.styles";
import * as S from "./QuestionAnswer.styles";

interface IProps {
  useditemQuestionId: string;
  createdAt: string;
}

export default function QuestionAnswer(props: IProps) {
  const router = useRouter();
  const { data } = useFetchUseditemQuestionAnswers(props.useditemQuestionId);
  console.log(data?.fetchUseditemQuestionAnswers);

  return (
    <S.ReplyWrapper>
      <S.ReplyTitle>답변</S.ReplyTitle>
      <S.ReplyDate>{getDate(props.createdAt)}</S.ReplyDate>
      {data?.fetchUseditemQuestionAnswers?.map((el) => (
        <S.ReplyContent key={el._id}>{el?.contents}</S.ReplyContent>
      ))}

      <S.ReplyTextBox id={props.useditemQuestionId} answer={props.answer}>
        <S.ReplyTextarea placeholder="내용을 입력해주세요" />
        <S.ReplyBtnBox>
          <S.CancleBtn type="button">취소하기</S.CancleBtn>
          <WriteBtn>작성하기</WriteBtn>
        </S.ReplyBtnBox>
      </S.ReplyTextBox>
    </S.ReplyWrapper>
  );
}
