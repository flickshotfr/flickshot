export type Picture = {
    id: string,
    album_id: string,
    description: string,
    name: string,
    status: string,
    user_id: string,
    created_at: string,
    updated_at: string,
  }
  
export type Album = {
    id: string,
    tournament_id: string,
    name: string,
    status: string,
    description: string,
    created_at: string,
    updated_at: string,
    pictures: Picture[],
  }
  