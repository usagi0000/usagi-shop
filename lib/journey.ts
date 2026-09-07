export type JourneySize = "large" | "medium" | "small";

export type JourneyWork = {
  slug: string;
  src: string;
  title: string;
  category: string;
  description: string;
  dateLabel?: string;
  badge?: "Sketch" | "Character Study" | "In progress";
  size: JourneySize;
};

export type JourneySection = {
  id: string;
  heading: string;
  description?: string;
  tone?: "default" | "digital" | "sketch";
  works: JourneyWork[];
};

export const JOURNEY_SECTIONS: JourneySection[] = [
  {
    id: "beginning",
    heading: "The Beginning ♡",
    description:
      "Some of my earlier drawings — where I explored anime characters, expressions, poses and storytelling through traditional drawing.",
    works: [
      {
        slug: "noragami-yato",
        src: "/images/blog/20190320_022944.jpg",
        title: "Noragami fan art",
        category: "Traditional Art · Marker",
        dateLabel: "March 2019",
        description: "A multi-scene marker page with character close-ups, small insets, and handwritten notes.",
        size: "large",
      },
      {
        slug: "dragon-maid-page",
        src: "/images/blog/large-scan.png",
        title: "Dragon Maid sketches",
        category: "Traditional Art · Marker",
        dateLabel: "April 2020",
        description: "A sketchbook page with a full-color flying figure above a small character group.",
        size: "large",
      },
    ],
  },
  {
    id: "characters",
    heading: "Characters I Loved Drawing",
    description:
      "Anime and manga-inspired characters have always been a big part of my art. I loved experimenting with expressions, outfits, poses and different personalities.",
    works: [
      {
        slug: "haikyuu-tsukishima",
        src: "/images/blog/20210822_234739.jpg",
        title: "Haikyuu character studies",
        category: "Traditional Art · Ink",
        dateLabel: "August 2021",
        badge: "Character Study",
        description: "Three ink studies of Kei Tsukishima on one sketchbook page, including a profile and a close-up.",
        size: "large",
      },
      {
        slug: "konosuba-party",
        src: "/images/blog/ig-649643936.jpg",
        title: "KonoSuba party",
        category: "Traditional Art · Marker",
        description: "A close group illustration of Kazuma, Aqua, Megumin, and Darkness.",
        size: "medium",
      },
      {
        slug: "character-pair",
        src: "/images/blog/20230701_154744.jpg",
        title: "Character pair",
        category: "Traditional Art · Marker",
        dateLabel: "July 2023",
        description: "Two characters in matching school uniforms, drawn with ink outlines and marker colour.",
        size: "medium",
      },
    ],
  },
  {
    id: "big-pages",
    heading: "Big Pages & Fan Art ♡",
    description: "Some drawings became much bigger projects, bringing several characters together on one page.",
    works: [
      {
        slug: "naruto-in-progress",
        src: "/images/blog/20210904_160901.jpg",
        title: "Naruto page",
        category: "Traditional Art · Pencil & Ink",
        dateLabel: "September 2021",
        badge: "In progress",
        description: "A large multi-character composition with finished ink next to light pencil underdrawing.",
        size: "large",
      },
      {
        slug: "naruto-inking",
        src: "/images/blog/20210904_211256.jpg",
        title: "Naruto page, later the same day",
        category: "Traditional Art · Pencil & Ink",
        dateLabel: "September 2021",
        badge: "In progress",
        description: "The same Naruto sketchbook page after more of the linework was inked.",
        size: "large",
      },
      {
        slug: "naruto-composition",
        src: "/images/blog/ig-661572280.jpg",
        title: "Naruto character composition",
        category: "Traditional Art · Ink",
        description: "A full black-and-white page gathering many Naruto characters in one village scene.",
        size: "large",
      },
      {
        slug: "mha-fantasy-pages",
        src: "/images/blog/20200620_012036.jpg",
        title: "Fantasy character pages",
        category: "Traditional Art · Marker",
        dateLabel: "June 2020",
        description: "Two My Hero Academia drawings on the desk: a small character line-up and a larger battle scene.",
        size: "large",
      },
      {
        slug: "haikyuu-action",
        src: "/images/blog/20221104_141548.jpg",
        title: "Haikyuu fan art",
        category: "Traditional Art · Ink & Marker",
        dateLabel: "November 2022",
        description: "Hinata and Kageyama in a dynamic spike, with ink hatching and a red background mark.",
        size: "large",
      },
    ],
  },
  {
    id: "color",
    heading: "Finding My Colors",
    description:
      "I started experimenting more with color, markers, watercolor and stronger palettes, giving each illustration its own atmosphere.",
    works: [
      {
        slug: "josuke-illustration",
        src: "/images/blog/20220616_195557.jpg",
        title: "Character illustration",
        category: "Traditional Art · Marker",
        dateLabel: "June 2022",
        description: "A marker portrait with a strong palette and high-contrast shading.",
        size: "medium",
      },
      {
        slug: "hanako-and-nene",
        src: "/images/blog/20221002_004542.jpg",
        title: "Hanako-kun & Nene",
        category: "Traditional Art · Marker",
        dateLabel: "September 2022",
        description: "Hanako-kun and Nene Yashiro, drawn with markers against a deep purple ground.",
        size: "medium",
      },
      {
        slug: "rudeus-and-cat",
        src: "/images/blog/ig-655591697.webp",
        title: "Mushoku Tensei illustration",
        category: "Traditional Art · Marker",
        description: "Rudeus Greyrat in profile, holding a small cat, with hand-lettered series title.",
        size: "medium",
      },
    ],
  },
  {
    id: "details",
    heading: "Little Details ♡",
    description: "Pencil sketches, line art, cats, and smaller studies — the quieter pages from the sketchbook.",
    tone: "sketch",
    works: [
      {
        slug: "uniform-study",
        src: "/images/blog/20200316_224203.jpg",
        title: "Character study",
        category: "Traditional Art · Pencil",
        dateLabel: "March 2020",
        badge: "Character Study",
        description: "A pencil portrait focusing on expression and a high-collared uniform.",
        size: "small",
      },
      {
        slug: "ink-portrait",
        src: "/images/blog/20200512_164938.jpg",
        title: "Ink portrait",
        category: "Traditional Art · Ink",
        dateLabel: "May 2020",
        badge: "Sketch",
        description: "Clean ink line art of an anime character, drawn on sketchbook paper.",
        size: "small",
      },
      {
        slug: "cat-studies",
        src: "/images/blog/20220725_113738.jpg",
        title: "Cat studies",
        category: "Traditional Art · Marker",
        dateLabel: "July 2022",
        badge: "Character Study",
        description: "Two cat heads on a sketchbook page, drawn with markers.",
        size: "medium",
      },
    ],
  },
  {
    id: "painted",
    heading: "Painted Worlds",
    works: [
      {
        slug: "witch-in-the-forest",
        src: "/images/blog/20211022_014024.jpg",
        title: "Witch in the forest",
        category: "Traditional Painting",
        dateLabel: "October 2021",
        description: "A seated witch in a forest, painted in a spiral sketchbook with a pond, staff, and small lights.",
        size: "large",
      },
      {
        slug: "mushoku-tensei-field",
        src: "/images/blog/20220402_162005.jpg",
        title: "Mushoku Tensei",
        category: "Traditional Painting",
        dateLabel: "April 2022",
        description: "Sylphiette, Roxy, and Rudeus in a golden field, with a watercolor landscape behind them.",
        size: "large",
      },
      {
        slug: "koi-and-black-cat",
        src: "/images/blog/20220721_022831.jpg",
        title: "Koi & Black Cat",
        category: "Traditional Painting",
        dateLabel: "July 2022",
        description: "A quiet study combining koi fish and a black cat in a simple, atmospheric composition.",
        size: "large",
      },
    ],
  },
  {
    id: "digital",
    heading: "From Paper to Digital ♡",
    description:
      "Alongside traditional drawing and painting, I also explored digital illustration and different ways of rendering characters.",
    tone: "digital",
    works: [
      {
        slug: "choso",
        src: "/images/blog/choso.jpg",
        title: "Choso",
        category: "Digital illustration",
        description: "A digital portrait of Choso, with clean line work, grey hatching, and a red background.",
        size: "medium",
      },
      {
        slug: "frieren-and-himmel",
        src: "/images/blog/sousou-no-frieren.jpg",
        title: "Frieren & Himmel",
        category: "Digital illustration",
        description: "A digital illustration of Frieren and Himmel holding blue flowers on a pink ground.",
        size: "medium",
      },
    ],
  },
];

export const JOURNEY_WORKS: JourneyWork[] = JOURNEY_SECTIONS.flatMap((section) => section.works);

export function getJourneyWork(slug: string) {
  return JOURNEY_WORKS.find((work) => work.slug === slug);
}
