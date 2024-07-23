"use client";
import React, { useContext, useEffect, useState } from "react";

import { subtitle } from "../primitives";
import { Button } from "@nextui-org/button";
import { getCateList, getPrefered, getSituList } from "./action";
import { UserContext } from "@/providers/userProvider";
import Link from "next/link";
import CardCarousel from "./CardCarousel";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Chip } from "@nextui-org/chip";
import { getCateLabel, getSituLabel } from "../tagData";

interface IRecipe {
  recipe_id: number;
  recipe_title: string;
  recipe_thumbnail: string;
  cate_no: number;
  situ_no: number;
}

const UserRecommend: React.FC = () => {
  const { userData } = useContext(UserContext);
  const [data, setData] = useState<IRecipe[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cateNo, setCateNo] = useState(() => (userData ? userData.cate_no : 0));
  const [situNo, setSituNo] = useState(() => (userData ? userData.situ_no : 0));
  const [situData, setSituData] = useState<IRecipe[] | null>(null);
  const [cateData, setCateData] = useState<IRecipe[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData && userData.nickname) {
          setIsLoading(true);
          const { data: result, statusCode } = await getPrefered(
            userData.id,
            userData.accessToken
          );
          if (statusCode === 200 && result) {
            setData(result);
          } else {
            setError("Failed to fetch the preferred recipes.");
          }
        }
      } catch (err) {
        setError("An error occurred while fetching the data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userData]);

  useEffect(() => {
    const fetchSituData = async () => {
      try {
        if (userData && userData.nickname) {
          setIsLoading(true);
          const { data, statusCode } = await getSituList(situNo);
          setSituData(data);
        }
      } catch (err) {
        setError("An error occurred while fetching the data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSituData();
  }, [situNo]);

  useEffect(() => {
    const fetchCateData = async () => {
      try {
        if (userData && userData.nickname) {
          setIsLoading(true);
          const { data, statusCode } = await getCateList(cateNo);
          setCateData(data);
        }
      } catch (err) {
        setError("An error occurred while fetching the data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCateData();
  }, [cateNo]);

  if (!userData) {
    return (
      <div className="flex flex-col gap-3">
        <p className="font-jua">오늘의 요리를 보시려면 로그인해주세요!</p>
        <Link href="/login">
          <Button className="bg-sub w-full" size="lg">
            로그인
          </Button>
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!data || data.length === 0) {
    return <p>추천 레시피가 없습니다.</p>;
  }

  if (!cateData || cateData.length === 0) {
    return <p>추천 레시피가 없습니다.</p>;
  }

  if (!situData || situData.length === 0) {
    return <p>추천 레시피가 없습니다.</p>;
  }

  return (
    <>
      <h1 className={subtitle()}>오늘의 추천 레시피</h1>
      <div>
        <Tabs
          aria-label="Options"
          variant="underlined"
          className="mb-4"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0",
            cursor: "w-full bg-main",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:font-bold",
          }}
        >
          <Tab
            key="photos"
            title={
              <div className="flex items-center space-x-2">
                <span>
                  {getSituLabel(userData.situ_no)} +{" "}
                  {getCateLabel(userData.cate_no)}
                </span>
              </div>
            }
          >
            <CardCarousel data={data} cName="user_prefered" />
          </Tab>

          <Tab
            key="music"
            title={
              <div className="flex items-center space-x-2">
                <span>카테고리: {getCateLabel(cateNo)}</span>
              </div>
            }
          >
            <CardCarousel data={cateData} cName="user_cate" />
          </Tab>
          <Tab
            key="videos"
            title={
              <div className="flex items-center space-x-2">
                <span>상황별 메뉴: {getSituLabel(situNo)}</span>
              </div>
            }
          >
            <CardCarousel data={situData} cName="user_situ" />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default UserRecommend;
