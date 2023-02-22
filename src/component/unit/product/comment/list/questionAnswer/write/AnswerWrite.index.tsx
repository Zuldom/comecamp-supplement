import { useForm } from "react-hook-form";
import { useCreateQuestionAnswer } from "../../../../../../commons/hooks/mutation/useCreateQuestionAnswer";
import { useUpdateQuestionAnswer } from "../../../../../../commons/hooks/mutation/useUpdateQuestionAnswer";
import { WriteBtn } from "../../../write/CommentWrite.styles";
import * as S from "./AnswerWrite.styles";

export default function AnswerWrite(props) {
  const { register, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      contents: "",
    },
  });
  const { createSubmit } = useCreateQuestionAnswer();
  const { updateQuestionAnswer } = useUpdateQuestionAnswer();

  const onClickSubmit = (data) => {
    void createSubmit(data, props.useditemQuestionId);
  };

  return (
    <>
      <S.ReplyTextBox
        id={props.useditemQuestionId}
        onSubmit={handleSubmit(onClickSubmit)}
      >
        <S.ReplyTextarea
          placeholder="내용을 입력해주세요"
          {...register("contents")}
        />
        <S.ReplyBtnBox>
          <S.CancleBtn type="button">취소하기</S.CancleBtn>
          <WriteBtn>작성하기</WriteBtn>
        </S.ReplyBtnBox>
      </S.ReplyTextBox>
    </>
  );
}
