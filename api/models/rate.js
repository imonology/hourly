module.exports = {
	name: 'rate',
	fields: {
		name: { 
			name: 'Name',
			type: 'string',
			desc: '',
			must: true,
			show: true 
		},
		dob: {
			'name': 'Birthday',
			'type': 'date',
			'desc': '1970-01-01',
			'must': true,
			'show': true,
		},
		receiveMail: {
			'name': 'Receive NEWS',
			'type': 'boolean',
			'desc': 'Receive NEWS',
			'must': true,
			'show': true,
		},
		gender: { 
			name: 'Gender',
			type: 'choice',
			desc: '',
			must: true,
			show: true,
			option: [
				{
					value: 'Male',
					text: '男'
				},
				{
					value: 'Female',
					text: '女'
				}
			]
		},
		leader: {
			name: 'Leader',
			type: 'choice',
			desc: '',
			must: true,
			show: true,
			option: {
				form: 'users',
				query: {},
				value: 'account',
				text: 'account'
			}
		},
		leader2: {
			name: 'Leader2',
			type: 'choice',
			desc: '',
			must: false,
			show: true,
			option: {
				form: 'users',
				query: {gender: 'Male'},
				value: 'account',
				text: 'name'
			}
		},
		phone: { 
			name: 'Cell phone',
			type: 'string',
			desc: '',
			must: false,
			show: false,
			required: false,
		},
		email: { 
			name: 'Email',
			type: 'string',
			desc: '',
			must: true,
			show: true 
		},
		age: { 
			name: '年紀',
			type: 'number',
			desc: '',
			must: true,
			show: true 
		},
	}
};