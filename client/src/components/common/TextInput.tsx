import {
  DeepMap,
  FieldError,
  FieldValues,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type TextInputProps = {
  register: UseFormRegister<FieldValues>;
  id: string;
  title: string;
  type?: string;
  options?: RegisterOptions;
  errors?: DeepMap<FieldValues, FieldError>;
};

const TextInput = (props: TextInputProps) => {
  return (
    <div>
      <h4>{props.title}</h4>

      {props.id === "content" ? (
        <textarea {...props.register(props.id, props.options)} id={props.id}></textarea>
      ) : (
        <input {...props.register(props.id, props.options)} id={props.id} type={props.type} />
      )}
      {props.errors && props.errors[props.id]?.message && <p>{props.errors[props.id].message}</p>}
    </div>
  );
};

export default TextInput;
