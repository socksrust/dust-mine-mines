import ReactSelect from 'react-select'

//@ts-ignore
const Select = (props) => {
  return (
    <ReactSelect {...props} styles={{
      option: (provided, state) => ({
        ...provided,
        color: 'white',
        backgroundColor: '#1B193F',
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: '#1B193F',
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: '#1B193F',
        color: 'white',
      }),
      control: (provided) => ({
        // none of react-select's styles are passed to <Control />
        ...provided,
        background: '#1B193F',
        borderRadius: '4px',
        borderWidth: 0,
        width: 170,
        color: 'white',
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