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
		sub_data: {
			name: 'Add members',
			type: 'sub_model',
			must: false,
			show: true,
			required: false,
			forbid_delete: false,
			fields: {
				data3: {
					name: 'Members',
					type: 'string',
					desc: '',
					must: true,
					show: true,
					required: false,
				},
			},
		},
	}
};