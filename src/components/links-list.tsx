import React from "react";
import { ListItem } from "./list-item";

export const LinksList = () => {
  const links = [
    {
      id: 1,
      title: "Facebook",
      subtitle: "https://facebook.com",
      href: "https://facebook.com",
      updated: "1 min",
      icon: "/icons/link.png",
    },
    {
      id: 2,
      title: "Twitter",
      subtitle: "https://twitter.com",
      href: "https://twitter.com",
      updated: "12 min",
      icon: "/icons/link.png",
    },
    {
      id: 3,
      title: "Instagram",
      subtitle: "https://instagram.com",
      href: "https://instagram.com",
      updated: "2 days",
      icon: "/icons/link.png",
    },
    {
      id: 4,
      title: "TikTok",
      subtitle: "https://tiktok.com",
      href: "https://tiktok.com",
      updated: "1 week",
      icon: "/icons/link.png",
    },
    {
      id: 5,
      title: "YouTube",
      subtitle: "https://youtube.com",
      href: "https://youtube.com",
      updated: "1 week",
      icon: "/icons/link.png",
    },
    {
      id: 6,
      title: "LinkedIn",
      subtitle: "https://linkedin.com",
      href: "https://linkedin.com",
      updated: "1 month",
      icon: "/icons/link.png",
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <ListItem key={`link-${link.id}-${link.title}`} {...link} />
      ))}
    </div>
  );
};
