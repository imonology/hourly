module.exports = {
	name: 'track project',
	fields: {
		project: { 
			name: 'Project',
			type: 'string',
			desc: '',
			must: true,
			show: true,
			required: true,
		},
		member: {
			name: 'Member',
			type: 'number',
			desc: '',
			must: true,
			show: true,
			require: true,
		},
		dev_cycle: { 
			name: 'Hour work',
			type: 'number',
			desc: '',
			must: true,
			show: true,
			required: true,
		},
		budget: {
			name: 'Budget',
			type: 'number',
			desc: '',
			must: true,
			show: true,
			required: true,
		}
	}
};