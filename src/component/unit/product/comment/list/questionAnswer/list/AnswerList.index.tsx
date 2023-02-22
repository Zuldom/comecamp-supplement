import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { getDate } from "../../../../../../../commons/library/util";
import { useFetchUseditemQuestionAnswers } from "../../../../../../commons/hooks/query/useFetchUseditemQuestionAnswers";
import { useFetchUseditemQuestions } from "../../../../../../commons/hooks/query/useFetchUseditemQuestions";
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
    <>
      {data?.fetchUseditemQuestionAnswers?.map((el) => (
        <S.ReplyWrapper key={el._id}>
          <S.ReplyTitle>답변</S.ReplyTitle>
          <S.ReplyDate>{getDate(el.createdAt)}</S.ReplyDate>
          <S.ReplyContent>{el?.contents}</S.ReplyContent>
        </S.ReplyWrapper>
      ))}
    </>
  );
}
