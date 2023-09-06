import { FieldValues, FormState, RegisterOptions, UseFormRegister } from "react-hook-form";

type TextInputProps = {
  register: UseFormRegister<FieldValues>;
  id: string;
  title: string;
  options?: RegisterOptions;
  formState?: FormState<FieldValues>;
};

const TextArea = (props: TextInputProps) => {
  const { register, id, title, options, formState } = props;

  return (
    <div className="field">
      <p>{title}</p>

      <textarea {...register(id, options)} id={id}></textarea>

      {formState?.errors && formState.errors[id]?.message && (
        <p>{formState?.errors[id]?.message?.toString()}</p>
      )}
    </div>
  );
};

export default TextArea;
