import { type ComponentProps, use } from 'react';

import type { GithubRepo } from '@/apis/github';

type RepositoryListProps = ComponentProps<'div'> & {
  repoPromise: Promise<GithubRepo[]>;
};
export function RepositoryList(props: RepositoryListProps) {
  const { repoPromise, ...rest } = props;
  const repos = use(repoPromise);
  return (
    <div {...rest}>
      <ul>
        {repos.map((repo) => (
          <li key={repo.fullName}>{repo.fullName}</li>
        ))}
      </ul>
    </div>
  );
}
