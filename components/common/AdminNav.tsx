import Link from "next/link";
import { FC, useEffect, useRef, useState } from "react";
import Logo from "./Logo";

import { IconType } from "react-icons";
import { RiMenuFoldLine, RiMenuUnfoldFill } from "react-icons/ri";

interface Props {
  navItems: { label: string; icon: IconType; href: string }[];
}

const NAV_OPEN_WIDTH = "w-60";
const NAV_CLOSE_WIDTH = "w-12";
const NAV_VISIBILITY = "nav-visibility";

const AdminNav: FC<Props> = ({ navItems }): JSX.Element => {
  const navRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);

  const toggleNav = (visibility: boolean) => {
    const currentNav = navRef.current;
    if (!currentNav) return;

    const { classList } = currentNav;
    if (visibility) {
      // hide our nav
      classList.remove(NAV_OPEN_WIDTH);
      classList.add(NAV_CLOSE_WIDTH);
    } else {
      // show our nav
      classList.add(NAV_OPEN_WIDTH);
      classList.remove(NAV_CLOSE_WIDTH);
    }
  };

  const updateNavState = () => {
    toggleNav(visible);
    const newState = !visible;
    setVisible(newState);
    localStorage.setItem(NAV_VISIBILITY, JSON.stringify(newState));
  };

  useEffect(() => {
    const navState = localStorage.getItem(NAV_VISIBILITY);
    if (navState !== null) {
      const newState = JSON.parse(navState);
      setVisible(newState);
      toggleNav(!newState);
    } else {
      setVisible(true);
    }
  }, []);

  return (
    <nav
      ref={navRef}
      className="h-screen w-60 shadow-sm bg-secondary-light dark:bg-secondary-dark flex flex-col justify-between transition-width overflow-hidden sticky top-0 "
    >
      <div>
        {/* logo */}
        <Link href="/admin" className="flex items-center space-x-2 p-3 mb-10">
          <Logo className="dark:fill-highlight-dark fill-highlight-light w-5 h-5 transition" />
          {visible && (
            <span className="leading-none dark:text-highlight-dark text-highlight-light text-xl font-semibold ">
              Admin
            </span>
          )}
        </Link>

        {/* nav items */}
        <div className="space-y-6">
          {navItems.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center dark:text-highlight-dark text-highlight-light text-xl p-3 hover:scale-[0.98] transition"
              >
                <item.icon size={24} />
                {visible && (
                  <span className="ml-2 leading-none">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* nav toggler (button) */}
      <button
        onClick={updateNavState}
        className="dark:text-highlight-dark text-highlight-light p-3 hover:scale-[0.98] transition self-end"
      >
        {visible ? (
          <RiMenuFoldLine size={25} />
        ) : (
          <RiMenuUnfoldFill size={25} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
