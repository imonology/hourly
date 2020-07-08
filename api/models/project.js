module.exports = {
	name: 'project define',
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
			row: 5,
			desc: '',
			must: true,
			show: true,
			require: false
		},
		PM: {
			name: 'Project Manager',
			model: '_account',
			desc: '',
			show: true,
			require: true
		},		
		sub_data: {
			name: 'Team',
			type: 'sub_model',
			must: false,
			show: true,
			required: false,
			forbid_delete: false,
			fields: {
				dev: {
					name: 'developers',
					model: '_account',
					desc: '',
					show: true,
					required: false,
				},
			},
		},
	}
};