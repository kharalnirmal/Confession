interface ReadingChapter {
  title: string
  text: string
  lastLine?: string
}

export const chapters: readonly ReadingChapter[] = [
  { title: 'A chance encounter', text: 'Of all the paths we could have taken, I’m glad ours crossed.' },
  { title: 'The little things', text: 'You make ordinary days feel worth keeping. Even silence feels like company with you.' },
  { title: 'A sky made for us', text: 'Somewhere between the little things, you became my favorite part of everything.' },
  { title: 'The confession', text: 'I don’t need a perfect story. Just the chance to keep sharing the small, beautiful parts with you.', lastLine: "In every version of my story, I'd still choose you." },
  { title: 'The afterglow', text: 'There’s a little universe here. And room for us.' },
]
