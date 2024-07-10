import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { Input } from '@components/ui/input';
import Upload from '@/public/icons/upload.svg';

const ProfileSchema = z.object({
  name: z
    .string()
    .min(3, { message: '3자 이상 20자이하로 입력해주세요.' })
    .max(20, { message: '1자 이상 20자이하로 입력해주세요.' }),
  email: z
    .string()
    .email({ message: '유효한 이메일을 입력해주세요.' })
    .max(50, { message: '50자 이하로 입력해주세요.' }),
});

export default function Profile() {
  const [img, setImg] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [imgErrorMsg, setImgErrorMsg] = useState<string>('');
  const [warning, setWarning] = useState(false);
  const imgRef = useRef(null);

  const data = {
    profile: '',
    name: '홍길동',
    phone: '010-0000-0000',
    email: 'abc123@gmail.com',
    birth: '2000.01.10',
    gender: '남성',
  };

  const ProfileForm = useForm<z.infer<typeof ProfileSchema>>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
    },
  });

  useEffect(() => {
    setImg(data.profile);
    setPhone(data.phone);
    setBirth(data.birth);
    setGender(data.gender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const uploadFile = (files: FileList | null) => {
    if (files === null || !files.length) return;

    const reg = /(.*?)\.(jpg|jpeg|png)$/;
    if (!files[0].name.match(reg)) {
      setImgErrorMsg('다른 이미지로 시도해주십시오.');
      return;
    }
    setImg('');
    setImgErrorMsg('');

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => setImg(reader.result as string);
  };

  const profileSubmit = async (data: z.infer<typeof ProfileSchema>) => {
    try {
      // api 소통
      // img, data.name, phone, data.email, birth, gender
    } catch (error) {
      setWarning(true);
    }
  };

  const reset = () => setImgErrorMsg('');

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-xl font-bold">프로필</div>
      <div>
        <div className="pt-8 text-gray-400">프로필 사진</div>
        <label htmlFor="file" className="block w-fit">
          <div className="mt-2 w-20 h-20 rounded-full bg-gray-300 relative">
            {img !== '' ? (
              <img
                ref={imgRef}
                className="w-full h-full rounded-full"
                src={img}
                alt=""
              />
            ) : null}
            <Upload className="absolute w-6 border right-0 bottom-1 bg-white rounded-full p-1 fill-gray-500" />
          </div>
        </label>
        <input
          id="file"
          type="file"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={(event) => uploadFile(event.target.files)}
        />
      </div>

      {img !== '' ? (
        <Button className="w-20 mt-2 p-0" onClick={() => setImg('')}>
          사진 취소
        </Button>
      ) : null}
      {imgErrorMsg !== '' ? (
        <div className="pt-5 text-red-500">{imgErrorMsg}</div>
      ) : null}

      <Form {...ProfileForm}>
        <form
          onSubmit={ProfileForm.handleSubmit(profileSubmit)}
          onChange={reset}
        >
          <FormField
            control={ProfileForm.control}
            name="name"
            render={({ field: { value, onChange } }) => (
              <FormItem className="pt-10 pb-5">
                <FormLabel className="text-gray-400">이름</FormLabel>
                <FormControl>
                  <Input type="text" value={value} onChange={onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormLabel className="text-gray-400">휴대전화</FormLabel>
          <Input
            className="mt-2"
            type="text"
            defaultValue={phone !== '' ? phone : '010-0000-0000'}
          />
          <FormField
            control={ProfileForm.control}
            name="email"
            render={({ field: { value, onChange } }) => (
              <FormItem className="py-5">
                <FormLabel className="text-gray-400">이메일</FormLabel>
                <FormControl>
                  <Input type="text" value={value} onChange={onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormLabel className="text-gray-400">생년월일</FormLabel>
          <Input
            className="mt-2 mb-5"
            type="text"
            defaultValue={birth !== '' ? birth : '2000.01.10'}
          />

          <FormLabel className="text-gray-400">성별</FormLabel>
          <div className="w-full flex justify-between pt-2">
            <div className="flex items-center">
              <input
                className="w-5 h-5 mr-3 cursor-pointer"
                type="radio"
                value="남성"
                onClick={() => setGender('남성')}
                checked={gender === '남성' ? true : false}
              />
              <div>남성</div>
            </div>
            <div className="flex items-center">
              <input
                className="w-5 h-5 mr-3 cursor-pointer"
                type="radio"
                value="여성"
                onClick={() => setGender('여성')}
                checked={gender === '여성' ? true : false}
              />
              <div>여성</div>
            </div>
            <div />
          </div>

          <Button type="submit" className="w-full mt-10 rounded-full sm:mt-20">
            수정하기
          </Button>
          {warning ? (
            <div className="text-red-500 text-center pt-5 font-bold">
              다시 시도해주십시오.
            </div>
          ) : null}
        </form>
      </Form>
    </div>
  );
}
