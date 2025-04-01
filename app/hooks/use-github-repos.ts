import { useQuery } from '@tanstack/react-query';

import { fetchGitHubRepos } from '@/apis/github';

const QUERY_KEY = 'GITHUB_REPOS';

export function useGitHubRepos(username: string) {
  return useQuery({
    queryKey: [QUERY_KEY, username],
    queryFn: () => fetchGitHubRepos(username),
    enabled: !!username, // username이 있을 때만 실행
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });
}
