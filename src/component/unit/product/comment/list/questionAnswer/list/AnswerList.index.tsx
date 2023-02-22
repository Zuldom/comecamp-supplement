import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { getDate } from "../../../../../../../commons/library/util";
import { infoUserState } from "../../../../../../../commons/stores";
import { useDeleteQuestionAnswer } from "../../../../../../commons/hooks/mutation/useDeleteQuestionAnswer";
import { useFetchUseditemQuestionAnswers } from "../../../../../../commons/hooks/query/useFetchUseditemQuestionAnswers";
import { useFetchUseditemQuestions } from "../../../../../../commons/hooks/query/useFetchUseditemQuestions";
import { WriteBtn } from "../../../write/CommentWrite.styles";
import { CloseIcon, EditIcon } from "../../CommentList.styles";
import AnswerWrite from "../write/AnswerWrite.index";
import { CancleBtn } from "../write/AnswerWrite.styles";
import * as S from "./AnswerList.styles";
import InfiniteScroll from "react-infinite-scroller";

interface IProps {
  useditemQuestionId: string;
  createdAt: string;
}

export default function QuestionAnswer(props: IProps) {
  const router = useRouter();
  const { data, fetchMore } = useFetchUseditemQuestionAnswers(
    props.useditemQuestionId
  );
  const { deleteQuestionAnswer } = useDeleteQuestionAnswer();
  const [isEditRelply, setIsEditRelply] = useState(false);
  const [infoUser] = useRecoilState(infoUserState);
  const onClickToggleEdit = () => {
    setIsEditRelply((prev) => !prev);
    // console.log(infoUser?._id);
    // console.log(data?.fetchUseditemQuestionAnswers);
    console.log(isEditRelply);
  };

  // const onLoadMore = () => {
  //   if (data === undefined) return;

  //   void fetchMore({
  //     variables: {
  //       page: Number(
  //         Math.ceil(data.fetchUseditemQuestionAnswers.length / 10) + 1
  //       ),
  //     },
  //     updateQuery(prev, { fetchMoreResult }) {
  //       if (fetchMoreResult.fetchUseditemQuestionAnswers === undefined) {
  //         return {
  //           fetchUseditemQuestionAnswers: [
  //             ...prev.fetchUseditemQuestionAnswers,
  //           ],
  //         };
  //       }
  //       return {
  //         fetchUseditemQuestions: [
  //           ...prev.fetchUseditemQuestionAnswers,
  //           ...fetchMoreResult.fetchUseditemQuestionAnswers,
  //         ],
  //       };
  //     },
  //   });
  // };

  const onLoadMore = () => {
    if (!data) return;

    void fetchMore({
      variables: {
        page: Number(
          Math.ceil(data?.fetchUseditemQuestionAnswers.length / 10) + 1
        ),
      },
      updateQuery(prev, { fetchMoreResult }) {
        if (fetchMoreResult.fetchUseditemQuestionAnswers === undefined) {
          return {
            fetchUseditemQuestionAnswers: [
              ...prev.fetchUseditemQuestionAnswers,
            ],
          };
        }
        return {
          fetchUseditemQuestionAnswers: [
            ...prev.fetchUseditemQuestionAnswers,
            ...fetchMoreResult.fetchUseditemQuestionAnswers,
          ],
        };
      },
    });
  };

  console.log(isEditRelply);
  return (
    <>
      <InfiniteScroll
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={true}
        useWindow={true}
      >
        {data?.fetchUseditemQuestionAnswers ? (
          data.fetchUseditemQuestionAnswers.map((el, idx) => (
            <S.ReplyWrapper key={el._id}>
              {!isEditRelply ? (
                <>
                  <S.ReplyTitle>답변</S.ReplyTitle>
                  {infoUser._id ===
                    data?.fetchUseditemQuestionAnswers[idx].user._id && (
                    <S.IconBox>
                      <EditIcon onClick={onClickToggleEdit} />
                      <CloseIcon
                        onClick={deleteQuestionAnswer(
                          String(data.fetchUseditemQuestionAnswers[idx]._id),
                          props.useditemQuestionId
                        )}
                      />
                    </S.IconBox>
                  )}
                  <S.ReplyDate>{getDate(el.createdAt)}</S.ReplyDate>
                  <S.ReplyContent>{el?.contents}</S.ReplyContent>
                </>
              ) : (
                <>
                  <AnswerWrite
                    defaultValue={
                      data.fetchUseditemQuestionAnswers[idx].contents
                    }
                    isEditRelply={isEditRelply}
                    setIsEditRelply={setIsEditRelply}
                    QuestionAnswerId={
                      data.fetchUseditemQuestionAnswers[idx]._id
                    }
                  />
                </>
              )}
            </S.ReplyWrapper>
          ))
        ) : (
          <></>
        )}
      </InfiniteScroll>
    </>
  );
}

{
  /* {data?.fetchUseditemQuestionAnswers?.map((el) => (
    <S.ReplyWrapper key={el._id}>
      <S.IconBox>
        <S.ReplyTitle>답변</S.ReplyTitle>
        <div>
          <EditIcon onClick={onClickToggleEdit}/>
          <CloseIcon />
        </div>
      </S.IconBox>
      <S.ReplyDate>{getDate(el.createdAt)}</S.ReplyDate>
      <S.ReplyContent>{el?.contents}</S.ReplyContent>
    </S.ReplyWrapper>
  ))} */
}
