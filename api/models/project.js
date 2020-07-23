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
			row: 3,
			desc: '',
			must: true,
			show: true,
			require: false
		},
		dev_cycles: {
			name: 'Dev Cycles',
			model: 'dev_cycles',
			desc: '',
			show: true,
		},
		PM: {
			name: 'Project Manager',
			model: '_account',
			desc: '',
			show: true,
			require: true
		},
		client1: {
			name: 'Client 1',
			model: '_account',
			desc: '',
			show: true,
			require: true
		},
		client2: {
			name: 'Client 2',
			model: '_account',
			desc: '',
			show: true,
			require: true
		},
		dev1: {
			name: 'developer 1',
			model: '_account',
			desc: '',
			show: true,
			require: true
		},
		dev2: {
			name: 'developer 2',
			model: '_account',
			desc: '',
			show: true,
			require: true
		},	
		dev3: {
			name: 'developer 3',
			model: '_account',
			desc: '',
			show: true,
			require: true
		},	
	}
};