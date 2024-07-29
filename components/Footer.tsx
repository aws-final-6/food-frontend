import React from "react";
import { Link } from "@nextui-org/link";
const Footer = () => {
  return (
    <footer className="w-full bg-slate-700">
      <div className="sm:py-8 grid grid-cols-1 sm:grid-cols-5 gap-5 mx-auto px-10">
        <div className=" sm:col-span-2 flex flex-col sm:p-4 py-8 text-white gap-4">
          <h1 className="text-xl font-jua">냠냠박사</h1>
          <p className="text-lg text-justify leading-7">
            해당 프로젝트는 AWS CLoud School 4기에서 진행한 교육용 최종
            프로젝트입니다.
          </p>
          <p className="font-bold">사업적 목적이 없음을 알립니다.</p>
          <p>
            또한 각 레시피의 저작권은 만개의 레시피와 개인에게 있음을 알립니다.
          </p>
        </div>

        <div className="hidden sm:flex sm:flex-col col-span-1 py-4 text-white">
          <h3 className="text-lg ml-2">AWS Cloud School 4기</h3>
          <div className="h-1 w-20 bg-orange-500 my-2"></div>
          <ul className="flex flex-col gap-2 ml-2">
            <li>
              <Link
                href="https://www.spoid.shop/"
                className="text-white hover:text-orange-500 transition duration-300"
              >
                SPOID
              </Link>
            </li>

            <li>
              <Link
                href="https://www.interviewmaster.store/"
                className="text-white hover:text-orange-500 transition duration-300"
              >
                Interview Master
              </Link>
            </li>
            <li>
              <Link
                href="https://awscloudschool.online/"
                className="text-white hover:text-orange-500 transition duration-300"
              >
                DAPANDA
              </Link>
            </li>
            <li>
              <Link
                href="https://quickcatch.store/"
                className="text-white hover:text-orange-500 transition duration-300"
              >
                QuickCatch
              </Link>
            </li>
            <li>
              <Link
                href="https://placeholder-web.shop/"
                className="text-white hover:text-orange-500 transition duration-300"
              >
                PlaceHolder
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden sm:flex sm:flex-col col-span-1 py-4 text-white">
          <h3 className="text-lg ml-2">Sponsored by</h3>
          <div className="border1 h-1 w-20 bg-orange-500 my-2"></div>
          <ul className="flex flex-col gap-2 ml-2">
            <li>
              <Link
                href="https://www.rapa.or.kr/"
                isExternal
                className="hover:text-orange-500 transition duration-300 text-white"
              >
                RAPA 한국전파진흥협회
              </Link>
            </li>
            <li>
              <Link
                href="https://aws.amazon.com/"
                isExternal
                className="hover:text-orange-500 transition duration-300 text-white"
              >
                Amazon Web Service Korea
              </Link>
            </li>
            <li>
              <Link
                href="http://dshub.cloud/"
                isExternal
                className="hover:text-orange-500 transition duration-300 text-white"
              >
                DSHub
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden sm:flex sm:flex-col col-span-1 py-4 text-white">
          <h3 className="text-lg ml-2">Contact us</h3>
          <div className="border1 h-1 w-20 bg-orange-500 my-2" />
          <ul className="flex flex-col gap-2 ml-2">
            <li>서울 서초구 반포대로24길 17 2층</li>
            <li>02-317-6000 </li>
            <li>book.mylittlerecipes@gmail.com</li>
            <li>
              <Link
                href="https://github.com/aws-final-6"
                className="text-white"
              >
                GitHub
              </Link>
            </li>
          </ul>
          {/* <div className="social-media text-center text-white text-2xl mt-4">
            <a href="#" className="mx-2">
              <i className="fab fa-instagram transition-transform duration-500 hover:scale-150"></i>
            </a>
            <a href="#" className="mx-2">
              <i className="fab fa-facebook transition-transform duration-500 hover:scale-150"></i>
            </a>
            <a href="#" className="mx-2">
              <i className="fab fa-google-plus-square transition-transform duration-500 hover:scale-150"></i>
            </a>
          </div> */}
        </div>
      </div>
      {/* <div className="footer-bottom py-2 bg-slate-700 text-white text-center text-xs">
        Copyright @2024 Team 냠냠박사
      </div> */}
    </footer>
  );
};

export default Footer;
