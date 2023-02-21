import { useRouter } from "next/router";
import { useState } from "react";
import { getDate } from "../../../../../../../commons/library/util";
import { useFetchUseditemQuestionAnswers } from "../../../../../../commons/hooks/query/useFetchUseditemQuestionAnswers";
import { WriteBtn } from "../../../write/CommentWrite.styles";
import AnswerWrite from "../write/AnswerWrite.index";
import * as S from "./AnswerList.styles";

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

      <AnswerWrite useditemQuestionId={props.useditemQuestionId} />
    </S.ReplyWrapper>
  );
}
