module.exports = {
	name: 'Dev cycle',
	fields: {
		project: {
			name: 'Cycle name',
			type: 'string',
			desc: '',
			show: true,
			required: true,
		},
		desc: {
			name: 'Description',
			type: 'textarea',
			row: 5,
			desc: '',
			show: true,
			required: false
		},
		pm_hour: {
			name: 'PM hour',
			type: 'number',
			desc: '',
			show: true,
			required: false,
		},
		dev_hour: {
			name: 'Dev hour',
			type: 'number',
			desc: '',
			show: true,
			required: false,
		},
		
	},
};
