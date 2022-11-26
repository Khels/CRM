export interface User {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  last_online: Date | string;
  is_active: boolean;
  is_admin: boolean;
}
export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface Position {
  id: number;
  name: string;
}

export interface Candidate {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone_number: string;
  email: string;
  position: Position;
  sex: boolean;
  birth_date: Date;
  photo_url: string;
  cv_url: string;
}

export interface UpdateCandidate extends Partial<Omit<Candidate, "birth_date">> {
  id: number
}

// TODO:
export interface Status {
  id: number;
  name: string;
  stage: number;
}

export interface Stage {
  id: number;
  name: string;
  statuses: Status[];
}

export interface CandidateStage {
  candidate: Candidate;
  stage: Stage;
  status: string;
  date: Date;
  comment: string;
}
