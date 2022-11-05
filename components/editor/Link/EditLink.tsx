import { FC, useCallback } from "react";
import { BsBoxArrowUpRight, BsPencilSquare } from "react-icons/bs";
import { BiUnlink } from "react-icons/bi";
import { BubbleMenu } from "@tiptap/react";
import { Editor } from "@tiptap/react";

interface Props {
  editor: Editor;
}

const EditLink: FC<Props> = ({ editor }): JSX.Element => {
  const handleOnLinkOpenClick = useCallback(() => {
    const { href } = editor.getAttributes("link");
    if (href) {
      window.open(href, "_blank");
    }
  }, [editor]);

  const handleLinkEditClick = () => {};

  const handleUnlinkClick = () => {
    editor.commands.unsetLink();
  };
  return (
    <BubbleMenu
      shouldShow={({ editor }) => editor.isActive("link")}
      editor={editor}
    >
      <div className="rounded bg-primary dark:bg-primary-dark text-primary-dark dark:text-primary shadow-secondary-dark shadow-sm p-3 flex items-center space-x-6 relative z-50">
        <button onClick={handleOnLinkOpenClick}>
          <BsBoxArrowUpRight />
        </button>

        <button onClick={handleLinkEditClick}>
          <BsPencilSquare />
        </button>

        <button onClick={handleUnlinkClick}>
          <BiUnlink />
        </button>
      </div>
    </BubbleMenu>
  );
};

export default EditLink;
