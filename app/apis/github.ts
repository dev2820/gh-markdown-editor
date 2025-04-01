import ky from 'ky';

const GITHUB_API_URL = 'https://api.github.com';

const ghClient = ky.create({
  prefixUrl: GITHUB_API_URL,
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

export async function fetchRepos(username: string,token:string) {
  try {
    const repos = await ghClient.get(`users/${username}/repos`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).json();

    console.log(repos); // 저장소 리스트 출력
    return repos;
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
}

export async function fetchUser(token:string) {
  try {
    const repos = await ghClient.get(`user`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).json();

    console.log(repos); // 유저 리스트 출력
    return repos;
  } catch (error) {
    console.error('Error fetching repositories:', error);
  }
}
