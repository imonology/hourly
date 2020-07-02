module.exports = {
	name: 'rate',
	fields: {
		roles: { 
			name: 'roles',
			type: 'choice',
			desc: '',
			must: true,
			show: true,
			required: false,
			option: [
				{
					value: 'PM',
					text: 'PM',
					id: '1'
				},
				{
					value: 'Dev',
					text: 'Dev',
					id: '2'
				},
				{
					value: 'Marketing',
					text: 'Marketing',
					id: '3'
				},
				{
					value: 'Intern',
					text: 'Intern',
					id: '4'
				},
			],
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