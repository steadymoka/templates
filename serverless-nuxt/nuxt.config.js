
const axios = require('axios')

const AXIOS_BASEURL = process.env.AXIOS_BASEURL || "https://domain.com"

module.exports = {
  mode: "universal",
  head: {
    title: "Title",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "msapplication-TileColor", content: "#7457eb" },
      { name: "theme-color", content: "#ffffff" },
    ],
    link: [
      { rel: "apple-touch-icon", sizes: "120x120", href: "/apple-touch-icon.png" },
      { rel: "icon", type: "image/gif", sizes: "32x32", href: "/favicon.gif" },
      { rel: "icon", type: "image/gif", sizes: "16x16", href: "/favicon.gif" },
      { rel: 'shortcut icon', href: "/favicon.gif" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" },
      { rel: "stylesheet", type: "text/css", href: "//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css" },
    ],
  },
  css: [
    "~/assets/fonts/campton/campton.css",
    "~/assets/scss/home.scss",
  ],
  loading: { color: "#3B8070" },
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/feed',
  ],
  apollo: {
    tokenName: 'tokenName',
    includeNodeModules: true,
    defaultOptions: {
      $query: {
        loadingKey: 'loading',
        fetchPolicy: 'cache-and-network',
      },
    },
    // required
    clientConfigs: {
      default: {
        httpEndpoint: `${AXIOS_BASEURL}/graphql`,
        httpLinkOptions: {
          credentials: 'same-origin'
        },
      },
    }
  },
  feed: [
    // A default feed configuration object
    {
      path: '/feed.xml', // The route to your feed.
      async create(feed) {
      }, // The create function (see below)
      cacheTime: 1000 * 60 * 15, // How long should the feed be cached
      type: 'rss2', // Can be: rss2, atom1, json1
      data: ['Some additional data'] // Will be passed as 2nd argument to `create` function
    }
  ],
  build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: "pre",
          test: /\.(js|vue)$/,
          loader: "eslint-loader",
          exclude: /(node_modules)/
        })
      }
    },
  },
}
