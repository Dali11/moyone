import {
  BookOpen,
  ChartNoAxesColumnIncreasing,
  HeartPulse,
  Leaf,
  Sprout,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Program = {
  slug: string;
  title: string;
  text: string;
  activities: string[];
  icon: LucideIcon;
  image: string;
  alt: string;
  badge: string;
};

export const programs: Program[] = [
  {
    slug: "education",
    title: "Education & Skills Development",
    text: "Back-to-school support, career guidance and advocacy for learners.",
    activities: ["Back-to-school campaigns and school-material support", "Career guidance for young people", "Advocacy addressing school dropouts and early or child marriages"],
    icon: BookOpen,
    image: "/images/programs/education.webp",
    alt: "Illustrative scene of students studying together",
    badge: "bg-emerald-700",
  },
  {
    slug: "health-and-wellbeing",
    title: "Health & Sanitation",
    text: "Health awareness, hygiene, safe-water and reproductive-health education.",
    activities: ["Cholera awareness and hygiene promotion", "Safe-water education", "Reproductive-health education", "Mental-health training for youth leaders"],
    icon: HeartPulse,
    image: "/images/projects/health-sanitation-concept.png",
    alt: "Illustrative concept: a health educator demonstrates handwashing",
    badge: "bg-rose-600",
  },
  {
    slug: "agriculture",
    title: "Agriculture & Livelihoods",
    text: "Climate-smart farming, youth agribusiness and the Moyone Farm demonstration.",
    activities: ["Climate-smart agriculture", "Youth-led agribusiness initiatives", "Moyone Farm, established in 2024, as a sustainable agriculture demonstration"],
    icon: Sprout,
    image: "/images/programs/agriculture.webp",
    alt: "Illustrative scene of young farmers tending crops",
    badge: "bg-emerald-800",
  },
  {
    slug: "environment",
    title: "Environment",
    text: "Environmental conservation awareness and sustainable agriculture practices.",
    activities: ["Environmental conservation awareness", "Climate-smart farming practices", "Sustainable agricultural demonstration models"],
    icon: Leaf,
    image: "/images/programs/environment.webp",
    alt: "Illustrative scene of young people planting a tree",
    badge: "bg-emerald-600",
  },
  {
    slug: "youth-empowerment",
    title: "Youth Empowerment",
    text: "Leadership development, civic education, mentorship and community action.",
    activities: ["Leadership development and financial literacy", "Civic education and social-accountability initiatives", "Mentorship and peer-led community action", "Sports-based awareness activities"],
    icon: Users,
    image: "/images/programs/youth-empowerment.webp",
    alt: "Illustrative youth leadership workshop",
    badge: "bg-emerald-700",
  },
  {
    slug: "entrepreneurship",
    title: "Entrepreneurship",
    text: "Entrepreneurship training, business incubation and youth-led income opportunities.",
    activities: ["Entrepreneurship and business training", "Business incubation and innovation support", "Vocational skills and financial literacy", "Youth-led agribusiness initiatives"],
    icon: ChartNoAxesColumnIncreasing,
    image: "/images/programs/entrepreneurship.webp",
    alt: "Illustrative young entrepreneur at a market stall",
    badge: "bg-emerald-700",
  },
];
