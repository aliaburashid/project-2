const React = require('react')
const Layout = require('../layouts/Layout')

function NewPost(props) {
  const token = props.token

  return (
    <Layout>
      <div className="new-post-container">
  <form
    action={`/posts?token=${token}`}
    method="POST"
    encType="multipart/form-data"
    className="new-post-form"
  >
    <h2 className="new-post-title">Create New Post</h2>

    <label className="file-upload-label">
      <input type="file" name="image" required />
    </label>

    <input
      type="text"
      name="caption"
      placeholder="Write a caption..."
      className="new-post-input"
    />

    <input
      type="text"
      name="location"
      placeholder="Location (optional)"
      className="new-post-input"
    />

    <button type="submit" className="btn btn-primary">Post</button>
  </form>
</div>

    </Layout>
  )
}

module.exports = NewPost
