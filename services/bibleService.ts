
export const fetchVerse = async (reference: string, translation: string = 'kjv') => {
  try {
    // Note: nkjv might require a specific provider, falling back to a sample for nkjv if the API doesn't support it freely
    const response = await fetch(`https://bible-api.com/${reference}?translation=${translation}`);
    if (!response.ok) throw new Error('Verse not found');
    return await response.json();
  } catch (error) {
    console.error('Bible API Error:', error);
    return null;
  }
};

/**
 * Luganda Bible collection including mock NKJV (Luganda) for specific verses.
 */
export const LUGANDA_BIBLE_DATA: Record<string, Record<string, string>> = {
  "Lubereberye": { // Genesis
    "1:1": "Olunaku olw'olubereberye Katonda yatonda eggulu n'ensi.",
    "1:3": "Katonda n'agamba nti, Wabeewo omusana: omusana negubaawo.",
    "1:27": "Katonda n'atonda omuntu mu kifaananyi kye, mu kifaananyi kya Katonda mwe yamutondera; omusajja n'omukazi mwe yamutondera."
  },
  "Zabbuli": { // Psalms
    "23:1": "Mukama ye Musumba wange; siremeera.",
    "23:2": "Anfuula okugalamira mu malundiro amavu; antwala ku mabbali g'amazzi amateefu.",
    "23:3": "Azzamu obulamu mu mwoyo gwange; annuŋŋamya mu makubo ag'obutuukirivu ku lw'erinnya lye.",
    "100:1": "Muleekuulire Mukama, mmwe ensi zonna.",
    "121:1": "Nnyimusa amaaso gange eri ensozi: obuyambi bwange bunaava wa?",
    "121:2": "Obuyambi bwange buva eri Mukama, eyakola eggulu n'ensi."
  },
  "Engero": { // Proverbs
    "3:5": "Wesigenga Mukama n'omutima gwo gwonna, so tewesiganga kutegeera kwo wekka.",
    "3:6": "Mu makubo go gonna omwatulenga, naye alinuŋŋamyanga amakubo go."
  },
  "Isaaya": { // Isaiah
    "40:31": "Naye abo abalindirira Mukama baliddamu amaanyi; balitumbira n'amawaawa nga empungu; balidduka ne batakoowa; balitambula ne batazirika."
  },
  "Matayo": { // Matthew
    "5:3": "Balina omukisa abaavu mu mwoyo: kubanga obwakabaka obw'omu ggulu bwe bwabwe.",
    "5:4": "Balina omukisa abakungubaga: kubanga balisanyusibwa.",
    "6:9": "Mwenna musabenga bwe muti nti, Kitaffe ali mu ggulu, erinnya lyo litiibwengwa.",
    "28:19": "Kale mugende mufuule amawanga gonna abayigirizwa, nga mubabatiza mu linnya lya Kitaffe n'ery'Omwana n'ery'Omwoyo Omutukuvu."
  },
  "Yokaana": { // John
    "1:1": "Olunaku olw'olubereberye Waaliwo Kigambo, Kigambo n'aba ne Katonda, ne Kigambo n'aba Katonda.",
    "3:16": "Kubanga Katonda yagala nnyo ensi, n’okuwaayo n’awaayo Omwana we eyazaalibwa omu yekka, buli amukkiriza aleme okubula, naye abeere n’obulamu obutaggwaawo.",
    "10:10": "Omubbi tajja wabula okubba, n'okusaddaaka, n'okuzikiriza: nze najja babe n'obulamu, era babe nabwo obungi.",
    "14:6": "Yesu n'amugamba nti, Nze kkubo, n'amazima, n'obulamu: tewali ajja eri Kitaffe wabula nze."
  },
  "Abarumi": { // Romans
    "8:28": "Era tumanyi nga byonna bikolagana okuleeta obulungi eri abo abaagala Katonda, abo abayitibwa ng'okuteesa kwe bwe kuli.",
    "12:2": "Era temufaananyizibwanga n'emirembe gino: naye mulyoke mufuulibwengwa buggya mu kutegeera kwammwe."
  },
  "Abafilipi": { // Philippians
    "4:13": "Nnyinza byonna mu oyo ampa amaanyi."
  }
};

export const getLugandaVerse = (query: string): string | null => {
  const parts = query.split(' ');
  if (parts.length < 2) return null;
  
  const bookInput = parts[0].toLowerCase();
  const ref = parts[1];

  const mapping: Record<string, string> = {
    "genesis": "Lubereberye",
    "psalms": "Zabbuli",
    "proverbs": "Engero",
    "isaiah": "Isaaya",
    "matthew": "Matayo",
    "john": "Yokaana",
    "romans": "Abarumi",
    "philippians": "Abafilipi",
    "lubereberye": "Lubereberye",
    "zabbuli": "Zabbuli",
    "engero": "Engero",
    "isaaya": "Isaaya",
    "matayo": "Matayo",
    "yokaana": "Yokaana",
    "abarumi": "Abarumi",
    "abafilipi": "Abafilipi"
  };

  const lugandaBook = mapping[bookInput];
  if (lugandaBook && LUGANDA_BIBLE_DATA[lugandaBook]) {
    return LUGANDA_BIBLE_DATA[lugandaBook][ref] || null;
  }
  
  return null;
};
