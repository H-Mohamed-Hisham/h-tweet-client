import { useState } from "react";
import { useMutation } from "@apollo/client";

// Component
import InputGroupField from "components/form/InputGroupField";

// GraphQL
import { ADD_COMMENT } from "graphql/mutations";

type props = {
  postId: string;
};

const CommentForm: React.FC<props> = ({ postId }) => {
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
  const [addComment] = useMutation(ADD_COMMENT, {
    update() {
      setFormValue({ body: "" });
    },
    variables: {
      postId,
      body: formValue.body,
    },
  });

  // Form Submit
  const handleFormSubmit = () => {
    addComment();
  };

  return (
    <div className="my-4">
      <InputGroupField
        type="text"
        id="body"
        value={formValue.body}
        error={error}
        placeholder="Write a comment"
        buttonTitle="Comment"
        onChange={handleInputChange}
        onClick={() => handleFormSubmit()}
      />
    </div>
  );
};

export default CommentForm;
