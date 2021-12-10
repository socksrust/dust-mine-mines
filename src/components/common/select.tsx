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
        color: 'white',
        backgroundColor: '#1B193F',
        zIndex: 9999,
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: '#1B193F',
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: '#1B193F',
        color: 'white',
        zIndex: 9999,
      }),
      menuPortal: (provided) => ({
        ...provided,
        zIndex: 9999,
      }),
      control: (provided) => ({
        // none of react-select's styles are passed to <Control />
        ...provided,
        background: '#1B193F',
        borderRadius: '4px',
        borderWidth: 1,
        width: 170,
        color: 'white',
      }),
      listBox: (provided) => ({
        // none of react-select's styles are passed to <Control />
        ...provided,
        zIndex: 9999,
      }),
      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = 'opacity 300ms';
        return { ...provided, color: 'white', opacity, transition };
      },
    }} />
  );
};

export default Select;