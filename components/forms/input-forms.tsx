import { Label } from "../ui/label";

const InputFields = ({
  name,
  label,
  placeholder,
  type = "text",
  value,
  disabled,
  validation,
  error,
  register,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <Label>a</Label>
    </div>
  );
};

export default InputFields;
