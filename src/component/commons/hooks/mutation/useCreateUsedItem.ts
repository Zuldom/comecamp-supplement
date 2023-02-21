import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationCreateUseditemArgs,
} from "../../../../commons/types/generated/types";

const CREATE_USED_ITEM = gql`
  mutation createUseditem($createUseditemInput: CreateUseditemInput!) {
    createUseditem(createUseditemInput: $createUseditemInput) {
      _id
      name
      remarks
      contents
      price
      tags
      images
    }
  }
`;

export const useCreateUsedItem = () => {
  const router = useRouter();

  const [createUseditem] = useMutation<
    Pick<IMutation, "createUseditem">,
    IMutationCreateUseditemArgs
  >(CREATE_USED_ITEM);

  const createSubmit = async (data, resultUrls: string[]) => {
    // console.log(data);
    try {
      const result = await createUseditem({
        variables: {
          createUseditemInput: {
            ...data,
            price: Number(data.price),
            images: resultUrls,
          },
        },
      });
      console.log(result.data);
      void router.push(
        `/products/${String(result?.data?.createUseditem?._id)}`
      );
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return {
    createSubmit,
  };
};
