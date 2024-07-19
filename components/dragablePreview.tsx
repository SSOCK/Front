import { Dispatch, SetStateAction, useState } from 'react';
import { ImagePreviewType } from './imageInputForm';

interface DragablePreviewProps {
  preview: ImagePreviewType[];
  setPreview: Dispatch<SetStateAction<ImagePreviewType[]>>;
  fileList: File[];
  setFileList: Dispatch<SetStateAction<File[]>>;
}

export default function DragablePreview({
  preview,
  setPreview,
  fileList,
  setFileList,
}: DragablePreviewProps) {
  const [nowDragIndex, setNowDragIndex] = useState(-1);

  const deleteImage = (index: number) => {
    const newFileList = [...fileList];
    const newPreview = [...preview];
    newFileList.splice(index, 1);
    newPreview.splice(index, 1);
    setFileList(newFileList);
    setPreview(newPreview);
  };
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    selectedIndex: number
  ) => {
    setNowDragIndex(selectedIndex);
  };
  const onDrop = (
    e: React.DragEvent<HTMLDivElement>,
    selectedIndex: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (nowDragIndex < 0) return;

    const newFileList = [...fileList];
    const selectedFile = newFileList.splice(nowDragIndex, 1);
    newFileList.splice(
      selectedIndex > nowDragIndex ? selectedIndex - 1 : selectedIndex,
      0,
      selectedFile[0]
    );

    const newPreview = [...preview];
    const selectedPreview = newPreview.splice(nowDragIndex, 1);
    newPreview.splice(
      selectedIndex > nowDragIndex ? selectedIndex - 1 : selectedIndex,
      0,
      selectedPreview[0]
    );

    setFileList(newFileList);
    setPreview(newPreview);
    setNowDragIndex(-1);
  };
  return (
    <div className="flex h-20 w-full overflow-x-auto mb-5 relative">
      {preview.map((item, index) => (
        <div key={index} className="h-full flex">
          <div
            className={
              'w-5 relative flex justify-center items-center opacity-0'
            }
            onDrop={(e) => {
              onDrop(e, index);
              e.currentTarget.style.opacity = '0';
            }}
            onDragOver={(e) => {
              e.currentTarget.style.opacity = '100';
            }}
            onDragLeave={(e) => {
              e.currentTarget.style.opacity = '0';
            }}
          >
            <div className="w-1 rounded bg-black h-full"></div>
          </div>
          <div
            key={index}
            className="relative flex-shrink-0 h-full"
            onDragStart={(e) => onDragStart(e, index)}
          >
            <img
              src={item.src}
              alt={item.alt}
              className="h-full w-auto rounded-sm mb-4"
            />

            <div
              className="absolute border bg-white rounded-sm top-0 right-0 text-sm w-5 text-center cursor-pointer"
              onClick={() => {
                deleteImage(index);
              }}
            >
              x
            </div>
          </div>
        </div>
      ))}
      <div
        className={'w-5 relative flex justify-center items-center opacity-0'}
        onDrop={(e) => {
          onDrop(e, preview.length);
          e.currentTarget.style.opacity = '0';
        }}
        onDragOver={(e) => {
          e.currentTarget.style.opacity = '100';
        }}
        onDragLeave={(e) => {
          e.currentTarget.style.opacity = '0';
        }}
      >
        <div className="w-1 rounded bg-black h-full"></div>
      </div>
    </div>
  );
}
