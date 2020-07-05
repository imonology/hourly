module.exports = {
	name: 'account',
	fields: {
		gender: {
			name: 'Gender',
			type: 'choice',
			desc: '',
			must: true,
			show: true,
			option: [
				{
					value: 'Male',
					text: '男',
				},
				{
					value: 'Female',
					text: '女',
				},
			],
		},
	},
};
