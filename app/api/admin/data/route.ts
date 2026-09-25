import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { data, token } = await req.json()
    
    if (!token) {
      return NextResponse.json({ error: 'GitHub Token is required.' }, { status: 401 })
    }

    const repoOwner = 'AkashK0907'
    const repoName = 'GreensCab'
    const filePath = 'data/content.json'

    // 1. Get the current file's SHA (required for updating a file in GitHub)
    const getRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    })

    if (!getRes.ok) {
      const errText = await getRes.text()
      return NextResponse.json({ error: `Failed to fetch file info from GitHub: ${errText}` }, { status: getRes.status })
    }

    const getJson = await getRes.json()
    const sha = getJson.sha

    // 2. Commit the new file content
    const contentEncoded = Buffer.from(JSON.stringify(data, null, 2)).toString('base64')

    const putRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Update content via Admin panel',
        content: contentEncoded,
        sha: sha
      })
    })

    if (!putRes.ok) {
      const errText = await putRes.text()
      return NextResponse.json({ error: `Failed to commit to GitHub: ${errText}` }, { status: putRes.status })
    }

    return NextResponse.json({ success: true, message: 'Changes successfully saved to GitHub. The site is now rebuilding to reflect the changes!' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
