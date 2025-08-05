const React = require('react')

function Layout(props) {
  const { token } = props

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <title>FlickGallery</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/styles.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        {/* Navigation Bar */}
        <header style={{ borderBottom: '1px solid #dbdbdb', background: 'white' }}>
          <div className="app-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0' }}>
            <a href={token ? `/posts?token=${token}` : '/'} style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold', color: '#262626' }}>
              FlickGallery
            </a>

            <nav style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
              <a href={token ? `/posts?token=${token}` : '/'}><i className="fas fa-home"></i></a>
              <a href={token ? `/posts/new?token=${token}` : '#'}><i className="fas fa-plus-square"></i></a>
              <a href={token ? `/profile?token=${token}` : '#'}><i className="far fa-user-circle"></i></a>
            </nav>
          </div>
        </header>

        {/* Page Content */}
        <main className="app-container" style={{ marginTop: '2rem' }}>
          {props.children}
        </main>
      </body>
    </html>
  )
}

module.exports = Layout
