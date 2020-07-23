module.exports = {
	name: 'dev cycle',
	fields: {
		applicant: {
			name: 'Cycle name',
			type: 'string',
			desc: '',
			must: true,
			show: true,
			required: true,
		},
		pm_hour: {
			name: 'PM hour',
			type: 'number',
			desc: '',
			must: true,
			show: true,
			required: false,
		},
		dev_hour: {
			name: 'Dev hour',
			type: 'number',
			desc: '',
			must: true,
			show: true,
			required: false,
		},
	},
};
