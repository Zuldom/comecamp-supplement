import { useState } from "react";
import * as S from "./CommentList.styles";
import { useDeleteUseditemQuestion } from "../../../../commons/hooks/mutation/usedeleteUseditemQuestion";
import { useFetchUseditemQuestions } from "../../../../commons/hooks/query/useFetchUseditemQuestions";
import { DetailTitle } from "../../detail/ProductDetail.styles";
import { getDate } from "../../../../../commons/library/util";
import CommentWrite from "../write/CommentWrite.index";
import QuestionAnswer from "./questionAnswer/list/AnswerList.index";
import { ReplyContent } from "./questionAnswer/list/AnswerList.styles";

interface IProps {
  useditemId: string;
}

export default function ProductComment(props: IProps) {
  const [answer, setAnswer] = useState("");
  const { data, fetchMore } = useFetchUseditemQuestions(props?.useditemId);
  const [uploadId, setUploadId] = useState("");
  const { onClickdeleteUseditemQuestion } = useDeleteUseditemQuestion();

  //   const onClickReply = () => {};
  //   // icon 클릭시 클릭한 댓글id에 대한 대댓글 input 이 열려야함.
  //   const onClickToggleAnswers = (event) => {
  //     setAnswer(event.currentTarget.id);
  //   };

  const onClickUpdateComment = (updateId: string) => (event) => {
    setUploadId(updateId);
  };

  return (
    <S.QandAWrapper>
      <DetailTitle>Q & A</DetailTitle>
      <S.QandAInnerWrapper>
        <CommentWrite />
        {data?.fetchUseditemQuestions ? (
          data?.fetchUseditemQuestions.map((el) => (
            <S.CommentWrapper key={el._id}>
              {uploadId !== el._id ? (
                <>
                  <S.CommentName>{el.user?.name}</S.CommentName>
                  <S.CommentContentWrapper>
                    <S.ContentInnerWrapper>
                      <ReplyContent>{el.contents}</ReplyContent>
                      <S.CommentBtnWrapper>
                        <span>{getDate(el?.createdAt)}</span>
                        <S.EditIcon onClick={onClickUpdateComment(el._id)} />
                        <S.CloseIcon
                          onClick={onClickdeleteUseditemQuestion(el._id)}
                        />
                        {/* <S.ReplyIcon /> */}
                      </S.CommentBtnWrapper>
                    </S.ContentInnerWrapper>
                    <QuestionAnswer
                      createdAt={el.createdAt}
                      useditemQuestionId={el?._id}
                      answer={answer}
                    />
                  </S.CommentContentWrapper>
                </>
              ) : (
                <CommentWrite
                  isEdit={true}
                  defaultValue={el.contents}
                  onClickUpdateComment={onClickUpdateComment}
                  setUploadId={setUploadId}
                />
              )}
            </S.CommentWrapper>
          ))
        ) : (
          <></>
        )}
        {/* {data?.fetchUseditemQuestions?.map((el, idx) => (
          <S.CommentWrapper key={el._id}>
            <S.CommentName>{el.user?.name}</S.CommentName>
            <S.CommentContentWrapper>
              <S.ContentInnerWrapper>
                <ReplyContent>{el.contents}</ReplyContent>
                <S.CommentBtnWrapper>
                  <span>{getDate(el?.createdAt)}</span>
                  <S.EditIcon onClick={onClickUpdateComment(el._id)} />
                  <S.CloseIcon
                    onClick={onClickdeleteUseditemQuestion(el._id)}
                  />
                  <S.ReplyIcon />
                </S.CommentBtnWrapper>
              </S.ContentInnerWrapper>
              <QuestionAnswer
                createdAt={el.createdAt}
                useditemQuestionId={el?._id}
                answer={answer}
              />
            </S.CommentContentWrapper>
          </S.CommentWrapper>
        ))} */}
      </S.QandAInnerWrapper>
    </S.QandAWrapper>
  );
}
