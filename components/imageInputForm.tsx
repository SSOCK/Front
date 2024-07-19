import { useState } from 'react';
import DragablePreview from './dragablePreview';
import { FormLabel } from './ui/form';
import { Input } from './ui/input';

export type ImagePreviewType = { src: string; alt: string };

interface ImageInputFormProps extends React.HTMLAttributes<HTMLDivElement> {
  fileList: File[];
  setFileList: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function ImageInputForm({
  fileList,
  setFileList,
  ...props
}: ImageInputFormProps) {
  const [preview, setPreview] = useState<ImagePreviewType[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const updatePreview = (files: File[]) => {
    setIsLoading(true);
    let cnt = 0;
    const previews: ImagePreviewType[] = [
      ...preview,
      ...Array.from({ length: files.length - preview.length }, () => ({
        src: '',
        alt: 'loading',
      })),
    ];
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        previews[preview.length + index] = {
          src: reader.result as string,
          alt: file.name,
        };
        cnt++;
        if (cnt === files.length) {
          setPreview(previews);
          setIsLoading(false);
        }
      };
    });
  };

  const updateImage = (newFileList: FileList | null) => {
    const files = Array.from(newFileList ?? []);
    setFileList([...fileList, ...files]);
    updatePreview(files);
  };

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files) {
      setIsDragging(true);
    }
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const reg = /(.*?)\.(jpg|jpeg|png|gif)$/i;
    const newFiles = Array.from(e.dataTransfer.files).filter((e) =>
      reg.test(e.name)
    );
    if (!newFiles || newFiles.length < 1) return;
    setFileList([...fileList, ...newFiles]);
    updatePreview(newFiles);
    setIsDragging(false);
  };
  return (
    <div
      {...props}
      onDrop={onDrop}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
    >
      <FormLabel>사진 첨부</FormLabel>
      <Input
        type="file"
        accept=".png, .jpg, .jpeg"
        id="record-img"
        multiple
        onChange={(event) => {
          updateImage(event.target.files);
          event.target.value = '';
        }}
        className="hidden"
      />
      <label
        htmlFor="record-img"
        className={`bg-gray-100 border-dashed rounded-sm cursor-pointer h-32 border border-gray-400 flex justify-center items-center font-semibold underline text-gray-500 my-2 ${isLoading && 'pointer-events-none border-red-500'}`}
      >
        파일 선택
      </label>

      <DragablePreview
        fileList={fileList}
        setFileList={setFileList}
        preview={preview}
        setPreview={setPreview}
      />
    </div>
  );
}
