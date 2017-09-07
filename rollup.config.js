import RollupPluginBuble from 'rollup-plugin-buble'

export default {
  plugins: [
    RollupPluginBuble({
      exclude: 'node_modules/**'
    })
  ]
}
