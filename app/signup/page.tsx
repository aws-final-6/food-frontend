"use client";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import React, {
  FormEvent,
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Chip } from "@nextui-org/chip";
import clsx from "clsx";
import { UserContext } from "@/providers/userProvider";
import { SignupAPI } from "./action";
import { notFound, useRouter } from "next/navigation";
import { cate_tags, situ_tags } from "@/components/tagData";

const SignUppage = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [cateTag, setCateTag] = useState<number | null>(null);
  const [situTag, setSituTag] = useState<number | null>(null);
  const [subscribe, setSubscribe] = useState(false);
  const { userData } = useContext(UserContext);
  const router = useRouter();

  useLayoutEffect(() => {
    if (userData.length === 0) {
      notFound();
    }
  }, []);

  async function hanldeSignupButton(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    formdata.append("subscription", subscribe.toString());
    if (cateTag) formdata.append("prefer_cate", cateTag.toString());
    if (situTag) formdata.append("prefer_situ", situTag.toString());

    formdata.append("id", userData[0].id);
    formdata.append("provider", userData[0].provider);
    formdata.append("access_token", userData[0].accessToken);
    const data = await SignupAPI(formdata);
    if (data === 201) router.push("/");
  }

  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="p-5 md:w-1/3">
        <CardHeader className="flex flex-col gap-5">
          <Image
            src={
              theme === "light" || theme == null
                ? "/logo_light.png"
                : "/logo_dark.png"
            }
            alt="Logo"
            width={200}
            height={50}
          />
          <h1 className="font-jua text-xl">회원가입</h1>
        </CardHeader>
        <form onSubmit={hanldeSignupButton}>
          <CardBody className="flex flex-col gap-10">
            <Input
              type="email"
              name="email"
              label="이메일"
              w-full
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
            />
            <Input
              type="text"
              label="닉네임"
              name="nickname"
              w-full
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              isRequired
            />
            <div>
              <p className="font-jua">Q. 주로 어떤 요리를 하시나요?</p>
              <div className="pt-2">
                {cate_tags.map((tag, i) => (
                  <Chip
                    key={tag.id}
                    className={clsx(
                      "m-1 hover:bg-orange-500 dark:text-subdark",
                      {
                        "bg-orange-900": cateTag === tag.id,
                        "text-white dark:text-white": cateTag === tag.id,
                        "bg-main": cateTag !== tag.id,
                      }
                    )}
                    onClick={() => setCateTag(tag.id)}
                  >
                    {tag.label}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <p className="font-jua">Q. 주로 어떤 목적으로 요리를 하시나요?</p>
              <div className="pt-2">
                {situ_tags.map((tag, i) => (
                  <Chip
                    key={tag.id}
                    className={clsx(
                      "m-1 hover:bg-yellow-500 dark:text-subdark",
                      {
                        "bg-yellow-700": situTag === tag.id,
                        "text-white dark:text-white": situTag === tag.id,
                        "bg-sub": situTag !== tag.id,
                      }
                    )}
                    onClick={() => setSituTag(tag.id)}
                  >
                    {tag.label}
                  </Chip>
                ))}
              </div>
            </div>
          </CardBody>
          <CardFooter className="flex flex-col justify-center items-center py-10 gap-5">
            <Checkbox
              onChange={() => setSubscribe(!subscribe)}
              isSelected={subscribe}
            >
              <p className="text-sm">
                최신 레시피 정보를 이메일 또는 카카오톡으로 받겠습니다.
              </p>
            </Checkbox>
            <Button
              className="bg-subdark w-1/4 text-white"
              variant="flat"
              size="lg"
              type="submit"
            >
              회원가입
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUppage;
