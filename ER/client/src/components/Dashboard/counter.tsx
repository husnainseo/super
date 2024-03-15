import React, { FC, useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

interface Tag {
  type: string;
  value: string;
}

type Props = {
  onSelect: (type: string, value: string) => void;
  activeTags: string;
  activeButton: Tag[];
};

const Counter: FC<Props> = ({
  onSelect,
  activeTags,
  activeButton = [{ type: "", value: "" }],
}) => {
  const [tag, setTag] = useState(activeTags);
  const [count, setCount] = useState(0);
  const [activeValue, setActiveValue] = useState<Tag[]>(activeButton);

  useEffect(() => {
    const matchingTag = activeButton.find((t) => t.type === activeTags);
    setCount(matchingTag ? parseInt(matchingTag.value) : 0);
  }, [activeTags, activeButton]);

  const updateCount = (amount: number) => {
    const newCount = Math.max(0, Math.min(12, count + amount));
    setCount(newCount);
    onSelect(tag, newCount.toString());
  };

  return (
    <div className="flex gap-1 items-center">
      <AiOutlinePlus onClick={() => updateCount(1)} />
      <p className="font-medium w-10">{count.toString()}</p>
      <AiOutlineMinus onClick={() => updateCount(-1)} />
    </div>
  );
};

export default Counter;
