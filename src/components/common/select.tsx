import ReactSelect from 'react-select'

//@ts-ignore
const Select = (props) => {
  return (
    <ReactSelect {...props} 
    menuPortalTarget={document.body}
    menuPosition={'fixed'} 
    styles={{
      option: (provided, state) => ({
        ...provided,
        color: '#151990',
        backgroundColor: '#fff',
        zIndex: 9999,
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: '#fff',
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: '#fff',
        color: '#151990',
        zIndex: 9999,
      }),
      menuPortal: (provided) => ({
        ...provided,
        zIndex: 9999,
      }),
      control: (provided) => ({
        // none of react-select's styles are passed to <Control />
        ...provided,
        background: '#fff',
        borderRadius: '4px',
        borderWidth: 1,
        width: 170,
        color: '#151990',
      }),
      listBox: (provided) => ({
        // none of react-select's styles are passed to <Control />
        ...provided,
        zIndex: 9999,
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        return { ...provided, color: '#151990', opacity, transition };
      },
    }} />
  );
};

export default Select;