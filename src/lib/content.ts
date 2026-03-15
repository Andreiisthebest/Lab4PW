import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export interface HomepageContent {
  hero: {
    badge_en: string;
    badge_ro: string;
    title_en: string;
    title_ro: string;
    description_en: string;
    description_ro: string;
    video: string;
  };
  about: {
    heading_en: string;
    heading_ro: string;
    p1_en: string;
    p1_ro: string;
    p2_en: string;
    p2_ro: string;
    image: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    hours_en: string;
    hours_ro: string;
    map_embed_url: string;
  };
}

export interface ServiceItem {
  key: string;
  title_en: string;
  title_ro: string;
  cover: string;
  photos: Array<{ image: string }>;
  visible: boolean;
  order: number;
}

export interface TeamItem {
  name: string;
  role_en: string;
  role_ro: string;
  photo?: string;
  order: number;
}

export interface TestimonialItem {
  author: string;
  service_en: string;
  service_ro: string;
  quote_en: string;
  quote_ro: string;
  rating: number;
  order: number;
}

const contentRoot = path.join(process.cwd(), 'src', 'content');

function readYamlFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return yaml.load(raw) as T;
}

function readYamlCollection<T>(directoryName: string): T[] {
  const dir = path.join(contentRoot, directoryName);
  if (!fs.existsSync(dir)) return [];

  const files = fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.yml') || name.endsWith('.yaml'));

  return files.map((name) => readYamlFile<T>(path.join(dir, name)));
}

export function getHomepageContent(): HomepageContent {
  return readYamlFile<HomepageContent>(path.join(contentRoot, 'homepage.yml'));
}

export function getServices(): ServiceItem[] {
  return readYamlCollection<ServiceItem>('services')
    .filter((item) => item.visible)
    .sort((a, b) => a.order - b.order);
}

export function getTeam(): TeamItem[] {
  return readYamlCollection<TeamItem>('team').sort((a, b) => a.order - b.order);
}

export function getTestimonials(): TestimonialItem[] {
  return readYamlCollection<TestimonialItem>('testimonials').sort((a, b) => a.order - b.order);
}
