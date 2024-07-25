"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { getMyPage, updateMypage } from "./action";
import { FormEvent, useContext, useEffect, useState } from "react";
import { UserContext } from "@/providers/userProvider";
import clsx from "clsx";
import MyPageBookmark from "@/components/Bookmark/MyPageBookmark";
import { situ_tags, cate_tags } from "@/components/tagData";
import { Checkbox } from "@nextui-org/checkbox";
import { useAlert } from "@/components/Alert";

interface IUser {
  user_id: string;
  user_email: string;
  user_nickname: string;
  user_subscription: boolean;
  user_prefer: [
    {
      cate_no: number;
      situ_no: number;
    },
  ];
  user_searchfilter: string[];
}

export default function MyPage() {
  const { userData, updateUserData } = useContext(UserContext);
  const [data, setData] = useState<IUser | null>(null);
  const [nickname, setNickname] = useState("");
  const [cateTag, setCateTag] = useState<number | null>(null);
  const [situTag, setSituTag] = useState<number | null>(null);
  const [subscribe, setSubscribe] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const { showAlert, AlertComponent } = useAlert();

  useEffect(() => {
    const fetchData = async () => {
      if (userData && userData.nickname) {
        const result = await getMyPage(userData.id, userData.accessToken);
        setData(result);
        setNickname(result.user_nickname);
        setCateTag(result.user_prefer[0].cate_no);
        setSituTag(result.user_prefer[0].situ_no);
        setSubscribe(result.user_subscription);
      }
    };
    fetchData();
  }, [userData]);

  useEffect(() => {
    if (data) {
      setIsChanged(
        nickname !== data.user_nickname ||
          cateTag !== data.user_prefer[0].cate_no ||
          situTag !== data.user_prefer[0].situ_no ||
          subscribe !== data.user_subscription
      );
    }
  }, [nickname, cateTag, situTag, subscribe, data]);

  async function hanldeUpdateButton(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    if (userData && userData.nickname) {
      if (cateTag) formdata.append("prefer_one", cateTag.toString());
      if (situTag) formdata.append("prefer_two", situTag.toString());
      formdata.append("accessToken", userData.accessToken);
      formdata.append("id", userData.id);
      formdata.append("provider", userData.provider);
      formdata.append("subscription", subscribe.toString());
      const res = await updateMypage(formdata);
      if (cateTag && situTag)
        updateUserData({
          nickname: nickname,
          situ_no: situTag,
          cate_no: cateTag,
        });
      showAlert("마이페이지", res);
    }
  }

  if (!data) return <div className="min-h-[600px]">Loading...</div>;

  return (
    <div>
      <Card className="p-10">
        <CardHeader className="font-jua text-4xl text-center items-center justify-center">
          마이 페이지
        </CardHeader>
        <form onSubmit={hanldeUpdateButton}>
          <CardBody className="flex flex-col gap-5">
            <Input label="이메일" value={data.user_email} isDisabled />
            <Input
              label="닉네임"
              name="nickname"
              maxLength={15}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <div>
              <p className="font-jua">Q. 주로 어떤 요리를 하시나요?</p>
              <div className="pt-2">
                {cate_tags.map((tag, i) => (
                  <Chip
                    key={tag.id}
                    className={clsx(
                      "m-1 hover:bg-orange-500 dark:text-subdark cursor-pointer",
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
                      "m-1 hover:bg-yellow-500 cursor-pointer dark:text-subdark",
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
            <p className="font-jua">즐겨찾기</p>
            <MyPageBookmark callPosition="myPage" />

            <p className="font-jua">구독</p>
            <Checkbox
              onChange={() => setSubscribe(!subscribe)}
              isSelected={subscribe}
            >
              <p className="text-sm">최신 레시피 정보를 이메일로 받겠습니다.</p>
            </Checkbox>
            <Button type="submit" className="bg-sub" isDisabled={!isChanged}>
              저장
            </Button>
          </CardBody>
        </form>
      </Card>
      <AlertComponent />
    </div>
  );
}
