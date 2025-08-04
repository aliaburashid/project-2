const React = require('react')
const Layout = require('../layouts/Layout')

function New({ token }) {
  return (
    <Layout>
      <h1>Create New Blog Post</h1>
      <form action={`/posts?token=${token}`} method="POST">
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" rows="6" required></textarea>
        </div>

        <div>
          <label htmlFor="published">Publish Now?</label>
          <input type="checkbox" id="published" name="published" />
        </div>

        <button type="submit">Create Post</button>
      </form>
    </Layout>
  )
}

module.exports = New
