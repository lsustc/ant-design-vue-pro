module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    // `style: true` 会加载 less 文件
    [
      "import", 
      { 
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: true 
      }
    ]
  ]
};
