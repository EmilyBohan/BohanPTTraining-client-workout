const InputForm = ({ name, type, label, value, setState, required }) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        onChange={(e) => setState(e.target.value)}
        value={value}
        type={type}
        name={name}
        id={name}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-violet-500 block w-full p-2.5  "
        required={required}
      />
    </div>
  );
};

export default InputForm;
