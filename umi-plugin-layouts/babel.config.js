module.exports = {
	presets: [
		[
			'@babel/env',
			{
				modules: 'commonjs',
				useBuiltIns: 'usage',
				corejs: 3,
			},
		],
		'@babel/react',
	],
	plugins: [
		'@babel/plugin-proposal-class-properties',
		["import", { libraryName: "antd", style: 'css' }] // antd按需加载
	],
};
