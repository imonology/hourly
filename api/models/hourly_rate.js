module.exports = {
	name: '每小時費用',
	fields: {
		role: {
			name: '身份別',
			type: 'string',
			desc: '',
			unique: true,
			must: true,
			show: true,
			required: true,
		},
		hourly_rate: {
			name: '費用',
			type: 'number',
			desc: '',
			unique: true,
			must: true,
			show: true,
			required: true,
		},
		desc: {
			name: '說明',
			type: 'textarea',
			row: 5,
			desc: '',
			must: true,
			show: true,
			required: false,
		},
	},
};
