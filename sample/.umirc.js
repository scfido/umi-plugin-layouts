export default {
  plugins: [
    ["umi-plugin-layouts",
      {
        layout: "admin"
      }
    ],
    [
      'umi-plugin-react',
      {
        dva: true,
        locale: true,
        antd: true
      }
    ],
  ]
};
