import { useState } from 'react';
import { Button } from '@components/ui/button';

type PreviewProps = {
  images: File[];
  deleteImage: (arg: number) => void;
};
export default function Preview({ images, deleteImage }: PreviewProps) {
  const [preview, setPreview] = useState<string[]>([]);
  console.log(images);
  //   images.forEach((image, index) => {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(image);
  //     reader.onloadend = () => {
  //       console.log(reader.result);
  //       setPreview([...preview, reader.result as string]);
  //     };
  //   });
  //   console.log(images, preview);

  return <h1>test</h1>;
  // return (
  //   <div key={index}>
  //     <Button
  //       type="button"
  //       onClick={() => deleteImage(index)}
  //       className="p-2 mb-1 block"
  //     >
  //       Delete
  //     </Button>
  //     <img src={item.src as string} alt="preview" className="pb-4" />
  //   </div>
  // );
}
