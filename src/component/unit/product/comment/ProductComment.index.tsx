import { useState } from "react";
import { useFetchUseditemQuestions } from "../../../commons/hooks/query/useFetchUseditemQuestions";
import { DetailTitle } from "../detail/ProductDetail.styles";
import * as S from "./ProductComment.styles";
import { getDate } from "../../../../commons/library/util";
import { useFetchUseditemQuestionAnswers } from "../../../commons/hooks/query/useFetchUseditemQuestionAnswers";
import { ReplyContent } from "./questionAnswer/QuestionAnswer.styles";
import QuestionAnswer from "./questionAnswer/QuestionAnswer.index";

interface IProps {
  useditemId: string;
}

export default function ProductComment(props: IProps) {
  const [answer, setAnswer] = useState("");

  const { data, fetchMore } = useFetchUseditemQuestions(props?.useditemId);
  console.log(data?.fetchUseditemQuestions[0]?._id);

  const onClickReply = () => {};
  // icon 클릭시 클릭한 댓글id에 대한 대댓글 input 이 열려야함.
  const onClickToggleAnswers = (event) => {
    setAnswer(event.currentTarget.id);
  };
  return (
    <S.QandAWrapper>
      <DetailTitle>Q & A</DetailTitle>
      <S.QandAInnerWrapper>
        <S.WriteQAForm>
          <S.QandATextarea placeholder="내용을 입력해 주세요" />
          <S.WriteBtn>작성하기</S.WriteBtn>
        </S.WriteQAForm>
        {data?.fetchUseditemQuestions?.map((el, idx) => (
          <S.CommentWrapper key={el._id}>
            <S.CommentName>{el.user?.name}</S.CommentName>
            <S.CommentContentWrapper>
              <S.ContentInnerWrapper>
                <ReplyContent>{el.contents}</ReplyContent>
                <S.CommentBtnWrapper>
                  <span>{getDate(el?.createdAt)}</span>
                  {/* <S.EditIcon />
                  <S.CloseIcon /> */}
                  <S.ReplyIcon onClick={onClickToggleAnswers} />
                </S.CommentBtnWrapper>
              </S.ContentInnerWrapper>
              <QuestionAnswer
                createdAt={el.createdAt}
                useditemQuestionId={el?._id}
                answer={answer}
              />
            </S.CommentContentWrapper>
          </S.CommentWrapper>
        ))}
      </S.QandAInnerWrapper>
    </S.QandAWrapper>
  );
}
