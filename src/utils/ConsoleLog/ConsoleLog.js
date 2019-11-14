const ConsoleLog = (props) => {
  console.log(props.title || '', props.children);

  return false;
};

export default ConsoleLog;
