import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { data, token, uploads } = await req.json()
    
    if (!token) {
      return NextResponse.json({ error: 'GitHub Token is required.' }, { status: 401 })
    }

    const repoOwner = 'AkashK0907'
    const repoName = 'GreensCab'

    // 1. Process any pending image uploads first
    if (uploads && uploads.length > 0) {
      for (const upload of uploads) {
        // We do a direct PUT for new files (or overwrite existing). We try to GET sha first just in case.
        let fileSha = undefined;
        try {
          const getRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${upload.path}`, {
            headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' }
          });
          if (getRes.ok) {
            const getJson = await getRes.json();
            fileSha = getJson.sha;
          }
        } catch(e) {}

        const putRes = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${upload.path}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: `Upload image ${upload.path} via Admin panel`,
            content: upload.base64,
            sha: fileSha
          })
        });

        if (!putRes.ok) {
          const errText = await putRes.text();
          console.error('Failed to upload image:', errText);
          // We can choose to fail the whole request, or just skip. We will fail it.
          return NextResponse.json({ error: `Failed to upload image to GitHub: ${errText}` }, { status: putRes.status })
        }
      }
    }

    // 2. Commit the new data/content.json
    const filePath = 'data/content.json'
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
      return NextResponse.json({ error: `Failed to commit data to GitHub: ${errText}` }, { status: putRes.status })
    }

    return NextResponse.json({ success: true, message: 'Changes successfully saved to GitHub. The site is now rebuilding!' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
