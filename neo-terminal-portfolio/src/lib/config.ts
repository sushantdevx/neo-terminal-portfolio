import { SiteConfig, NavItem } from "@/types";

export const siteConfig: SiteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "SK9712 Portfolio",
  description: "Developer-focused portfolio with terminal aesthetics",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  author: {
    name: "Sushant",
    email: "sushantkct@gmail.com",
    github: "https://github.com/SK9712",
    linkedin: "https://www.linkedin.com/in/sk9712",
    twitter: "https://x.com/caveman9712",
    medium: "https://medium.com/@SK9712",
  },
  version: "1.0.0",
  lastUpdated: new Date().toISOString().split("T")[0],
};

export const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Articles",
    href: "/articles",
  },
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const socialLinks = {
  github: siteConfig.author.github,
  linkedin: siteConfig.author.linkedin,
  twitter: siteConfig.author.twitter,
  medium: siteConfig.author.medium,
};