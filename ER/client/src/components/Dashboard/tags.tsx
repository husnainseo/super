import React from 'react';
import { RxCross2 } from "react-icons/rx";

interface Tag {
  type: string;
  value: string;
}

interface TagListProps {
  tag: Tag[];
  handleRemoveTag: (type: string, value: string) => void;
}

const TagList: React.FC<TagListProps> = ({ tag, handleRemoveTag }) => (
  <div className="">
    {tag.map((tagValue, index) => (
      <div
        key={index}
        className="inline-block bg-[#f0ebf4] rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
      >
        <span className="flex items-center gap-2 cursor-pointer">
          {tagValue.type} {tagValue.value}
          <RxCross2
            onClick={() => handleRemoveTag(tagValue.type, tagValue.value)}
            />
        </span>
      </div>
    ))}
  </div>
);

export default TagList;