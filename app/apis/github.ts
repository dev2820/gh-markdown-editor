import ky, { type KyInstance } from 'ky';

const GITHUB_API_URL = 'https://api.github.com';

const baseClient = ky.create({
  prefixUrl: GITHUB_API_URL,
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

export function createGhClient(token: string) {
  return baseClient.extend({
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export type FetchReposSuccess = RawGithubRepo[];
export type FetchReposFailed = [];
export async function fetchRepos(
  username: string,
  client: KyInstance,
): Promise<GithubRepo[] | FetchReposFailed> {
  try {
    const repos = await client
      .get<FetchReposSuccess>(`users/${username}/repos`)
      .json();

    return repos.map(toGithubRepo);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

export type FetchUserSuccess = RawGithubUser;
export type FetchUserFailed = undefined;
export async function fetchUser(
  client: KyInstance,
): Promise<GithubUser | FetchUserFailed> {
  try {
    const user = await client.get<FetchUserSuccess>(`user`).json();

    return toGithubUser(user);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return undefined;
  }
}

export type GithubUser = {
  login: string;
  id: number;
  nodeId: string;
  avatarUrl: string;
  gravatarId: string;
  url: string;
  htmlUrl: string;
  followersUrl: string;
  followingUrl: string;
  gistsUrl: string;
  starredUrl: string;
  subscriptionsUrl: string;
  organizationsUrl: string;
  reposUrl: string;
  eventsUrl: string;
  receivedEventsUrl: string;
  type: 'User' | string;
  userViewType: string;
  siteAdmin: boolean;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitterUsername: string | null;
  notificationEmail?: string;
  publicRepos: number;
  publicGists: number;
  followers: number;
  following: number;
  createdAt: string;
  updatedAt: string;
};
export type RawGithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: 'User' | string;
  user_view_type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  notification_email?: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};
export type GithubRepo = {
  id: number;
  nodeId: string;
  name: string;
  fullName: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    nodeId: string;
    avatarUrl: string;
    gravatarId: string;
    url: string;
    htmlUrl: string;
    followersUrl: string;
    followingUrl: string;
    gistsUrl: string;
    starredUrl: string;
    subscriptionsUrl: string;
    organizationsUrl: string;
    reposUrl: string;
    eventsUrl: string;
    receivedEventsUrl: string;
    type: string;
    userViewType: string;
    siteAdmin: boolean;
  };
  htmlUrl: string;
  description: string | null;
  fork: boolean;
  url: string;
  forksUrl: string;
  keysUrl: string;
  collaboratorsUrl: string;
  teamsUrl: string;
  hooksUrl: string;
  issueEventsUrl: string;
  eventsUrl: string;
  assigneesUrl: string;
  branchesUrl: string;
  tagsUrl: string;
  blobsUrl: string;
  gitTagsUrl: string;
  gitRefsUrl: string;
  treesUrl: string;
  statusesUrl: string;
  languagesUrl: string;
  stargazersUrl: string;
  contributorsUrl: string;
  subscribersUrl: string;
  subscriptionUrl: string;
  commitsUrl: string;
  gitCommitsUrl: string;
  commentsUrl: string;
  issueCommentUrl: string;
  contentsUrl: string;
  compareUrl: string;
  mergesUrl: string;
  archiveUrl: string;
  downloadsUrl: string;
  issuesUrl: string;
  pullsUrl: string;
  milestonesUrl: string;
  notificationsUrl: string;
  labelsUrl: string;
  releasesUrl: string;
  deploymentsUrl: string;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  gitUrl: string;
  sshUrl: string;
  cloneUrl: string;
  svnUrl: string;
  homepage: string | null;
  size: number;
  stargazersCount: number;
  watchersCount: number;
  language: string | null;
  hasIssues: boolean;
  hasProjects: boolean;
  hasDownloads: boolean;
  hasWiki: boolean;
  hasPages: boolean;
  hasDiscussions: boolean;
  forksCount: number;
  mirrorUrl: string | null;
  archived: boolean;
  disabled: boolean;
  openIssuesCount: number;
  license: string | null;
  allowForking: boolean;
  isTemplate: boolean;
  webCommitSignoffRequired: boolean;
  topics: string[];
  visibility: 'public' | 'private' | string;
  forks: number;
  openIssues: number;
  watchers: number;
  defaultBranch: string;
  permissions: {
    admin: boolean;
    maintain: boolean;
    push: boolean;
    triage: boolean;
    pull: boolean;
  };
};
export type RawGithubRepo = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
  };
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: string | null; // 라이선스 객체가 존재하면 타입 확장 가능
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: 'public' | 'private' | string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  permissions: {
    admin: boolean;
    maintain: boolean;
    push: boolean;
    triage: boolean;
    pull: boolean;
  };
};

const toGithubUser = (raw: RawGithubUser): GithubUser => {
  return {
    login: raw.login,
    id: raw.id,
    nodeId: raw.node_id,
    avatarUrl: raw.avatar_url,
    gravatarId: raw.gravatar_id,
    url: raw.url,
    htmlUrl: raw.html_url,
    followersUrl: raw.followers_url,
    followingUrl: raw.following_url,
    gistsUrl: raw.gists_url,
    starredUrl: raw.starred_url,
    subscriptionsUrl: raw.subscriptions_url,
    organizationsUrl: raw.organizations_url,
    reposUrl: raw.repos_url,
    eventsUrl: raw.events_url,
    receivedEventsUrl: raw.received_events_url,
    type: raw.type,
    userViewType: raw.user_view_type,
    siteAdmin: raw.site_admin,
    name: raw.name,
    company: raw.company,
    blog: raw.blog,
    location: raw.location,
    email: raw.email,
    hireable: raw.hireable,
    bio: raw.bio,
    twitterUsername: raw.twitter_username,
    notificationEmail: raw.notification_email,
    publicRepos: raw.public_repos,
    publicGists: raw.public_gists,
    followers: raw.followers,
    following: raw.following,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
};

export function toGithubRepo(raw: RawGithubRepo): GithubRepo {
  return {
    id: raw.id,
    nodeId: raw.node_id,
    name: raw.name,
    fullName: raw.full_name,
    private: raw.private,
    owner: {
      login: raw.owner.login,
      id: raw.owner.id,
      nodeId: raw.owner.node_id,
      avatarUrl: raw.owner.avatar_url,
      gravatarId: raw.owner.gravatar_id,
      url: raw.owner.url,
      htmlUrl: raw.owner.html_url,
      followersUrl: raw.owner.followers_url,
      followingUrl: raw.owner.following_url,
      gistsUrl: raw.owner.gists_url,
      starredUrl: raw.owner.starred_url,
      subscriptionsUrl: raw.owner.subscriptions_url,
      organizationsUrl: raw.owner.organizations_url,
      reposUrl: raw.owner.repos_url,
      eventsUrl: raw.owner.events_url,
      receivedEventsUrl: raw.owner.received_events_url,
      type: raw.owner.type,
      userViewType: raw.owner.user_view_type,
      siteAdmin: raw.owner.site_admin,
    },
    htmlUrl: raw.html_url,
    description: raw.description,
    fork: raw.fork,
    url: raw.url,
    forksUrl: raw.forks_url,
    keysUrl: raw.keys_url,
    collaboratorsUrl: raw.collaborators_url,
    teamsUrl: raw.teams_url,
    hooksUrl: raw.hooks_url,
    issueEventsUrl: raw.issue_events_url,
    eventsUrl: raw.events_url,
    assigneesUrl: raw.assignees_url,
    branchesUrl: raw.branches_url,
    tagsUrl: raw.tags_url,
    blobsUrl: raw.blobs_url,
    gitTagsUrl: raw.git_tags_url,
    gitRefsUrl: raw.git_refs_url,
    treesUrl: raw.trees_url,
    statusesUrl: raw.statuses_url,
    languagesUrl: raw.languages_url,
    stargazersUrl: raw.stargazers_url,
    contributorsUrl: raw.contributors_url,
    subscribersUrl: raw.subscribers_url,
    subscriptionUrl: raw.subscription_url,
    commitsUrl: raw.commits_url,
    gitCommitsUrl: raw.git_commits_url,
    commentsUrl: raw.comments_url,
    issueCommentUrl: raw.issue_comment_url,
    contentsUrl: raw.contents_url,
    compareUrl: raw.compare_url,
    mergesUrl: raw.merges_url,
    archiveUrl: raw.archive_url,
    downloadsUrl: raw.downloads_url,
    issuesUrl: raw.issues_url,
    pullsUrl: raw.pulls_url,
    milestonesUrl: raw.milestones_url,
    notificationsUrl: raw.notifications_url,
    labelsUrl: raw.labels_url,
    releasesUrl: raw.releases_url,
    deploymentsUrl: raw.deployments_url,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    pushedAt: raw.pushed_at,
    gitUrl: raw.git_url,
    sshUrl: raw.ssh_url,
    cloneUrl: raw.clone_url,
    svnUrl: raw.svn_url,
    homepage: raw.homepage,
    size: raw.size,
    stargazersCount: raw.stargazers_count,
    watchersCount: raw.watchers_count,
    language: raw.language,
    hasIssues: raw.has_issues,
    hasProjects: raw.has_projects,
    hasDownloads: raw.has_downloads,
    hasWiki: raw.has_wiki,
    hasPages: raw.has_pages,
    hasDiscussions: raw.has_discussions,
    forksCount: raw.forks_count,
    mirrorUrl: raw.mirror_url,
    archived: raw.archived,
    disabled: raw.disabled,
    openIssuesCount: raw.open_issues_count,
    license: raw.license,
    allowForking: raw.allow_forking,
    isTemplate: raw.is_template,
    webCommitSignoffRequired: raw.web_commit_signoff_required,
    topics: raw.topics,
    visibility: raw.visibility,
    forks: raw.forks,
    openIssues: raw.open_issues,
    watchers: raw.watchers,
    defaultBranch: raw.default_branch,
    permissions: {
      admin: raw.permissions.admin,
      maintain: raw.permissions.maintain,
      push: raw.permissions.push,
      triage: raw.permissions.triage,
      pull: raw.permissions.pull,
    },
  };
}
