<template>
  <v-app>
    <div class="text-center my-8">
      <h1>{{ per.code }}</h1>
      <h2>{{ per.message }}</h2>
    </div>
    <div class="text-center mb-8">
      <v-btn elevation="0" color="primary" @click="reload">Reload</v-btn>
    </div>
  </v-app>
</template>

<script>
const xcode = {
  // 300
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found (Previously "Moved temporarily")',
  303: 'See Other (since HTTP/1.1)',
  304: 'Not Modified (RFC 7232)',
  305: 'Use Proxy (since HTTP/1.1)',
  306: 'Switch Proxy',
  307: 'Temporary Redirect (since HTTP/1.1)',
  308: 'Permanent Redirect (RFC 7538)',
  // 400
  400: 'Bad Request',
  401: 'Unauthorized (RFC 7235)',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required (RFC 7235)',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed (RFC 7232)',
  413: 'Payload Too Large (RFC 7231)',
  414: 'URI Too Long (RFC 7231)',
  415: 'Unsupported Media Type (RFC 7231)',
  416: 'Range Not Satisfiable (RFC 7233)',
  417: 'Expectation Failed',
  418: "I'm a teapot (RFC 2324, RFC 7168)",
  421: 'Misdirected Request (RFC 7540)',
  422: 'Unprocessable Entity (WebDAV; RFC 4918)',
  423: 'Locked (WebDAV; RFC 4918)',
  424: 'Failed Dependency (WebDAV; RFC 4918)',
  425: 'Too Early (RFC 8470)',
  426: 'Upgrade Required',
  428: 'Precondition Required (RFC 6585)',
  429: 'Too Many Requests (RFC 6585)',
  431: 'Request Header Fields Too Large (RFC 6585)',
  451: 'Unavailable For Legal Reasons (RFC 7725)',
  // 500
  500: 'Internal Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates (RFC 2295)',
  507: 'Insufficient Storage (WebDAV; RFC 4918)',
  508: 'Loop Detected (WebDAV; RFC 5842)',
  510: 'Not Extended (RFC 2774)',
  511: 'Network Authentication Required (RFC 6585)',
}

const dcode = 'Unknown Error Occur'

export default {
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    per: {
      code: 0,
      message: '',
    },
  }),
  head() {
    const title = xcode[this.error.statusCode] || dcode
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${this.error.statusCode || 0} ${
            xcode[this.error.statusCode] || dcode
          }`,
        },
      ],
    }
  },
  created() {
    this.$store.commit('title', 'Page Error')
    this.per.code = this.error.statusCode || 0
    this.per.message = xcode[this.error.statusCode] || dcode
  },
  methods: {
    reload() {
      this.$router.go(0)
    },
  },
}
</script>
