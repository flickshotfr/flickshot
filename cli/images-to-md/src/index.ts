import { parse } from "csv/sync";
import { promises as fs } from "fs";
import GithubSlugger from "github-slugger";

const slugger = new GithubSlugger();

type Picture = {
  id: string,
  album_id: string,
  description: string,
  name: string,
  status: string,
  user_id: string,
  created_at: string,
  updated_at: string,
}

type Album = {
  id: string,
  tournament_id: string,
  name: string,
  status: string,
  description: string,
  created_at: string,
  updated_at: string,
  pictures: Picture[],
}


async function load(url: string) {
  const data = await fs.readFile(url);
  return Buffer.from(data);
}

const pictures: Picture[] = parse(await load("../../database/pictures.csv"), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  quote: "^*|",
  delimiter: ";$&",
  escape: "*\\",
});

const albums: Album[] = parse(await load("../../database/albums.csv"), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  quote: "^*|",
  delimiter: ";$&",
  escape: "*\\",
});

const albumsById = albums.reduce<Record<string, Album>>((acc, album) => ({ ...acc, [album.id]: album }) , {})

for (const picture of pictures) {
  albumsById[picture.album_id].pictures = [ ...(albumsById[picture.album_id].pictures ?? []), picture];

  await fs.cp(`../../pictures/${picture.name}/pic.jpg`, `../../app/public/images/pictures/${picture.name}.jpg`)
}

JSON.stringify(albumsById);

await fs.writeFile("albums.json", JSON.stringify(albumsById), 'utf8');