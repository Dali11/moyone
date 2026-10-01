export type CommunityStory = {
  slug: string;
  title: string;
  text: string;
  details: string[];
  image: string;
  alt: string;
  subject: string;
};

export const stories: CommunityStory[] = [
  {
    slug: "back-to-school-initiative",
    title: "Back to School Initiative",
    text: "We have supported more than 800 learners through our Back to School education initiative.",
    details: [
      "We support access to education through back-to-school campaigns and school materials.",
      "Our work also includes career guidance and advocacy to reduce school dropouts and address early and child marriage.",
      "From 2021 to 2025, we supported more than 800 learners through these activities.",
    ],
    image: "/images/projects/back-to-school-concept.png",
    alt: "Illustrative concept: a volunteer gives schoolbooks to learners",
    subject: "Education",
  },
  {
    slug: "health-and-sanitation-campaigns",
    title: "Health & Sanitation Campaigns",
    text: "We have reached more than 2,000 households through health and sanitation campaigns.",
    details: [
      "Our health activities include cholera awareness, hygiene promotion, safe-water education and reproductive-health education.",
      "We also provide mental-health training for youth leaders.",
      "From 2021 to 2025, we reached more than 2,000 households through health and sanitation campaigns.",
    ],
    image: "/images/projects/health-sanitation-concept.png",
    alt: "Illustrative concept: a health educator demonstrates handwashing",
    subject: "Health & Sanitation",
  },
  {
    slug: "youth-leadership-and-livelihoods",
    title: "Youth Leadership & Livelihoods",
    text: "We help young people build leadership, vocational and entrepreneurship skills for stronger livelihoods.",
    details: [
      "Our youth empowerment work includes leadership development, financial literacy, mentorship and peer-led community action.",
      "From 2021 to 2025, we reached more than 1,500 young people through leadership and vocational training and trained more than 300 in entrepreneurship and agribusiness.",
      "We established Moyone Farm in 2024 to demonstrate youth-led agribusiness.",
    ],
    image: "/images/projects/skills-entrepreneurship-concept.png",
    alt: "Illustrative concept: youth learn agribusiness skills in a market garden",
    subject: "Youth Empowerment",
  },
  {
    slug: "inclusion-and-civic-engagement",
    title: "Inclusion & Civic Engagement",
    text: "We work to make community life and decision-making more inclusive for young people.",
    details: [
      "We supported 15 persons with disabilities with mobility aids and health referrals.",
      "We use sports-based awareness to engage young people, reaching more than 1,000 between 2021 and 2025.",
      "Our civic engagement work includes citizen-rights awareness, public-participation education and social accountability.",
    ],
    image: "/images/projects/youth-inclusion-concept.png",
    alt: "Illustrative concept: young people, including a wheelchair user, take part in a civic discussion",
    subject: "Inclusion & Civic Engagement",
  },
];
