module.exports = {
	name: 'project',
	fields: {
		project_name: { 
			name: 'Project Name',
			type: 'string',
			desc: '',
			must: true,
			show: true,
			required: true,
			unique: true,
		},
		desc: {
			name: 'Description',
			type: 'textarea',
			row: 3,
			desc: '',
			must: true,
			show: true,
			require: false
		},
		dev_cycles: {
			name: 'Dev Cycles',
			type: 'choice',
			desc: '',
			// choice: {
			// 	form: 'dev_cycles',
			// 	value: 'applicant',
			// 	text: 'applicant'
			// },
			must: false,
			show: true,
			option: {
				form: 'dev_cycles',
				value: 'applicant',
				text: 'applicant'
			}
		},
		PM: {
			name: 'Project Manager',
			model: '_account',
			desc: '',
			show: true,
			require: true,
			// option: {
			// 	form: '_account',
			// 	query: {control: {groups: ['pm']}},
			// 	// value: 'account',
			// 	// text: 'account'
			// }
		},
		client1: {
			name: 'Client 1',
			model: '_account',
			desc: '',
			show: true,
			require: true,
			option: {
				model: '_account',
				text: 'account'
			}
		},
		client2: {
			name: 'Client 2',
			model: '_account',
			desc: '',
			show: true,
			require: true,
			option: {
				model: '_account',
				text: 'account'
			}
		},
		dev1: {
			name: 'developer 1',
			model: '_account',
			desc: '',
			show: true,
			require: true,
			option: {
				model: '_account',
				text: 'account'
			}
		},
		dev2: {
			name: 'developer 2',
			model: '_account',
			desc: '',
			show: true,
			require: true,
			option: {
				model: '_account',
				text: 'account'
			}
		},	
		dev3: {
			name: 'developer 3',
			model: '_account',
			desc: '',
			show: true,
			require: true,
			option: {
				model: '_account',
				text: 'account'
			}
		},	
	}
};