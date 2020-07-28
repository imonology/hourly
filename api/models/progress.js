module.exports = {
	name: 'progress',
	fields: {
		project: {
			name: 'Project',
			type: 'choice',
			desc: '',
			must: true,
			show: true,
			required: true,
			option: {
				form: 'project',
				query: {},
				value: 'project_name',
				text: 'project_name',
			}
		},
		member: {
			name: 'Member',
			// type: 'number',
			model: '_account',
			desc: '',
			must: false,
			show: false,
		},
		// special_price_setting_1: {
		// 	name: 'Test',
		// 	type: 'choice',
		// 	desc: '',
		// 	must: true,
		// 	show: true,
		// 	required: true,
		// 	option: {
		// 		form: 'dev_cycles',
		// 		value: 'applicant',
		// 		text: 'applicant',
		// 	}
		// },
		special_price_setting: {
			name: 'Overtime',
			type: 'boolean',
			shape: 'checkbox',
			desc: '',
			must: true,
			show: true,
			required: true,
			default: [
				{
					value: 'Overtime',
					text: 'Overtime',
				},
			],
			// option: {
			// 	form: 'dev_cycles',
			// 	value: 'applicant',
			// 	text: 'applicant',
			// }
		},
		Starting_time: {
			name: 'Starting time',
			type: 'datetime',
			must: true,
			show: true,
		},
		End_time: {
			name: 'End Time',
			type: 'datetime',
			must: true,
			show: true,
		},
		Complete_the_project:{
			name: 'Complete project',
			type: 'textarea',
			row: 3,
			desc: '',
			must: true,
			show: true,
		},
		Remarks:{
			name: 'Remarks',
			type: 'textarea',
			row: 3,
			desc: '',
			must: true,
			show: true,
		},
		To_do:{
			name: 'To do',
			type: 'textarea',
			row: 3,
			desc: '',
			must: true,
			show: true,
		}
	}
};