import { useState } from "react";
import * as S from "./CommentList.styles";
import { useDeleteUseditemQuestion } from "../../../../commons/hooks/mutation/usedeleteUseditemQuestion";
import { useFetchUseditemQuestions } from "../../../../commons/hooks/query/useFetchUseditemQuestions";
import { DetailTitle } from "../../detail/ProductDetail.styles";
import { getDate } from "../../../../../commons/library/util";
import CommentWrite from "../write/CommentWrite.index";
import QuestionAnswer from "./questionAnswer/list/AnswerList.index";
import { ReplyContent } from "./questionAnswer/list/AnswerList.styles";
import { useRecoilState } from "recoil";
import { infoUserState } from "../../../../../commons/stores";
import AnswerWrite from "./questionAnswer/write/AnswerWrite.index";

interface IProps {
  useditemId: string;
}

export default function ProductComment(props: IProps) {
  const { data, fetchMore } = useFetchUseditemQuestions(props?.useditemId);
  const [uploadId, setUploadId] = useState("");
  const [infoUser] = useRecoilState(infoUserState);
  const [isReply, setIsReply] = useState("");
  const { onClickdeleteUseditemQuestion } = useDeleteUseditemQuestion();

  const onClickUpdateComment = (updateId: string) => (event) => {
    setUploadId(updateId);
  };

  const onClickReply = (data: any) => () => {
    setIsReply(data);
  };

  return (
    <S.QandAWrapper>
      <DetailTitle>Q & A</DetailTitle>
      <S.QandAInnerWrapper>
        <CommentWrite />

        {data?.fetchUseditemQuestions ? (
          data?.fetchUseditemQuestions?.map((el, idx) => (
            <S.CommentWrapper key={el._id}>
              {uploadId !== el._id ? (
                <>
                  <S.CommentName>{el.user?.name}</S.CommentName>
                  <S.CommentContentWrapper>
                    <S.ContentInnerWrapper>
                      <ReplyContent>{el.contents}</ReplyContent>
                      <S.CommentBtnWrapper>
                        <span>{getDate(el?.createdAt)}</span>
                        {infoUser._id ===
                          data?.fetchUseditemQuestions[idx].user._id && (
                          <>
                            <S.EditIcon
                              onClick={onClickUpdateComment(el._id)}
                            />
                            <S.CloseIcon
                              onClick={onClickdeleteUseditemQuestion(el._id)}
                            />
                          </>
                        )}
                        {infoUser._id !==
                          data?.fetchUseditemQuestions[idx].user._id && (
                          <>
                            <S.ReplyIcon onClick={onClickReply(el._id)} />
                          </>
                        )}
                      </S.CommentBtnWrapper>
                    </S.ContentInnerWrapper>
                    <QuestionAnswer
                      createdAt={el.createdAt}
                      useditemQuestionId={el?._id}
                    />
                    {isReply === data?.fetchUseditemQuestions[idx].user._id ? (
                      <AnswerWrite
                        useditemQuestionId={el._id}
                        setIsReply={setIsReply}
                        onClickUpdateComment={onClickUpdateComment}
                      />
                    ) : (
                      <></>
                    )}
                  </S.CommentContentWrapper>
                </>
              ) : (
                <CommentWrite
                  isEdit={true}
                  defaultValue={el.contents}
                  onClickUpdateComment={onClickUpdateComment}
                  setUploadId={setUploadId}
                  useditemQuestionId={uploadId}
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
