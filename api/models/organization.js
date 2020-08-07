module.exports = {
	name: 'organization',
	fields: {
		company_name: {
			name: 'Name',
			type: 'string',
			desc: '',
			must: true,
			show: true,
			required: true,
		},
		description: {
			name: 'Description',
			type: 'textarea',
			row: 3,
			desc: '',
			must: true,
			show: true,
			require: false
		},
		address: {
			name: 'Address',
			type: 'string',
			must: true,
			show: true,
			required: false,
		},
		// month_time: {
		// 	name: 'Month Time',
		// 	type: 'date',
		// 	must: true,
		// 	show: true,
		// },
	}
};