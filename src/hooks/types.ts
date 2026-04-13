export interface Game {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface SystemRequirements {
  os: string | null;
  processor: string | null;
  memory: string | null;
  graphics: string | null;
  storage: string | null;
}

export interface GameDetail extends Game {
  status: string;
  description: string;
  minimum_system_requirements: SystemRequirements | null;
  screenshots: Screenshot[];
}
