'use client'; // App Router 사용 중이라면 클라이언트 컴포넌트 선언 필요

import Link from "next/link";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import styles from "./Header.module.css";
import ListSearch from "./ListSearch";


const Header = () => {
  return (
    <header className="header">
      <div className="flex top-0 left-0 z-50 justify-between items-center">
        <Link href="/">
          <div className="flex items-center m-5">
            <Image
              src="/picture_images/logo.png"
              alt="고펫 로고"
              width={55}
              height={20}
              priority
            />
            <h1 className="ml-5 text-3xl">고 펫</h1>
          </div>
        </Link>
        <ListSearch/>
        <FiMenu className="text-3xl m-5"/>
      </div>
    </header>
  );
};


export default Header;
