import { useForm } from "react-hook-form";
import { useCreateUseditemQuestion } from "../../../../commons/hooks/mutation/useCreateUseditemQuestion";
import * as S from "./CommentWrite.styles";

export default function CommentWrite() {
  const { register, setValue, handleSubmit, reset } = useForm({
    mode: "onChange",
  });
  const { createSubmit } = useCreateUseditemQuestion();

  const onClickSubmit = (data) => {
    void createSubmit(data);
    setValue("contents", "");
  };
  return (
    <S.WriteQAForm onSubmit={handleSubmit(onClickSubmit)}>
      <S.QandATextarea
        placeholder="내용을 입력해 주세요"
        {...register("contents")}
      />
      <S.WriteBtn>작성하기</S.WriteBtn>
    </S.WriteQAForm>
  );
}
