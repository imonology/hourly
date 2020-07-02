module.exports = {
	name: 'rate',
	fields: {
		id:{
			name: 'id',
			type: 'number',
			desc: 'id for each role',
			must: true,
			show: false,
			require: true
		},
		roles: { 
			name: 'roles',
			type: 'string',
			desc: '',
			must: true,
			show: true,
			require: true
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
			require: true
		}
	}
};