module.exports = {
	name: 'Case',
	fields: {
		applicant: {
			name: 'Case name',
			type: 'string',
			desc: '',
			must: true,
			show: true,
			required: true,
		},
		pm_hour: {
			name: 'PM Hours',
			type: 'number',
			desc: '',
			must: true,
			show: false,
			required: false,
		},
		dev_hour: {
			name: 'Dev Hours',
			type: 'number',
			desc: '',
			must: true,
			show: false,
			required: false,
		},
		sub_data: {
			name: 'Multiple data',
			type: 'sub_model',
			must: true,
			show: true,
			required: true,
			fields: {
				data1: {
					name: 'Document name',
					type: 'string',
					desc: '',
					must: true,
					show: true,
					required: true,
					validator: `{
						message: '你必須是 CCC',
						validator: (rule, value, callback) => {
							console.log('開始驗證');
							console.log(value);
							if (value !== 'CCC') {
								callback(new Error('error'));
							} else {
								callback();
							}
						},
						required: true,
					}`,
				},
				data2: {
					name: 'Document project',
					type: 'choice',
					desc: '',
					must: true,
					show: true,
					required: false,
					option: [
						{
							value: 'category1',
							text: 'Category 1',
						},
						{
							value: 'category2',
							text: 'Category 2',
						},
					],
				},
				data3: {
					name: 'Document description',
					type: 'string',
					desc: '',
					must: true,
					show: true,
					required: false,
				},
				boo3: {
					name: 'Whether',
					type: 'boolean',
					shape: 'checkbox',
					desc: '',
					must: false,
					show: true,
					required: false,
				},
			},
		},
	},
};
