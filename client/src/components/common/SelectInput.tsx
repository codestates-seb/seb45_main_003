import { FieldValues, FormState } from "react-hook-form";
import { CategoryType } from "../../constants/category";

type SelectInputProps = {
  id: string;
  title: string;
  selectoptions: CategoryType;
  field?: {
    name: string;
  };
  formState?: FormState<FieldValues>;
};

const SelectInput = (props: SelectInputProps): JSX.Element => {
  const { formState, title, selectoptions, field, id } = props;

  return (
    <div className="field">
      <p>{title}</p>

      <div className="input inline">
        <div className="select">
          <select {...field}>
            <option value="">카테고리 선택</option>
            {Object.values(selectoptions).map((option) => {
              return (
                <option key={option.id} value={option.id}>
                  {option.value}
                </option>
              );
            })}
          </select>
        </div>

        {formState?.errors && formState.errors[id]?.message && (
          <p className="error_message">{formState?.errors[id]?.message?.toString()}</p>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
