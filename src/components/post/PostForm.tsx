import { useState } from "react";
import { useMutation } from "@apollo/client";

// Component
import InputGroupField from "components/form/InputGroupField";

// Graphql
import { CREATE_POST } from "graphql/mutations";
import { FETCH_POSTS } from "graphql/queries";

type props = {
  userId: string | null;
};

const PostForm: React.FC<props> = ({ userId }) => {
  // State
  const [formValue, setFormValue] = useState({
    body: "",
  });
  const [error, setError] = useState<any>({});

  // Input Handler
  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    setFormValue((prevProps) => ({
      ...prevProps,
      [id]: value,
    }));
  };

  // Mutation
  const [createPost] = useMutation(CREATE_POST, {
    variables: formValue,
    onError(err: any) {
      setError(err?.graphQLErrors[0]?.extensions.error);
    },
    update(proxy, result) {
      const data: any = proxy.readQuery({
        query: FETCH_POSTS,
        variables: {
          skip: 0,
          userId,
        },
      });
      proxy.writeQuery({
        query: FETCH_POSTS,
        variables: {
          skip: 0,
          userId,
        },
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
          getTotalPostCount: data.getTotalPostCount,
        },
      });
      setFormValue({
        body: "",
      });
    },
  });

  // Form Submit
  const handleFormSubmit = () => {
    createPost();
  };

  return (
    <InputGroupField
      type="text"
      id="body"
      value={formValue.body}
      error={error}
      placeholder="Post something"
      buttonTitle="Post"
      onChange={handleInputChange}
      onClick={() => handleFormSubmit()}
    />
  );
};

export default PostForm;
