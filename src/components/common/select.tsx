import ReactSelect from 'react-select'
import constants from '../../utils/constants';
const { colors } = constants;
const { primaryBackground, secondaryBackground, objectBackground, buttonText } = colors;

//@ts-ignore
const Select = (props) => {

  if(!window) {
    return null;
  }

  return (
    <ReactSelect {...props}
    menuPortalTarget={document.body}
    menuPosition={'fixed'}
    styles={{
      option: (provided, state) => ({
        ...provided,
        color: buttonText,
        backgroundColor: objectBackground,
        zIndex: 9999,
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: objectBackground,
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: objectBackground,
        color: buttonText,
        zIndex: 9999,
      }),
      menuPortal: (provided) => ({
        ...provided,
        zIndex: 9999,
      }),
      control: (provided) => ({
        // none of react-select's styles are passed to <Control />
        ...provided,
        background: objectBackground,
        borderRadius: '4px',
        borderWidth: 1,
        width: window.innerWidth <= 750 ? 170 : 170,
        color: buttonText,
      }),
      listBox: (provided) => ({
        // none of react-select's styles are passed to <Control />
        ...provided,
        zIndex: 9999,
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        return { ...provided, color: buttonText, opacity, transition };
      },
    }} />
  );
};

export default Select;