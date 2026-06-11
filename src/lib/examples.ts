export interface Citation {
  id: string;
  type: "book" | "journal" | "web" | "report" | "chapter";
  title: string;
  authors: string[];
  year: number;
  journal?: string;
  publisher?: string;
  city?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  url?: string;
  accessed?: string;
  editors?: string[];
  booktitle?: string;
  institution?: string;
}

export const exampleCitations: Citation[] = [
  {
    id: "smith2023",
    type: "journal",
    title: "Attention is all you need, revisited",
    authors: ["Smith, A.", "Chen, B."],
    year: 2023,
    journal: "Journal of Machine Learning Research",
    volume: "24",
    issue: "3",
    pages: "1127-1148",
    doi: "10.1234/jmlr.2023.0241127",
  },
  {
    id: "okonkwo2019",
    type: "book",
    title: "Lagos at night: a cultural history",
    authors: ["Okonkwo, Chinua"],
    year: 2019,
    publisher: "Fourth Dimension Press",
    city: "Enugu",
  },
  {
    id: "who2022",
    type: "report",
    title: "Global tuberculosis report 2022",
    authors: ["World Health Organization"],
    year: 2022,
    institution: "World Health Organization",
    url: "https://www.who.int/publications/i/item/9789240061729",
  },
  {
    id: "lee2020alpha",
    type: "journal",
    title: "Alpha: distributed training at scale",
    authors: ["Lee, M."],
    year: 2020,
    journal: "ML Systems",
    volume: "4",
    pages: "1-14",
  },
  {
    id: "lee2020beta",
    type: "journal",
    title: "Beta: failure modes in large batches",
    authors: ["Lee, M."],
    year: 2020,
    journal: "Proc. NeurIPS Workshops",
    pages: "90-93",
  },
];

export const exampleManuscript = `The transformer architecture [CITE:smith2023] has displaced earlier recurrent approaches in most sequence-modelling benchmarks.

A historical perspective on urban Nigeria is offered by [CITE:okonkwo2019], whose ethnographic work grounds the discussion in lived experience.

Public-health policy in low- and middle-income countries continues to rely on annual surveillance reports [CITE:who2022].

Adjacent placeholders merge into one in-text group [CITE:smith2023][CITE:okonkwo2019]. Per-citation modifiers add a page or narrative form, e.g. [CITE:smith2023|narrative|p=12].

Same author, same year, different papers get letter suffixes in APA/Chicago/Harvard [CITE:lee2020alpha][CITE:lee2020beta].`;

export const formatOptions: ReadonlyArray<{ value: string; label: string }> = [
  { value: "apa", label: "APA 7" },
  { value: "ieee", label: "IEEE" },
  { value: "chicago", label: "Chicago" },
  { value: "mla", label: "MLA 9" },
  { value: "vancouver", label: "Vancouver" },
  { value: "harvard", label: "Harvard" },
];
