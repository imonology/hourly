module.exports = {
	name: 'rate',
	fields: {
		roles: { 
			name: 'role',
			type: 'string',
			desc: '',
			must: true,
			show: true,
			required: true,
			unique: true,
		},
		desc: {
			name: 'description',
			type: 'textarea',
			row: 5,
			desc: '',
			must: true,
			show: true,
			require: false
		},
		pay: {
			name: 'pay for role',
			type: 'number',
			desc: '',
			must: true,
			show: true,
			require: true,
			unique: true,
		}
	}
};