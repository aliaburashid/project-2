const React = require('react')
const Layout = require('../layouts/Layout')

function Edit({ post, token }) {
  return (
    <Layout>
      <h1>Edit Blog Post</h1>
      <form action={`/posts/${post._id}?_method=PUT&token=${token}`} method="POST">
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" defaultValue={post.title} required />
        </div>

        <div>
          <label htmlFor="content">Content:</label>
          <textarea id="content" name="content" rows="6" defaultValue={post.content} required></textarea>
        </div>

        <div>
          <label htmlFor="published">Published:</label>
          <input
            type="checkbox"
            id="published"
            name="published"
            defaultChecked={post.published}
          />
        </div>

        <button type="submit">Update Post</button>
      </form>
    </Layout>
  )
}

module.exports = Edit
