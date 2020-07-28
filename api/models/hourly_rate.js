module.exports = {
	name: 'Hourly fee',
	fields: {
		identity: {
			name: 'Identity',
			type: 'string',
			desc: '',
			unique: true,
			must: true,
			show: true,
			required: true,
		},
		hourly_rate: {
			name: 'Cost',
			type: 'number',
			desc: '',
			unique: true,
			must: true,
			show: true,
			required: true,
		},
		desc: {
			name: 'Explanation',
			type: 'textarea',
			row: 5,
			desc: '',
			must: true,
			show: true,
			required: false,
		},
	},
};
