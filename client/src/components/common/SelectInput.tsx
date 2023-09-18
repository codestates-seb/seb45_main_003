import { FieldValues, FormState } from "react-hook-form";
import { CATEGORY, CategoryType } from "../../constants/category";

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
        <div className="custom_select">
          <select {...field}>
            <option value="" key="default">
              {title} 선택
            </option>
            {Object.values(selectoptions).map((option) => {
              return (
                <>
                  {option.value !== CATEGORY.all.value && (
                    <option key={option.id} value={option.id}>
                      {option.value}
                    </option>
                  )}
                </>
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
