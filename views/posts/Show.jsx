const React = require('react')
const Layout = require('../layouts/Layout')

function Show({ post, token }) {
  return (
    <Layout post={post}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Status: {post.published ? 'Published' : 'Draft'}</p>
      <p>Created At: {new Date(post.createdAt).toLocaleString()}</p>

      <a href={`/posts/${post._id}/edit?token=${token}`}>Edit</a>

      <form action={`/posts/${post._id}?_method=DELETE&token=${token}`} method="POST">
        <button type="submit">Delete</button>
      </form>
    </Layout>
  )
}

module.exports = Show
