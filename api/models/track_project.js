module.exports = {
	name: 'progress',
	fields: {
		role: { 
			name: 'Project',
			type: 'choice',
			model: 'project',
			desc: '',
			must: true,
			show: true,
			required: true,
			option: [
				{
					model: 'project.values.project_name'
				}
			]
		},
		member: {
			name: 'Member',
			type: 'number',
			desc: '',
			must: false,
			show: false,
		},
		special_price_setting: {
			name: 'Pricing settings',
			type: 'choice',
			desc: '',
			must: true,
			show: true,
			required: true,
			option: [
				{
					value: 'Normal',
					text: 'Normal',
				},
				{
					value: 'Overtime',
					text: 'Overtime',
				},
			],
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