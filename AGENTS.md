<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Presentation architecture
- Serve the uploaded standalone presentation inside the index route's full-viewport iframe to preserve its original styles and interactive slide engine without global CSS conflicts.
- Store presentation media as Lovable Assets pointers and generate its static image manifest from those pointers, so uploaded and researched binaries are not committed.
