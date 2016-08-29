export const apiUrl = process.env.API_URL
export const googleOauthParams = {
  url: `${apiUrl}/oauth/google`,
  authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
  params: {
    client_id: process.env.GOOGLE_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URL,
    scope: 'openid profile email',
    response_type: 'code'
  }
}
export const githubOauthParams = {
  url: `${apiUrl}/oauth/github`,
  authorizationUrl: 'https://github.com/login/oauth/authorize',
  params: {
    client_id: process.env.GITHUB_ID,
    redirect_uri: process.env.GITHUB_REDIRECT_URL,
    scope: 'user:email profile repo',
    response_type: 'code'
  }
}
