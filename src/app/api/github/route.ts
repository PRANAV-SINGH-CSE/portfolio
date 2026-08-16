import { NextResponse } from 'next/server';

export async function GET() {
  const token = process.env.GITHUB_TOKEN || '';
  const username = 'PRANAV-SINGH-CSE';

  try {
    const headers: Record<string, string> = {
      'User-Agent': 'Portfolio-NextJS',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    // 1. Fetch User Data
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });
    const userData = await userRes.json();

    // 2. Fetch Repositories
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
      headers,
      next: { revalidate: 3600 },
    });
    const reposData = await reposRes.json();

    // 3. Fetch Contribution Calendar via GraphQL if token exists
    let calendar = null;
    if (token) {
      const gqlQuery = `
        query {
          user(login: "${username}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                    weekday
                    color
                  }
                }
              }
            }
          }
        }
      `;

      const gqlRes = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers,
        body: JSON.stringify({ query: gqlQuery }),
        next: { revalidate: 3600 },
      });

      const gqlData = await gqlRes.json();
      calendar = gqlData?.data?.user?.contributionsCollection?.contributionCalendar;
    }

    return NextResponse.json({
      user: userData,
      repos: Array.isArray(reposData) ? reposData : [],
      contributions: calendar,
    });
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
  }
}
