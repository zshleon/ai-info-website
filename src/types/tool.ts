export interface TierData {
  limit: string;
  detail: string;
  reset: string;
  model: string;
  pool: "shared" | "independent" | "standalone";
  notes: string;
}

export interface ChangelogEntry {
  date: string;
  event: string;
}

export interface Tool {
  id: string;
  name: string;
  vendor: string;
  slug: string;
  price_usd: number;
  pool_type: "shared" | "independent";
  logo_color: string;
  logo_letter: string;
  tiers: {
    chat: TierData;
    coding: TierData;
    cli: TierData;
    api: TierData;
  };
  changelog: ChangelogEntry[];
}

export interface ToolsData {
  meta: {
    last_updated: string;
    version: string;
  };
  tools: Tool[];
}
