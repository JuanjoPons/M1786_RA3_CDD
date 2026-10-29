export interface ActivityPair {
  a: string;
  b: string;
  exp?: string;
}

export interface ActivityQuestion {
  q: string;
  ans: boolean | number;
  opts?: string[];
  exp?: string;
}

export interface ActivityItem {
  x: string;
  c?: number;
  exp?: string;
}

export interface ActivityDef {
  id: string;
  type: 'match' | 'tf' | 'mcq' | 'classify' | 'teacher';
  origin?: 'manual' | 'complementaria';
  time?: string;
  timeManual?: string;
  kind?: string;
  group?: string;
  mode?: string;
  ce?: string;
  title: string;
  instr?: string;
  pairs?: ActivityPair[];
  questions?: ActivityQuestion[];
  cats?: string[];
  items?: ActivityItem[];
  fields?: string[];
  rubric?: string[];
  solution?: string[];
  grid?: {
    cols: string[];
    rows: number;
  };
  block: string;
  ra?: string;
}

export interface InfographicItem {
  i?: string;
  s?: string;
  x: string;
  d?: string;
}

export interface InfographicData {
  type: 'cards' | 'tri' | 'compare' | 'steps' | 'chain' | 'key' | 'cycle';
  num?: boolean;
  title?: string;
  items?: InfographicItem[];
  cols?: Array<{
    i?: string;
    s?: string;
    x: string;
    items: string[][];
  }>;
  top?: { i?: string; s?: string; x: string; d?: string };
  left?: { i?: string; s?: string; x: string; d?: string };
  right?: { i?: string; s?: string; x: string; d?: string };
  center?: string;
  big?: string;
  x?: string;
  src?: string;
}

export interface ContentNode {
  t: 'p' | 'viz' | 'links' | 'list' | 'h3';
  x?: string | string[];
  v?: InfographicData;
  items?: Array<{ i?: string; x: string; d?: string; url?: string }>;
  k?: 'ul' | 'ol';
  l?: number;
}

export interface SectionDef {
  num: number;
  kind: 'intro' | 'theory' | 'selfcheck';
  title: string;
  nodes: ContentNode[];
  acts: string[];
  visuals?: InfographicData[];
}

export interface SessionBlock {
  id: string;
  ud: string;
  title: string;
  meta: {
    ra_fp: string;
  };
  cover: {
    signs: Array<[string, string, string]>;
    lead: string;
  };
  sections: SectionDef[];
  acts: ActivityDef[];
}

export interface StudentProfile {
  name: string;
  group: string;
  date: string;
  notes: string;
}

export interface ActivityState {
  resp?: any;
  checked?: boolean;
  attempts?: number;
  best?: { sc: number; mx: number };
  last?: { sc: number; mx: number; at: string; resp: any };
  text?: string[];
  grid?: string[][];
  status?: 'pend' | 'lliu' | 'rev';
  tGrade?: string;
  tComment?: string;
  tReviewed?: boolean;
}
