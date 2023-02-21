import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationDeleteUseditemArgs,
} from "../../../../commons/types/generated/types";

const DELETE_USED_ITEM = gql`
  mutation deleteUseditem($useditemId: ID!) {
    deleteUseditem(useditemId: $useditemId)
  }
`;

export const useDeleteUseditem = () => {
  const router = useRouter();
  const [deleteUseditem] = useMutation<
    Pick<IMutation, "deleteUseditem">,
    IMutationDeleteUseditemArgs
  >(DELETE_USED_ITEM);

  const onClickDeleteItem = (useditemId: string) => async (event) => {
    try {
      await deleteUseditem({
        variables: {
          useditemId,
        },
      });
      void router.push("/");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return {
    onClickDeleteItem,
  };
};
