import { Lesson } from '../types';

const SHEET_ID = '1r4UEhDB27-5F23UbGx_SreFTODg114vQQOzjjm29Yjg';
const GID = '986104196';
const GOOGLE_SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

export const fetchLessons = async (): Promise<Lesson[]> => {
  const proxies = [
    (url: string) => url,
    (url: string) => `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
    (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`
  ];

  for (const getUrl of proxies) {
    try {
      const response = await fetch(getUrl(GOOGLE_SHEET_CSV_URL));
      if (!response.ok) continue;
      
      let csvText = '';
      if (getUrl.toString().includes('allorigins')) {
        const json = await response.json();
        csvText = json.contents;
      } else {
        csvText = await response.text();
      }

      const rows = csvText.split(/\r?\n/).map(row => {
        const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        return matches ? matches.map(m => m.replace(/^"|"$/g, '')) : [];
      });

      return rows.slice(1)
        .filter(row => row.length >= 3 && row[0] !== "")
        .map((row, index) => ({
          id: String(index),
          date: row[0] || 'Date inconnue',
          time: row[1] || 'Non spécifié',
          subject: row[2] || 'Cours BIA',
          instructor: row[3] || 'TBD',
          location: row[4] || 'Salle de cours',
          description: row[5] || ''
        }));
    } catch (error) {
      console.warn("Sheets fetch failed, trying next proxy...");
    }
  }
  return [];
};