import type { Metadata } from "next";
import AboutPage from "@/components/about-page";

export const metadata: Metadata = {
  title: "عني | عبدالله الشريف",
  description: "تعرف على عبدالله الشريف - مطور واجهات أمامية ومهندس برمجيات",
};

export default function About() {
  return <AboutPage />;
}