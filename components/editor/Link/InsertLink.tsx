import { FC, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import Button from "../Toolbar/Button";
import LinkForm from "./LinkForm";

interface Props {}

const InsertLink: FC<Props> = (props): JSX.Element => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      onKeyDown={({ key }) => {
        console.log(key);
        if (key === "Escape") setVisible(false);
      }}
      className="relative"
    >
      <Button onClick={() => setVisible(!visible)}>
        <BsLink45Deg />
      </Button>

      <div className="absolute top-full right-0 mt-4 z-50">
        <LinkForm visible={visible} />
      </div>
    </div>
  );
};

export default InsertLink;
