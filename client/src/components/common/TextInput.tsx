import { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form";

type TextInputProps = {
  register: UseFormRegister<FieldValues>;
  id: string;
  type?: string;
  title: string;
  options?: RegisterOptions;
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
    </div>
  );
};

export default TextInput;
