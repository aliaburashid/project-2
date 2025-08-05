const React = require('react')
const Layout = require('../layouts/Layout')

function NewPost(props) {
  const token = props.token

  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-card">
          <h1>New Post</h1>
          <form 
            className="auth-form" 
            action={`/posts?token=${token}`} 
            method="POST" 
            encType="multipart/form-data"
          >
            {/* Image upload field */}
            <input 
              type="file" 
              name="image" 
              accept="image/*" 
              className="auth-input" 
              required 
            />

            {/* Caption input */}
            <input 
              type="text" 
              name="caption" 
              placeholder="Write a caption..." 
              className="auth-input" 
              maxLength="2200" 
            />

            {/* Location input (optional) */}
            <input 
              type="text" 
              name="location" 
              placeholder="Location (optional)" 
              className="auth-input" 
            />

            {/* Submit button */}
            <button type="submit" className="auth-button">Post</button>
          </form>
        </div>
      </div>
    </Layout>
  )
}

module.exports = NewPost
