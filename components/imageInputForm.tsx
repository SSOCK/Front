import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const srcs: ImagePreviewType[] = [];
    fileList.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        srcs.push({ src: reader.result as string, alt: file.name });
        if (srcs.length === fileList.length) setPreview(srcs);
      };
    });
  }, [fileList]);

  const updateImage = (fileList: FileList | null) => {
    const files = Array.from(fileList ?? []);
    setFileList(files);
  };

  const deleteImage = (index: number) => {
    const newPreview = [...preview];
    const newFileList = [...fileList];
    newPreview.splice(index, 1);
    newFileList.splice(index, 1);
    setPreview(newPreview);
    setFileList(newFileList);
  };
  return (
    <div className={props.className}>
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
        className="bg-gray-100 border-dashed rounded-sm cursor-pointer h-32 border border-gray-400 flex justify-center items-center font-semibold underline text-gray-500 my-2"
      >
        파일 선택
      </label>

      {preview.length > 0 && (
        <div className="flex gap-3 w-full overflow-x-auto mb-5">
          {preview.map((item, index) => (
            <div key={index} className="relative flex-shrink-0">
              <img
                src={item.src}
                alt={item.alt}
                className="h-20 w-auto rounded-sm mb-4"
              />
              <div
                className="absolute border bg-white rounded-sm top-0 right-0 text-sm w-5 text-center cursor-pointer"
                onClick={() => {
                  console.log(index);
                  deleteImage(index);
                }}
              >
                x
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
