import { parse } from "csv/sync";
import { promises as fs } from "fs";
import { NodeHtmlMarkdown } from "node-html-markdown";
import GithubSlugger from "github-slugger";
import matter from "gray-matter";

const slugger = new GithubSlugger();

const outDir = "../../app/src/contents/articles";

await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir);

async function load(url: string) {
  const data = await fs.readFile(url);
  return Buffer.from(data);
}

const articleTranslations: {
  id: string;
  article_id: string;
  locale: string;
  title: string;
  description: string;
  content: string;
  auto_translate: string;
}[] = parse(await load("../../database/article_translations.csv"), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  quote: "^*|",
  delimiter: ";$&",
  escape: "*\\",
});

type Article = {
  id: string;
  uuid: string;
  image: string;
  user_id: string;
  category_id: string;
  country_id: string;
  status: string;
  moderated: string;
  type: string;
  community: string;
  published_at: string;
  published_at_display: string;
  featured: string;
  allow_comments: string;
  notifications_via: string;
  source: string;
  source_url: string;
  views: string;
  created_at: string;
  updated_at: string;
};

const articles: Article[] = parse(await load("../../database/articles.csv"), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  quote: "^*|",
  delimiter: ";$&",
  escape: "*\\",
});
const articlesById = articles.reduce<Record<string, Article>>(
  (acc, article) => ({
    ...acc,
    [article.id]: article,
  }),
  {}
);

type User = {
  id: string;
  name: string;
  username: string;
  old_username: string;
  avatar: string;
  settings: string;
  email: string;
  email_check: string;
  first_name: string;
  last_name: string;
  push_id: string;
  description: string;
  password: string;
  remember_token: string;
  newsletter: string;
  verified: string;
  username_updated_at: string;
  birthday: string;
  banished_until: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

const users: User[] = parse(await load("../../database/users.csv"), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  quote: "^*|",
  delimiter: ";$&",
  escape: "*\\",
});
const userById = users.reduce<Record<string, User>>(
  (acc, user) => ({
    ...acc,
    [user.id]: user,
  }),
  {}
);

type Category = {
  id: string;
  name: string;
  name_short: string;
  color: string;
  display: string;
  sort: string;
  description: "NULL";
  created_at: string;
  updated_at: string;
};

const categories: Category[] = parse(
  await load("../../database/categories.csv"),
  {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    quote: "^*|",
    delimiter: ";$&",
    escape: "*\\",
  }
);

const categoriesById = categories.reduce<Record<string, Category>>(
  (acc, category) => ({
    ...acc,
    [category.id]: category,
  }),
  {}
);

type Country = {
  id: string;
  iso: string;
};

const countries: Country[] = parse(await load("../../database/countries.csv"), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  quote: "^*|",
  delimiter: ";$&",
  escape: "*\\",
});

const countriesById = countries.reduce<Record<string, Country>>(
  (acc, country) => ({
    ...acc,
    [country.id]: country,
  }),
  {}
);

type Tag = {
  id: string;
  name: string;
};

const tags: Tag[] = parse(await load("../../database/tags.csv"), {
  columns: true,
  skip_empty_lines: true,
  trim: true,
  quote: "^*|",
  delimiter: ";$&",
  escape: "*\\",
});
const tagById = tags.reduce<Record<string, Tag>>(
  (acc, tag) => ({
    ...acc,
    [tag.id]: tag,
  }),
  {}
);

type Taggable = {
  tag_id: string;
  taggable_id: string;
  taggable_type: string;
  tag: Tag;
};

const taggables: Taggable[] = parse(
  await load("../../database/taggables.csv"),
  {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    quote: "^*|",
    delimiter: ";$&",
    escape: "*\\",
  }
);
const taggablesById = taggables
  .filter((taggable) => taggable.taggable_type === "flickshot_article")
  .reduce<Record<string, Taggable[]>>(
    (acc, taggable) => ({
      ...acc,
      [taggable.taggable_id]: [
        ...(acc[taggable.taggable_id] ?? []),
        {
          ...taggable,
          tag: tagById[taggable.tag_id],
        },
      ],
    }),
    {}
  );

for (const articleTranslation of articleTranslations) {
  const article = articlesById[articleTranslation.article_id];
  const category = categoriesById[article.category_id];
  const user = userById[article.user_id];
  const country = countriesById[article.country_id];
  const tags =
    taggablesById[articleTranslation.article_id]?.map(({ tag }) => tag) ?? [];

  const slug = slugger
    .slug(
      articleTranslation.title.replaceAll("-", "")
        .replaceAll("!", "")
        .replaceAll(":", "")
        .replaceAll("&", "")
        .replaceAll("$", "")
        .replaceAll("€", "")
        .replaceAll("?", "")
        .replaceAll("à", "a")
        .replaceAll("é", "e")
        .replaceAll("è", "e")
        .replaceAll("ù", "u")
        .replaceAll("'", "-")
        .replace(/\s+/g, " ")
        .trim()
    )
    .replace("_", "-");

  if (article.status === "published") {

    const mk = NodeHtmlMarkdown.translate(articleTranslation.content, {
      globalEscape: [ /[\\`<*_~\[\]]/gm, '\\$&' ],
    },  {
       /* Link */
      'a': ({ node, options, visitor }) => {
        let href = node.getAttribute('href');
        if (!href) return {};

        if (!href.startsWith('http')) {
          href = 'https://' + href
        }

        // Encodes symbols that can cause problems in markdown
        let encodedHref = '';
        for (const chr of href) {
          switch (chr) {
            case '(':
              encodedHref += '%28';
              break;
            case ')':
              encodedHref += '%29';
              break;
            case '_':
              encodedHref += '%5F';
              break;
            case '*':
              encodedHref += '%2A';
              break;
            default:
              encodedHref += chr;
          }
        }

        const title = node.getAttribute('title');


        if (node.textContent === href) {
            return { 
              content: `[${encodedHref}](${encodedHref})`
            }
        };

        return {
          postprocess: ({ content }) => content.replace(/(?:\r?\n)+/g, ' '),
          childTranslators: visitor.instance.aTagTranslators,
          prefix: '[',
          postfix: `](${encodedHref}${title ? ` "${title}"` : ''})`
        }
      }});

    const md = matter.stringify(mk.replaceAll(/<(.*)>/g, '[$1]($1)'), {
        title: articleTranslation.title,
        slug,
        description: articleTranslation.description ?? null,
        type: article.type ?? null,
        language: articleTranslation.locale ?? null,
        draft: false,
        date:
          article.published_at_display !== "NULL"
            ? new Date(article.published_at_display)
            : null,
        lastmod:
          article.updated_at !== "NULL"
            ? new Date(article.updated_at)
            : null,
        views: article?.views ?? null,
        author: user?.name ?? null,
        country: country?.iso ?? null,
        categories: category ? [category.name] : [],
        tags: tags.map((tag) => tag.name),

      },
    )

    await fs.appendFile(`${outDir}/${slug}.md`, md);
  }
}
