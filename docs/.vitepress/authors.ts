// CHANGE ME: your real authors. A post's frontmatter references one by key (`author: priya`),
// and the post list/post page look up the display name and bio from here. Renaming a key means
// updating every post that uses it, but changing a name or bio updates every post at once.
export interface Author {
  name: string
  bio: string
}

export const authors: Record<string, Author> = {
  priya: {
    name: 'Priya Shah',
    bio: 'Runs the crew at Cedar & Vine. Writes most of the how-we-work posts.',
  },
  sam: {
    name: 'Sam Okafor',
    bio: 'Handles design work and anything involving a spreadsheet.',
  },
}
