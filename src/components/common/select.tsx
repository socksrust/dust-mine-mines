import ReactSelect from "react-select";
import constants from "../../utils/constants";
const { colors } = constants;
const { primaryBackground, secondaryBackground } = colors;

//@ts-ignore
const Select = (props) => {
  if (!window) {
    return null;
  }

  return (
    <ReactSelect
      {...props}
      menuPortalTarget={document.body}
      menuPosition={"fixed"}
      styles={{
        option: (provided, state) => ({
          ...provided,
          color: "#000",
          backgroundColor: "#fff",
          zIndex: 9999,
          overflow: "hidden",
        }),
        indicatorSeparator: (provided) => ({
          ...provided,
          backgroundColor: "#fff",
        }),
        menu: (provided) => ({
          ...provided,
          backgroundColor: "#fff",
          color: "#000",
          zIndex: 9999,
        }),
        menuPortal: (provided) => ({
          ...provided,
          zIndex: 9999,
        }),
        control: (provided) => ({
          // none of react-select's styles are passed to <Control />
          ...provided,
          background: "#fff",
          borderRadius: "4px",
          borderWidth: 1,
          width: window.innerWidth <= 750 ? 170 : 170,
          color: "#000",
        }),
        listBox: (provided) => ({
          // none of react-select's styles are passed to <Control />
          ...provided,
          zIndex: 9999,
        }),
        singleValue: (provided, state) => {
          const opacity = state.isDisabled ? 0.5 : 1;
          const transition = "opacity 300ms";
          return { ...provided, color: "#000", opacity, transition };
        },
      }}
    />
  );
};

export default Select;
