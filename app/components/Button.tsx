import clsx from "clsx";
import type { HTMLProps } from "react";

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
  theme?: "green" | "red";
}

interface IButton extends React.FC<ButtonProps> {
  Group: typeof ButtonGroup;
}

const Button: IButton = ({ className, theme, ...rest }) => (
  <button
    className={clsx("bl-button", theme && `bl-button--${theme}`, className)}
    {...rest}
  />
);
Button.defaultProps = {
  type: "button",
};

const ButtonGroup: React.FC<HTMLProps<HTMLDivElement>> = ({
  className,

  ...rest
}) => <div className={clsx("bl-button__group", className)} {...rest} />;
ButtonGroup.displayName = "Button.Group";

Button.Group = ButtonGroup;

export default Button;
