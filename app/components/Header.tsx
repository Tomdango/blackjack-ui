import clsx from "clsx";
import type { HTMLProps } from "react";

type HeaderProps = HTMLProps<HTMLDivElement>;

interface IHeader extends React.FC<HeaderProps> {
  Title: typeof HeaderTitle;
  Nav: typeof HeaderNav;
  NavItem: typeof HeaderNavItem;
}

const Header: IHeader = ({ children, className, ...rest }) => (
  <div className={clsx("bl-header", className)} {...rest}>
    <div className="bl-header__container">{children}</div>
  </div>
);

const HeaderTitle: React.FC<HTMLProps<HTMLHeadingElement>> = ({
  children,
  className,
  ...rest
}) => (
  <h1 className={clsx("bl-header__title", className)} {...rest}>
    {children}
  </h1>
);
HeaderTitle.displayName = "Header.Title";

const HeaderNav: React.FC<HTMLProps<HTMLElement>> = ({
  children,
  className,
}) => (
  <nav>
    <ul className={clsx("bl-header__nav", className)}>{children}</ul>
  </nav>
);
HeaderNav.displayName = "Header.Nav";

type HeaderNavItemProps = Omit<HTMLProps<HTMLButtonElement>, "type">;
const HeaderNavItem: React.FC<HeaderNavItemProps> = ({
  className,
  children,
  ...rest
}) => (
  <li className={"bl-header__nav-item"}>
    <button className={clsx("bl-header__button", className)} {...rest}>
      {children}
    </button>
  </li>
);
HeaderNavItem.displayName = "Header.NavItem";

Header.Title = HeaderTitle;
Header.Nav = HeaderNav;
Header.NavItem = HeaderNavItem;

export default Header;
