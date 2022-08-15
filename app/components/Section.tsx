import clsx from "clsx";
import type { HTMLProps } from "react";
import React from "react";

interface SectionProps extends HTMLProps<HTMLDivElement> {
  inline?: boolean;
}

interface ISection extends React.FC<SectionProps> {
  Title: typeof SectionTitle;
}

const Section: ISection = ({ className, inline, ...rest }) => (
  <div
    className={clsx("bl-section", inline && "bl-section--inline", className)}
    {...rest}
  />
);

type WithComponent<P> = P & { Component?: React.ElementType };

const SectionTitle: React.FC<WithComponent<HTMLProps<HTMLHeadingElement>>> = ({
  className,
  Component = "h2",
  ...rest
}) => <Component className={clsx("bl-section__title", className)} {...rest} />;
SectionTitle.displayName = "Section.Title";

Section.Title = SectionTitle;

export default Section;
