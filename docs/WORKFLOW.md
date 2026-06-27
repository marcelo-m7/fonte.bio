# Fonte.bio GitHub Workflow

This repository uses small branches, clear conventional commits, and pull requests for traceability before implementation work begins.

## Branch Pattern

Never work directly on `main`.

Use short-lived branches with one clear purpose:

```text
<type>/<short-scope>
```

Recommended types:

- `chore/` for workflow, tooling, repository setup, and maintenance.
- `docs/` for documentation-only changes.
- `feat/` for user-facing product increments.
- `fix/` for bug fixes.
- `refactor/` for behavior-preserving code changes.
- `test/` for test-only changes.

Examples:

```text
chore/github-pr-workflow
feat/frontend-shell
feat/supabase-base
fix/item-card-empty-state
```

## Commit Pattern

Use conventional commit messages:

```text
<type>: <short imperative summary>
```

Examples:

```text
chore: document GitHub workflow
docs: add project roadmap
feat: add frontend shell
fix: handle empty video imports
```

Keep commits small. A commit should usually explain one decision or complete one focused change.

## PR Per Step Rule

Every meaningful project step must go through a pull request into `main`.

A PR should:

- Focus on one step or one vertical slice.
- Explain why the change exists.
- List decisions and trade-offs.
- Link issues when available.
- Include screenshots when the change affects UI.
- Document environment variables when they are introduced.

Do not batch unrelated changes into one PR.

## Checklist Before Opening A PR

- [ ] Branch is not `main`.
- [ ] Branch name follows the project pattern.
- [ ] Scope is small and understandable.
- [ ] No real `.env` files, tokens, service role keys, or credentials are committed.
- [ ] Available checks were run locally.
- [ ] Documentation was updated when behavior, setup, or workflow changed.
- [ ] UI changes include screenshots or visual notes.
- [ ] Supabase changes document migrations, RLS, and environment variables.

## Checklist Before Merge

- [ ] PR title uses conventional commit style.
- [ ] PR description explains scope and intent.
- [ ] Review comments are resolved.
- [ ] CI checks pass.
- [ ] Migrations are included when database schema changes.
- [ ] RLS policies are verified when Supabase tables or access rules change.
- [ ] No secrets are present in the diff.
- [ ] The branch can be safely squash-merged or merged according to the repository policy.

## Secrets Rule

Never commit:

- Real `.env` files.
- Supabase service role keys.
- Personal access tokens.
- API keys.
- Production credentials.

Use `.env.example` for variable names and documentation only.

## Technical References

Do not copy FACODI-specific project patterns. If a technical reference is needed, inspect only `marcelo-m7/tube-o2` on branch `facodi` and adapt decisions intentionally for Fonte.bio.
