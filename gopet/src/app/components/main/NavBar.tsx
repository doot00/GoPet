import Link from "next/link";
import styles from "./NavBar.module.css";
import Image from "next/image";
const NavBar: React.FC = () => {
  return (
    <nav className="flex flex-wrap gap-4 p-4 bg-gray-100 text-center justify-center">
      <Link href="/hotel" className="w-1/5 min-w-[100px]">
        <div className={styles.nav_box}>
          <Image src="/picture_images/navmenu/hotel.png" alt="숙박 아이콘" width={110} height={20} className="border-10"/>
          <h2 className={styles.nav_font}>숙 박</h2>
        </div>
      </Link>
      <Link href="/cafe" className="w-1/5 min-w-[100px]">
        <div className={styles.nav_box}>
          <Image src="/picture_images/navmenu/cafe.png" alt="카페 아이콘" width={110} height={20} className="border-10
          "/>
          <h2 className={styles.nav_font}>카 페</h2>
        </div>
      </Link>
      <Link href="/food" className="w-1/5 min-w-[100px]">
        <div className={styles.nav_box}>
          <Image src="/picture_images/navmenu/food.png" alt="음식 아이콘" width={110} height={20} className="border-10
          "/>
          <h2 className={styles.nav_font}>음 식</h2>
        </div>
      </Link>
      <Link href="/park" className="w-1/5 min-w-[100px]">
        <div className={styles.nav_box}>
          <Image src="/picture_images/navmenu/park.png" alt="공원 아이콘" width={110} height={20} className="border-10
          "/>
          <h2 className={styles.nav_font}>공 원</h2>
        </div>
      </Link>
      <Link href="/experience" className="w-1/5 min-w-[100px]">
        <div className={styles.nav_box}>
          <Image src="/picture_images/navmenu/activity.png" alt="체험 아이콘" width={110} height={20} className="border-10
          "/>
          <h2 className={styles.nav_font}>체 험</h2>
        </div>
      </Link>
      <Link href="/shelter" className="w-1/5 min-w-[100px]">
        <div className={styles.nav_box}>
          <Image src="/picture_images/navmenu/shelter.png" alt="봉사/보호소 아이콘" width={110} height={20} className="border-10
          "/>
          <h2 className={styles.nav_font}>봉사 / 보호소</h2>
        </div>
      </Link>
      <Link href="/hospital" className="w-1/5 min-w-[100px]">
        <div className={styles.nav_box}>
          <Image src="/picture_images/navmenu/hospital.png" alt="병원 아이콘" width={110} height={20} className="border-10
          "/>
          <h2 className={styles.nav_font}>동물병원</h2>
        </div>
      </Link>
      <Link href="/festival" className="w-1/5 min-w-[100px]">
        <div className={styles.nav_box}>
          <Image src="/picture_images/navmenu/festival.png" alt="축제 아이콘" width={110} height={20} className="border-10
          "/>
          <h2 className={styles.nav_font}>축 제</h2>
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
