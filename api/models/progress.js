module.exports = {
	name: 'progress',
	fields: {
		project: {
				
			//name: 'Project',
			//type: 'choice',
			//desc: '',
			//must: true,
			//show: true,
			//required: true,
			// option: {
			// 	form: 'project',
			// 	query: {},
			// 	value: 'project_name',
			// 	text: 'project_name',
			// }
            name: 'Project',
            type: 'choice',
            desc: '',
            option: {
               form: 'Project',
               value: 'Project',
               text: 'Project',
            },

			must: true,
            show: true,
            required: true,
		},
		// member1: {
		// 	name: 'Member',
		// 	model: '_account',
		// 	desc: '',
		// 	must: false,
		// 	show: false,
		// },
		member: {
			name: 'Member',
			model: '_account',
			type: 'string',
			desc: '',
			must: true,
			show: false,
			required: false,
		},
		special_price_setting: {
			name: 'Overtime',
			type: 'boolean',
			shape: 'checkbox',
			desc: '',
			must: true,
			required: false,
			show:  true,
			default: false
		},
		Starting_time: {
			name: 'Starting time',
			type: 'datetime',
			must: true,
			show: true,
			required: true,
			
		},
		End_time: {
			name: 'End Time',
			type: 'datetime',
			must: true,
			show: true,
			required: true,
		},
		Complete_the_project:{
			name: 'Complete project',
			type: 'textarea',
			row: 3,
			desc: '',
			must: true,
			show: true,
			required: true,
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
		},
		Approve: {
			name: 'PM confirmation',
			type: 'boolean',
			shape: 'checkbox',
			desc: '',
			must: true,
			required: false,
			show:  false,
			default: false,
		},
		
	}
};
