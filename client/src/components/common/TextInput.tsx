import { FieldValues, FormState, RegisterOptions, UseFormRegister } from "react-hook-form";

type TextInputProps = {
  register: UseFormRegister<FieldValues>;
  id: string;
  title: string;
  type?: string;
  options?: RegisterOptions;
  formState?: FormState<FieldValues>;
};

const TextInput = (props: TextInputProps) => {
  const { register, id, title, type, options, formState } = props;

  return (
    <div>
      <p>{title}</p>

      <input {...register(id, options)} id={id} type={type} />

      {formState?.errors && formState.errors[id]?.message && (
        <p>{formState?.errors[id]?.message?.toString()}</p>
      )}
    </div>
  );
};

export default TextInput;
