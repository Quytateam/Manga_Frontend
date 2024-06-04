export const Message = ({ placeholder, name, register, height, value }) => {
  return (
    <>
      <textarea
        id="comment_content"
        className={`form-control ${height}`}
        placeholder={placeholder}
        {...register}
        name={name}
        value={value}
      ></textarea>
    </>
  );
};

export const Select = ({ label, options, register, name }) => {
  return (
    <>
      <label className="text-border font-semibold">{label}</label>
      <select
        {...register}
        name={name}
        className="w-full mt-2 px-6 py-4 text-text bg-main border border-border rounded"
      >
        {options.map((o, i) => (
          <option key={i} value={o.value}>
            {o.title}
          </option>
        ))}
      </select>
    </>
  );
};

export const Input = ({
  label,
  placeholder,
  type,
  register,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <label
        htmlFor="ctl00_mainContent_login1_LoginCtrl_UserName"
        className="control-label"
      >
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        {...register}
        type={type}
        placeholder={placeholder}
        maxLength="100"
        className="form-control"
      ></input>
    </>
  );
};

export const Input2 = ({
  placeholder,
  type,
  register,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <input
        name={name}
        value={value}
        onChange={onChange}
        {...register}
        type={type}
        placeholder={placeholder}
        maxLength="100"
        className="form-control"
      ></input>
    </>
  );
};

export const Textarea = ({
  placeholder,
  height,
  register,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <textarea
        name={name}
        id="comment_content"
        className={`form-control h-24`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...register}
      ></textarea>
    </>
  );
};
