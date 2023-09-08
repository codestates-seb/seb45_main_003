import { FieldValues, FormState, RegisterOptions, UseFormRegister } from "react-hook-form";

type TextInputProps = {
  register: UseFormRegister<FieldValues>;
  id: string;
  title: string;
  options?: RegisterOptions;
  formState?: FormState<FieldValues>;
  defaultValue?: string;
};

const TextArea = (props: TextInputProps) => {
  const { register, id, title, options, formState, defaultValue } = props;

  return (
    <div className="field">
      <p>{title}</p>

      <div className="textarea">
        <textarea
          className={formState?.errors[id]?.message ? "error" : ""}
          {...register(id, options)}
          id={id}
          defaultValue={defaultValue}
        ></textarea>

        {formState?.errors && formState.errors[id]?.message && (
          <p className="error_message">{formState?.errors[id]?.message?.toString()}</p>
        )}
      </div>
    </div>
  );
};

export default TextArea;
