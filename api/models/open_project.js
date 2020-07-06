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
				data1: {
					name: 'choice',
					type: 'choice',
					desc: '',
					must: true,
					show: true,
					required: false,
					option: [
						{
							value: 'category1',
							text: '類別1',
						},
						{
							value: 'category2',
							text: '類別2',
						},
					],
				},
				data2: {
					name: 'Member',
					type: 'string',
					desc: '',
					must: true,
					show: true,
					required: false,
				}
			},
		},
	}
};