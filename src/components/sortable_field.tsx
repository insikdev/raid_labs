import ASC from "../assets/asc.svg?react";
import DESC from "../assets/desc.svg?react";
import None from "../assets/none.svg?react";

type Props = React.PropsWithChildren & {
  isActive: boolean;
  isDesc: boolean;
  title: string;
  onClick: () => void;
};

function SortableItem({ isActive, isDesc, title, onClick }: Props) {
  const Icon = isActive ? (isDesc ? DESC : ASC) : None;

  return (
    <div
      className="flex items-center justify-center h-6 gap-x-2 cursor-pointer"
      onClick={onClick}
    >
      <Icon className="w-auto h-full" />
      <span
        className={
          isActive ? "font-bold text-black" : "font-normal text-inherit"
        }
      >
        {title}
      </span>
    </div>
  );
}

export default SortableItem;
