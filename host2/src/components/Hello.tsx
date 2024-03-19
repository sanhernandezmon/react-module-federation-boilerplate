import React from "react";

type Props = {
  name: string;
};

const Hello = (props: Props) => {
  return <div>Hello world {props.name}</div>;
};

export default Hello;
