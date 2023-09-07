import { FieldValues, FormState, RegisterOptions, UseFormRegister } from "react-hook-form";

type TextInputProps = {
  register: UseFormRegister<FieldValues>;
  id: string;
  title: string;
  type?: string;
  options?: RegisterOptions;
  formState?: FormState<FieldValues>;
  placeholder?: string;
};

const TextInput = (props: TextInputProps) => {
  const { register, id, title, type, options, formState, placeholder } = props;

  return (
    <div className="field">
      <p>{title}</p>

      <div className="input">
        <input
          className={formState?.errors[id]?.message ? "error" : ""}
          {...register(id, options)}
          id={id}
          type={type}
          placeholder={placeholder}
        />

        {id === "immediatelyBuyPrice" || id === "currentAuctionPrice" ? <span>원</span> : null}

        {formState?.errors && formState.errors[id]?.message && (
          <p className="error_message">{formState?.errors[id]?.message?.toString()}</p>
        )}
      </div>
    </div>
  );
};

export default TextInput;
