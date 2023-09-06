import { FieldValues, FormState } from "react-hook-form";
import { CategoryType } from "../../contstants/category";

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

      <div className="input">
        <select {...field}>
          <option value="">카테고리 선택</option>
          {Object.keys(selectoptions).map((key) => {
            return (
              <option key={key} value={selectoptions[key]}>
                {selectoptions[key]}
              </option>
            );
          })}
        </select>

        {formState?.errors && formState.errors[id]?.message && (
          <p className="error_message">{formState?.errors[id]?.message?.toString()}</p>
        )}
      </div>
    </div>
  );
};

export default SelectInput;
